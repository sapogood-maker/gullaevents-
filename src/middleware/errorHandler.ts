import { Request, Response, NextFunction } from 'express';
import { AppError } from '@utils/errors';
import logger from '@utils/logger';

export function errorHandlerMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.error('Request error', {
    path: req.path,
    method: req.method,
    message: error.message,
    stack: error.stack,
  });

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.message,
      errorCode: error.errorCode,
      statusCode: error.statusCode,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    errorCode: 'INTERNAL_SERVER_ERROR',
    statusCode: 500,
  });
}
