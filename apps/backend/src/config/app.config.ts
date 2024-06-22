import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || "3000";
export const META_BASE_URL =
  process.env.META_BASE_URL || "https://graph.facebook.com";

export const META_TOKEN_URL =
  process.env.META_TOKEN_URL ||
  "https://graph.facebook.com/v20.0/oauth/access_token";

export const META_AUTH_URL =
  process.env.META_AUTH_URL || "https://www.facebook.com/v20.0/dialog/oauth";

export const META_CLIENT_ID = process.env.META_CLIENT_ID || "1395069584348157";
export const META_REDIRECT_URL =
  process.env.META_REDIRECT_URL || "http://localhost:3000/metaGraphAuthRedirect";
export const META_CONFIG_ID = process.env.META_CONFIG_ID || "1240117760303364";
export const META_STATE =
  process.env.META_STATE ||
  "qeiourghdsiuyfghaisrgiyufguayksgfuakhjsgfuyasgfuaguyfkgad";
export const META_CLIENT_SECRET =
  process.env.META_CLIENT_SECRET || "33533a1d73ec95d2fd4c0c430a6df3f1";
export const COOKIE_SECRET =
  process.env.COOKIE_SECRET ||
  "sadfgbklhsdgflkuygsaelfigsahjiylgfhiuaowuiehfioysuy";
export const NODE_ENV = process.env.NODE_ENV || "development";
export const JWT_SECRET = process.env.JWT_SECRET || "jwt_secret";
