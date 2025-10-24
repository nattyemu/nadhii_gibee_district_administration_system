import React from "react";
import {
  Coffee,
  Mountain,
  GraduationCap,
  Heart,
  Trees,
  Zap,
  Award,
  MapPin,
} from "lucide-react";

const WellKnownFor = () => {
  const features = [
    {
      icon: Coffee,
      title: "Birthplace of Coffee",
      description:
        "World-renowned as the origin of Arabica coffee, with rich coffee heritage and traditional coffee ceremonies",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      icon: Mountain,
      title: "Natural Beauty",
      description:
        "Breathtaking landscapes including waterfalls, hot springs, and the Gibe River valley",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      icon: GraduationCap,
      title: "Educational Hub",
      description:
        "Home to Jimma University, one of Ethiopia's premier higher education institutions",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Heart,
      title: "Healthcare Center",
      description:
        "Regional referral hospital and advanced medical facilities serving southwestern Ethiopia",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Trees,
      title: "Agricultural Powerhouse",
      description:
        "Leading producer of coffee, spices, honey, and various fruits in the region",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Zap,
      title: "Renewable Energy",
      description:
        "Significant hydroelectric power potential and green energy initiatives",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  const culturalHighlights = [
    {
      title: "Rich Oromo Culture",
      description:
        "Traditional Gada system, music, dance, and cultural festivals",
    },
    {
      title: "Historical Significance",
      description: "Ancient kingdoms and important archaeological sites",
    },
    {
      title: "Cultural Diversity",
      description: "Home to multiple ethnic groups living in harmony",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pattern-dots pattern-gray-400 pattern-size-4"></div>

      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-200 rounded-full opacity-20 hidden lg:block"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-green-200 rounded-full opacity-20 hidden lg:block"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-amber-800 mb-4">
            <Award className="mr-2" size={16} />
            Cultural & Natural Heritage
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Makes Nadhii Gibee District{" "}
            <span className="text-[#21203C]">Special</span>
          </h2>
          <p className="text-lg text-gray-600">
            Discover the unique characteristics and rich heritage that make our
            district a remarkable place to live, work, and invest.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2"
              >
                <div
                  className={`${feature.bgColor} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={feature.color} size={28} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Cultural Highlights */}
        <div className="bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-2xl p-8 text-white">
          <div className="flex items-center mb-6">
            <MapPin className="text-yellow-400 mr-3" size={24} />
            <h3 className="text-2xl font-bold">Cultural Heritage Highlights</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {culturalHighlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20">
                  <h4 className="font-bold text-yellow-400 mb-2 text-lg">
                    {highlight.title}
                  </h4>
                  <p className="text-blue-100 text-sm">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-[#21203C]">150+</div>
            <div className="text-gray-600 text-sm">Years of History</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-[#21203C]">12+</div>
            <div className="text-gray-600 text-sm">Ethnic Groups</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-[#21203C]">5</div>
            <div className="text-gray-600 text-sm">Natural Reserves</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <div className="text-2xl font-bold text-[#21203C]">100%</div>
            <div className="text-gray-600 text-sm">Organic Farming</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WellKnownFor;
