import { randomUUID } from 'crypto';

export class ListPresentsEntity {
  constructor(
    readonly name: string,
    readonly partyId: string,
    readonly id?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}

  static createListPresents(name: string, partyId: string): ListPresentsEntity {
    const id = randomUUID();
    return new ListPresentsEntity(name, partyId, id);
  }
}
