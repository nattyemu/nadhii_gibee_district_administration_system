import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  Newspaper,
  Building2,
  MapPin,
  Shield,
  LogOut,
  Menu,
  X,
  BarChart3,
  Settings,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import AdminNews from "./AdminNews";
import AdminAdministrator from "./AdminAdministrator";
import AdminKebeles from "./AdminKebeles";
import AdminSectors from "./AdminSectors";
import AdminCabinets from "./AdminCabinets";
import DashboardHome from "./DashboardHome";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  // Base menu items available to all authenticated users
  const baseMenuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "news", label: "News & Articles", icon: Newspaper },
    { id: "kebeles", label: "Kebeles", icon: MapPin },
    { id: "sectors", label: "Sectors", icon: Building2 },
    { id: "cabinets", label: "Cabinets", icon: Users },
  ];

  // Administrator menu item - only for admin users
  const adminMenuItem = {
    id: "administrator",
    label: "Administrator",
    icon: Shield,
    adminOnly: true,
  };

  // Combine menu items based on user role
  const getMenuItems = () => {
    if (user?.role === "admin") {
      // Insert administrator item after dashboard for admin users
      return [
        baseMenuItems[0], // dashboard
        adminMenuItem, // administrator
        ...baseMenuItems.slice(1), // rest of the items
      ];
    }
    return baseMenuItems;
  };

  const menuItems = getMenuItems();

  const renderContent = () => {
    // Check if user is trying to access admin-only section without permission
    if (activeSection === "administrator" && user?.role !== "admin") {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Access Denied</h3>
            <p className="text-gray-500 mt-2">
              You don't have permission to access the Administrator section.
            </p>
            <button
              onClick={() => setActiveSection("dashboard")}
              className="mt-4 px-4 py-2 bg-[#21203C] text-white rounded-lg hover:bg-[#2D2B4A] transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      );
    }

    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "administrator":
        return user?.role === "admin" ? <AdminAdministrator /> : null;
      case "news":
        return <AdminNews />;
      case "kebeles":
        return <AdminKebeles />;
      case "sectors":
        return <AdminSectors />;
      case "cabinets":
        return <AdminCabinets />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#21203C] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 bg-[#2D2B4A]">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-4 py-3 mb-2 rounded-lg transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-[#2D2B4A] text-white shadow-lg"
                    : "text-gray-300 hover:bg-[#2D2B4A] hover:text-white"
                } ${item.adminOnly && user?.role !== "admin" ? "hidden" : ""}`}
              >
                <Icon size={20} className="mr-3" />
                <span className="font-medium">{item.label}</span>
                {item.adminOnly && (
                  <span className="ml-auto text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2D2B4A]">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-[#2D2B4A] rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div className="ml-3">
              <p className="text-white text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-gray-400 text-xs capitalize">{user?.role}</p>
              {user?.role === "admin" && (
                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full mt-1 inline-block">
                  Administrator
                </span>
              )}
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center px-4 py-2 text-gray-300 hover:text-white hover:bg-[#2D2B4A] rounded-lg transition-colors duration-200"
          >
            <LogOut size={16} className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600"
            >
              <Menu size={24} />
            </button>

            <div className="flex-1 lg:flex-none">
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.find((item) => item.id === activeSection)?.label ||
                  "Dashboard"}
                {activeSection === "administrator" &&
                  user?.role === "admin" && (
                    <span className="ml-2 text-sm bg-red-500 text-white px-2 py-1 rounded-full">
                      Admin Only
                    </span>
                  )}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  Welcome, {user?.firstName}
                </p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                {user?.role === "admin" && (
                  <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    Administrator
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{renderContent()}</main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
