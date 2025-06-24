import { Request, Response, NextFunction } from "express";

export const jsonSyntaxErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    res.status(400).json({
      success: false,
      message: 'Invalid JSON syntax'
    });
  } else {
    next(err);
  }
};