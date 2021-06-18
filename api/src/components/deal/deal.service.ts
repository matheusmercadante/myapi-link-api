import { Inject, Injectable } from '@nestjs/common';

import { PipedriveServiceInterface } from '@services/pipedrive/interface/pipedrive.service.interface';
import { DealServiceInterface } from './interface/deal.service.interface';

@Injectable()
export class DealService implements DealServiceInterface {
  constructor(
    @Inject('PipedriveServiceInterface')
    private readonly pipedriveService: PipedriveServiceInterface<string>,
  ) {}

  public async findAll(pipedriveApiToken: string): Promise<any> {
    const cmdPattern = 'getAllDeal';

    return await this.pipedriveService.findAll(pipedriveApiToken, cmdPattern);
  }

  public findOne(pipedriveApiToken: string, id: number) {
    return `This action returns a #${id} pipedrive`;
  }
}
