import { ConfigService } from '@nestjs/config';

const config = new ConfigService();

const secret = config.get<string>('JWT_SECRET');

export { secret };
