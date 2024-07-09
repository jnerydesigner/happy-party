import {
  UpdatePresentZodDTO,
  UpdatePresentSchema,
  CreatePresentZodDTO,
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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Presents Hot')
@Controller('presents-hot')
export class PresentsHotController {
  constructor(private readonly presentsHotService: PresentsHotService) {}

  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.presentsHotService.getPresentsHotAll(
      Number(page),
      Number(limit),
    );
  }

  @Post()
  async createPresentHot(@Body() body: CreatePresentZodDTO) {
    return this.presentsHotService.createPresentHot(body);
  }

  @Patch(':id')
  async updatePresentHot(
    @Body(new ZodPipe(UpdatePresentSchema)) body: UpdatePresentZodDTO,
    @Param('id') id: string,
  ) {
    return this.presentsHotService.updatePresentHot(id, body);
  }
}
