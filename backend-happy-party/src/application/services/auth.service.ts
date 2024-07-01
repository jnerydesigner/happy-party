import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordUtil } from '@infra/utils/password.util';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private password: PasswordUtil;
  private logger: Logger = new Logger(AuthService.name);
  private config: ConfigService = new ConfigService();
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.password = new PasswordUtil();
    this.logger = new Logger(AuthService.name);
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByEmail(username);
    const passwordCompare = await this.password.comparePassword(
      pass,
      user.password,
    );
    if (!passwordCompare) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.email };
    this.logger.log(`User ${user.email} logged in`);

    try {
      const tokenFactory = {
        access_token: await this.jwtService.signAsync(payload, {
          secret: this.config.get<string>('JWT_SECRET'),
          expiresIn: '1h',
        }),
      };

      return tokenFactory;
    } catch (err) {
      console.log(err);
      this.logger.error(err);
      // throw new UnauthorizedException();
    }
  }
}
