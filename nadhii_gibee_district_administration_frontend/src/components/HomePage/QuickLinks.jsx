import React from "react";

const QuickLinks = () => {
  const quickLinks = [
    {
      title: "Departments",
      description: "Explore our training programs and sports disciplines",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      href: "#departments",
      gradient: "from-[#0a1931] to-blue-900",
    },
    {
      title: "Research",
      description: "Discover our latest studies and publications",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      href: "#research",
      gradient: "from-red-600 to-red-800",
    },
    {
      title: "News & Events",
      description: "Stay updated with our latest activities",
      icon: (
        <svg
          className="w-12 h-12"
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
      ),
      href: "#news",
      gradient: "from-[#0a1931] to-blue-900",
    },
    {
      title: "Facilities",
      description: "Tour our world-class training facilities",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9m0 0h4m-4 0H9m4 0h4"
          />
        </svg>
      ),
      href: "#facilities",
      gradient: "from-red-600 to-red-800",
    },
    {
      title: "Partners",
      description: "Our collaborations and sponsors",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      href: "#partners",
      gradient: "from-[#0a1931] to-blue-900",
    },
    {
      title: "Contact Us",
      description: "Get in touch with our team",
      icon: (
        <svg
          className="w-12 h-12"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      href: "#contact",
      gradient: "from-red-600 to-red-800",
    },
  ];

  return (
    <section className="relative py-16 bg-gray-50 overflow-hidden">
      {/* Background  */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-[#21203C] to-transparent opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#21203C] rounded-full -mr-48 -mb-48 opacity-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-black mb-4">
            Quick <span className="text-[#21203C]">Links</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the key areas of Derartu Tulu Sports Institute
          </p>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-16 bg-[#21203C]"></div>
            <div className="h-1 w-8 bg-[#21203C] mx-2"></div>
            <div className="h-1 w-4 bg-[#21203C]"></div>
          </div>
        </div>

        {/* Quick links grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="group bg-white rounded-xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center text-center"
            >
              {/* Icon container */}
              <div
                className={`mb-6 p-4 rounded-2xl bg-gradient-to-r ${link.gradient} text-white transform group-hover:scale-110 transition-transform duration-300`}
              >
                {link.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-blue-black mb-3 group-hover:text-[#21203C] transition-colors duration-300">
                {link.title}
              </h3>
              <p className="text-gray-600 mb-6 flex-grow">{link.description}</p>

              {/* CTA arrow */}
              <div className="flex items-center justify-center text-[#21203C] group-hover:text-[#2D2B4A] transition-colors duration-300">
                <span className="font-medium">Explore</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
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
              </div>

              {/* Hover effect line */}
              <div className="w-0 h-1 bg-[#21203C] mt-4 group-hover:w-full transition-all duration-300"></div>
            </a>
          ))}
        </div>

        {/* Additional CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-blue-black mb-4">
              Ready to{" "}
              <span className="text-[#21203C]">Begin Your Journey</span>?
            </h3>
            <p className="text-gray-600 mb-6">
              Join hundreds of athletes who have trained with us and achieved
              their dreams
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#21203C]/30">
                Apply Now
              </button>
              <button className="border-2 border-[#21203C] text-blue-black hover:bg-[#21203C] hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300">
                Schedule a Visit
              </button>
            </div>
          </div>
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

export default QuickLinks;
