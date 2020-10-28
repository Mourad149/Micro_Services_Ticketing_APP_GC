import { Response, Request, NextFunction } from 'express';
import { NotAuthorized } from '../errors/not-authorized';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorized();
  }
  next();
};
