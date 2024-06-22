import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/app.config";

export const SignJWT = (payload: string) => {
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};
export const VerifyJwt = (token: string) => {
  const payload = jwt.verify(token, JWT_SECRET);
  return payload;
};
