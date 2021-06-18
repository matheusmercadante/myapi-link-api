import { CreateBlingOrderDto } from '../dto/create-bling-order.dto';

export interface OrderServiceInterface {
  findAll(apiToken: string): Promise<any>;
  findOne(apiToken: string, id: number): Promise<any>;
  create(apiToken: string, data: CreateBlingOrderDto | any): Promise<any>;
}
