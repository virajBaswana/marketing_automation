import { NextFunction, Request, Response } from "express";
import {
  META_AUTH_URL,
  META_BASE_URL,
  META_CLIENT_ID,
  META_CLIENT_SECRET,
  META_CONFIG_ID,
  META_REDIRECT_URL,
  META_TOKEN_URL,
} from "../../config/app.config";
import { CustomError, JsonSuccessResponse } from "../../types/global.types";
import { SuccessJSONResponse } from "../../helper/index.helper";
import { DB } from "../../db";
import { MetaPageTable, MetaUserTable } from "./meta.schema";
import axios from "axios";
import { eq } from "drizzle-orm";

export const GetMetaUthUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = req.context?.user_id as string;
    const params = new URLSearchParams({
      client_id: META_CLIENT_ID,
      redirect_uri: META_REDIRECT_URL,
      config_id: META_CONFIG_ID,
      state: user,
    });
    const authUrl = META_AUTH_URL + "?" + params;
    console.log(authUrl);
    let resp: JsonSuccessResponse = SuccessJSONResponse(
      "Auth Url for Meta Login",
      200,
      [{ authUrl }]
    );
    return res.status(resp.status).json(resp);
  } catch (error) {}
};
export const SaveMetaToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.query);

    const params = new URLSearchParams({
      client_id: META_CLIENT_ID,
      redirect_uri: META_REDIRECT_URL,
      client_secret: META_CLIENT_SECRET,
      code: req.query.code as string,
    });
    const tokenUrl = META_TOKEN_URL + "?" + params;
    console.log(tokenUrl);
    const token = await axios.get(tokenUrl);
    console.log("token    sadfgas", token.data);
    const metaToken = await DB.insert(MetaUserTable)
      .values({
        user_id: parseInt(req.query.state as string),
        user_token: token.data["access_token"],
      })
      .returning();
    let resp: JsonSuccessResponse = SuccessJSONResponse(
      "meta login successful",
      201,
      [{ ...metaToken }]
    );
    return res.status(resp.status).json(resp);
  } catch (error) {
    next(new CustomError("Could not save tokens", 500, error as Error));
  }
};
export const GetMetaPagesAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let url = META_BASE_URL + "/v20.0";

    const userToken = await DB.select()
      .from(MetaUserTable)
      .where(
        eq(MetaUserTable.user_id, parseInt(req.context.user_id as string))
      );
    let token = userToken[0].user_token;

    const meta = await axios.get(url + "/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("meta", meta.data);
    const pages = await axios.get(url + "/me/accounts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("pages", pages.data);
    let pageDetails = pages.data.data.map((page: any) => {
      return {
        user_id: parseInt(req.context.user_id as string),
        page_token: page.access_token,
        page_id: page.id,
        insta_id: "",
        meta_id: meta.data.id,
      };
    });

    let pagesAndInsta = await Promise.all(
      pageDetails.map(async (pageAndInsta: any) => {
        console.log(pageAndInsta);
        const insta = await axios.get(url + `/${pageAndInsta.page_id}`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { fields: "instagram_business_account" },
        });
        console.log("Qsfsads", insta.data);
        if (insta.data.instagram_business_account != null) {
          pageAndInsta.insta_id = insta.data.instagram_business_account.id;
        }
        return pageAndInsta;
      })
    );

    console.log("pagesAndInsta", pagesAndInsta);

    const savePagesAndInsta = await DB.insert(MetaPageTable)
      .values(pagesAndInsta)
      .returning();

    let resp: JsonSuccessResponse = SuccessJSONResponse(
      "pages, page tokens and insta ids collected",
      201,
      [...savePagesAndInsta]
    );
    return res.status(resp.status).json(resp);
  } catch (error) {
    next(new CustomError("Could not save tokens", 500, error as Error));
  }
};
export const SubscribeToWebhooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let url = META_BASE_URL + "/v20.0/";

    const pageToken = await DB.select()
      .from(MetaPageTable)
      .where(
        eq(MetaPageTable.user_id, parseInt(req.context.user_id as string))
      );
    let token = pageToken[0].page_token;
    let page_id = pageToken[0].page_id;

    const meta = await axios.post(
      url + `${page_id}/subscribed_apps`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { subscribed_fields: "feed,messages" },
      }
    );
    console.log("meta", meta.data);

    let resp: JsonSuccessResponse = SuccessJSONResponse(
      "pages, page tokens and insta ids collected",
      201,
      [meta.data]
    );
    return res.status(resp.status).json(resp);
  } catch (error) {
    console.log(error);
    next(new CustomError("Could not save tokens", 500, error as Error));
  }
};
export const CheckInstaMessenger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let url = META_BASE_URL + "/v20.0/";

    const pageToken = await DB.select()
      .from(MetaPageTable)
      .where(
        eq(MetaPageTable.user_id, parseInt(req.context.user_id as string))
      );
    let token = pageToken[0].page_token;
    let page_id = pageToken[0].page_id;

    const meta = await axios.get(url + `${page_id}/conversations`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { platform: "instagram" },
    });
    console.log("meta", meta.data);

    let resp: JsonSuccessResponse = SuccessJSONResponse(
      "insta messenger status validated",
      200,
      [meta.data]
    );
    return res.status(resp.status).json(resp);
  } catch (error) {
    console.log(error);
    next(new CustomError("Could not save tokens", 500, error as Error));
  }
};
export const SendInstaMessagge = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let url = META_BASE_URL + "/v20.0/";

    const recipientId = req.params.recipient_id;

    const pageToken = await DB.select()
      .from(MetaPageTable)
      .where(
        eq(MetaPageTable.user_id, parseInt(req.context.user_id as string))
      );
    let token = pageToken[0].page_token;
    let page_id = pageToken[0].page_id;

    const meta = await axios.post(
      url + `${page_id}/me/messages`,
      {
        recipient: {
          id: recipientId,
        },
        message: {
          attachment: {
            type: "template",
            payload: {
              template_type: "generic",
              elements: [
                {
                  title: "Welcome!",
                  image_url:
                    "https://github.com/fbsamples/original-coast-clothing/blob/main/public/looks/male-work.jpg",
                  subtitle: "We have the right hat for everyone.",
                  default_action: {
                    type: "web_url",
                    url: "https://www.originalcoastclothing.com",
                  },
                  buttons: [
                    {
                      type: "web_url",
                      url: "https://www.originalcoastclothing.com",
                      title: "View Website",
                    },
                    {
                      type: "postback",
                      title: "Start Chatting",
                      payload: "DEVELOPER_DEFINED_PAYLOAD",
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        // params: { platform: "instagram" },
      }
    );
    console.log("meta", meta.data);

    let resp: JsonSuccessResponse = SuccessJSONResponse(
      "insta messenger status validated",
      200,
      [meta.data]
    );
    return res.status(resp.status).json(resp);
  } catch (error) {
    console.log(error);
    next(new CustomError("Could not save tokens", 500, error as Error));
  }
};
