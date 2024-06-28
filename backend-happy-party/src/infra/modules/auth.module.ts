import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { UserService } from '@application/services/user.service';
import { AuthController } from '@presenters/controllers/auth.controller';
import { AuthService } from '@application/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@infra/auth/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, AuthService],
})
export class AuthModule {}
