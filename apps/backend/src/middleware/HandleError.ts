import { NextFunction, Request, Response } from "express";
import { CustomError, JsonErrorResponse } from "../types/global.types";

export const HandleError = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let response: JsonErrorResponse = {
    success: false,
    status: err.status,
    message: err.message,
    name: err.name,
    stack: err.stack,
  };
  return res.status(response.status).json(response);
};
