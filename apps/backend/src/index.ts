import express from "express";
import cors from "cors";
import session from "express-session";
import axios from "axios";
import {
  COOKIE_SECRET,
  FB_BASE_URL,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
  FB_REDIRECT_URI,
  FB_TOKEN_URL,
  PORT,
} from "./config/app.config";
import RedisStore from "connect-redis";
import { CheckCacheConnection, redisClient } from "./config/cache.config";
import { CheckDBConnection } from "./config/db.config";
import { debug } from "console";

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: COOKIE_SECRET,
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.get("/", async (req, res, next) => {
  console.log(req.session);
  console.log(req.session.id);
  console.log(req.session.cookie);
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (err) {
      console.log(err);
      console.log("error");
    } else {
      console.log("got sesh" , session?.cookie);
    }
  });
  console.log("id" , req.sessionID);
});
app.get("/fb", async (req, res) => {
  console.log(req.query);
  try {
    const authResult = await axios.get(FB_TOKEN_URL, {
      params: {
        client_id: FB_CLIENT_ID,
        redirect_uri: FB_REDIRECT_URI,
        client_secret: FB_CLIENT_SECRET,
        code: req.query.code,
      },
    });
    console.log(authResult.data);
    res.send(authResult.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
app.get("/getFbProfile/:token", async (req, res) => {
  try {
    const result = await axios.get(FB_BASE_URL + "debug_token", {
      params: {
        input_token: req.params.token,
        access_token: `${FB_CLIENT_ID}|${FB_CLIENT_SECRET}`,
      },
    });
    res.json(result.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

Promise.all([CheckDBConnection(), CheckCacheConnection()])
  .then(async (data) => {
    console.log(data);
    console.log(await redisClient.get("name"));
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit();
  });
