import express from "express";
import {Request , Response , NextFunction} from "express";
import {  CheckInstaMessenger, GetMetaPagesAuth, GetMetaUthUrl, SendInstaMessagge, SubscribeToWebhooks } from "./meta.controlller";
import { ValidateRequest } from "../../middleware/Validate";
import { TokensForCode } from "./meta.validator";

export const MetaGraphRouter = express.Router()

MetaGraphRouter.get("/authUrl" , GetMetaUthUrl)
MetaGraphRouter.get("/authPages" , GetMetaPagesAuth)
MetaGraphRouter.get("/subscribeWebhooks" , SubscribeToWebhooks)
MetaGraphRouter.get("/checkInstaMessenger" , CheckInstaMessenger)
MetaGraphRouter.post("/instaMessage" , SendInstaMessagge)
// MetaGraphRouter.get("/tokens" ,ValidateRequest(TokensForCode), GetMetaTokens)
