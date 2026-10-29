import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  status?: number;
  code?: number;
}

export function errorHandler(err: AppError, _req: Request, res: Response, _next: NextFunction): void {
  const status = err.status ?? err.code ?? 500;
  const message = status < 500 ? err.message : 'Internal server error';

  if (status >= 500) {
    console.error(err);
  }

  res.status(status).json({ message });
}

export function notFound(_req: Request, res: Response): void {
  res.status(404).json({ message: 'Route not found' });
}
