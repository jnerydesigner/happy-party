import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { PasswordUtil } from '@infra/utils/password.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private password: PasswordUtil;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
    this.password = new PasswordUtil();
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

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
