import { PresentsHotRepository } from '@infra/repositories/presents-hot.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PresentsHotService {
  constructor(
    @Inject('PRESENTS_HOT_REPOSITORY')
    private readonly presentsHotRepository: PresentsHotRepository,
  ) {}

  async getPresentsHotAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    return this.presentsHotRepository.findAll(skip, limit);
  }
}
