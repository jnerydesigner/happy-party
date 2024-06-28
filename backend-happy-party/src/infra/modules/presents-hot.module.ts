import { PresentsHotService } from '@application/services/presents-hot.service';
import { Module } from '@nestjs/common';
import { PresentsHotController } from '@presenters/controllers/presents-hot.controller';

@Module({
  imports: [],
  controllers: [PresentsHotController],
  providers: [PresentsHotService],
  exports: [PresentsHotService],
})
export class PresentsHotModule {}
