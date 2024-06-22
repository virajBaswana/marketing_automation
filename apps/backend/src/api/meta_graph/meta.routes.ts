import express from "express";
import {Request , Response , NextFunction} from "express";
import {  GetMetaPagesAuth, GetMetaUthUrl } from "./meta.controlller";
import { ValidateRequest } from "../../middleware/Validate";
import { TokensForCode } from "./meta.validator";

export const MetaGraphRouter = express.Router()

MetaGraphRouter.get("/authUrl" , GetMetaUthUrl)
MetaGraphRouter.get("/authPages" , GetMetaPagesAuth)
// MetaGraphRouter.get("/tokens" ,ValidateRequest(TokensForCode), GetMetaTokens)
