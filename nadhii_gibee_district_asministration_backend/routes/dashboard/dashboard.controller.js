// controllers/dashboardController.js
import Administrator from "../../models/administrator.model.js";
import { NewsArticle } from "../../models/NewsArticle.model.js";
import { Kebele } from "../../models/kebele.model.js";
import { Sector } from "../../models/sector.model.js";
import { Cabine } from "../../models/Cabine.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Get counts from all collections in parallel
    const [
      administratorsCount,
      newsCount,
      kebelesCount,
      sectorsCount,
      cabinetsCount,
    ] = await Promise.all([
      Administrator.countDocuments(),
      NewsArticle.countDocuments(),
      Kebele.countDocuments(),
      Sector.countDocuments(),
      Cabine.countDocuments(),
    ]);

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
    // console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics",
      error: error.message,
    });
  }
};
