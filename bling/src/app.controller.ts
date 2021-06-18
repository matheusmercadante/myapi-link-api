import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getAllOrder' })
  async getAllOrder(token: string) {
    return await this.appService.getAllOrder(token);
  }

  @MessagePattern({ cmd: 'getOneOrder' })
  async getOneOrder(payload) {
    return await this.appService.findOne(payload);
  }

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(payload) {
    return await this.appService.create(payload);
  }
}
