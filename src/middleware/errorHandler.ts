import { Request, Response, NextFunction } from 'express';
import { AppError, InternalServerError } from '../utils/errors';
import { ApiResponse } from '../types';

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let appError = error;

  if (!(error instanceof AppError)) {
    appError = new InternalServerError(
      process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : error.message
    );
  }

  const { statusCode, message } = appError as AppError;

  const response: ApiResponse<null> = {
    success: false,
    error: message,
  };

  console.error(`[${new Date().toISOString()}] ${statusCode} - ${message}`);

  res.status(statusCode || 500).json(response);
};

export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
