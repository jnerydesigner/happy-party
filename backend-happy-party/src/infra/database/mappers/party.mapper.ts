import { PartyEntity } from '@domain/entities/party.entity';

import { Prisma } from '@prisma/client';

type PartyPayloadType = Prisma.PartyGetPayload<{
  include: {
    user: true;
    typeParty: true;
    married: true;
    birthdays: true;
  };
}>;

type PrismaTypeInput = Prisma.PartyCreateInput & {
  user: Prisma.UserCreateNestedOneWithoutPartyInput;
};

export class PartyMapper {
  static toDatabase(party: PartyEntity): PrismaTypeInput {
    return {
      id: party.partyId,
      name: party.name,
      user: {
        connect: {
          id: party.userId,
        },
      },
      description: party.description,
      banner: party.banner,
      date: party.dateParty,
      created_at: party.createdAt,
      updated_at: party.updatedAt,
      typeParty: {
        connect: {
          id: party.typeId,
        },
      },
    };
  }

  static toResponse(party: PartyPayloadType): Party {
    return {
      partyId: party.id,
      userId: party.user_id,
      name: party.name,
      description: party.description,
      banner: party.banner,
      dateParty: party.date,
      createdAt: party.created_at,
      updatedAt: party.updated_at,
      user: {
        id: party.user.id,
        name: party.user.name,
        email: party.user.email,
        password: party.user.password,
        createdAt: party.user.created_at,
        updatedAt: party.user.updated_at,
      },
      typeParty: {
        id: party.typeParty.id,
        name: party.typeParty.name,
        createdAt: party.typeParty.created_at,
        updatedAt: party.typeParty.updated_at,
      },
      married: party.married
        ? {
            id: party.married.id,
            name: party.married.name,
            createdAt: party.married.created_at,
            updatedAt: party.married.updated_at,
            partyId: party.married.party_id,
          }
        : null,
      birthdays: party.birthdays
        ? {
            id: party.birthdays.id,
            name: party.birthdays.name,
            createdAt: party.birthdays.created_at,
            updatedAt: party.birthdays.updated_at,
            partyId: party.birthdays.party_id,
          }
        : null,
    };
  }
}

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  Party?: Party[];
}

interface TypeParty {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ListPresents {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  partyId: string;
}

interface Married {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  partyId: string;
}

interface BirthDays {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  partyId: string;
}

interface Party {
  partyId: string;
  userId: string;
  name: string;
  description: string;
  banner: string;
  dateParty: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  typeParty: TypeParty;

  married: Married | null;
  birthdays: BirthDays | null;
}
