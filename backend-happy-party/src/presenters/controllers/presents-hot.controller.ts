import { PresentHotCreateDTO } from '@application/dto/present-hot-create.dto';
import { PresentsHotService } from '@application/services/presents-hot.service';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';

@Controller('presents-hot')
export class PresentsHotController {
  constructor(private readonly presentsHotService: PresentsHotService) {}

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.presentsHotService.getPresentsHotAll(page, limit);
  }

  @Post()
  async createPresentHot(@Body() body: PresentHotCreateDTO) {
    return this.presentsHotService.createPresentHot(body);
  }
}
