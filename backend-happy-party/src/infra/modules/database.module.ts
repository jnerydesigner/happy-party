import { PrismaService } from '@infra/database/client/prisma.service';
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
  ],
  exports: [PrismaService, 'USER_REPOSITORY'],
})
export class DatabaseModule {}
