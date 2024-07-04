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
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DbPool } from "./config/db.config";
let app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/auth", AuthRouter)
app.use("/metaGraph" , Authenticate , MetaGraphRouter)

app.get("/meta/webhook" , (req : any, res) => {
  if(req.query["hub.verify_token"] === "token_for_verification"){
    return res.send(req.query["hub.challenge"]).status(200)
    
    }
  return res.send("not cool").status(500)
})

app.post("/meta/webhook" , (req , res) => {
  console.log(req.body)
  // console.log("req" , req)
  // save body in db
  // match against key word
  // send dm
  res.send("thanks")
})

app.get("/metaGraphAuthRedirect" , SaveMetaToken)
app.get("/healthCheck" , (req , res) => res.json({status : "up"}))
app.get("/" , (req , res) => {
  console.log("check")
  res.json({headers : res.getHeaders})
})
app.use(HandleError);

Promise.all([CheckDBConnection()])
  .then(async (data) => {
    console.log(data);
    await migrate(drizzle(DbPool), { migrationsFolder: './src/db/migrations' });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start the server:", error);
    process.exit();
  });
