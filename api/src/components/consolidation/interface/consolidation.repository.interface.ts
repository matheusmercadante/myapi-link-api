import { BaseInterfaceRepository } from '@repositories/base/base.interface.repository';
import { Consolidation } from '@components/consolidation/entity/consolidation.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConsolidationRepositoryInterface
  extends BaseInterfaceRepository<Consolidation> {
  findReport(): Promise<Consolidation[]>;
}
