import React, { useState } from "react";

const FeaturedUpdates = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const updates = [
    {
      id: 1,
      title: "New Athletics Training Program Launch",
      excerpt:
        "We're excited to announce our new specialized training program for middle-distance runners, developed by our expert coaches.",
      date: "May 15, 2023",
      category: "news",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "Annual Sports Day Celebration",
      excerpt:
        "Join us for our annual sports day event featuring competitions, exhibitions, and special guest appearances from Olympic athletes.",
      date: "June 5, 2023",
      category: "events",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      featured: true,
    },
    {
      id: 3,
      title: "Research Paper on Sports Nutrition Published",
      excerpt:
        "Our sports science team has published groundbreaking research on optimal nutrition for endurance athletes in the International Journal of Sports Science.",
      date: "April 28, 2023",
      category: "research",
      image:
        "https://images.unsplash.com/photo-1582719471384-894e8b9a5b4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Swimming Department Achieves National Recognition",
      excerpt:
        "Our swimming program has been recognized as one of the top training centers in the country by the National Sports Council.",
      date: "April 20, 2023",
      category: "achievements",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Summer Training Camp Registration Open",
      excerpt:
        "Registration is now open for our annual summer training camp for young athletes aged 12-18. Limited spots available.",
      date: "April 15, 2023",
      category: "events",
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Partnership with National Olympic Committee",
      excerpt:
        "We're proud to announce our new partnership with the National Olympic Committee to develop future Olympic champions.",
      date: "April 10, 2023",
      category: "news",
      image:
        "https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const categories = [
    { id: "all", name: "All Updates" },
    { id: "news", name: "News" },
    { id: "events", name: "Events" },
    { id: "research", name: "Research" },
    { id: "achievements", name: "Achievements" },
  ];

  const filteredUpdates =
    activeCategory === "all"
      ? updates
      : updates.filter((update) => update.category === activeCategory);

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F5F4FF] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-black mb-4">
            Featured <span className="text-[#21203C]">Updates</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with the latest news, events, and achievements from
            Derartu Tulu Sports Institute
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-16 bg-[#21203C]"></div>
            <div className="h-1 w-8 bg-[#21203C] mx-2"></div>
            <div className="h-1 w-4 bg-[#21203C]"></div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-[#21203C] text-white shadow-lg"
                  : "bg-gray-100 text-blue-black hover:bg-[#F5F4FF] hover:text-[#21203C]"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured updates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUpdates.map((update, index) => (
            <div
              key={update.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 group ${
                update.featured ? "md:col-span-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={update.image}
                  alt={update.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#21203C] text-white text-sm font-medium rounded-full">
                    {update.category.charAt(0).toUpperCase() +
                      update.category.slice(1)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {update.date}
                </div>

                <h3 className="text-xl font-bold text-blue-black mb-3 group-hover:text-[#21203C] transition-colors duration-300">
                  {update.title}
                </h3>

                <p className="text-gray-600 mb-4">{update.excerpt}</p>

                <a
                  href="#"
                  className="inline-flex items-center text-[#21203C] font-medium group-hover:text-[#2D2B4A] transition-colors duration-300"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
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
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 bg-blue-black text-white font-medium rounded-lg hover:bg-[#21203C] transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Updates
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .bg-blue-black {
          background-color: #0a1931;
        }
        .text-blue-black {
          color: #0a1931;
        }
      `}</style>
    </section>
  );
};

export default FeaturedUpdates;
