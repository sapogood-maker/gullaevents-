import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@config/jwt';
import { AuthError } from '@utils/errors';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthError('Missing authorization header');
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);

    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof AuthError) {
      res.status(error.statusCode).json({
        error: error.message,
        errorCode: error.errorCode,
      });
    } else {
      res.status(401).json({
        error: 'Invalid token',
        errorCode: 'INVALID_TOKEN',
      });
    }
  }
}
