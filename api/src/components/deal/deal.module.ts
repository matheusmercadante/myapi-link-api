import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { DealServiceInterface } from './interface/deal.service.interface';
import { DealService } from './deal.service';

import { PipedriveServiceInterface } from '@services/pipedrive/interface/pipedrive.service.interface';
import { PipedriveService } from '@services/pipedrive/pipedrive.service';

import { DealController } from './deal.controller';

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
    ]),
  ],
  controllers: [DealController],
  providers: [
    {
      provide: 'DealServiceInterface',
      useClass: DealService,
    },
    {
      provide: 'PipedriveServiceInterface',
      useClass: PipedriveService,
    },
  ],
})
export class DealModule {}
