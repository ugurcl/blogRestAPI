import { Response } from "express";
export const successResponse = async (res:Response, data = {}, message = 'Success', statusCode = 200):Promise<any> => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = async (res:Response, message = 'Something went wrong', statusCode = 500, errors = null):Promise<any>  => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors
  });
};
