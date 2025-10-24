import React, { useState, useEffect } from "react";
import {
  Play,
  ArrowRight,
  MapPin,
  Users,
  Square,
  Navigation,
} from "lucide-react";
import hero_img2 from "../../assets/jimma9.png";
import hero_img1 from "../../assets/Sigimoo.jpg";
import hero_img3 from "../../assets/jimma6.jpg";

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: hero_img1,
      title: "Welcome to Nadhii Gibee District",
      subtitle: "The Commercial & Cultural Hub of Southwest Ethiopia",
      description:
        "Discover the rich heritage, natural beauty, and economic opportunities of our vibrant region.",
    },
    {
      image: hero_img2,
      title: "Serving Our Communities",
      subtitle: "Dedicated to Sustainable Development & Public Service",
      description:
        "Our administration works tirelessly to improve infrastructure, education, and quality of life for all residents.",
    },
    {
      image: hero_img3,
      title: "Invest in Jimma",
      subtitle: "Land of Opportunity & Growth",
      description:
        "With abundant natural resources and a strategic location, Jimma offers exceptional opportunities for business and investment.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const stats = [
    { icon: Users, number: "190,000+", label: "Population" },
    { icon: MapPin, number: "25", label: "Kebeles" },
    { icon: Navigation, number: "64 km", label: "Distance from Jimma" },
    { icon: Square, number: "74,956  hectares", label: "Area" },
  ];
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/80 to-[#1a1a2e]/60"></div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="flex items-center">
                <div className="h-1 w-12 bg-yellow-400 mr-4"></div>
                <p className="uppercase tracking-widest text-white/90 font-semibold">
                  Nadhii Gibee District Administration
                </p>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {slides[currentSlide].title}
              </h1>

              <h2 className="text-xl md:text-2xl text-white/90 font-medium">
                {slides[currentSlide].subtitle}
              </h2>

              <p className="text-lg text-white/90 max-w-xl">
                {slides[currentSlide].description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg flex items-center transition-all duration-300 transform hover:-translate-y-1">
                  Explore Services <ArrowRight className="ml-2" size={20} />
                </button>
                <button className="border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-6 rounded-lg flex items-center transition-all duration-300">
                  <Play className="mr-2" size={20} /> Watch Intro
                </button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 animate-slide-in">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Nadhii Gibee District At a Glance
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="text-center p-4 bg-[#1a1a2e]/30 rounded-xl hover:bg-[#1a1a2e]/50 transition-colors duration-300"
                    >
                      <div className="flex justify-center">
                        <Icon className="text-yellow-400" size={32} />
                      </div>
                      <p className="text-2xl font-bold mt-2">{stat.number}</p>
                      <p className="text-white/90">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 text-center">
                <button className="text-white border-b border-yellow-400 hover:border-yellow-500 pb-1 transition-colors duration-300">
                  View Detailed Statistics & Reports
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-yellow-400 w-8" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Scrolling Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
        <div className="animate-bounce">
          <div className="h-6 w-0.5 bg-white mx-auto"></div>
          <div className="h-3 w-0.5 bg-white/60 mx-auto mt-1"></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border-4 border-yellow-400/30 rounded-full animate-pulse-slow hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 border-4 border-yellow-400/20 rounded-full animate-pulse-slow hidden lg:block"></div>

      {/* Ethiopian Pattern Overlay */}
      <div className="absolute inset-0 z-0 pattern-dots pattern-[#1a1a2e] pattern-bg-white pattern-opacity-10 pattern-size-4"></div>
    </div>
  );
};

export default HeroBanner;
