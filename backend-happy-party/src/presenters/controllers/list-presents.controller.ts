import { CreatePresentOnListDTO } from '@application/dto/create-presents-on-list.dto';
import { ListPresentsCreateDTO } from '@application/dto/lis-presents-create.dto';
import { ListPresentsService } from '@application/services/list-presents.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';

@Controller('list-presents')
export class ListPresentsController {
  constructor(private readonly listPresentsService: ListPresentsService) {}

  @Post()
  async createListPresents(@Body() listPresents: ListPresentsCreateDTO) {
    return this.listPresentsService.createListPresents(listPresents);
  }

  @Get(':userId')
  async findAllListPresents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Param('userId') userId: string,
  ) {
    return this.listPresentsService.findAllListPresents(page, limit, userId);
  }

  @Post(':listPresentId')
  async addPresentToList(
    @Param('listPresentId') listPresentId: string,
    @Body() presentCreate: CreatePresentOnListDTO,
  ) {
    return this.listPresentsService.addPresentToList(
      listPresentId,
      presentCreate,
    );
  }

  @Delete(':listPresentId/:presentId')
  async removePresentFromList(
    @Param('listPresentId') listPresentId: string,
    @Param('presentId') presentId: string,
  ) {
    return this.listPresentsService.removePresentFromList(
      listPresentId,
      presentId,
    );
  }
}
