import { PartyService } from '@application/services/party.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Party')
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
