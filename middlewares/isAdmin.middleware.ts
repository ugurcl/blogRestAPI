import { errorResponse } from '../utils/response';
import { AuthRequest } from './auth.middlewares';

import {NextFunction, Request, Response} from "express";

export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return errorResponse(res, 'Access denied: Admins only', 403);
  }
  next();
};