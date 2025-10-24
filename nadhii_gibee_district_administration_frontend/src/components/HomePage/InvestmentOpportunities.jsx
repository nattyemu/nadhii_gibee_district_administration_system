import React from "react";
import {
  TrendingUp,
  Factory,
  ShoppingCart,
  Car,
  Home,
  Coffee,
  Zap,
  Users,
  DollarSign,
  Shield,
  Clock,
  ArrowRight,
  Heart,
  Sun,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const InvestmentOpportunities = () => {
  const sectors = [
    {
      icon: Coffee,
      title: "Coffee Processing & Export",
      description:
        "Modern coffee washing stations, roasting facilities, and export operations leveraging our premium Arabica coffee",
      investment: "$500K - $5M",
      roi: "25-40%",
      timeline: "2-3 years",
      priority: "High",
    },
    {
      icon: Factory,
      title: "Agro-Processing Industries",
      description:
        "Fruit processing, spice packaging, honey processing, and edible oil production using local agricultural products",
      investment: "$1M - $10M",
      roi: "20-35%",
      timeline: "3-4 years",
      priority: "High",
    },
    {
      icon: ShoppingCart,
      title: "Commercial Real Estate",
      description:
        "Shopping malls, office complexes, and modern retail centers to serve our growing urban population",
      investment: "$2M - $20M",
      roi: "15-25%",
      timeline: "3-5 years",
      priority: "Medium",
    },
    {
      icon: Car,
      title: "Transport & Logistics",
      description:
        "Freight services, vehicle assembly, and logistics hubs connecting southwestern Ethiopia",
      investment: "$1.5M - $15M",
      roi: "18-30%",
      timeline: "2-4 years",
      priority: "Medium",
    },
    {
      icon: Home,
      title: "Hospitality & Tourism",
      description:
        "Hotels, eco-lodges, resorts, and conference facilities to accommodate growing tourism",
      investment: "$3M - $25M",
      roi: "20-35%",
      timeline: "4-6 years",
      priority: "High",
    },
    {
      icon: Zap,
      title: "Renewable Energy",
      description:
        "Solar farms, mini-hydro plants, and biomass energy utilizing our natural resources",
      investment: "$5M - $50M",
      roi: "15-22%",
      timeline: "4-7 years",
      priority: "Medium",
    },
  ];

  const investmentAdvantages = [
    {
      icon: ShieldCheck,
      title: "Reliable Peace & Security",
      description:
        "Stable and secure environment with low crime rates and community-led security",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Users,
      title: "Development Workforce",
      description:
        "Young, educated labor force with strong work ethic and technical training",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Sun,
      title: "Favorable Climate",
      description:
        "Highland and midland zones ideal for agriculture and comfortable living",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Heart,
      title: "Cultural Values & Integrity",
      description:
        "Community with strong moral values, honesty, and cooperative spirit",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const incentives = [
    {
      title: "Tax Holidays",
      description:
        "Up to 7 years of tax exemption for priority sectors and job-creating investments",
      icon: DollarSign,
    },
    {
      title: "Land Allocation",
      description:
        "Preferential land access at competitive rates with long-term leases",
      icon: Shield,
    },
    {
      title: "Fast-Track Approval",
      description:
        "Streamlined business registration and licensing within 30 days",
      icon: Clock,
    },
    {
      title: "Infrastructure Support",
      description:
        "Access to developed industrial zones, utilities, and transport networks",
      icon: Users,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full -translate-x-1/4 translate-y-1/4 opacity-20"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800 mb-4">
            <TrendingUp className="mr-2" size={16} />
            Investment Opportunities
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Invest in Nadhii Gibee District?{" "}
            <span className="text-[#21203C]">
              The Ideal Business Destination
            </span>
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Strategic location, abundant resources, skilled workforce, and
            government support create the perfect environment for your business
            success.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="text-2xl font-bold text-[#21203C]">15%</div>
              <div className="text-gray-600 text-sm">Average Annual Growth</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="text-2xl font-bold text-[#21203C]">50+</div>
              <div className="text-gray-600 text-sm">Active Investors</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="text-2xl font-bold text-[#21203C]">$200M+</div>
              <div className="text-gray-600 text-sm">Investment Pipeline</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
              <div className="text-2xl font-bold text-[#21203C]">98%</div>
              <div className="text-gray-600 text-sm">Security Rating</div>
            </div>
          </div>
        </div>

        {/* Investment Advantages */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Our Competitive Advantages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {investmentAdvantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-2 text-center"
                >
                  <div
                    className={`${advantage.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={advantage.color} size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">
                    {advantage.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Investment Sectors & Incentives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Priority Investment Sectors
            </h3>
            <div className="space-y-6">
              {sectors.map((sector, index) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-3 rounded-lg mr-4">
                          <Icon className="text-green-600" size={24} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">
                            {sector.title}
                          </h4>
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              sector.priority === "High"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {sector.priority} Priority
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{sector.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="font-semibold text-gray-900">
                          Investment
                        </div>
                        <div className="text-green-600">
                          {sector.investment}
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">ROI</div>
                        <div className="text-blue-600">{sector.roi}</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          Timeline
                        </div>
                        <div className="text-purple-600">{sector.timeline}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Incentives & Support */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Government Incentives & Support
            </h3>
            <div className="bg-gradient-to-br from-[#21203C] to-[#2D2B4A] rounded-2xl p-8 text-white mb-8">
              <h4 className="text-xl font-bold mb-6 text-yellow-400">
                Why Invest With Us?
              </h4>
              <div className="space-y-6">
                {incentives.map((incentive, index) => {
                  const Icon = incentive.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <Icon
                        className="text-yellow-400 mt-1 mr-4 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <h5 className="font-bold text-lg mb-1">
                          {incentive.title}
                        </h5>
                        <p className="text-blue-100">{incentive.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Workforce Stats */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="mr-2 text-[#21203C]" size={24} />
                Workforce Profile
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#21203C]">65%</div>
                  <div className="text-gray-600 text-sm">Under 30 Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#21203C]">85%</div>
                  <div className="text-gray-600 text-sm">Literacy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#21203C]">12K+</div>
                  <div className="text-gray-600 text-sm">Graduates/Year</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#21203C]">5+</div>
                  <div className="text-gray-600 text-sm">
                    Technical Colleges
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Investment Process
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-[#21203C] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                    1
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Project Proposal
                    </div>
                    <div className="text-gray-600 text-sm">
                      Submit your investment plan
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#21203C] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                    2
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Approval & Licensing
                    </div>
                    <div className="text-gray-600 text-sm">
                      Fast-track within 30 days
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-[#21203C] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4">
                    3
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      Implementation
                    </div>
                    <div className="text-gray-600 text-sm">
                      Start your project with support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-4 px-8 rounded-lg inline-flex items-center transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Download Investment Guide
            <ArrowRight size={20} className="ml-2" />
          </button>
          <p className="text-gray-600 mt-4">
            Contact our Investment Office: <strong>+251 47 111 0000</strong> |
            <strong> investment@nadhiigibee.gov.et</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvestmentOpportunities;
