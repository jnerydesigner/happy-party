import { PartyEntity } from '@domain/entities/party.entity';
import { PartyRepository } from '@infra/repositories/party.repository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PartyService {
  constructor(
    @Inject('PARTY_REPOSITORY')
    private readonly partyRepository: PartyRepository,
  ) {}
  async findAllParties(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    return this.partyRepository.findAllParties(skip, limit);
  }

  async createParty(createParty: any) {
    const partyCreate = PartyEntity.createParty(
      createParty.typeId,
      createParty.userId,
      createParty.name,
      createParty.dateParty,
      createParty.description,
      createParty.banner,
    );

    return await this.partyRepository.createParty(partyCreate);
  }
}
