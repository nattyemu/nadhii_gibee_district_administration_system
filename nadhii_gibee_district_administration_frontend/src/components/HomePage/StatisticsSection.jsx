import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  MapPin,
  GraduationCap,
  Heart,
  TrendingUp,
  Award,
  BarChart3,
  Leaf,
  Building2,
  Route,
  Lightbulb,
  Shield,
} from "lucide-react";

const StatisticsSection = () => {
  const [countersVisible, setCountersVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: Users,
      endValue: 190000,
      title: "Population Served",
      prefix: "",
      suffix: "+",
      color: "text-yellow-400",
    },
    {
      icon: MapPin,
      endValue: 21,
      title: "Kebeles",
      prefix: "",
      suffix: "",
      color: "text-yellow-400",
    },
    {
      icon: GraduationCap,
      endValue: 250,
      title: "Educational Institutions",
      prefix: "",
      suffix: "+",
      color: "text-yellow-400",
    },
    {
      icon: Heart,
      endValue: 47,
      title: "Healthcare Facilities",
      prefix: "",
      suffix: "",
      color: "text-yellow-400",
    },
    {
      icon: Route,
      endValue: 1200,
      title: "Km of Roads Built",
      prefix: "",
      suffix: "km",
      color: "text-yellow-400",
    },
    {
      icon: Leaf,
      endValue: 85,
      title: "Agricultural Projects",
      prefix: "",
      suffix: "%",
      color: "text-yellow-400",
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: "National Excellence Award",
      description:
        "Recognized for outstanding public service innovation in 2023",
      year: "2023",
    },
    {
      icon: TrendingUp,
      title: "Economic Growth Leader",
      description: "Highest regional GDP growth for three consecutive years",
      year: "2022",
    },
    {
      icon: Shield,
      title: "Good Governance Certification",
      description:
        "Awarded for transparency and accountability in administration",
      year: "2023",
    },
    {
      icon: Lightbulb,
      title: "Digital Transformation Pioneer",
      description:
        "First fully digitalized administration services in the region",
      year: "2022",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCountersVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-br from-[#1a1a2e] via-[#1a1a2e] to-[#1a1a2e]/90 overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white/5 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full -translate-x-1/4 translate-y-1/4"></div>

      {/* Ethiopian Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pattern-dots pattern-yellow-400 pattern-size-6"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full bg-yellow-500 px-4 py-2 text-sm font-medium text-[#1a1a2e] mb-4">
            <BarChart3 className="mr-2" size={16} />
            Progress & Achievements
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Nadhii Gibee District{" "}
            <span className="text-yellow-400">By The Numbers</span>
          </h2>
          <p className="text-lg text-white/90">
            Discover the impact of our initiatives and the progress we've made
            together in building a prosperous community.
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className={`flex justify-center mb-4 ${stat.color}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-2">
                  {countersVisible ? (
                    <Counter
                      end={stat.endValue}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    "0"
                  )}
                </h3>
                <p className="text-white/90 text-center text-sm font-medium">
                  {stat.title}
                </p>
              </div>
            );
          })}
        </div>

        {/* Achievements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Text Content */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center rounded-full bg-yellow-400/20 px-4 py-2 text-sm font-medium text-yellow-300 mb-4 w-fit">
              <Award className="mr-2" size={16} />
              Recent Achievements
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Recognized <span className="text-yellow-400">Excellence</span> in
              Public Service
            </h3>
            <p className="text-white/90 mb-6">
              Our commitment to innovation, transparency, and community
              development has been recognized through numerous awards and
              achievements at both regional and national levels.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  98%
                </div>
                <div className="text-sm text-white/90">
                  Citizen Satisfaction
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  47%
                </div>
                <div className="text-sm text-white/90">
                  Digital Service Adoption
                </div>
              </div>
            </div>

            <button className="bg-yellow-500 hover:bg-yellow-600 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg w-fit transition-colors duration-300 flex items-center">
              Read Our Annual Report
              <TrendingUp className="ml-2" size={20} />
            </button>
          </div>

          {/* Right Column - Achievements Cards */}
          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-r from-[#1a1a2e]/50 to-[#1a1a2e]/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 group"
                >
                  <div className="flex items-start">
                    <div className="bg-yellow-400/10 p-3 rounded-xl mr-4 group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <Icon className="text-yellow-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-white">
                          {achievement.title}
                        </h4>
                        <span className="bg-yellow-500 text-[#1a1a2e] text-xs font-bold px-2 py-1 rounded-full">
                          {achievement.year}
                        </span>
                      </div>
                      <p className="text-white/90 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute top-1/4 left-10 w-6 h-6 border-2 border-yellow-400/30 rounded-full animate-ping-slow hidden lg:block"></div>
      <div className="absolute bottom-1/3 right-20 w-4 h-4 bg-yellow-400/20 rounded-full animate-pulse-slow hidden lg:block"></div>
    </section>
  );
};

// Counter component for animated numbers
const Counter = ({ end, prefix = "", suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (end > 0) {
      let start = 0;
      const increment = end / (duration / 20);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 20);

      return () => clearInterval(timer);
    }
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default StatisticsSection;
