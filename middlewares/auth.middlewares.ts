import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/response';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface JwtPayload {
  userId: string;
  role: 'admin' | 'user';
}

export interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return errorResponse(res, 'Authorization token missing or malformed', 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    return next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
};
