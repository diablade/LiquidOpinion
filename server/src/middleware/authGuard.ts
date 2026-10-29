import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import type { IUser } from '../models/user.model';

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (err: unknown, user: IUser | false) => {
    if (err) return next(err);
    if (!user) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
    req.user = user;
    next();
  })(req, res, next);
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  passport.authenticate('jwt', { session: false }, (_err: unknown, user: IUser | false) => {
    if (user) req.user = user;
    next();
  })(req, _res, next);
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const user = req.user as IUser | undefined;
  if (!user || user.role !== 'ADMIN') {
    res.status(403).json({ message: 'Admin access required' });
    return;
  }
  next();
}
