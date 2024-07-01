import { AppService } from '@application/services/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@presenters/controllers/app.controller';
import { DatabaseModule } from './database.module';
import { UserModule } from './user.module';
import { AuthModule } from './auth.module';
import { PresentsHotModule } from './presents-hot.module';
import { PartyModule } from './party.module';
import { ListPresentsModule } from './list-presents.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PresentsHotModule,
    PartyModule,
    ListPresentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
