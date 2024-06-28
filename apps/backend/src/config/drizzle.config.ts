import { defineConfig } from "drizzle-kit";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./db.config";
export default defineConfig({
  schema: ["./src/api/**/*.schema.ts", "./src/db/migrations/schema.ts"],
  out : "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    // host: DB_HOST,
    // user: DB_USER,
    // password: DB_PASSWORD,
    // database: DB_NAME,
    // port: parseInt(DB_PORT),
    ssl: false
  },
  verbose: true,
  strict: true,
});
