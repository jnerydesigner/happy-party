import { PrismaService } from '@infra/database/client/prisma.service';
import { ListPresentsRepository } from '../list-presents.repository';

import { ListPresentsEntity } from '@domain/entities/list-presents.entity';
import { ListPresentsMapper } from '@infra/database/mappers/list-presents.mapper';
import { CreatePresentOnListZodDTO } from '@application/dto/create-presents-on-list.dto';
import { ListPresentsResponse } from '@application/dto/pagination.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
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
    presentCreate: CreatePresentOnListZodDTO,
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

  async removePresentFromList(
    listPresentId: string,
    presentId: string,
  ): Promise<any> {
    try {
      const searchPresent =
        await this.prismaService.listPresentOnPresentsHot.findFirst({
          where: {
            list_present_id: listPresentId,
            present_hot_id: presentId,
          },
        });

      if (!searchPresent) {
        throw new Error('Present not found');
      }

      await this.prismaService.listPresentOnPresentsHot.delete({
        where: {
          list_present_id_present_hot_id: {
            list_present_id: listPresentId,
            present_hot_id: presentId,
          },
        },
      });

      return {
        statusCode: HttpStatus.OK,
        message: 'Present removed',
      };
    } catch (e) {
      throw new HttpException('Present not found', HttpStatus.NOT_FOUND);
    }

    // const response = await this.prismaService.listPresentOnPresentsHot.delete({
    //   where: {
    //     list_present_id_present_hot_id: {
    //       list_present_id: listPresentId,
    //       present_hot_id: presentId,
    //     },
    //   },
    // });

    // console.log(response);
  }
}
