// config/db.js
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../db/schema.js";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const db = drizzle(pool, { schema, mode: "default" });

export async function connectDB() {
  try {
    await pool.getConnection();
    console.log("✅ MySQL connected via Drizzle ORM");
    return db;
  } catch (error) {
    console.error("❌ MySQL connection error:", error);
    process.exit(1);
  }
}

export { schema };
