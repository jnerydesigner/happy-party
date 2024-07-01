import { PartyEntity } from '@domain/entities/party.entity';

export interface PartyRepository {
  findAllParties(page: number, limit: number): Promise<string>;
  createParty(party: PartyEntity): Promise<void>;
}
