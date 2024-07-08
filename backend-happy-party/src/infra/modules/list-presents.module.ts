import { ListPresentsService } from '@application/services/list-presents.service';
import { PrismaService } from '@infra/database/client/prisma.service';
import { ListPresentsPrismaRepository } from '@infra/repositories/prisma/list-presents-prisma.repository';
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ListPresentsController } from '@presenters/controllers/list-presents.controller';

@Module({
  imports: [],
  controllers: [ListPresentsController],
  providers: [
    ListPresentsService,
    {
      provide: 'LIST_PRESENTS_REPOSITORY',
      useFactory: (prismaService: PrismaService) =>
        new ListPresentsPrismaRepository(prismaService),
      inject: [PrismaService],
    },
    JwtService,
  ],
  exports: [ListPresentsService],
})
export class ListPresentsModule {}
