import { z } from "zod";

export const AuthSignup = z.object({
  body: z.object({
    email: z.string({ required_error: "please provide email" }),
    password: z.string({ required_error: "please provide password" }),
  }),
});
export const Authlogin = z.object({
  email: z.string({ required_error: "please provide email" }),
  password: z.string({ required_error: "please provide password" }),
});
