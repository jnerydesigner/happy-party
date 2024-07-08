import { CreatePresentOnListZodDTO } from '@application/dto/create-presents-on-list.dto';
import { ListPresentsEntity } from '@domain/entities/list-presents.entity';

export interface ListPresentsRepository {
  createListPresents(listPresents: ListPresentsEntity): Promise<any>;
  listAll(page: number, limit: number, userId: string): Promise<any>;
  addPresentToList(
    listPresentId: string,
    presentCreate: CreatePresentOnListZodDTO,
  ): Promise<any>;
  removePresentFromList(
    listPresentId: string,
    presentId: string,
  ): Promise<void>;
}
