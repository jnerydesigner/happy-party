import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserService } from '@application/services/user.service';
import { AuthController } from '@presenters/controllers/auth.controller';
import { AuthService } from '@application/services/auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtService],
  exports: [AuthService],
})
export class AuthModule {}
