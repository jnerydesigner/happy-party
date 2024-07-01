import { randomUUID } from 'crypto';

export class PartyEntity {
  constructor(
    readonly typeId: string,
    readonly userId: string,
    readonly name: string,
    readonly dateParty: Date,
    readonly partyId?: string,
    readonly description?: string,
    readonly banner?: string,
    readonly listPresents?: string,
    readonly marriedId?: string,
    readonly birthdayId?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}

  static createParty(
    typeId: string,
    userId: string,
    name: string,
    dateParty: Date,
    description: string,
    banner: string,
  ) {
    const partyId = randomUUID();

    return new PartyEntity(
      typeId,
      userId,
      name,
      dateParty,
      partyId,
      description,
      banner,
    );
  }
}
