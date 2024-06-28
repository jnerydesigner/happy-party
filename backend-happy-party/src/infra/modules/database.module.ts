import { PrismaService } from '@infra/database/client/prisma.service';
import { PresentsHotPrismaRepository } from '@infra/repositories/prisma/presents-hot-prisma.repository';
import { UserPrismaRepository } from '@infra/repositories/prisma/user-prisma.repository';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'USER_REPOSITORY',
      useFactory: (prisma: PrismaService) => new UserPrismaRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: 'PRESENTS_HOT_REPOSITORY',
      useFactory: (prisma: PrismaService) =>
        new PresentsHotPrismaRepository(prisma),
      inject: [PrismaService],
    },
  ],
  exports: [PrismaService, 'USER_REPOSITORY', 'PRESENTS_HOT_REPOSITORY'],
})
export class DatabaseModule {}
