import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { BlingService } from './bling.service';

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
  controllers: [],
  providers: [
    {
      provide: 'BlingServiceInterface',
      useClass: BlingService,
    },
  ],
})
export class BlingModule {}
