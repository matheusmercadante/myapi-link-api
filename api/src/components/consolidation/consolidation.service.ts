import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { DealServiceInterface } from '@components/deal/interface/deal.service.interface';
import { OrderServiceInterface } from '@components/order/interface/order.service.interface';

import { CreateConsolidationPipedriveBlingDto } from './dto/create-consolidation-pipedrive-bling.dto';
import { ConsolidationServiceInterface } from './interface/consolidation.service.interface';
import { ConsolidationRepositoryInterface } from './interface/consolidation.repository.interface';
import { Consolidation } from './entity/consolidation.entity';

@Injectable()
export class ConsolidationService implements ConsolidationServiceInterface {
  constructor(
    @Inject('DealServiceInterface')
    private readonly dealService: DealServiceInterface,

    @Inject('OrderServiceInterface')
    private readonly orderService: OrderServiceInterface,

    @Inject('ConsolidationRepositoryInterface')
    private readonly consolidationRepository: ConsolidationRepositoryInterface,
  ) {}

  private async fillOrdersToConsolidation(
    bling_api_token: string,
    id: number,
  ): Promise<Consolidation> {
    const orders = await this.orderService.findOne(bling_api_token, id);

    const consolidation = new Consolidation();

    consolidation.number = orders.pedidos[0].pedido.numero;
    consolidation.sell_value = orders.pedidos[0].pedido.totalvenda;
    consolidation.client_name = orders.pedidos[0].pedido.cliente.nome;
    consolidation.date = orders.pedidos[0].pedido.data;

    return await this.consolidationRepository.create(consolidation);
  }

  public async findAll(): Promise<Consolidation[]> {
    try {
      return await this.consolidationRepository.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async findReport(): Promise<Consolidation[]> {
    try {
      return await this.consolidationRepository.findReport();
    } catch (error) {
      throw new Error(error);
    }
  }

  public async create(
    data: CreateConsolidationPipedriveBlingDto,
  ): Promise<Consolidation[] | Consolidation> {
    const { pipedrive_api_token, bling_api_token } = data;

    try {
      const { data: wonDeals } = await this.dealService.findAll(
        pipedrive_api_token,
      );

      if (wonDeals.length === 0) {
        return wonDeals;
      }

      const fillWonDeals = wonDeals.map((deal) => {
        return {
          id: deal.id,
          nPedidos: 12,
          dataCompra: deal.won_time.substring(0, 10),
          fornecedor: deal.org_name || deal.person_name,
          descricaoItem: 'some description 2',
          quantidadeItem: 4,
          numeroDias: '01/01/2021',
          valor: deal.weighted_value,
          formaPagamento: 'dinheiro',
        };
      });

      const { data: createdOrders } = await this.orderService.create(
        bling_api_token,
        fillWonDeals,
      );

      let returnData = [];
      for (const key in createdOrders) {
        const order = createdOrders[key];

        if (order.status !== 201) {
          const { erro: error } = order.data.erros[0];

          const message = { deal_id: order.dealId, error };

          returnData.push(message);
        } else {
          const orderId = order.data.pedidos[0].pedido.numero;

          const createdMongo = await this.fillOrdersToConsolidation(
            bling_api_token,
            orderId,
          );

          returnData.push(createdMongo);
        }
      }

      return returnData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
