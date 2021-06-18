import { CreateConsolidationPipedriveBlingDto } from '../dto/create-consolidation-pipedrive-bling.dto';
import { Consolidation } from '../entity/consolidation.entity';

export interface ConsolidationServiceInterface {
  findAll(): Promise<Consolidation[]>;
  findReport(): Promise<Consolidation[]>;
  create(data: CreateConsolidationPipedriveBlingDto): Promise<Consolidation>;
}
