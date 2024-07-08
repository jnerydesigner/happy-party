import { CreatePresentOnListZodDTO } from '@application/dto/create-presents-on-list.dto';
import { ListPresentsCreateDTO } from '@application/dto/lis-presents-create.dto';
import { ListPresentsEntity } from '@domain/entities/list-presents.entity';
import { ListPresentsRepository } from '@infra/repositories/list-presents.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ListPresentsService {
  constructor(
    @Inject('LIST_PRESENTS_REPOSITORY')
    private readonly listPresentsRepository: ListPresentsRepository,
  ) {}

  async createListPresents(listPresents: ListPresentsCreateDTO) {
    const listPresentsDomain = ListPresentsEntity.createListPresents(
      listPresents.name,
      listPresents.partyId,
    );
    return this.listPresentsRepository.createListPresents(listPresentsDomain);
  }

  async findAllListPresents(page: number, limit: number, userId: string) {
    const skip = (page - 1) * limit;
    return this.listPresentsRepository.listAll(skip, limit, userId);
  }

  async addPresentToList(
    listPresentId: string,
    presentCreate: CreatePresentOnListZodDTO,
  ) {
    return this.listPresentsRepository.addPresentToList(
      listPresentId,
      presentCreate,
    );
  }

  async removePresentFromList(listPresentId: string, presentId: string) {
    return this.listPresentsRepository.removePresentFromList(
      listPresentId,
      presentId,
    );
  }
}
