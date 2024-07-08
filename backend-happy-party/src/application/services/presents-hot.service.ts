import { PresentHotCreateDTO } from '@application/dto/present-hot-create.dto';
import { UpdatePresentDTO } from '@application/dto/present.validation.zod';
import { PresentHotEntity } from '@domain/entities/present-hot.entity';
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

  async createPresentHot(presentHot: PresentHotCreateDTO) {
    const presentHotEntity = PresentHotEntity.createPresentHot(
      presentHot.name,
      presentHot.image,
      presentHot.urlSailers,
      presentHot.price,
    );

    return this.presentsHotRepository.createPresentHot(presentHotEntity);
  }

  async updatePresentHot(id: string, presentHot: UpdatePresentDTO) {
    const presentHotEntity = new PresentHotEntity(
      presentHot.name,
      presentHot.image,
      presentHot.urlSailers,
      presentHot.price,
      id,
    );

    return this.presentsHotRepository.updatePresentHot(id, presentHot);
  }
}
