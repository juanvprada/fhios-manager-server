import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/config';

export function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const payload = jwt.verify(token, jwtConfig.secret) as { userId: number };
    req.body.userId = payload.userId;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
}
