export {}
import * as jwt from 'jsonwebtoken'
declare module "jsonwebtoken" {
    interface JwtPayload {
        user_id : string
    }
}