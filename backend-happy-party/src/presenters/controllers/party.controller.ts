import { PartyService } from '@application/services/party.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('party')
export class PartyController {
  constructor(private readonly partyService: PartyService) {}

  @Get()
  findAllParties() {
    return this.partyService.findAllParties();
  }

  @Post()
  createParty(@Body() createParty: any) {
    return this.partyService.createParty(createParty);
  }
}
