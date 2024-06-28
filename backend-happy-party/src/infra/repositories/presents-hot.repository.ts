import { PresentsHotResponsePagination } from '@application/dto/presents-hot.pagination.dto';

export interface PresentsHotRepository {
  findAll(page: number, limit: number): Promise<PresentsHotResponsePagination>;
}
