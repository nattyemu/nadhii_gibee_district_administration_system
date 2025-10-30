import React, { useState, useEffect } from "react";
import {
  Users,
  Newspaper,
  Building2,
  MapPin,
  Shield,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import dashboardService from "../../Service/dashboardService";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    administrators: 0,
    news: 0,
    kebeles: 0,
    sectors: 0,
    cabinets: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const navigate = useNavigate();

  // Fetch dashboard data
  const fetchDashboardData = async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await dashboardService.getDashboardStats();

      if (response.success) {
        setStats(response.data.stats);
        setRecentActivities(response.data.recentActivities || []);
      } else {
        // console.error("Failed to fetch dashboard data:", response.message);
        setRecentActivities([]);
      }
    } catch (error) {
      // console.error("Error fetching dashboard data:", error);
      setRecentActivities([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: "Administrators",
      value: stats.administrators,
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-200",
      gradient: "from-green-50 to-green-100",
    },
    {
      title: "News Articles",
      value: stats.news,
      icon: Newspaper,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-200",
      gradient: "from-blue-50 to-blue-100",
    },
    {
      title: "Kebeles",
      value: stats.kebeles,
      icon: MapPin,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      borderColor: "border-purple-200",
      gradient: "from-purple-50 to-purple-100",
    },
    {
      title: "Sectors",
      value: stats.sectors,
      icon: Building2,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-200",
      gradient: "from-orange-50 to-orange-100",
    },
    {
      title: "Cabinets",
      value: stats.cabinets,
      icon: Users,
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-200",
      gradient: "from-red-50 to-red-100",
    },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">
            Welcome to Admin Dashboard
          </h1>
          <p className="text-blue-100 text-lg">Loading dashboard data...</p>
        </div>
        <div className="flex justify-center items-center py-12">
          <RefreshCw className="animate-spin h-8 w-8 text-[#21203C]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-2xl p-8 text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome to Admin Dashboard
            </h1>
            <p className="text-blue-100 text-lg">
              Manage your content and monitor platform activity
            </p>
          </div>
          <button
            onClick={() => fetchDashboardData(true)}
            disabled={refreshing}
            className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-lg transition-all duration-300 disabled:opacity-50 hover:scale-105"
          >
            <RefreshCw
              className={`h-5 w-5 ${refreshing ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Stats Grid - Beautiful Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={28} className={stat.color} />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <div className="flex items-center justify-end mt-1 text-sm text-green-600">
                    <TrendingUp size={14} className="mr-1" />
                    <span>Active</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {stat.title}
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${stat.bgColor} transition-all duration-1000`}
                  style={{
                    width: `${Math.min(
                      (stat.value /
                        Math.max(...statCards.map((s) => s.value))) *
                        100 || 0,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardHome;
