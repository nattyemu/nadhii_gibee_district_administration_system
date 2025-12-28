// drizzle/migrate.js
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";
import mysql from "mysql2/promise";
import * as schema from "../db/schema.js"; // Adjust path if needed
import "dotenv/config";

const runMigration = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
  });

  const db = drizzle(connection, { schema, mode: "default" });

  console.log("Running migrations...");
  // This reads the SQL files from your 'drizzle/migrations' folder
  await migrate(db, { migrationsFolder: "./drizzle/migrations" });
  console.log("Migrations completed!");

  await connection.end();
};

runMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
