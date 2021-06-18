import { Controller, Get, Inject, Query } from '@nestjs/common';

import { QueryParamsDto } from './dto/query-params-deal.dto';

import { DealServiceInterface } from './interface/deal.service.interface';

@Controller('pipedrive')
export class DealController {
  constructor(
    @Inject('DealServiceInterface')
    private readonly dealService: DealServiceInterface,
  ) {}

  @Get('/deals')
  async findAllDeal(@Query() query: QueryParamsDto) {
    const { api_token } = query;

    return await this.dealService.findAll(api_token);
  }

  // @Get('/deal/:id')
  // findOneDeal(@Param('id') id: string) {
  //   return this.pipedriveService.findOne(+id);
  // }
}
