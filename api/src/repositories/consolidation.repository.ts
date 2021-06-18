import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsolidationRepositoryInterface } from '@components/consolidation/interface/consolidation.repository.interface';
import {
  Consolidation,
  ConsolidationDocument,
  ConsolidationSchema,
} from '@components/consolidation/entity/consolidation.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ConsolidationRepository
  extends BaseAbstractRepository<Consolidation>
  implements ConsolidationRepositoryInterface
{
  constructor(
    // @InjectRepository(Consolidation)
    // private readonly consolidationRepository: Repository<Consolidation>,

    @InjectModel(Consolidation.name)
    private readonly consolidationRepository: Model<ConsolidationDocument>,
  ) {
    super(consolidationRepository);
  }

  public async findReport() {
    try {
      return await this.consolidationRepository.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            sell_value: { $sum: '$sell_value' },
            count: { $sum: 1 },
          },
        },
        { $sort: { count: 1 } },
      ]);
    } catch (error) {
      return error;
    }
  }
}
