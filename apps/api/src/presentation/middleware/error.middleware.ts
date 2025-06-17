import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class ErrorHandler {
  static handle(error: AppError, req: Request, res: Response, next: NextFunction) {
    const { statusCode = 500, message } = error;
    
    console.error('Error occurred:', {
      error: message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    if (process.env.NODE_ENV === 'development') {
      return res.status(statusCode).json({
        error: message,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        path: req.url,
        method: req.method
      });
    }

    const isOperationalError = error.isOperational || statusCode < 500;
    
    return res.status(statusCode).json({
      error: isOperationalError ? message : 'Internal server error',
      timestamp: new Date().toISOString(),
      ...(statusCode === 422 && { details: error.message })
    });
  }

  static notFound(req: Request, res: Response, next: NextFunction) {
    const error: AppError = new Error(`Route ${req.originalUrl} not found`);
    error.statusCode = 404;
    error.isOperational = true;
    next(error);
  }

  static asyncHandler(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export const createError = (message: string, statusCode: number = 500): AppError => {
  const error: AppError = new Error(message);
  error.statusCode = statusCode;
  error.isOperational = true;
  return error;
};

export const asyncHandler = ErrorHandler.asyncHandler;
export const errorHandler = ErrorHandler.handle;
export const notFoundHandler = ErrorHandler.notFound;