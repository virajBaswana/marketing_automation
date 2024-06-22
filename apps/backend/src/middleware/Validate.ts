import { NextFunction, Request, Response, query } from "express";
import { AnyZodObject, ZodError, z } from "zod";
import { CustomError } from "../types/global.types";

export function ValidateRequest(...requestObjects: AnyZodObject[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    for (const element of requestObjects) {
      try {
        await element.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
        });
        console.log("parsing")
        next()
      } catch (error) {
        console.log(error);
        if ((error as Error).name === "ZodError") {
          let stack = (error as ZodError).errors.map((err) => err.message);
          let zodErr: Error = {
            name: (error as Error).name,
            message: "Validation Error",
            stack: stack.toString(),
          };
          next(
            new CustomError("Request validation error", 400, zodErr as Error)
          );
        }
      }
    }
  };
}
