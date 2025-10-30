// Updated NewsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Tag,
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  Video,
  Megaphone,
  CalendarDays,
  ChevronDown,
  Share2,
  Heart,
  Bookmark,
  Play,
  Building2,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import newsService from "../../Service/newsArticle.js";
import backgroundImage from "../../assets/news_hero.jpg";
const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and Pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of articles per page

  const categories = [
    { id: "all", label: "All News", icon: BookOpen },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "development", label: "Development", icon: Building2 },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await newsService.getNewsArticles();
      // console.log("API Response:", response);
      if (response.success) {
        setNewsArticles(response.data);
        // console.log("Total articles:", response.data.length);
        // console.log(
        //   "Featured articles:",
        //   response.data.filter((article) => article.featured).length
        // );
      } else {
        // console.error("Failed to fetch news:", response.message);
        setNewsArticles([]);
      }
    } catch (error) {
      // console.error("Error fetching news:", error);
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Search implementation
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter articles based on active category and search term
  const filteredArticles = newsArticles.filter((article) => {
    // Category filter
    const categoryMatch =
      activeCategory === "all" ||
      (() => {
        const categoryMap = {
          Infrastructure: "development",
          Agriculture: "development",
          Announcement: "announcements",
          Culture: "events",
          Community: "events",
          Development: "development",
        };
        return categoryMap[article.category] === activeCategory;
      })();

    // Search filter
    const searchMatch =
      searchTerm === "" ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.category.toLowerCase().includes(searchTerm.toLowerCase());

    return categoryMatch && searchMatch;
  });

  // Pagination implementation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get featured article for the featured section
  const featuredArticle = newsArticles.find((article) => article.featured);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const toggleExpandArticle = (id) => {
    if (expandedArticle === id) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(id);
    }
  };

  // Handle image URLs from API
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };
  const currentYear = new Date().getFullYear();
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages are less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        // In the middle
        pageNumbers.push(1);
        pageNumbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
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
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Updates
            </h1>
            <p className="text-xl text-[#b0aef3] mb-8">
              Stay informed about the latest developments, events, and
              initiatives from Nadhii Gibee District Administration
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search news and updates..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-3 px-5 text-white placeholder-[#21203C]/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <Search className="absolute right-3 top-3 text-white" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && !searchTerm && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#21203C]/20">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={getImageUrl(featuredArticle.image)}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#21203C] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-1" />
                    {formatDate(featuredArticle.date)}
                    <span className="mx-2">•</span>
                    <span className="bg-[#21203C]/10 text-[#21203C] px-2 py-1 rounded-full text-xs">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {featuredArticle.author}
                      </span>
                    </div>
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
          </div>
        </section>
      )}

      {/* Controls */}
      <section className="py-8 bg-[#21203C]/20 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setCurrentPage(1); // Reset to first page when category changes
                    }}
                    className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-[#21203C] text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-[#21203C]/5"
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === "grid"
                      ? "bg-[#21203C] text-white"
                      : "text-gray-700"
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === "list"
                      ? "bg-[#21203C] text-white"
                      : "text-gray-700"
                  }`}
                >
                  List View
                </button>
              </div>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search Results Info */}
          {searchTerm && (
            <div className="mb-6 text-center">
              <p className="text-gray-600">
                Found {filteredArticles.length} result
                {filteredArticles.length !== 1 ? "s" : ""} for "{searchTerm}"
                {activeCategory !== "all" &&
                  ` in ${
                    categories.find((cat) => cat.id === activeCategory)?.label
                  }`}
              </p>
              {(searchTerm || activeCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                    setCurrentPage(1);
                  }}
                  className="mt-2 text-[#21203C] hover:text-[#2D2B4A] font-medium"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}

          {currentArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {searchTerm || activeCategory !== "all"
                  ? "No news articles found matching your criteria."
                  : "No news articles found."}
              </p>
              {(searchTerm || activeCategory !== "all") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setActiveCategory("all");
                    setCurrentPage(1);
                  }}
                  className="mt-4 bg-[#21203C] text-white px-4 py-2 rounded-lg hover:bg-[#2D2B4A] transition-colors duration-300"
                >
                  Show all news
                </button>
              )}
            </div>
          ) : (
            <div
              className={`
                ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              `}
            >
              {currentArticles.map((article) => (
                <div
                  key={article.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                    viewMode === "list" && "flex"
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-1/3 h-48" : "h-48"
                    }`}
                  >
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex items-center">
                      <div className="bg-[#21203C] text-white px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </div>
                      {article.urgent && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium ml-2">
                          URGENT
                        </div>
                      )}
                    </div>
                  </div>

                  <div className={`p-5 ${viewMode === "list" && "w-2/3"}`}>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(article.date)}
                      {article.location && (
                        <>
                          <span className="mx-2">•</span>
                          <MapPin size={14} className="mr-1" />
                          {article.location}
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#21203C]/10 text-[#21203C] text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User size={14} className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {article.author}
                        </span>
                      </div>
                      {/* <div className="flex items-center space-x-3">
                        <button className="text-gray-500 hover:text-[#21203C]">
                          <Heart size={16} />
                          <span className="text-xs ml-1">
                            {article.likes || 0}
                          </span>
                        </button>
                        <button className="text-gray-500 hover:text-[#21203C]">
                          <Share2 size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-[#21203C]">
                          <Bookmark size={16} />
                        </button>
                      </div> */}
                    </div>

                    {expandedArticle === article.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 mb-4">{article.content}</p>
                        <div className="flex justify-between items-center">
                          {/* Additional content can go here */}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => toggleExpandArticle(article.id)}
                      className="w-full mt-4 text-center text-[#21203C] font-medium flex items-center justify-center"
                    >
                      {expandedArticle === article.id
                        ? "Show Less"
                        : "Read More"}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-300 ${
                          expandedArticle === article.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredArticles.length > itemsPerPage && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg border border-gray-200 flex items-center ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-[#21203C]/5"
                  }`}
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      typeof pageNumber === "number" &&
                      handlePageChange(pageNumber)
                    }
                    className={`p-2 rounded-lg min-w-[40px] ${
                      pageNumber === currentPage
                        ? "bg-[#21203C] text-white shadow-lg"
                        : pageNumber === "..."
                        ? "bg-white text-gray-500 cursor-default"
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-[#21203C]/5"
                    }`}
                    disabled={pageNumber === "..."}
                  >
                    {pageNumber}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg border border-gray-200 flex items-center ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-[#21203C]/5"
                  }`}
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          )}

          {/* Page Info */}
          {filteredArticles.length > 0 && (
            <div className="text-center mt-4 text-gray-600">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredArticles.length)} of{" "}
              {filteredArticles.length} articles
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-2xl mx-4 my-12 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Nadhii Gibee District
            </h2>
            <p className="text-[#b0aef3] mb-6">
              Subscribe to our newsletter to receive important announcements,
              news, and event invitations directly in your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-text-[#b0aef3] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-full transition-colors duration-300">
                Subscribe Now
              </button>
            </div>
            <p className="text-[#b0aef3] text-sm mt-4">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              News <span className="text-[#21203C]">Archive</span>
            </h2>
            <p className="text-lg text-gray-600">
              Browse through our historical news and announcements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5F4FF] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#21203C] mb-2">
                {currentYear}
              </div>
              <p className="text-gray-600">Current year news and updates</p>
            </div>
            <div className="bg-[#F5F4FF] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#21203C] mb-2">
                {currentYear - 1}
              </div>
              <p className="text-gray-600">Previous year archives</p>
            </div>
            <div className="bg-[#F5F4FF] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#21203C] mb-2">
                {currentYear - 2}
              </div>
              <p className="text-gray-600">
                Historical records and announcements
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
