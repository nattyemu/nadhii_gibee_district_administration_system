import React, { useState } from "react";
import {
  Search,
  Filter,
  Building2,
  FileText,
  Award,
  BarChart3,
  Clock,
  Download,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Users,
  Shield,
  TrendingUp,
  Zap,
  Target,
  Globe,
  Banknote,
  Car,
  Factory,
  Store,
} from "lucide-react";
import backgroundImage from "../../assets/business_hero.png";
const BusinessServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [activeTab, setActiveTab] = useState("services");

  const serviceCategories = [
    {
      id: "all",
      label: "All Services",
      icon: Building2,
      color: "from-[#1a1a2e] to-[#1a1a2e]",
    },
    {
      id: "registration",
      label: "Registration",
      icon: FileText,
      color: "from-[#1a1a2e] to-[#1a1a2e]",
    },
    {
      id: "licensing",
      label: "Licensing",
      icon: Award,
      color: "from-[#1a1a2e] to-[#1a1a2e]",
    },
    {
      id: "permits",
      label: "Permits",
      icon: Shield,
      color: "from-[#1a1a2e] to-[#1a1a2e]",
    },
    {
      id: "support",
      label: "Support",
      icon: Users,
      color: "from-[#1a1a2e] to-[#1a1a2e]",
    },
    {
      id: "incentives",
      label: "Incentives",
      icon: TrendingUp,
      color: "from-[#1a1a2e] to-[#1a1a2e]",
    },
  ];

  const businessServices = [
    {
      id: 1,
      title: "Business Registration",
      category: "registration",
      description:
        "Register your business entity with the Nadhii Gibee District Trade Bureau.",
      icon: Building2,
      processingTime: "5-7 days",
      cost: "ETB 500-5,000",
      requirements: [
        "Business name reservation",
        "Articles of association",
        "Capital verification",
        "Tax identification",
      ],
      onlineAvailable: true,
      priority: "High",
      benefits: [
        "Legal entity status",
        "Tax registration",
        "Bank account opening",
        "License eligibility",
      ],
    },
    {
      id: 2,
      title: "Trade License",
      category: "licensing",
      description:
        "Obtain a trade license for commercial activities in Nadhii Gibee District.",
      icon: Award,
      processingTime: "10-15 days",
      cost: "ETB 1,000-10,000",
      requirements: [
        "Business registration",
        "Location approval",
        "Health clearance",
        "Fire safety certificate",
      ],
      onlineAvailable: true,
      priority: "High",
      benefits: [
        "Legal operation",
        "Business credibility",
        "Access to markets",
        "Government contracts",
      ],
    },
    {
      id: 3,
      title: "Construction Permit",
      category: "permits",
      description: "Secure permits for construction and building projects.",
      icon: Shield,
      processingTime: "15-30 days",
      cost: "Based on project size",
      requirements: [
        "Land title deed",
        "Architectural plans",
        "Engineering reports",
        "Environmental impact assessment",
      ],
      onlineAvailable: false,
      priority: "Medium",
      benefits: [
        "Legal construction",
        "Safety compliance",
        "Property valuation",
        "Future developments",
      ],
    },
    {
      id: 4,
      title: "Investment Certificate",
      category: "registration",
      description:
        "Certificate for domestic and foreign investors in Nadhii Gibee District.",
      icon: FileText,
      processingTime: "20-25 days",
      cost: "ETB 2,000",
      requirements: [
        "Feasibility study",
        "Investment plan",
        "Capital proof",
        "Sector approval",
      ],
      onlineAvailable: true,
      priority: "High",
      benefits: [
        "Tax incentives",
        "Land access",
        "Import privileges",
        "Investment protection",
      ],
    },
    {
      id: 5,
      title: "Export License",
      category: "licensing",
      description:
        "License for exporting goods and services from Nadhii Gibee District.",
      icon: Globe,
      processingTime: "15-20 days",
      cost: "ETB 5,000-20,000",
      requirements: [
        "Business registration",
        "Product certification",
        "Market analysis",
        "Quality standards",
      ],
      onlineAvailable: true,
      priority: "Medium",
      benefits: [
        "International trade",
        "Foreign exchange",
        "Market expansion",
        "Brand recognition",
      ],
    },
    {
      id: 6,
      title: "Tax Registration",
      category: "registration",
      description: "Register for tax identification and compliance services.",
      icon: Banknote,
      processingTime: "3-5 days",
      cost: "Free",
      requirements: [
        "Business registration",
        "Owner identification",
        "Business location",
        "Activity description",
      ],
      onlineAvailable: true,
      priority: "High",
      benefits: [
        "Legal compliance",
        "Receipt issuance",
        "Government tenders",
        "Business growth",
      ],
    },
    {
      id: 7,
      title: "Industry Permit",
      category: "permits",
      description:
        "Permits for industrial manufacturing and processing activities.",
      icon: Factory,
      processingTime: "25-35 days",
      cost: "ETB 10,000-50,000",
      requirements: [
        "Environmental impact study",
        "Safety protocols",
        "Waste management plan",
        "Community agreement",
      ],
      onlineAvailable: false,
      priority: "Medium",
      benefits: [
        "Industrial operation",
        "Scale production",
        "Job creation",
        "Economic contribution",
      ],
    },
    {
      id: 8,
      title: "Business Support Grant",
      category: "support",
      description:
        "Access government grants and support for business development.",
      icon: TrendingUp,
      processingTime: "30-45 days",
      cost: "Free",
      requirements: [
        "Business plan",
        "Financial projections",
        "Market research",
        "Impact assessment",
      ],
      onlineAvailable: true,
      priority: "Low",
      benefits: [
        "Financial support",
        "Technical assistance",
        "Market access",
        "Capacity building",
      ],
    },
  ];

  const investmentSectors = [
    {
      name: "Agriculture",
      growth: "12%",
      opportunities: [
        "Coffee processing",
        "Horticulture",
        "Livestock",
        "Agro-processing",
      ],
      icon: TrendingUp,
    },
    {
      name: "Manufacturing",
      growth: "8%",
      opportunities: [
        "Textiles",
        "Food processing",
        "Construction materials",
        "Furniture",
      ],
      icon: Factory,
    },
    {
      name: "Tourism",
      growth: "15%",
      opportunities: [
        "Eco-tourism",
        "Cultural tourism",
        "Hospitality",
        "Adventure tourism",
      ],
      icon: Globe,
    },
    {
      name: "Technology",
      growth: "25%",
      opportunities: [
        "Software development",
        "Digital services",
        "E-commerce",
        "IT infrastructure",
      ],
      icon: Zap,
    },
  ];

  const quickActions = [
    {
      icon: FileText,
      label: "Start Business",
      color: "bg-yellow-100 text-yellow-600",
      description: "Begin your business registration",
    },
    {
      icon: Download,
      label: "Download Forms",
      color: "bg-yellow-100 text-yellow-600",
      description: "All required application forms",
    },
    {
      icon: Calendar,
      label: "Book Consultation",
      color: "bg-yellow-100 text-yellow-600",
      description: "Meet with business advisors",
    },
    {
      icon: BarChart3,
      label: "Market Research",
      color: "bg-yellow-100 text-yellow-600",
      description: "Access market data & reports",
    },
  ];

  const filteredServices =
    activeCategory === "all"
      ? businessServices
      : businessServices.filter(
          (service) => service.category === activeCategory
        );

  const searchedServices = filteredServices.filter(
    (service) =>
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e]/90 text-white overflow-hidden">
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
              Business Services
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your gateway to starting, growing, and succeeding in business in
              Nadhii Gibee District
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search business services (e.g., registration, license, permit)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-3 px-5 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <Search className="absolute right-3 top-3 text-white" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#1a1a2e]">1,200+</div>
              <div className="text-gray-600">New Businesses Registered</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#1a1a2e]">85%</div>
              <div className="text-gray-600">Online Service Adoption</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#1a1a2e]">5 Days</div>
              <div className="text-gray-600">Average Processing Time</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#1a1a2e]">ETB 5.5M</div>
              <div className="text-gray-600">Investment Facilitated</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      {/* <section className="py-8 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setActiveTab("services")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "services"
                  ? "bg-[#1a1a2e] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-yellow-50"
              }`}
            >
              Business Services
            </button>
            <button
              onClick={() => setActiveTab("sectors")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "sectors"
                  ? "bg-[#1a1a2e] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-yellow-50"
              }`}
            >
              Investment Sectors
            </button>
            <button
              onClick={() => setActiveTab("incentives")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "incentives"
                  ? "bg-[#1a1a2e] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-yellow-50"
              }`}
            >
              Incentives
            </button>
            <button
              onClick={() => setActiveTab("support")}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === "support"
                  ? "bg-[#1a1a2e] text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-yellow-50"
              }`}
            >
              Support Programs
            </button>
          </div>
        </div>
      </section> */}

      {/* Quick Actions */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center group"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-lg ${action.color} mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={32} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {action.label}
                  </h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {/* <section className="py-8 bg-yellow-50 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : "bg-white text-gray-700 hover:bg-yellow-50"
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400">
                <option>Sort by: Most Popular</option>
                <option>Processing Time</option>
                <option>Cost</option>
                <option>Alphabetical</option>
              </select>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Filter size={18} className="mr-2" />
                Advanced Filter
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Main Content Area */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          {activeTab === "services" && (
            <>
              {searchedServices.length === 0 ? (
                <div className="text-center py-12">
                  <Search size={48} className="text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No services found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchedServices.map((service) => {
                    const Icon = service.icon;
                    return (
                      <div
                        key={service.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                      >
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e] text-white`}
                            >
                              <Icon size={24} />
                            </div>
                            <div className="flex flex-col items-end">
                              {service.onlineAvailable && (
                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                                  Online Available
                                </span>
                              )}
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  service.priority === "High"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : service.priority === "Medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {service.priority} Priority
                              </span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="flex items-center text-sm text-gray-500 mb-1">
                                <Clock size={14} className="mr-1" />
                                Processing
                              </div>
                              <div className="font-medium text-gray-900">
                                {service.processingTime}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center text-sm text-gray-500 mb-1">
                                <Banknote size={14} className="mr-1" />
                                Cost
                              </div>
                              <div className="font-medium text-gray-900">
                                {service.cost}
                              </div>
                            </div>
                          </div>

                          <button
                            onClick={() => setSelectedService(service)}
                            className="w-full bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center group-hover:scale-105 transition-transform"
                          >
                            View Details
                            <ArrowRight size={16} className="ml-2" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {activeTab === "sectors" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {investmentSectors.map((sector, index) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg text-yellow-600 mr-4">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {sector.name}
                        </h3>
                        <p className="text-yellow-600 font-medium">
                          Growth: {sector.growth}/year
                        </p>
                      </div>
                    </div>

                    <h4 className="font-bold text-gray-900 mb-2">
                      Investment Opportunities:
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {sector.opportunities.map((opportunity, i) => (
                        <span
                          key={i}
                          className="bg-yellow-50 text-yellow-800 text-sm px-3 py-1 rounded-full"
                        >
                          {opportunity}
                        </span>
                      ))}
                    </div>

                    <button className="text-yellow-600 font-medium flex items-center hover:text-yellow-700">
                      Explore Sector Details
                      <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === "incentives" && (
            <div className="bg-white rounded-2xl p-8 shadow-md border border-yellow-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Business Incentives in Nadhii Gibee District
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: "Tax Holidays",
                    description:
                      "Income tax exemption for up to 7 years for eligible investments",
                    icon: Banknote,
                    color: "bg-yellow-100 text-yellow-700",
                  },
                  {
                    title: "Customs Duty Exemption",
                    description:
                      "Duty-free import of capital goods and construction materials",
                    icon: Shield,
                    color: "bg-yellow-100 text-yellow-700",
                  },
                  {
                    title: "Land Access",
                    description:
                      "Preferential access to industrial zones and commercial land",
                    icon: MapPin,
                    color: "bg-yellow-100 text-yellow-700",
                  },
                  {
                    title: "Training Grants",
                    description:
                      "Financial support for employee training and capacity building",
                    icon: Users,
                    color: "bg-yellow-100 text-yellow-700",
                  },
                ].map((incentive, index) => {
                  const Icon = incentive.icon;
                  return (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${incentive.color} mr-3`}
                        >
                          <Icon size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">
                          {incentive.title}
                        </h3>
                      </div>
                      <p className="text-gray-600">{incentive.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Business Advisory",
                  description:
                    "Free consultation services for business planning and development",
                  services: [
                    "Business plan development",
                    "Market research",
                    "Financial planning",
                    "Legal advice",
                  ],
                },
                {
                  title: "Funding Support",
                  description:
                    "Access to various funding mechanisms and financial institutions",
                  services: [
                    "Loan facilitation",
                    "Grant applications",
                    "Investor matching",
                    "Credit guarantees",
                  ],
                },
                {
                  title: "Market Access",
                  description:
                    "Programs to help businesses reach local and international markets",
                  services: [
                    "Trade exhibitions",
                    "Buyer-seller meetings",
                    "Export assistance",
                    "Digital marketing",
                  ],
                },
                {
                  title: "Technical Support",
                  description:
                    "Technical assistance for product development and quality improvement",
                  services: [
                    "Technology transfer",
                    "Quality certification",
                    "Product development",
                    "Standards compliance",
                  ],
                },
              ].map((support, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {support.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{support.description}</p>
                  <ul className="space-y-2">
                    {support.services.map((service, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle
                          size={16}
                          className="text-yellow-600 mr-2"
                        />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section> */}

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-[#1a1a2e] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedService.category.toUpperCase()}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {selectedService.title}
                  </h2>
                  <p className="text-gray-600">{selectedService.description}</p>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-yellow-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Service Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Processing Time</span>
                      <span className="font-medium">
                        {selectedService.processingTime}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cost</span>
                      <span className="font-medium">
                        {selectedService.cost}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Online Available</span>
                      <span className="font-medium">
                        {selectedService.onlineAvailable ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priority</span>
                      <span className="font-medium">
                        {selectedService.priority}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Key Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedService.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle
                          size={16}
                          className="text-yellow-600 mr-2"
                        />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedService.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Service Points
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <MapPin size={16} className="mr-2" />
                      Nadhii Gibee District Trade Bureau
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin size={16} className="mr-2" />
                      All Woreda Administration Offices
                    </div>
                    {selectedService.onlineAvailable && (
                      <div className="flex items-center text-yellow-600">
                        <CheckCircle size={16} className="mr-2" />
                        Available through Online Portal
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  {selectedService.onlineAvailable
                    ? "Apply Online"
                    : "Start Application"}
                  <ArrowRight size={18} className="ml-2" />
                </button>
                <button className="bg-white border border-[#1a1a2e] text-[#1a1a2e] hover:bg-yellow-50 font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <Download size={18} className="mr-2" />
                  Download Forms
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <Phone size={18} className="mr-2" />
                  Get Assistance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Stories */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Business <span className="text-[#1a1a2e]">Success Stories</span>
            </h2>
            <p className="text-lg text-gray-600">
              Entrepreneurs who have successfully established businesses in
              Nadhii Gibee District
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Kaleb Coffee Export",
                sector: "Agro-processing",
                story:
                  "Expanded from local market to international exports with government support",
                impact: "Created 50+ jobs, ETB 2M annual revenue",
              },
              {
                name: "Jimma Textile Hub",
                sector: "Manufacturing",
                story:
                  "Established modern textile factory with investment incentives",
                impact: "100+ employees, supplying national market",
              },
              {
                name: "Green Valley Agro",
                sector: "Agriculture",
                story:
                  "Leveraged agricultural support programs to scale operations",
                impact: "Supplying major supermarkets across Ethiopia",
              },
            ].map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {story.name}
                </h3>
                <span className="bg-yellow-100 text-yellow-800 text-sm px-2 py-1 rounded-full mb-3 inline-block">
                  {story.sector}
                </span>
                <p className="text-gray-600 mb-4">{story.story}</p>
                <div className="text-[#1a1a2e] font-medium">{story.impact}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Business?
            </h2>
            <p className="text-xl mb-8">
              Our business development team is ready to help you succeed in
              Nadhii Gibee District
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Business Bureau
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Stay Updated on{" "}
              <span className="text-[#1a1a2e]">Business Opportunities</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get the latest information on investment opportunities,
              incentives, and business news
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white border border-gray-300 rounded-full px-6 py-3 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
              />
              <button className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
                Subscribe to Updates
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessServicesPage;
