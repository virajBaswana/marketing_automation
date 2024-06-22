import { Pool } from "pg";

export const DbPool = new Pool({
  host: "127.0.0.1",
  port: 5431,
  user: "postgres",
  password: "postgres",
  database: "marketing_automation",
  // database: "postgres",
});

