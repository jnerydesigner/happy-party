import { PresentHotCreateDTO } from '@application/dto/present-hot-create.dto';
import {
  UpdatePresentDTO,
  UpdatePresentSchema,
} from '@application/dto/present.validation.zod';
import { ZodPipe } from '@application/pipes/zod.pipe';
import { PresentsHotService } from '@application/services/presents-hot.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

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

  @Patch(':id')
  async updatePresentHot(
    @Body(new ZodPipe(UpdatePresentSchema)) body: UpdatePresentDTO,
    @Param('id') id: string,
  ) {
    return this.presentsHotService.updatePresentHot(id, body);
  }
}
