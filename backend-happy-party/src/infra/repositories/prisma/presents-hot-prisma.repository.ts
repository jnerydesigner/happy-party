import { PrismaService } from '@infra/database/client/prisma.service';
import { PresentsHotRepository } from '../presents-hot.repository';
import { PresentHotMapper } from '@infra/database/mappers/present-hot.mapper';
import { PresentsHotResponsePagination } from '@application/dto/presents-hot.pagination.dto';
import { PresentHotEntity } from '@domain/entities/present-hot.entity';

export class PresentsHotPrismaRepository implements PresentsHotRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(
    page: number,
    limit: number,
  ): Promise<PresentsHotResponsePagination> {
    const presentsHot = await this.prismaService.presentsHot.findMany({
      skip: page,
      take: limit,
    });

    const presentsHotEntities = presentsHot.map((presentHot) =>
      PresentHotMapper.toResponse(presentHot),
    );

    const presentsHotTotal = await this.prismaService.presentsHot.count();

    return {
      presentsHot: presentsHotEntities,
      pagination: {
        total: presentsHotTotal,
        page,
        limit,
        totalPages: Math.ceil(presentsHotTotal / limit),
      },
    };
  }

  async createPresentHot(presentHot: PresentHotEntity): Promise<any> {
    const presentHotMapper = PresentHotMapper.toPersistent(presentHot);

    const presentHotCreated = await this.prismaService.presentsHot.create({
      data: presentHotMapper,
    });

    return PresentHotMapper.toResponse(presentHotCreated);
  }
}
