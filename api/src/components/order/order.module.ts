import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrderServiceInterface } from './interface/order.service.interface';
import { OrderService } from './order.service';

import { BlingServiceInterface } from '@services/bling/interface/bling.service.interface';
import { BlingService } from '@services/bling/bling.service';

import { OrderController } from './order.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'BLING_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.BLING_HOST || '127.0.0.1',
          port: parseInt(process.env.BLING_PORT) || 4444,
        },
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [
    {
      provide: 'OrderServiceInterface',
      useClass: OrderService,
    },
    {
      provide: 'BlingServiceInterface',
      useClass: BlingService,
    },
  ],
})
export class OrderModule {}
