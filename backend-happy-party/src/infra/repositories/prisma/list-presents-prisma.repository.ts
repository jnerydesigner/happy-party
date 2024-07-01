import { PrismaService } from '@infra/database/client/prisma.service';
import { ListPresentsRepository } from '../list-presents.repository';

import { ListPresentsEntity } from '@domain/entities/list-presents.entity';
import { ListPresentsMapper } from '@infra/database/mappers/list-presents.mapper';
import { CreatePresentOnListDTO } from '@application/dto/create-presents-on-list.dto';
import { ListPresentsResponse } from '@application/dto/pagination.dto';
// import { ListPresentsMapper } from '@infra/database/mappers/list-presents.mapper';

export class ListPresentsPrismaRepository implements ListPresentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createListPresents(listPresents: ListPresentsEntity): Promise<any> {
    const listPresentsResponse = await this.prismaService.listPresents.create({
      data: {
        id: listPresents.id,
        name: listPresents.name,
        party_id: listPresents.partyId,
      },
      include: {
        party: true,
      },
    });

    return ListPresentsMapper.toResponseNotUser(listPresentsResponse);
  }

  async listAll(
    page: number,
    limit: number,
    userId: string,
  ): Promise<ListPresentsResponse> {
    const parties = await this.prismaService.party.findMany({
      where: {
        user_id: userId,
      },
    });

    const resParties = parties.map(async (party) => {
      return await this.prismaService.listPresents.findFirst({
        where: {
          party_id: party.id,
        },
        take: limit,
        skip: page,
        include: {
          party: {
            include: {
              user: true,
            },
          },
          ListPresentOnPresentsHot: {
            include: {
              present_hot: true,
            },
          },
        },
      });
    });

    const list = await Promise.all(resParties);

    const listPresentsResponse = list.map((list) =>
      ListPresentsMapper.toResponse(list),
    );

    const totalListPresents = await this.prismaService.listPresents.count();

    return {
      listsPresents: listPresentsResponse,
      pagination: {
        total: totalListPresents,
        page,
        limit,
        totalPages: Math.ceil(totalListPresents / limit),
      },
    };
  }

  async addPresentToList(
    listPresentId: string,
    presentCreate: CreatePresentOnListDTO,
  ): Promise<any> {
    const listPresentOnExists =
      await this.prismaService.listPresentOnPresentsHot.findFirst({
        where: {
          list_present_id: listPresentId,
          present_hot_id: presentCreate.presentHotId,
        },
      });

    if (listPresentOnExists) {
      const listPresent = await this.prismaService.listPresents.findFirst({
        where: {
          id: listPresentOnExists.list_present_id,
        },
        include: {
          party: {
            include: {
              user: true,
            },
          },
          ListPresentOnPresentsHot: {
            include: {
              present_hot: true,
            },
          },
        },
      });

      return ListPresentsMapper.toResponse(
        listPresent,
        'Present already exists',
      );
    }

    const user = await this.prismaService.user.findFirst({
      where: {
        id: presentCreate.userId,
      },
    });

    const createPresentOnList =
      await this.prismaService.listPresentOnPresentsHot.create({
        data: {
          assignedBy: user.id,
          list_present_id: listPresentId,
          present_hot_id: presentCreate.presentHotId,
        },
      });

    const listPresent = await this.prismaService.listPresents.findFirst({
      where: {
        id: createPresentOnList.list_present_id,
      },
      include: {
        party: {
          include: {
            user: true,
          },
        },
        ListPresentOnPresentsHot: {
          include: {
            present_hot: true,
          },
        },
      },
    });

    return ListPresentsMapper.toResponse(listPresent);
  }
}
