import { Controller, Get, Post, Body, Query, Inject } from '@nestjs/common';

import { QueryParamsDto } from './dto/query-params-order.dto';
import { CreateBlingOrderDto } from './dto/create-bling-order.dto';

import { OrderServiceInterface } from './interface/order.service.interface';

@Controller('bling')
export class OrderController {
  constructor(
    @Inject('OrderServiceInterface')
    private readonly orderService: OrderServiceInterface,
  ) {}

  @Post('/order')
  createOrder(
    @Query() query: QueryParamsDto,
    @Body() createBlingOrderDto: CreateBlingOrderDto,
  ) {
    const { api_token } = query;

    return this.orderService.create(api_token, createBlingOrderDto);
  }

  @Get('/orders')
  findAllOrder(@Query() query: QueryParamsDto) {
    const { api_token } = query;

    return this.orderService.findAll(api_token);
  }

  // @Get('/order/:id')
  // findOneOrder(@Param('id') id: string, @Query() query: QueryParamsDto) {
  //   const { api_token } = query;

  //   return this.blingService.findOne(+id, api_token);
  // }

  // @Patch('/order/:id')
  // updateOrder(
  //   @Param('id') id: string,
  //   @Query() query: QueryParamsDto,
  //   @Body() updateBlingDto: UpdateBlingDto,
  // ) {
  //   const { api_token } = query;

  //   return this.blingService.update(+id, api_token, updateBlingDto);
  // }

  // @Delete('/order/:id')
  // removeOrder(@Param('id') id: string, @Query() query: QueryParamsDto) {
  //   const { api_token } = query;

  //   return this.blingService.remove(+id, api_token);
  // }
}
