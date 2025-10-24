import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Play,
  Newspaper,
  Megaphone,
  CalendarDays,
  Video,
} from "lucide-react";
import NewsService from "../../Service/newsArticle.js";
import { Link } from "react-router-dom";

const NewsSection = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const tabs = [
    { id: "all", label: "All Updates", icon: Newspaper },
    { id: "news", label: "News", icon: Megaphone },
    { id: "event", label: "Events", icon: CalendarDays },
    // { id: "video", label: "Videos", icon: Video },
  ];

  // Handle image errors
  const handleImageError = (itemId, imageType = "regular") => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  // Image extraction function
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/300/200";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  // Fetch news data from backend
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await NewsService.getUpdatedNewsArticles();

        if (response.success) {
          // Transform backend data to match frontend structure
          const transformedData = response.data.map((item) => ({
            id: item.id,
            type: item.type,
            title: item.title,
            excerpt: item.excerpt,
            date: item.date,
            image: getImageUrl(item.image),
            category: item.category,
            featured: item.featured,
            urgent: item.urgent,
            location: item.location,
          }));

          setNewsItems(transformedData);
        } else {
          setError(response.message || "Failed to fetch news");
        }
      } catch (err) {
        setError("Error connecting to server");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredItems =
    activeTab === "all"
      ? newsItems
      : newsItems.filter((item) => item.type === activeTab);

  // ✅ limit to 4 items unless showAll = true
  const displayedItems =
    showAll || filteredItems.length <= 4
      ? filteredItems
      : filteredItems.slice(0, 4);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "news":
        return Megaphone;
      case "announcement":
        return Megaphone;
      case "event":
        return Calendar;
      case "video":
        return Play;
      default:
        return Newspaper;
    }
  };

  // Get featured item for the featured section
  const featuredItem = newsItems.find((item) => item.featured) || newsItems[0];

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-[#bdb6eb] px-4 py-2 text-sm font-medium text-[#21203C] mb-4">
              <Newspaper className="mr-2" size={16} />
              Latest Updates
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              News & <span className="text-[#21203C]">Announcements</span>
            </h2>
            <p className="text-lg text-gray-600">Loading latest updates...</p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-b from-white to-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-800 mb-4">
              <Newspaper className="mr-2" size={16} />
              Error
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Unable to Load Updates
            </h2>
            <p className="text-lg text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-[#F5F4FF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#F5F4FF] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-100 rounded-full -translate-x-1/2 translate-y-1/2 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center rounded-full bg-[#b9b4f1] px-4 py-2 text-sm font-medium text-[#21203C] mb-4">
            <Newspaper className="mr-2" size={16} />
            Latest Updates
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & <span className="text-[#21203C]">Announcements</span>
          </h2>
          <p className="text-lg text-gray-600">
            Stay informed about the latest developments, events, and initiatives
            from Nadhii Gibee District Administration.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#21203C] text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-[#F5F4FF] shadow-md"
                }`}
              >
                <Icon size={18} className="mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Featured News */}
        {activeTab === "all" && featuredItem && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#F5F4FF]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredItem.image}
                    alt={featuredItem.title}
                    className="w-full h-full object-cover"
                    onError={() =>
                      handleImageError(featuredItem.id, "featured")
                    }
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#21203C] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-1" />
                    {formatDate(featuredItem.date)}
                    <span className="mx-2">•</span>
                    <span className="bg-[#F5F4FF] text-[#21203C] px-2 py-1 rounded-full text-xs">
                      {featuredItem.category}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredItem.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{featuredItem.excerpt}</p>
                  <button className="inline-flex items-center text-[#21203C] font-medium group">
                    Read Full Story
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {displayedItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems
              .filter((item) =>
                activeTab === "all" ? item.id !== featuredItem?.id : true
              )
              .map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => handleImageError(item.id)}
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4 flex items-center">
                        <div className="bg-[#21203C] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <TypeIcon size={12} className="mr-1" />
                          {item.type.toUpperCase()}
                        </div>
                        {item.urgent && (
                          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium ml-2">
                            URGENT
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(item.date)}
                        {item.location && (
                          <>
                            <span className="mx-2">•</span>
                            <MapPin size={14} className="mr-1" />
                            {item.location}
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {item.excerpt}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="bg-[#F5F4FF] text-[#21203C] px-2 py-1 rounded-full text-xs">
                          {item.category}
                        </span>
                        <Link
                          to="/news"
                          className="text-[#21203C] text-sm font-medium flex items-center group-hover:underline"
                        >
                          Read More
                          <ArrowRight size={14} className="ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No {activeTab === "all" ? "" : activeTab} updates found.
            </p>
          </div>
        )}

        {/* CTA updated to toggle showAll */}
        {newsItems.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-8 rounded-full inline-flex items-center transition-all duration-300 transform hover:-translate-y-1"
            >
              {showAll ? "Show Less" : "View All Updates"}
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-20 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-2xl mx-4 p-8 md:p-12 text-center text-white shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated with Nadhii Gibee District Administration
          </h3>
          <p className="text-[#E5E4FF] mb-6">
            Subscribe to our newsletter to receive important announcements,
            news, and event invitations directly in your inbox.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-[#E5E4FF] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-full transition-colors duration-300">
              Subscribe Now
            </button>
          </div>
          <p className="text-[#E5E4FF] text-sm mt-4">
            We respect your privacy and will never share your information.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
