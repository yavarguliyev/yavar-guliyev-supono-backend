import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
        email: string;
        role: 'admin' | 'user';
      };
    }
  }
}
