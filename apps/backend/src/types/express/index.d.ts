export {}
import { Request } from "express"
declare module 'express-serve-static-core' {
  interface Request {
    context: {
      user_id : string | null
    }
  }
}