// services/dashboardService.js
import axios from "../Utilities/Axios";

const dashboardService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    try {
      const response = await axios.get("/dashboard/stats");
      return response.data;
    } catch (error) {
      // console.error("Error fetching dashboard stats:", error);
      return (
        error.response?.data || {
          success: false,
          message: "Failed to fetch dashboard statistics",
          data: null,
        }
      );
    }
  },
};

export default dashboardService;
