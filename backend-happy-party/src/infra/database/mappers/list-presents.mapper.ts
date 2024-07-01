import { Prisma } from '@prisma/client';
import { UserDTO } from './user.mapper';

type ListPresentsPayloadType = Prisma.ListPresentsGetPayload<{
  include: {
    party: {
      include: {
        user: true;
      };
    };
    ListPresentOnPresentsHot: {
      include: {
        present_hot: true;
      };
    };
  };
}>;

type ListPresentsNotUser = Prisma.ListPresentsGetPayload<{
  include: {
    party: true;
  };
}>;

export class ListPresentsMapper {
  static toResponse(list: ListPresentsPayloadType, error?: string): any {
    const mapper = {
      messageError: error !== undefined ? error : null,
      listId: list.id,
      name: list.name,
      createdAt: list.created_at,
      updatedAt: list.updated_at,
      partyId: list.party_id,
      party: {
        id: list.party.id,
        name: list.party.name,
        description: list.party.description,
        banner: list.party.banner,
        date: list.party.date,
      },
      user: {
        id: list.party.user.id,
        name: list.party.user.name,
        email: list.party.user.email,
      },
      listPresents: list.ListPresentOnPresentsHot.map((listPresent) => {
        return {
          presentId: listPresent.present_hot.id,
          name: listPresent.present_hot.name,
          image: listPresent.present_hot.image,
          urlSailers: listPresent.present_hot.url_sailers,
          price: listPresent.present_hot.price,
          createdAt: listPresent.present_hot.created_at,
          updatedAt: listPresent.present_hot.updated_at,
        };
      }),
    };

    return mapper;
  }

  static toResponseNotUser(list: ListPresentsNotUser): IListType {
    return {
      listId: list.id,
      name: list.name,
      createdAt: list.created_at,
      updatedAt: list.updated_at,
      partyId: list.party_id,
      party: {
        id: list.party.id,
        name: list.party.name,
        description: list.party.description,
        banner: list.party.banner,
        date: list.party.date,
      },
    };
  }
}

export type IListType = {
  listId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  partyId: string;
  party: Omit<IPartType, 'createdAt' | 'updatedAt'>;
  user?: Omit<UserDTO, 'password' | 'createdAt' | 'updatedAt'>;
};

export type IPartType = {
  id: string;
  name: string;
  description: string;
  banner: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type IPresentType = {
  id: string;
  name: string;
  image: string;
  urlSailers: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
};
