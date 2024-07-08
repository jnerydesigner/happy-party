/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
        iat: number;
        exp: number;
      };
    }
  }
}
