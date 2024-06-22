import express from 'express'
import { ValidateRequest } from '../../middleware/Validate'
import { AuthSignup } from './auth.validators'
import { UserLogin, UserSignup } from './auth.controller'

export const AuthRouter = express.Router()

AuthRouter.post("/signup" , ValidateRequest(AuthSignup) , UserSignup)
AuthRouter.post("/login" , ValidateRequest(AuthSignup) , UserLogin)