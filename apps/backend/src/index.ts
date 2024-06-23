import express from "express";
import cors from "cors";
import { PORT } from "./config/app.config";
import { CheckDBConnection } from "./db";
import cookieParser from 'cookie-parser'
import { AuthRouter } from "./api/auth/auth.routes";
import { HandleError } from "./middleware/HandleError";
import { Authenticate } from "./middleware/AuthMiddleware";
import { MetaGraphRouter } from "./api/meta_graph/meta.routes";
import { SaveMetaToken } from "./api/meta_graph/meta.controlller";
let app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", AuthRouter)
app.use("/metaGraph" , Authenticate , MetaGraphRouter)

app.get("/metaGraphAuthRedirect" , SaveMetaToken)
app.get("/healthCheck" , (req , res) => res.json({status : "up"}))

app.use(HandleError);

Promise.all([CheckDBConnection()])
  .then(async (data) => {
    console.log(data);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit();
  });
