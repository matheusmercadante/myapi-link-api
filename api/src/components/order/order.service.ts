import { Inject, Injectable } from '@nestjs/common';

import { OrderServiceInterface } from './interface/order.service.interface';
import { BlingServiceInterface } from '@services/bling/interface/bling.service.interface';

import { CreateBlingOrderDto } from './dto/create-bling-order.dto';

@Injectable()
export class OrderService implements OrderServiceInterface {
  constructor(
    @Inject('BlingServiceInterface')
    private readonly blingService: BlingServiceInterface<string>,
  ) {}

  public async findAll(blingApiToken: string): Promise<any> {
    const cmdPattern = 'getAllOrder';

    return await this.blingService.findAll(blingApiToken, cmdPattern);
  }

  public async findOne(blingApiToken: string, id: number): Promise<any> {
    const cmdPattern = 'getOneOrder';

    return await this.blingService.findOne(blingApiToken, cmdPattern, id);
  }

  public async create(
    blingApiToken: string,
    data: CreateBlingOrderDto,
  ): Promise<any> {
    const cmdPattern = 'createOrder';

    return await this.blingService.create(blingApiToken, cmdPattern, data);
  }
}
