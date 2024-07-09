import { CreatePresentOnListDTO } from '@application/dto/create-presents-on-list.dto';
import { ListPresentsCreateDTO } from '@application/dto/lis-presents-create.dto';
import { DeletePresentOnListDTO } from '@application/dto/list-presents.validation.zod';
import { ZodPipe } from '@application/pipes/zod.pipe';
import { ListPresentsService } from '@application/services/list-presents.service';
import { AuthGuard } from '@infra/security/autentication/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('List Presents')
@Controller('list-presents')
export class ListPresentsController {
  constructor(private readonly listPresentsService: ListPresentsService) {}

  @Post()
  async createListPresents(@Body() listPresents: ListPresentsCreateDTO) {
    return this.listPresentsService.createListPresents(listPresents);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async findAllListPresents(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Req() req: Request,
  ) {
    const userId = req.user.id;
    return this.listPresentsService.findAllListPresents(page, limit, userId);
  }

  @Post(':listPresentId')
  async addPresentToList(
    @Param('listPresentId') listPresentId: string,
    @Body(new ZodPipe(CreatePresentOnListDTO)) presentCreate,
  ) {
    return this.listPresentsService.addPresentToList(
      listPresentId,
      presentCreate,
    );
  }

  @Delete('/delete')
  async removePresentFromList(
    @Body(new ZodPipe(DeletePresentOnListDTO)) presentDelete,
  ) {
    return this.listPresentsService.removePresentFromList(
      presentDelete.listPresentId,
      presentDelete.presentId,
    );
  }
}
