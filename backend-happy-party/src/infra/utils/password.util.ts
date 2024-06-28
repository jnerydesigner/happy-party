import * as bcrypt from 'bcrypt';

export class EncryptPasswordUtil {
  private saltOrRounds: number = 10;
  async encrypt(password: string): Promise<string> {
    const hashPass = await bcrypt.hash(password, this.saltOrRounds);

    return hashPass;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const compare = await bcrypt.compare(password, hash);

    return compare;
  }
}
