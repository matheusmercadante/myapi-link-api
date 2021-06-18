import { BaseInterfaceRepository } from '@repositories/base/base.interface.repository';
import { Model } from 'mongoose';
// import { Repository } from 'typeorm';

export abstract class BaseAbstractRepository<T>
  implements BaseInterfaceRepository<T>
{
  // private entity: Repository<T>;
  private entity: Model<T>;

  protected constructor(entity: Model<T>) {
    this.entity = entity;
  }

  public async create(data: T | any): Promise<T> {
    // return await this.entity.save(data);
    return await this.entity.create(data);
  }

  // public async findOneById(id: number): Promise<T> {
  //   return this.entity.findOne(id);
  // }

  public async findAll(): Promise<T[]> {
    return await this.entity.find();
  }
}
