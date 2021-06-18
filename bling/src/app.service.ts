import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Builder } from 'xml2js';

const builder = new Builder();

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  private convertJsonToXml(infos) {
    const {
      id,
      nPedidos,
      dataCompra,
      fornecedor,
      descricaoItem,
      quantidadeItem,
      numeroDias,
      valor,
      formaPagamento,
    } = infos;

    const xmlObj = {
      pedido: {
        data: dataCompra,
        numero: nPedidos,
        cliente: {
          nome: fornecedor,
          tipoPessoa: 'J',
          endereco: 'Avenida das Americas',
          cpf_cnpj: 'official_document',
          ie_rg: '55417841',
          numero: '100',
          complemento: 'Fundos',
          bairro: 'Centro',
          cep: '19160-000',
          cidade: 'Presidente Prudente',
          uf: 'SP',
          fone: '18991202653',
          email: 'meuemail@aqui.com.br',
        },
      },
      transporte: {
        transportadora: 'teste',
        tipo_frete: 'D',
        servico_correios: 'SEDEX',
        dados_etiqueta: {
          nome: 'Sr Gourmet',
          endereco: 'Avenida das Americas',
          numero: '100',
          complemento: 'fundos',
          municipio: 'Presidente Prudente',
          uf: 'SP',
          cep: '19160-000',
          bairro: 'Centro',
        },
      },
      volumes: {
        volumes: [
          {
            serviço: 'SEDEX - CONTRATO',
            codigoRastreamento: '',
          },
        ],
      },
      itens: {
        item: [
          {
            codigo: '01',
            descricao: descricaoItem,
            un: 'un',
            qtde: quantidadeItem,
            vlr_unit: valor,
          },
        ],
      },
      parcelas: {
        parcela: [
          {
            data: numeroDias,
            vlr: valor,
            obs: 'Teste obs 1',
          },
        ],
      },
      vlr_frete: '5',
      vlr_desconto: '10',
      obs: 'apenas uma anotação',
      obs_internas: 'boraaa venderrr',
    };

    const convertedXml = builder.buildObject(xmlObj);

    return convertedXml;
  }

  async getAllOrder(token: string): Promise<AxiosResponse<any>> {
    try {
      const ordersResponse = await this.httpService
        .get('https://bling.com.br/Api/v2/pedidos/json/', {
          params: {
            apikey: token,
          },
        })
        .toPromise();

      return ordersResponse.data;
    } catch (error) {
      return error;
    }
  }

  async findOne(payload: any) {
    const { token, id } = payload;

    if (!id) {
      return;
    }

    try {
      const orderResponse = await this.httpService
        .get(`https://bling.com.br/Api/v2/pedido/${id}/json/`, {
          params: {
            apikey: token,
          },
        })
        .toPromise();

      return orderResponse.data.retorno;
    } catch (error) {
      return error;
    }
  }

  // Promise<AxiosResponse<any>>
  async create(payload: any) {
    const { token, data: dealsData } = payload;

    if (dealsData.length === 0) {
      return;
    }

    try {
      let returnedData = [];

      for (const key in dealsData) {
        if (Object.prototype.hasOwnProperty.call(dealsData, key)) {
          const order = dealsData[key];
          const xml = encodeURI(this.convertJsonToXml(order));

          const orderCreated = await this.httpService
            .post(`https://bling.com.br/Api/v2/pedido/json`, '', {
              params: { apikey: token, xml: xml },
              headers: { Accept: 'application/json' },
            })
            .toPromise();

          const returned = {
            dealId: order.id,
            status: orderCreated.status,
            data: orderCreated.data.retorno,
          };

          returnedData.push(returned);
        }
      }

      return { data: returnedData};
    } catch (error) {
      return error;
    }
  }
}
