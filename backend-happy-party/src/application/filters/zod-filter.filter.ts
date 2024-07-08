import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = 400;

    if (exception.errors.length > 0) {
      response.status(status).json({
        statusCode: status,
        error: exception.errors.map((error) => ({
          message: error.message,
          expected: error.code,
          parameters: error.path,
        })),
      });
    }
  }
}
