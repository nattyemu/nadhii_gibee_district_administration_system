import React, { useState } from "react";
import { Link } from "react-router-dom";

const NewsAndUpdates = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const newsItems = [
    {
      id: 1,
      title: "New Athletic Training Program Launched",
      excerpt:
        "We're excited to announce our new advanced athletic training program designed for elite athletes.",
      content:
        "Our new training program incorporates the latest sports science research and cutting-edge technology to help athletes reach their peak performance. The program includes personalized training regimens, nutrition planning, and mental conditioning techniques developed by our world-class coaching staff. Over 50 athletes have already enrolled in the program's pilot phase, showing remarkable improvements in their performance metrics.",
      date: "May 15, 2023",
      category: "training",
      readTime: "5 min read",
      author: "Coach Samuel Bekele",
      authorImage:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      featured: true,
      tags: ["Training", "Elite Athletes", "Program"],
    },
    {
      id: 2,
      title: "Institute Wins Regional Championship",
      excerpt:
        "Our athletes dominated the regional championships, bringing home 12 gold medals.",
      content:
        "The Derartu Tulu Sports Institute athletes showcased exceptional talent and determination at the recent Regional Championships, securing an impressive 12 gold medals across various disciplines. Our track and field team particularly stood out, breaking three championship records. This achievement reflects the dedication of our athletes and the effectiveness of our training methodologies.",
      date: "April 28, 2023",
      category: "achievements",
      readTime: "4 min read",
      author: "Sports Director",
      authorImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      featured: true,
      tags: ["Championship", "Gold Medals", "Achievement"],
    },
    {
      id: 3,
      title: "Summer Training Schedule Released",
      excerpt:
        "Check out our updated summer training schedule for all departments.",
      content:
        "We've released the comprehensive summer training schedule for all athletic departments. The schedule includes specialized sessions for different skill levels, from beginners to elite competitors. New this year are the early morning and late evening sessions to accommodate various schedules and avoid the midday heat.",
      date: "April 20, 2023",
      category: "announcements",
      readTime: "3 min read",
      author: "Training Coordinator",
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Schedule", "Summer", "Training"],
    },
    {
      id: 4,
      title: "New Research on Athletic Performance",
      excerpt:
        "Our research team published groundbreaking findings on optimizing athletic performance.",
      content:
        "Our sports science division has published a groundbreaking study on optimizing athletic performance through specialized nutrition and recovery techniques. The research, conducted over two years with 200 athletes, shows a 23% improvement in recovery times and a 15% increase in performance metrics among participants following the new protocols.",
      date: "April 12, 2023",
      category: "research",
      readTime: "7 min read",
      author: "Dr. Helen Teshome",
      authorImage:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1554475900-0e035f5c9ffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Research", "Performance", "Science"],
    },
    {
      id: 5,
      title: "Partnership with National Sports Association",
      excerpt:
        "We're proud to announce our new partnership with the National Sports Association.",
      content:
        "We've formed a strategic partnership with the National Sports Association to develop talent identification programs across the country. This collaboration will provide more opportunities for young athletes to access our facilities and training programs, with a focus on underrepresented regions.",
      date: "March 30, 2023",
      category: "partnerships",
      readTime: "4 min read",
      author: "Director of Partnerships",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1569511166189-34a7d6ea5cde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Partnership", "NSA", "Collaboration"],
    },
    {
      id: 6,
      title: "Athlete Spotlight: Meet Our Rising Star",
      excerpt:
        "Get to know the talented young athlete who's breaking records in track events.",
      content:
        "At just 18 years old, Alemitu Haile has already broken two national records in middle-distance running. Hailing from a small village in the Oromia region, Alemitu's journey to athletic excellence is an inspiring story of determination and talent. 'The Institute has provided me with everything I need to focus on my training,' says Alemitu, who is now preparing for international competitions.",
      date: "March 22, 2023",
      category: "athletes",
      readTime: "6 min read",
      author: "Sports Journalist",
      authorImage:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
      image:
        "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      tags: ["Athlete", "Spotlight", "Rising Star"],
    },
  ];

  const categories = [
    { id: "all", name: "All News", icon: "📰" },
    { id: "training", name: "Training", icon: "🏋️" },
    { id: "achievements", name: "Achievements", icon: "🏆" },
    { id: "announcements", name: "Announcements", icon: "📢" },
    { id: "research", name: "Research", icon: "🔬" },
    { id: "athletes", name: "Athletes", icon: "👤" },
    { id: "partnerships", name: "Partnerships", icon: "🤝" },
  ];

  const filteredNews =
    activeCategory === "all"
      ? newsItems
      : newsItems.filter((item) => item.category === activeCategory);

  const featuredNews = newsItems.filter((item) => item.featured);
  const recentNews = newsItems.filter((item) => !item.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="relative gradient-bg py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#21203C] to-transparent animate-pulse"></div>

        {/* Animated elements */}
        <div className="absolute top-10 left-1/4 w-16 h-16 bg-[#21203C] rounded-full opacity-10 animate-bounce"></div>
        <div
          className="absolute bottom-10 right-1/4 w-20 h-20 bg-[#21203C] rounded-full opacity-10 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <span className="text-[#E5E4FF] font-semibold uppercase tracking-wider text-sm mb-2 block">
            Latest Updates
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-2">
            News & Updates
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Stay informed with the latest happenings at Derartu Tulu Sports
            Institute
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-12 relative -mt-16 z-20">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21203C]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <select className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#21203C]">
              <option>Sort by: Newest</option>
              <option>Sort by: Most Popular</option>
              <option>Sort by: Category</option>
            </select>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-[#21203C] text-white shadow-lg"
                    : "bg-gray-100 text-[#21203C] hover:bg-[#F5F4FF]"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured News */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#21203C]">
              Featured Stories
            </h2>
            <div className="flex gap-2">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredNews.map((item) => (
              <div
                key={item.id}
                className="news-card featured bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#21203C] text-white text-xs uppercase font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent h-16"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-[#F5F4FF] text-[#21203C] px-2 py-1 rounded text-xs font-medium mr-3">
                      {item.category}
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#21203C] mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.authorImage}
                        alt={item.author}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <span className="text-sm text-gray-600">
                        {item.author}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {item.readTime}
                    </span>
                  </div>
                  <div className="mt-6">
                    <Link
                      to={`/article/${item.id}`}
                      className="inline-flex items-center bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-6 rounded-lg transition-colors"
                    >
                      Read Full Article
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All News Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#21203C] mb-8">
            Latest Updates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="news-card bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#21203C] text-white text-xs uppercase font-bold px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <span>{item.date}</span>
                    <span>{item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#21203C] mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.authorImage}
                        alt={item.author}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span className="text-xs text-gray-600">
                        {item.author}
                      </span>
                    </div>
                    <Link
                      to={`/article/${item.id}`}
                      className="text-[#21203C] text-xs font-semibold flex items-center group"
                    >
                      Read More
                      <svg
                        className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-[#21203C] rounded-2xl p-10 text-white mb-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#21203C] rounded-full opacity-20"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#21203C] rounded-full opacity-20"></div>

          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-[#E5E4FF] mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news, updates,
              and exclusive content directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg text-[#21203C] focus:outline-none focus:ring-2 focus:ring-[#21203C]"
              />
              <button className="bg-[#21203C] hover:bg-[#2D2B4A] px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Social Media Feed */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-[#21203C] mb-8 text-center">
            Follow Us on Social Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <svg
                  className="w-8 h-8 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12z" />
                </svg>
                <h3 className="text-xl font-bold">Facebook</h3>
              </div>
              <p className="mb-4">
                Join our community of 25K+ followers for daily updates.
              </p>
              <a
                href="#"
                className="text-white font-semibold flex items-center"
              >
                Follow Us{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            <div className="bg-pink-600 text-white p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <svg
                  className="w-8 h-8 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3.7 7.2c.1 2.3-1.6 5.4-4.6 5.4-1.1 0-2.1-.5-2.5-1.2.3.1.6.1.9.1.4 0 .9-.1 1.3-.4-.5 0-.9-.3-1-.8.2.1.3.1.5.1.2 0 .4 0 .6-.1-.5-.1-.9-.5-.9-1v-.1c.2.1.3.2.5.2s-.3-.1-.4-.3c-.1-.2 0-.4.1-.5.4.4 1 .7 1.8.8-.1-.3 0-.6.2-.8.3-.3.7-.4 1.1-.2.2.1.3.3.4.5.2 0 .4-.1.5-.2-.1.2-.3.4-.5.5.2 0 .4-.1.6-.2-.2.2-.4.4-.6.5z" />
                </svg>
                <h3 className="text-xl font-bold">Instagram</h3>
              </div>
              <p className="mb-4">
                Behind-the-scenes content and athlete features.
              </p>
              <a
                href="#"
                className="text-white font-semibold flex items-center"
              >
                Follow Us{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            <div className="bg-blue-400 text-white p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <svg
                  className="w-8 h-8 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                </svg>
                <h3 className="text-xl font-bold">Twitter</h3>
              </div>
              <p className="mb-4">Real-time updates and live event coverage.</p>
              <a
                href="#"
                className="text-white font-semibold flex items-center"
              >
                Follow Us{" "}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #21203c 0%, #2d2b4a 100%);
        }

        .bg-blue-black {
          background-color: #21203c;
        }

        .text-blue-black {
          color: #21203c;
        }

        .news-card {
          transition: all 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-5px);
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default NewsAndUpdates;
