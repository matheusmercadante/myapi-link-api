import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { BlingServiceInterface } from './interface/bling.service.interface';

@Injectable()
export class BlingService implements BlingServiceInterface<string> {
  constructor(
    @Inject('BLING_SERVICE')
    private readonly clientBlingService: ClientProxy,
  ) {}

  async findAll(blingApiToken: string, cmd: string): Promise<any> {
    const payload = blingApiToken;

    return await this.clientBlingService
      .send<string>({ cmd }, payload)
      .toPromise();
  }

  async findOne(blingApiToken: string, cmd: string, id: number): Promise<any> {
    const payload = { token: blingApiToken, id: id };

    return await this.clientBlingService
      .send<string>({ cmd }, payload)
      .toPromise();
  }

  async create(blingApiToken: string, cmd: string, data: any) {
    const payload = { token: blingApiToken, data: data };

    return await this.clientBlingService.send({ cmd }, payload).toPromise();
  }
}
