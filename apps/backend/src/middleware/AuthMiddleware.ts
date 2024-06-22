import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/app.config";
import {
  CustomError,
  JsonErrorResponse,
  JsonSuccessResponse,
} from "../types/global.types";
// import { ErrorJSONResponse } from "../helper/index.helper"
export const Authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt_token;
  console.log(req.cookies);
  console.log(token);
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log((user as JwtPayload).user_id);
    // req.context.user_id = (user as JwtPayload).user_id;
    req.context = {user_id :  (user as JwtPayload).user_id}
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie("jwt_token");
    next(new CustomError("Not authorized", 401, error as Error));
  }
};
