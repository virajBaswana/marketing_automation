import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: ["./src/api/**/*.schema.ts", "./src/migrations/schema.ts"],
  out : "./src/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "postgres",
    ssl: false
  },
  verbose: true,
  strict: true,
});
