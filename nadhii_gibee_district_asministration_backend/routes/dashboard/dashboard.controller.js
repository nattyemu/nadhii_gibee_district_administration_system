// controllers/dashboardController.js
import { db, schema } from "../../config/db.js";
import { sql } from "drizzle-orm";

export const getDashboardStats = async (req, res) => {
  try {
    // Get counts from all tables in parallel
    const [
      administratorsResult,
      newsResult,
      kebelesResult,
      sectorsResult,
      cabinetsResult,
    ] = await Promise.all([
      db.select({ count: sql`COUNT(*)` }).from(schema.administrators),
      db.select({ count: sql`COUNT(*)` }).from(schema.newsArticles),
      db.select({ count: sql`COUNT(*)` }).from(schema.kebeles),
      db.select({ count: sql`COUNT(*)` }).from(schema.sectors),
      db.select({ count: sql`COUNT(*)` }).from(schema.cabines),
    ]);

    // Extract counts from results
    const administratorsCount = Number(administratorsResult[0]?.count || 0);
    const newsCount = Number(newsResult[0]?.count || 0);
    const kebelesCount = Number(kebelesResult[0]?.count || 0);
    const sectorsCount = Number(sectorsResult[0]?.count || 0);
    const cabinetsCount = Number(cabinetsResult[0]?.count || 0);

    res.json({
      success: true,
      data: {
        stats: {
          administrators: administratorsCount,
          news: newsCount,
          kebeles: kebelesCount,
          sectors: sectorsCount,
          cabinets: cabinetsCount,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};
