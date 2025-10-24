import React, { useState, useEffect } from "react";

const CallToAction = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const ctaOptions = [
    {
      title: "Apply for Training",
      description:
        "Join our elite training programs and unleash your athletic potential",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
      buttonText: "Apply Now",
      link: "#apply",
    },
    {
      title: "Read Our Research",
      description: "Access our latest sports science research and publications",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          ></path>
        </svg>
      ),
      buttonText: "Explore Research",
      link: "#research",
    },
    {
      title: "Partner With Us",
      description:
        "Collaborate with us to develop the next generation of athletes",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      ),
      buttonText: "Become a Partner",
      link: "#partnership",
    },
  ];

  return (
    <section className="relative py-20 bg-blue-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#21203C] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-[#21203C] rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-4 border-[#21203C] rounded-full opacity-20"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#21203C] rounded-full opacity-30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${
                15 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-[#21203C]">Elevate Your Game</span>?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join Ethiopia's premier sports institute and train with the best.
            Your journey to athletic excellence starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ctaOptions.map((option, index) => (
            <div
              key={index}
              className={`bg-blue-black-light rounded-2xl p-8 transform transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#21203C] rounded-2xl mb-4">
                  {option.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-300">{option.description}</p>
              </div>
              <button className="w-full bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
                <span className="relative z-10">{option.buttonText}</span>
                <div className="absolute inset-0 bg-[#2D2B4A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-white animate-line-progress"></div>
              </button>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center relative">
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-24 h-24">
            <div className="absolute inset-0 border-4 border-[#21203C] rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 border-4 border-[#21203C] rounded-full"></div>
          </div>

          <div className="bg-blue-black-light rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#21203C] rounded-full opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#21203C] rounded-full opacity-10"></div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Begin Your Championship Journey Today
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Take the first step toward athletic excellence with Derartu Tulu
                Sports Institute. Our world-class facilities and expert coaching
                staff are ready to help you achieve your dreams.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="relative bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-4 px-8 rounded-lg text-lg transform hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                  <span className="relative z-10">Start Your Application</span>
                  <div className="absolute inset-0 bg-[#2D2B4A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-white animate-line-progress"></div>
                </button>

                <button className="relative border-2 border-white text-white hover:bg-white hover:text-blue-black font-bold py-4 px-8 rounded-lg text-lg transform hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                  <span className="relative z-10">Schedule a Tour</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats counter */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div
              className="text-4xl md:text-5xl font-bold text-[#21203C] mb-2"
              id="athletes-counter"
            >
              0
            </div>
            <div className="text-gray-300">Elite Athletes</div>
          </div>
          <div className="text-center">
            <div
              className="text-4xl md:text-5xl font-bold text-[#21203C] mb-2"
              id="programs-counter"
            >
              0
            </div>
            <div className="text-gray-300">Training Programs</div>
          </div>
          <div className="text-center">
            <div
              className="text-4xl md:text-5xl font-bold text-[#21203C] mb-2"
              id="medals-counter"
            >
              0
            </div>
            <div className="text-gray-300">Championship Medals</div>
          </div>
          <div className="text-center">
            <div
              className="text-4xl md:text-5xl font-bold text-[#21203C] mb-2"
              id="partners-counter"
            >
              0
            </div>
            <div className="text-gray-300">Global Partners</div>
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .bg-blue-black {
          background-color: #0a1931;
        }
        .bg-blue-black-light {
          background-color: #0f2a5a;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes line-progress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-line-progress {
          animation: line-progress 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CallToAction;
