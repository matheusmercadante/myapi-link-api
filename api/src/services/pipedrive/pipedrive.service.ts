import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { PipedriveServiceInterface } from './interface/pipedrive.service.interface';

@Injectable()
export class PipedriveService implements PipedriveServiceInterface<string> {
  constructor(
    @Inject('PIPEDRIVE_SERVICE')
    private readonly clientPipedriveService: ClientProxy,
  ) {}

  async findAll(pipedriveApiToken: string, cmd: string): Promise<any> {
    const payload = pipedriveApiToken;

    return await this.clientPipedriveService
      .send<string>({ cmd }, payload)
      .toPromise();
  }

  // findOne(pipedriveApiToken: string, id: number) {
  //   return `This action returns a #${id} pipedrive`;
  // }
}
