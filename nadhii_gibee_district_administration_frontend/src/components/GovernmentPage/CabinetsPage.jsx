import React, { useState, useEffect } from "react";
import {
  Users,
  Building2,
  Award,
  Mail,
  Phone,
  MapPin,
  Search,
  BarChart3,
  HeartPulse,
  GraduationCap,
  Sprout,
  Landmark,
  Banknote,
  Shield,
  ArrowRight,
  Download,
  Calendar,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import cabineService from "../../Service/cabinesService";
import backgroundImage from "../../assets/cabines_hero.jpg";

const CabinetsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cabinets, setCabinets] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconComponents = {
    Shield,
    HeartPulse,
    GraduationCap,
    Sprout,
    Banknote,
    Building2,
    Users,
    Award,
  };

  const colorSchemes = [
    "bg-[#21203C]",
    "bg-[#2D2B4A]",
    "bg-[#21203C]",
    "bg-[#2D2B4A]",
    "bg-[#21203C]",
    "bg-[#2D2B4A]",
  ];

  const getIconForCabine = (title) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes("executive") || titleLower.includes("office"))
      return "Shield";
    if (titleLower.includes("health") || titleLower.includes("medical"))
      return "HeartPulse";
    if (titleLower.includes("education") || titleLower.includes("school"))
      return "GraduationCap";
    if (titleLower.includes("agriculture") || titleLower.includes("farm"))
      return "Sprout";
    if (titleLower.includes("finance") || titleLower.includes("economy"))
      return "Banknote";
    if (
      titleLower.includes("infrastructure") ||
      titleLower.includes("development")
    )
      return "Building2";
    if (titleLower.includes("community") || titleLower.includes("social"))
      return "Users";
    return "Award";
  };

  const getRandomColor = () => {
    return colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
  };

  useEffect(() => {
    fetchCabinets();
  }, []);

  const fetchCabinets = async () => {
    try {
      setLoading(true);
      const response = await cabineService.getCabinets();
      if (response.success) {
        const cabinetsWithDefaults = response.data.map((cabinet) => ({
          ...cabinet,
          color: cabinet.color || getRandomColor(),
          icon: cabinet.icon || getIconForCabine(cabinet.title),
        }));
        setCabinets(cabinetsWithDefaults);
      } else {
        // console.error("Failed to fetch cabinets:", response.message);
        setCabinets([]);
      }
    } catch (error) {
      // console.error("Error fetching cabinets:", error);
      toast.error("Failed to load cabinets. Please check your connection.");
      setCabinets([]);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/300/200";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  const getIconComponent = (iconName) => {
    return iconComponents[iconName] || Shield;
  };

  const handleCall = (phone) => {
    if (phone) window.open(`tel:${phone}`, "_self");
  };

  const handleMessage = (cabinet) => {
    if (cabinet.email) window.open(`mailto:${cabinet.email}`, "_self");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading cabinets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
        <div className="container  px-4 relative z-10 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Government Cabinets
          </h1>
          <p className="text-xl text-[#E5E4FF] mb-8">
            Meet the dedicated teams leading various sectors of Nadhii Gibee
            District Administration
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-[#21203C]/80 rounded-full">
            <Users size={20} className="mr-2" />
            Collaborative Leadership for Development
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 text-gray-900 bg-[#F5F4FF]">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#21203C]"
              size={20}
            />
            <input
              type="text"
              placeholder="Search cabinet names or titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] bg-white text-lg"
            />
          </div>
        </div>
      </section>

      {/* Cabinet Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cabinets
            .filter(
              (cabinet) =>
                cabinet.title
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                cabinet.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((cabinet) => (
              <div
                key={cabinet.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative group"
              >
                {/* Cabinet Image */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={getImageUrl(cabinet.image)}
                    alt={cabinet.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-b-[100px]"
                  />

                  {/* Position Badge */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg mb-2 inline-block">
                      <span className="text-sm font-bold text-[#21203C] whitespace-nowrap">
                        {cabinet.position}
                      </span>
                    </div>
                    {/* Title below position */}
                    <h3 className="text-lg font-semibold text-yellow-500 drop-shadow-md">
                      {cabinet.title}
                    </h3>
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${cabinet.color} text-white shadow-lg`}
                    >
                      {React.createElement(getIconComponent(cabinet.icon), {
                        size: 24,
                      })}
                    </div>
                  </div>
                </div>

                {/* Cabinet Info */}
                <div className="p-6 text-center">
                  <div className="space-y-4 mb-6 text-left">
                    {cabinet.email && (
                      <div className="flex items-start">
                        <Mail
                          size={20}
                          className="text-[#21203C] mr-3 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-base font-medium block">
                          {cabinet.email}
                        </span>
                      </div>
                    )}
                    {cabinet.phone && (
                      <div className="flex items-start">
                        <Phone
                          size={20}
                          className="text-[#21203C] mr-3 mt-1 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-base font-medium block">
                          {cabinet.phone}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center space-x-3">
                    {cabinet.phone && (
                      <button
                        onClick={() => handleCall(cabinet.phone)}
                        className="w-full bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                      >
                        <Phone size={18} />
                        <span>Contact</span>
                      </button>
                    )}
                    {cabinet.email && (
                      <button
                        onClick={() => handleMessage(cabinet)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-medium py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center"
                      >
                        <MessageCircle size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default CabinetsPage;
