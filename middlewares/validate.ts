import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { errorResponse } from '../utils/response';

export const validate = (schema: ZodSchema<any>) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    return errorResponse(res, 'Validation error', 400, err.errors);
  }
};
