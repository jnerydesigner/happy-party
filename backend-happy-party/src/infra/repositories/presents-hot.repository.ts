import { PresentsHotResponsePagination } from '@application/dto/presents-hot.pagination.dto';
import { PresentHotEntity } from '@domain/entities/present-hot.entity';

export interface PresentsHotRepository {
  findAll(page: number, limit: number): Promise<PresentsHotResponsePagination>;
  createPresentHot(presentHot: PresentHotEntity): Promise<any>;
}
