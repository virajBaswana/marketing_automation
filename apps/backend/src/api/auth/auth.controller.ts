import { NextFunction, Request, Response } from "express";
import { CustomError, JsonSuccessResponse } from "../../types/global.types";
import { User, UserTable } from "../user/user.schema";
import * as argon from "argon2";
import { FindUserByEmail, SaveUserSignup } from "./auth.service";
import { SuccessJSONResponse } from "../../helper/index.helper";
import { SignJWT } from "../../utils/utils.index";

export const UserSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const checkEmail: User[] = await FindUserByEmail(email);
    if (checkEmail.length > 0) {
      throw new CustomError("User already exists with given email.", 409);
    }
    const hashedpassword = await argon.hash(password);
    const saveUser = await SaveUserSignup(email, hashedpassword);
    const token = SignJWT(JSON.stringify({ user_id: saveUser[0].user_id }));
    let response = SuccessJSONResponse("Sign up successful", 201, [
      { ...saveUser[0], token: token },
    ]);
    res.cookie("jwt_token" , token , {httpOnly : true})
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
export const UserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const getUser: User[] = await FindUserByEmail(email);
    if (getUser.length === 0) {
      throw new CustomError("No account found with given email", 404);
    }
    console.log("cookei",req.cookies)
    const correctPassword = await argon.verify(getUser[0].password , password);
    if(!correctPassword){
      throw new CustomError("Worng password" , 401)
    }
    const token = SignJWT(JSON.stringify({ user_id: getUser[0].user_id }));
    res.cookie("jwt_token" , token)
    // const saveUser = await LoginUser(email, hashedpassword);
    let response = SuccessJSONResponse("Sign up successful", 201, [
      { ...getUser[0], token: token },
    ]);
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};
