import React from "react";
import {
  FileText,
  Heart,
  BookOpen,
  Building,
  Landmark,
  Users,
  ArrowRight,
  Shield,
  GraduationCap,
  Sprout,
  Car,
  Banknote,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: FileText,
      title: "Civil Documents",
      description:
        "Apply for birth certificates, marriage licenses, and other personal documents",
      color: "from-blue-500 to-blue-700",
      items: [
        "Birth Certificates",
        "Marriage Licenses",
        "ID Cards",
        "Death Certificates",
      ],
    },
    {
      icon: Building,
      title: "Business Services",
      description:
        "Register your business, obtain permits, and access commercial resources",
      color: "from-green-500 to-green-700",
      items: [
        "Business Registration",
        "Trade Licenses",
        "Tax Services",
        "Permits",
      ],
    },
    {
      icon: Landmark,
      title: "Government Affairs",
      description:
        "Access public records, government tenders, and official publications",
      color: "from-purple-500 to-purple-700",
      items: [
        "Public Records",
        "Government Tenders",
        "Official Gazette",
        "Legal Services",
      ],
    },
    {
      icon: Heart,
      title: "Health & Social",
      description:
        "Healthcare services, social programs, and community support initiatives",
      color: "from-red-500 to-red-700",
      items: [
        "Healthcare",
        "Social Programs",
        "Community Support",
        "Emergency Services",
      ],
    },
    {
      icon: GraduationCap,
      title: "Education",
      description:
        "School registration, educational resources, and scholarship opportunities",
      color: "from-yellow-500 to-yellow-700",
      items: [
        "School Registration",
        "Educational Resources",
        "Scholarships",
        "Adult Education",
      ],
    },
    {
      icon: Sprout,
      title: "Agriculture",
      description:
        "Farming support, agricultural programs, and rural development services",
      color: "from-emerald-500 to-emerald-700",
      items: [
        "Farming Support",
        "Agricultural Programs",
        "Rural Development",
        "Crop Insurance",
      ],
    },
  ];

  const quickActions = [
    { icon: Banknote, label: "Pay Taxes", color: "bg-blue-100 text-blue-600" },
    {
      icon: FileText,
      label: "Apply Online",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Car,
      label: "License Renewal",
      color: "bg-purple-100 text-purple-600",
    },
    { icon: Shield, label: "Report Issue", color: "bg-red-100 text-red-600" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-[#F5F4FF] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F5F4FF] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full bg-[#F5F4FF] px-4 py-2 text-sm font-medium text-[#21203C] mb-4">
            <Shield className="mr-2" size={16} />
            Government Services
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Services for <span className="text-[#21203C]">Citizens</span> &{" "}
            <span className="text-[#21203C]">Businesses</span>
          </h2>
          <p className="text-lg text-gray-600">
            Access all government services in one place. Quick, convenient, and
            designed to make your life easier.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${action.color} mb-3`}
                >
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold text-gray-800">{action.label}</h3>
                <button className="mt-2 text-sm text-[#21203C] font-medium flex items-center">
                  Access <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#F5F4FF]"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} text-white mb-4`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <ul className="mb-6">
                    {service.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center py-2 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#21203C] mr-3"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button className="w-full bg-[#F5F4FF] hover:bg-[#E5E4FF] text-[#21203C] font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300 group-hover:bg-[#E5E4FF]">
                    Explore Services
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-2xl p-8 md:p-12 text-center text-white shadow-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-[#E5E4FF] max-w-2xl mx-auto mb-6">
            Our customer service team is here to help you navigate government
            services and find the resources you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              Contact Support
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg border border-white/20 transition-colors duration-300">
              Browse All Services
            </button>
          </div>
        </div>
      </div>

      {/* Ethiopian Pattern Overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pattern-dots pattern-[#21203C] pattern-size-4"></div>
    </section>
  );
};

export default ServicesSection;
