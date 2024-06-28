import { UserService } from '@application/services/user.service';
import { Module } from '@nestjs/common';
import { UserController } from '@presenters/controllers/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
