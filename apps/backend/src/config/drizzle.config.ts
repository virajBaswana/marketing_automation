import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: ["./src/api/**/*.schema.ts", "./src/db/migrations/schema.ts"],
  out : "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: "127.0.0.1",
    port: 5431,
    database: "marketing_automation",
    user: "postgres",
    password: "postgres",
    ssl: false
  },
  verbose: true,
  strict: true,
});
