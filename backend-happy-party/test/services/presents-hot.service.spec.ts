import { PresentsHotService } from '@application/services/presents-hot.service';
import { PrismaService } from '@infra/database/client/prisma.service';
import { PresentsHotRepository } from '@infra/repositories/presents-hot.repository';
import { PresentsHotPrismaRepository } from '@infra/repositories/prisma/presents-hot-prisma.repository';

import { Test, TestingModule } from '@nestjs/testing';

describe('PresentsHotService', () => {
  let presentsHotService: PresentsHotService;

  let presentsHotRepository: PresentsHotRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PresentsHotService,
        PrismaService,

        {
          provide: 'PRESENTS_HOT_REPOSITORY',
          useClass: PresentsHotPrismaRepository,
        },
      ],
    }).compile();

    presentsHotService = module.get<PresentsHotService>(PresentsHotService);
    presentsHotRepository = module.get<PresentsHotRepository>(
      'PRESENTS_HOT_REPOSITORY',
    );

    jest.spyOn(presentsHotRepository, 'findAll').mockResolvedValue({
      presentsHot: [
        {
          id: '1',
          name: 'Present 1',
          urlSailers: 'Description 1',
          image: 'image1.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Present 2',
          urlSailers: 'Description 2',
          image: 'image2.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      pagination: {
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    });
  });

  it('should be defined', () => {
    expect(presentsHotService).toBeDefined();
  });

  it('should return presents hot', async () => {
    const presentsHot = await presentsHotService.getPresentsHotAll(1, 10);

    expect(presentsHot.presentsHot).toHaveLength(2);
    expect(presentsHot.pagination.total).toBe(2);
    expect(presentsHot.pagination.page).toBe(1);
    expect(presentsHot.pagination.limit).toBe(10);
    expect(presentsHot.pagination.totalPages).toBe(1);
  });
});
