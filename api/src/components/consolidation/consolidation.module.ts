import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

import {
  Consolidation,
  ConsolidationSchema,
} from './entity/consolidation.entity';

import { ConsolidationServiceInterface } from './interface/consolidation.service.interface';
import { ConsolidationService } from './consolidation.service';

import { DealServiceInterface } from '@components/deal/interface/deal.service.interface';
import { DealService } from '@components/deal/deal.service';

import { OrderServiceInterface } from '@components/order/interface/order.service.interface';
import { OrderService } from '@components/order/order.service';

import { ConsolidationController } from './consolidation.controller';

import { ConsolidationRepositoryInterface } from './interface/consolidation.repository.interface';
import { ConsolidationRepository } from '@repositories/consolidation.repository';
import { PipedriveService } from '@services/pipedrive/pipedrive.service';
import { BlingService } from '@services/bling/bling.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PIPEDRIVE_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PIPEDRIVE_HOST || '127.0.0.1',
          port: parseInt(process.env.PIPEDRIVE_PORT) || 5555,
        },
      },
      {
        name: 'BLING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.BLING_HOST || '127.0.0.1',
          port: parseInt(process.env.BLING_PORT) || 4444,
        },
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Consolidation.name,
        schema: ConsolidationSchema,
      },
    ]),
    // TypeOrmModule.forFeature([Consolidation]),
  ],
  controllers: [ConsolidationController],
  providers: [
    {
      provide: 'ConsolidationRepositoryInterface',
      useClass: ConsolidationRepository,
    },
    {
      provide: 'ConsolidationServiceInterface',
      useClass: ConsolidationService,
    },
    {
      provide: 'PipedriveServiceInterface',
      useClass: PipedriveService,
    },
    {
      provide: 'BlingServiceInterface',
      useClass: BlingService,
    },
    {
      provide: 'DealServiceInterface',
      useClass: DealService,
    },
    {
      provide: 'OrderServiceInterface',
      useClass: OrderService,
    },
  ],
})
export class ConsolidationModule {}
