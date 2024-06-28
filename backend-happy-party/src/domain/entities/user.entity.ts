import { EncryptPasswordUtil } from '@infra/utils/password.util';
import { randomUUID } from 'crypto';

export class UserEntity {
  constructor(
    readonly name: string,
    readonly email: string,
    readonly password: string,
    readonly id?: string,
    readonly createdAt?: Date,
    readonly updatedAt?: Date,
  ) {}

  static async createUser(name: string, email: string, password: string) {
    const id = randomUUID();
    const pass = await new EncryptPasswordUtil().encrypt(password);

    return new UserEntity(name, email, pass, id);
  }
}
