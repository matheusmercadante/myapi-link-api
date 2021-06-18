import { Module } from '@nestjs/common';
import { PipedriveService } from './pipedrive.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  controllers: [],
  providers: [
    {
      provide: 'PipedriveServiceInterface',
      useClass: PipedriveService,
    },
  ],
})
export class PipedriveModule {}
