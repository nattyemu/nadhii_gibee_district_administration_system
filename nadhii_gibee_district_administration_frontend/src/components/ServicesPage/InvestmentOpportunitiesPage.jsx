import React, { useState } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  Factory,
  Coffee,
  Sprout,
  Building2,
  Car,
  Home,
  Shield,
  Clock,
  Download,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Award,
  BookOpen,
  Mountain,
  BarChart3,
  Target,
  Navigation,
  DollarSign,
  Zap,
} from "lucide-react";
import backgroundImage from "../../assets/investment_hero.png";
const InvestmentOpportunitiesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);

  const investmentCategories = [
    {
      id: "all",
      label: "All Opportunities",
      icon: TrendingUp,
      color: "from-green-500 to-green-700",
    },
    {
      id: "agriculture",
      label: "Agriculture",
      icon: Sprout,
      color: "from-[#21203C] to-[#2D2B4A]",
    },
    {
      id: "processing",
      label: "Agro-Processing",
      icon: Factory,
      color: "from-amber-500 to-amber-700",
    },
    {
      id: "tourism",
      label: "Tourism",
      icon: Home,
      color: "from-purple-500 to-purple-700",
    },
    {
      id: "commercial",
      label: "Commercial",
      icon: Building2,
      color: "from-blue-500 to-blue-700",
    },
    {
      id: "infrastructure",
      label: "Infrastructure",
      icon: Car,
      color: "from-indigo-500 to-indigo-700",
    },
  ];

  const investmentOpportunities = [
    {
      id: 1,
      title: "Coffee Processing & Export",
      category: "processing",
      description:
        "Establish modern coffee washing stations, roasting facilities, and export operations leveraging premium Arabica coffee.",
      icon: Coffee,
      investmentRange: "ETB 500K - ETB 5M",
      roi: "25-40%",
      timeline: "2-3 years",
      requirements: [
        "Business registration",
        "Environmental impact assessment",
        "Export license",
        "Processing facility plans",
      ],
      onlineAvailable: true,
      priority: "High",
      advantages: [
        "World-renowned Arabica coffee quality",
        "Abundant raw material supply",
        "Export market access",
        "Government incentives available",
      ],
    },
    {
      id: 2,
      title: "Commercial Farming Operations",
      category: "agriculture",
      description:
        "Large-scale production of teff, maize, and cereals using modern agricultural techniques.",
      icon: Sprout,
      investmentRange: "ETB 1M - ETB 10M",
      roi: "20-35%",
      timeline: "3-4 years",
      requirements: [
        "Land lease agreement",
        "Agricultural business plan",
        "Equipment procurement plan",
        "Market analysis",
      ],
      onlineAvailable: true,
      priority: "High",
      advantages: [
        "74,956 hectares available land",
        "Favorable climate conditions",
        "Skilled agricultural workforce",
        "Growing domestic market",
      ],
    },
    {
      id: 3,
      title: "Agro-Processing Industries",
      category: "processing",
      description:
        "Fruit processing, spice packaging, honey processing, and edible oil production facilities.",
      icon: Factory,
      investmentRange: "ETB 2M - ETB 15M",
      roi: "18-30%",
      timeline: "3-5 years",
      requirements: [
        "Industrial license",
        "Processing technology plans",
        "Supply chain strategy",
        "Quality control systems",
      ],
      onlineAvailable: true,
      priority: "Medium",
      advantages: [
        "Diverse raw material base",
        "Youth labor force available",
        "Strategic location for distribution",
        "Tax incentives available",
      ],
    },
    {
      id: 4,
      title: "Tourism & Hospitality",
      category: "tourism",
      description:
        "Develop hotels, eco-lodges, and resorts to serve growing tourism in natural attractions.",
      icon: Home,
      investmentRange: "ETB 3M - ETB 25M",
      roi: "20-35%",
      timeline: "4-6 years",
      requirements: [
        "Tourism development license",
        "Environmental compliance",
        "Infrastructure development plan",
        "Market feasibility study",
      ],
      onlineAvailable: false,
      priority: "High",
      advantages: [
        "9+ tourist attractions in district",
        "Growing domestic tourism",
        "Cultural heritage sites",
        "Government support for tourism",
      ],
    },
    {
      id: 5,
      title: "Commercial Real Estate",
      category: "commercial",
      description:
        "Shopping malls, office complexes, and modern retail centers in urbanizing areas.",
      icon: Building2,
      investmentRange: "ETB 5M - ETB 30M",
      roi: "15-25%",
      timeline: "3-5 years",
      requirements: [
        "Construction permits",
        "Commercial business license",
        "Market demand analysis",
        "Development timeline",
      ],
      onlineAvailable: true,
      priority: "Medium",
      advantages: [
        "Growing urban population",
        "Limited commercial infrastructure",
        "Strategic location advantages",
        "Long-term lease options",
      ],
    },
    {
      id: 6,
      title: "Transport & Logistics Hub",
      category: "infrastructure",
      description:
        "Freight services, vehicle assembly, and logistics centers connecting southwestern Ethiopia.",
      icon: Car,
      investmentRange: "ETB 8M - ETB 40M",
      roi: "18-28%",
      timeline: "4-7 years",
      requirements: [
        "Transportation license",
        "Infrastructure development plan",
        "Fleet acquisition strategy",
        "Regional network plan",
      ],
      onlineAvailable: true,
      priority: "Medium",
      advantages: [
        "310 km from Addis Ababa",
        "64 km from Jimma city",
        "Gateway to southwestern region",
        "Growing trade volume",
      ],
    },
    {
      id: 7,
      title: "Renewable Energy Projects",
      category: "infrastructure",
      description:
        "Solar farms, mini-hydro plants, and biomass energy utilizing natural resources.",
      icon: Zap,
      investmentRange: "ETB 10M - ETB 50M",
      roi: "15-22%",
      timeline: "5-8 years",
      requirements: [
        "Energy production license",
        "Technical feasibility study",
        "Environmental impact assessment",
        "Power purchase agreements",
      ],
      onlineAvailable: false,
      priority: "Medium",
      advantages: [
        "Abundant solar resources",
        "Hydro power potential",
        "Agricultural waste for biomass",
        "Government energy incentives",
      ],
    },
    {
      id: 8,
      title: "Educational Institutions",
      category: "commercial",
      description:
        "Private schools, vocational training centers, and higher education facilities.",
      icon: BookOpen,
      investmentRange: "ETB 2M - ETB 20M",
      roi: "12-20%",
      timeline: "3-5 years",
      requirements: [
        "Education license",
        "Curriculum development plan",
        "Facility specifications",
        "Faculty recruitment strategy",
      ],
      onlineAvailable: true,
      priority: "Medium",
      advantages: [
        "190,000+ population base",
        "Young demographic profile",
        "Limited educational facilities",
        "Government education support",
      ],
    },
  ];

  const filteredOpportunities =
    activeCategory === "all"
      ? investmentOpportunities
      : investmentOpportunities.filter(
          (opportunity) => opportunity.category === activeCategory
        );

  const searchedOpportunities = filteredOpportunities.filter(
    (opportunity) =>
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opportunity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const quickActions = [
    {
      icon: Download,
      label: "Investment Guide",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: BookOpen,
      label: "Apply Online",
      color: "bg-[#21203C]/10 text-[#21203C]",
    },
    {
      icon: Calendar,
      label: "Schedule Meeting",
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Phone,
      label: "Contact Investment Office",
      color: "bg-red-100 text-red-600",
    },
  ];

  const districtAdvantages = [
    {
      icon: Shield,
      title: "Reliable Peace & Security",
      description:
        "Stable environment with low crime rates and community-led security systems",
    },
    {
      icon: Users,
      title: "Development Workforce",
      description:
        "Young, educated labor force (190,000+ population) with strong work ethic",
    },
    {
      icon: Mountain,
      title: "Favorable Climate",
      description:
        "12.8% highland, 86.5% midland zones ideal for agriculture and business",
    },
    {
      icon: Award,
      title: "Cultural Values & Integrity",
      description:
        "Community with strong moral values, honesty, and cooperative spirit",
    },
  ];

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
              Investment Opportunities
            </h1>
            <p className="text-xl text-[#E5E4FF] mb-8">
              Discover profitable investment ventures in Nadhii Gibee District -
              Where strategic location meets abundant resources
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search investment opportunities (e.g., coffee processing, agriculture)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-3 px-5 text-white placeholder-[#E5E4FF] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <Search className="absolute right-3 top-3 text-white" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#21203C] to-[#2D2B4A] text-white rounded-xl p-4 text-center shadow-lg">
              <Users className="mx-auto mb-2 text-yellow-400" size={24} />
              <div className="text-xl font-bold">190,000+</div>
              <div className="text-[#E5E4FF] text-sm">Population</div>
            </div>
            <div className="bg-gradient-to-br from-[#21203C] to-[#2D2B4A] text-white rounded-xl p-4 text-center shadow-lg">
              <BarChart3 className="mx-auto mb-2 text-yellow-400" size={24} />
              <div className="text-xl font-bold">74,956</div>
              <div className="text-[#E5E4FF] text-sm">Hectares</div>
            </div>
            <div className="bg-gradient-to-br from-[#21203C] to-[#2D2B4A] text-white rounded-xl p-4 text-center shadow-lg">
              <Target className="mx-auto mb-2 text-yellow-400" size={24} />
              <div className="text-xl font-bold">15</div>
              <div className="text-[#E5E4FF] text-sm">Development Sectors</div>
            </div>
            <div className="bg-gradient-to-br from-[#21203C] to-[#2D2B4A] text-white rounded-xl p-4 text-center shadow-lg">
              <Navigation className="mx-auto mb-2 text-yellow-400" size={24} />
              <div className="text-xl font-bold">310 km</div>
              <div className="text-[#E5E4FF] text-sm">From Addis Ababa</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${action.color} mb-3 mx-auto`}
                  >
                    <Icon size={24} />
                  </div>
                  <span className="font-medium text-gray-900">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Categories */}
      <section className="py-8 bg-[#21203C]/20 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {investmentCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
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
              <span className="text-sm text-gray-600 mr-2">Sort by:</span>
              <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C]">
                <option>Highest ROI</option>
                <option>Investment Size</option>
                <option>Priority Level</option>
                <option>Timeline</option>
              </select>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Filter size={18} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchedOpportunities.length === 0 ? (
            <div className="text-center py-12">
              <Search size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No investment opportunities found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedOpportunities.map((opportunity) => {
                const Icon = opportunity.icon;
                return (
                  <div
                    key={opportunity.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white`}
                        >
                          <Icon size={24} />
                        </div>
                        {opportunity.onlineAvailable && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Online Application
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {opportunity.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {opportunity.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <DollarSign size={14} className="mr-1" />
                            Investment Range
                          </div>
                          <div className="font-medium text-gray-900">
                            {opportunity.investmentRange}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-sm text-gray-500 mb-1">
                            <TrendingUp size={14} className="mr-1" />
                            Expected ROI
                          </div>
                          <div className="font-medium text-green-600">
                            {opportunity.roi}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            opportunity.priority === "High"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {opportunity.priority} Priority
                        </span>
                        <button
                          onClick={() => setSelectedOpportunity(opportunity)}
                          className="text-[#21203C] font-medium flex items-center hover:text-[#21203C]/80"
                        >
                          View Details
                          <ArrowRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Opportunity Detail Modal */}
      {selectedOpportunity && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-[#21203C] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedOpportunity.category.toUpperCase()}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {selectedOpportunity.title}
                  </h2>
                  <p className="text-gray-600">
                    {selectedOpportunity.description}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOpportunity(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#21203C]/5 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Investment Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment Range</span>
                      <span className="font-medium">
                        {selectedOpportunity.investmentRange}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected ROI</span>
                      <span className="font-medium text-green-600">
                        {selectedOpportunity.roi}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeline</span>
                      <span className="font-medium">
                        {selectedOpportunity.timeline}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority Level</span>
                      <span className="font-medium">
                        {selectedOpportunity.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Competitive Advantages
                  </h3>
                  <ol className="space-y-2">
                    {selectedOpportunity.advantages.map((advantage, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                          {index + 1}
                        </div>
                        <span className="text-gray-700">{advantage}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedOpportunity.requirements.map(
                      (requirement, index) => (
                        <li key={index} className="flex items-center">
                          <CheckCircle
                            size={16}
                            className="text-[#21203C] mr-2"
                          />
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    District Support
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <MapPin size={16} className="mr-2" />
                      Land allocation assistance
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Shield size={16} className="mr-2" />
                      Security and infrastructure support
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Users size={16} className="mr-2" />
                      Workforce recruitment assistance
                    </div>
                    {selectedOpportunity.onlineAvailable && (
                      <div className="flex items-center text-[#21203C]">
                        <CheckCircle size={16} className="mr-2" />
                        Online Application Available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  {selectedOpportunity.onlineAvailable
                    ? "Apply Online"
                    : "Download Proposal Template"}
                  <ArrowRight size={18} className="ml-2" />
                </button>
                <button className="bg-white border border-[#21203C] text-[#21203C] hover:bg-[#21203C]/5 font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <Download size={18} className="mr-2" />
                  Investment Guide
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <Phone size={18} className="mr-2" />
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* District Advantages Section */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Invest in{" "}
              <span className="text-[#21203C]">Nadhii Gibee District</span>
            </h2>
            <p className="text-lg text-gray-600">
              Strategic advantages that make our district the ideal investment
              destination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {districtAdvantages.map((advantage, index) => {
              const Icon = advantage.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 text-center shadow-md border border-gray-100"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#21203C]/10 rounded-full text-[#21203C] mb-4 mx-auto">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {advantage.title}
                  </h3>
                  <p className="text-gray-600">{advantage.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment <span className="text-[#21203C]">Process</span>
            </h2>
            <p className="text-lg text-gray-600">
              Simple and streamlined process to start your investment journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#21203C] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Initial Inquiry</h3>
              <p className="text-gray-600 text-sm">
                Submit your investment interest and receive guidance
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#21203C] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Proposal Submission
              </h3>
              <p className="text-gray-600 text-sm">
                Submit detailed business proposal and requirements
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#21203C] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Approval & Licensing
              </h3>
              <p className="text-gray-600 text-sm">
                Fast-track approval within 30 days maximum
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#21203C] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Implementation</h3>
              <p className="text-gray-600 text-sm">
                Start your project with full district support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Invest in Nadhii Gibee District?
            </h2>
            <p className="text-xl mb-8">
              Our investment office is ready to support your business venture
              with personalized assistance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Investment Office
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Schedule Site Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Investment <span className="text-[#21203C]">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Join 50+ successful investors who have established profitable
              businesses in our district
            </p>
            <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              View Success Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvestmentOpportunitiesPage;
