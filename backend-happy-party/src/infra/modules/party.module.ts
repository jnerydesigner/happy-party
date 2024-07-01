import { PartyService } from '@application/services/party.service';
import { PrismaService } from '@infra/database/client/prisma.service';
import { PartyPrismaRepository } from '@infra/repositories/prisma/party-prisma.repository';
import { Module } from '@nestjs/common';
import { PartyController } from '@presenters/controllers/party.controller';

@Module({
  imports: [],
  controllers: [PartyController],
  providers: [
    PartyService,
    {
      provide: 'PARTY_REPOSITORY',
      useFactory: (prismaService: PrismaService) =>
        new PartyPrismaRepository(prismaService),
      inject: [PrismaService],
    },
  ],
  exports: [PartyService],
})
export class PartyModule {}
