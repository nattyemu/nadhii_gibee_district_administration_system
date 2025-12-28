// drizzle.config.js
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.js",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  },
});
