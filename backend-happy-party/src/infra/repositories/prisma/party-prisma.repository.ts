import { PartyMapper } from './../../database/mappers/party.mapper';
import { PrismaService } from '@infra/database/client/prisma.service';
import { PartyRepository } from '../party.repository';
import { PartyEntity } from '@domain/entities/party.entity';

export class PartyPrismaRepository implements PartyRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createParty(party: PartyEntity): Promise<any> {
    const partyMapper = PartyMapper.toDatabase(party);

    const partyResponse = await this.prismaService.party.create({
      data: partyMapper,
      include: {
        user: true,
        birthdays: true,
        married: true,
        typeParty: true,
      },
    });

    return PartyMapper.toResponse(partyResponse);
  }
  async findAllParties(page: number, limit: number): Promise<any> {
    const parties = await this.prismaService.party.findMany({
      skip: page,
      take: limit,
      include: {
        user: true,
        birthdays: true,
        married: true,
        typeParty: true,
      },
    });

    const response = parties.map((party) => PartyMapper.toResponse(party));

    return response;
  }
}
