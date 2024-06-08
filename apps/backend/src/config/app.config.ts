import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || "3000";
export const FB_BASE_URL =
  process.env.FB_BASE_URL || "https://graph.facebook.com/";
export const FB_TOKEN_URL =
  process.env.FB_TOKEN_URL ||
  "https://graph.facebook.com/v20.0/oauth/access_token";

export const FB_CLIENT_ID = process.env.FB_CLIENT_ID || "315609364823245";
export const FB_REDIRECT_URI =
  process.env.FB_REDIRECT_URI || "http://localhost:3000/fb";
export const FB_CONFIG_ID = process.env.FB_CONFIG_ID || "489540216979730";
export const FB_STATE =
  process.env.FB_STATE ||
  "qeiourghdsiuyfghaisrgiyufguayksgfuakhjsgfuyasgfuaguyfkgad";
export const FB_CLIENT_SECRET =
  process.env.FB_CLIENT_SECRET || "97b32fa7e2aa3a51e699abdb6133964c";
