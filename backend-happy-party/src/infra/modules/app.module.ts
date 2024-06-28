import { AppService } from '@application/services/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@presenters/controllers/app.controller';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
