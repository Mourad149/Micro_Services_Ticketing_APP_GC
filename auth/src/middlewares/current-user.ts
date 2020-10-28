import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

interface UserPaylaod {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPaylaod;
    }
  }
}
export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.jwt!
    ) as UserPaylaod;

    req.currentUser = payload;
    next();
  } catch (error) {}
  next();
};
