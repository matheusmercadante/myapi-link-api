import { QueryParamsDto } from './dto/find-consolidation-pipedrive-bling.dto';
import { Controller, Post, Body, Inject, Get, Query } from '@nestjs/common';

import { CreateConsolidationPipedriveBlingDto } from './dto/create-consolidation-pipedrive-bling.dto';
import { Consolidation } from './entity/consolidation.entity';

import { ConsolidationServiceInterface } from './interface/consolidation.service.interface';

@Controller('integrations')
export class ConsolidationController {
  constructor(
    @Inject('ConsolidationServiceInterface')
    private readonly consolidationService: ConsolidationServiceInterface,
  ) {}

  @Get('/pipedrive-bling/deals-orders')
  async findAllPipedriveBlingConsolidations() {
    return await this.consolidationService.findAll();
  }

  @Get('/pipedrive-bling/deals-orders/report')
  async findAllPipedriveBlingReportConsolidations() {
    return await this.consolidationService.findReport();
  }

  @Post('/pipedrive-bling/deals-orders')
  async createPipedriveBlingDealsToOrders(
    @Query()
    query: CreateConsolidationPipedriveBlingDto,
  ): Promise<Consolidation[] | Consolidation> {
    const { pipedrive_api_token, bling_api_token } = query;
    const data = { pipedrive_api_token, bling_api_token };

    return await this.consolidationService.create(data);
  }
}
