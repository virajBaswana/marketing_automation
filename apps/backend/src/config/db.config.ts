import { Pool } from "pg";

export const DB_HOST= process.env.DB_HOST || "db"
export const DB_USER= process.env.DB_USER || "postgres"
export const DB_PASSWORD= process.env.DB_PASSWORD || "postgres"
export const DB_NAME= process.env.DB_NAME || "marketing_automation"
export const DB_PORT= process.env.DB_PORT || "5432"
// export const DB_HOST = "db";
// export const DB_USER = "postgres";
// export const DB_PASSWORD = "postgres";
// export const DB_NAME = "postgres";
// export const DB_PORT = "5432";

export const DbPool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: parseInt(DB_PORT),
});
