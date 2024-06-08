import express from "express";
import cors from "cors";
import axios from "axios";
import {
  FB_BASE_URL,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
  FB_REDIRECT_URI,
  FB_TOKEN_URL,
} from "./config/app.config";
let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(3000, () => console.log("server up"));
