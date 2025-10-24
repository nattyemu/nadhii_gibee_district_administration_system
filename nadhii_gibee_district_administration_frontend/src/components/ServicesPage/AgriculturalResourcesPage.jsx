import React, { useState } from "react";
import {
  Search,
  Filter,
  Sprout,
  Clock,
  CheckCircle,
  FileText,
  User,
  Building2,
  Car,
  Home,
  HeartPulse,
  GraduationCap,
  Shield,
  Download,
  Upload,
  Eye,
  Lock,
  Bell,
  HelpCircle,
  ArrowRight,
  Play,
  Star,
  TrendingUp,
  Smartphone,
  Laptop,
  Coffee,
  Wheat,
  Carrot,
  Trees,
  Droplets,
  Sun,
  CloudRain,
  Thermometer,
} from "lucide-react";
import backgroundImage from "../../assets/agricultural_hero.png";
const AgriculturalResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [applicationStep, setApplicationStep] = useState(1);

  const resourceCategories = [
    { id: "all", label: "All Resources", icon: Sprout, count: 28 },
    { id: "crops", label: "Crop Production", icon: Wheat, count: 12 },
    { id: "livestock", label: "Livestock", icon: User, count: 8 },
    { id: "technology", label: "Farm Technology", icon: TrendingUp, count: 5 },
    { id: "market", label: "Market Access", icon: Building2, count: 3 },
  ];

  const agriculturalResources = [
    {
      id: 1,
      title: "Coffee Farming Guide",
      category: "crops",
      description:
        "Complete guide for Arabica coffee cultivation, harvesting, and processing techniques.",
      icon: Coffee,
      processingTime: "Immediate Access",
      complexity: "Medium",
      popularity: 95,
      requirements: 3,
      onlineOnly: true,
      features: [
        "Soil preparation guide",
        "Pest management",
        "Harvesting techniques",
        "Processing methods",
      ],
    },
    {
      id: 2,
      title: "Teff Production Handbook",
      category: "crops",
      description:
        "Modern teff farming techniques and best practices for maximum yield.",
      icon: Wheat,
      processingTime: "Instant Download",
      complexity: "Easy",
      popularity: 88,
      requirements: 2,
      onlineOnly: true,
      features: [
        "Variety selection",
        "Soil requirements",
        "Fertilization guide",
        "Harvest timing",
      ],
    },
    {
      id: 3,
      title: "Maize Cultivation Program",
      category: "crops",
      description:
        "High-yield maize production techniques adapted for local conditions.",
      icon: Wheat,
      processingTime: "Free Access",
      complexity: "Medium",
      popularity: 76,
      requirements: 4,
      onlineOnly: false,
      features: [
        "Hybrid varieties",
        "Planting density",
        "Water management",
        "Storage solutions",
      ],
    },
    {
      id: 4,
      title: "Livestock Management",
      category: "livestock",
      description:
        "Comprehensive guide for cattle, sheep, and poultry farming.",
      icon: User,
      processingTime: "Digital Resource",
      complexity: "Medium",
      popularity: 92,
      requirements: 4,
      onlineOnly: true,
      features: [
        "Animal health",
        "Feed management",
        "Breeding programs",
        "Disease control",
      ],
    },
    {
      id: 5,
      title: "Irrigation Systems",
      category: "technology",
      description:
        "Modern irrigation techniques and water conservation methods.",
      icon: Droplets,
      processingTime: "Technical Guide",
      complexity: "High",
      popularity: 84,
      requirements: 3,
      onlineOnly: true,
      features: [
        "Drip irrigation",
        "Water scheduling",
        "System maintenance",
        "Cost analysis",
      ],
    },
    {
      id: 6,
      title: "Organic Farming Certification",
      category: "crops",
      description:
        "Guide to organic certification process and sustainable practices.",
      icon: Trees,
      processingTime: "Step-by-step Process",
      complexity: "Medium",
      popularity: 79,
      requirements: 6,
      onlineOnly: true,
      features: [
        "Certification requirements",
        "Documentation guide",
        "Inspection process",
        "Market benefits",
      ],
    },
    {
      id: 7,
      title: "Market Access Program",
      category: "market",
      description:
        "Connect with buyers and access premium markets for your produce.",
      icon: Building2,
      processingTime: "Registration Required",
      complexity: "Medium",
      popularity: 81,
      requirements: 4,
      onlineOnly: true,
      features: [
        "Buyer networks",
        "Price information",
        "Quality standards",
        "Logistics support",
      ],
    },
    {
      id: 8,
      title: "Climate Smart Agriculture",
      category: "technology",
      description:
        "Adapt farming practices to climate change with resilient techniques.",
      icon: Sun,
      processingTime: "Educational Resource",
      complexity: "Medium",
      popularity: 73,
      requirements: 5,
      onlineOnly: false,
      features: [
        "Weather adaptation",
        "Crop diversification",
        "Soil conservation",
        "Risk management",
      ],
    },
  ];

  const districtStats = {
    totalFarmers: "15,000+",
    agriculturalLand: "74,956 hectares",
    majorCrops: "15+ varieties",
    annualProduction: "Increasing 12% yearly",
  };

  const quickActions = [
    {
      icon: FileText,
      label: "Download Guides",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Eye,
      label: "View Resources",
      color: "from-[#21203C] to-[#2D2B4A]",
    },
    {
      icon: Download,
      label: "Technical Manuals",
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: HelpCircle,
      label: "Expert Support",
      color: "from-blue-500 to-blue-600",
    },
  ];

  const filteredResources =
    activeCategory === "all"
      ? agriculturalResources
      : agriculturalResources.filter(
          (resource) => resource.category === activeCategory
        );

  const searchedResources = filteredResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const majorCrops = [
    { name: "Coffee", icon: Coffee, area: "12,000 ha" },
    { name: "Teff", icon: Wheat, area: "8,500 ha" },
    { name: "Maize", icon: Wheat, area: "15,000 ha" },
    { name: "Beans", icon: Carrot, area: "5,200 ha" },
    { name: "Sorghum", icon: Wheat, area: "7,800 ha" },
    { name: "Barley", icon: Wheat, area: "4,300 ha" },
  ];

  const ResourceWizard = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedResource?.title}
              </h2>
              <p className="text-gray-600">
                Access this agricultural resource in{" "}
                {selectedResource?.requirements} simple steps
              </p>
            </div>
            <button
              onClick={() => setSelectedResource(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                Step {applicationStep} of {selectedResource?.requirements}
              </span>
              <span>
                {Math.round(
                  (applicationStep / selectedResource?.requirements) * 100
                )}
                % Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#21203C] h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${
                    (applicationStep / selectedResource?.requirements) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Step Content */}
          {applicationStep === 1 && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#21203C]/10 rounded-full text-[#21203C] mb-4">
                <FileText size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Access Agricultural Resource
              </h3>
              <p className="text-gray-600 mb-6">
                Get instant access to valuable farming knowledge and techniques.
              </p>
              <button
                onClick={() => setApplicationStep(2)}
                className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Get Resource
              </button>
            </div>
          )}

          {applicationStep === 2 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Farmer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="text"
                  placeholder="Kebele"
                  className="border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="border border-gray-300 rounded-lg p-3"
                />
                <input
                  type="text"
                  placeholder="Farm Size (hectares)"
                  className="border border-gray-300 rounded-lg p-3"
                />
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setApplicationStep(1)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setApplicationStep(3)}
                  className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {applicationStep > 2 &&
            applicationStep < selectedResource?.requirements && (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                  <Download size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Step {applicationStep}
                </h3>
                <p className="text-gray-600 mb-6">
                  Downloading resource materials...
                </p>
                <div className="flex justify-between">
                  <button
                    onClick={() => setApplicationStep(applicationStep - 1)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setApplicationStep(applicationStep + 1)}
                    className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

          {applicationStep === selectedResource?.requirements && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Resource Downloaded!
              </h3>
              <p className="text-gray-600 mb-6">
                Your agricultural resource has been successfully downloaded.
              </p>
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <p className="text-green-800 font-medium">
                  Resource ID: AG-{Date.now().toString().slice(-6)}
                </p>
                <p className="text-green-700 text-sm">
                  You can access this resource anytime from your dashboard.
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedResource(null);
                  setApplicationStep(1);
                }}
                className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Finish
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

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
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-md rounded-full px-4 py-2 text-sm mb-6">
              <Sprout size={16} className="mr-2" />
              Agricultural Development
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Agricultural Resources
            </h1>
            <p className="text-xl text-[#E5E4FF] mb-8">
              Access farming guides, technical resources, and modern
              agricultural practices for Nadhii Gibee District
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for agricultural resources (e.g., coffee, irrigation, crops)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-3 px-5 text-white placeholder-[#E5E4FF] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <Search className="absolute right-3 top-3 text-white" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* District Agricultural Stats */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#21203C]">
                {districtStats.totalFarmers}
              </div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#21203C]">
                {districtStats.agriculturalLand}
              </div>
              <div className="text-gray-600">Farm Land</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#21203C]">
                {districtStats.majorCrops}
              </div>
              <div className="text-gray-600">Crop Varieties</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-[#21203C]">
                {districtStats.annualProduction}
              </div>
              <div className="text-gray-600">Growth Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 bg-gradient-to-r from-[#F5F4FF] to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  className={`bg-gradient-to-r ${action.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 mx-auto">
                    <Icon size={32} />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{action.label}</h3>
                  <p className="text-white/80 text-sm">
                    Quick access to farming resources
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Major Crops Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Major{" "}
              <span className="text-[#21203C]">Agricultural Products</span>
            </h2>
            <p className="text-lg text-gray-600">
              Nadhii Gibee District is known for producing diverse crops across
              74,956 hectares
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {majorCrops.map((crop, index) => {
              const Icon = crop.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 bg-green-50 rounded-xl"
                >
                  <Icon className="text-green-600 mx-auto mb-2" size={32} />
                  <div className="font-bold text-gray-900">{crop.name}</div>
                  <div className="text-sm text-gray-600">{crop.area}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-8 bg-white sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {resourceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-[#21203C] text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-[#21203C]/5"
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {category.label}
                    <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <select className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C]">
                <option>Sort by: Most Popular</option>
                <option>Complexity Level</option>
                <option>Alphabetical</option>
                <option>Recently Added</option>
              </select>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Filter size={18} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchedResources.length === 0 ? (
            <div className="text-center py-12">
              <Search size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No resources found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedResources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={resource.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex flex-col items-end">
                          {resource.onlineOnly && (
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mb-2">
                              Digital Resource
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(
                              resource.complexity
                            )}`}
                          >
                            {resource.complexity}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {resource.description}
                      </p>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={14} className="mr-1" />
                          {resource.processingTime}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText size={14} className="mr-1" />
                          {resource.requirements} steps
                        </div>
                      </div>

                      {/* Popularity Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Popularity</span>
                          <span>{resource.popularity}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${resource.popularity}%` }}
                          ></div>
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedResource(resource)}
                        className="w-full bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center group-hover:scale-105 transition-transform"
                      >
                        Access Resource
                        <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Climate Information */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agricultural <span className="text-[#21203C]">Climate Zones</span>
            </h2>
            <p className="text-lg text-gray-600">
              Optimize your farming with climate-appropriate practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full text-blue-600 mb-4 mx-auto">
                <Thermometer size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Highland (12.8%)
              </h3>
              <p className="text-gray-600 mb-4">
                Ideal for temperate crops like barley, wheat, and potatoes
              </p>
              <div className="text-sm text-gray-500">
                Elevation: 2,200+ meters
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4 mx-auto">
                <Sun size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Midland (86.5%)
              </h3>
              <p className="text-gray-600 mb-4">
                Perfect for coffee, teff, maize, and most staple crops
              </p>
              <div className="text-sm text-gray-500">
                Elevation: 1,500-2,200 meters
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full text-amber-600 mb-4 mx-auto">
                <CloudRain size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Lowland (0.7%)
              </h3>
              <p className="text-gray-600 mb-4">
                Suitable for sorghum, millet, and heat-tolerant varieties
              </p>
              <div className="text-sm text-gray-500">
                Elevation: Below 1,500 meters
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Agricultural{" "}
              <span className="text-[#21203C]">Support Services</span>
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive support for farmers in Nadhii Gibee District
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: User,
                title: "Extension Services",
                description: "Expert agricultural advisors in all 25 kebeles",
              },
              {
                icon: Droplets,
                title: "Irrigation Support",
                description: "Modern water management systems and training",
              },
              {
                icon: TrendingUp,
                title: "Market Linkages",
                description: "Connect with buyers and access better prices",
              },
              {
                icon: Shield,
                title: "Crop Insurance",
                description: "Protect your harvest against climate risks",
              },
              {
                icon: Download,
                title: "Input Supply",
                description: "Quality seeds, fertilizers, and equipment",
              },
              {
                icon: Smartphone,
                title: "Digital Tools",
                description: "Mobile apps for weather and market information",
              },
              {
                icon: GraduationCap,
                title: "Training Programs",
                description: "Regular workshops and demonstration plots",
              },
              {
                icon: Building2,
                title: "Storage Facilities",
                description: "Modern storage to reduce post-harvest losses",
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#21203C]/10 rounded-full text-[#21203C] mb-4 mx-auto">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Agricultural Office */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Agricultural Support?
            </h2>
            <p className="text-xl mb-8">
              Our agricultural experts are ready to help you improve your
              farming practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Agriculture Office
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Schedule Farm Visit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Wizard */}
      {selectedResource && <ResourceWizard />}
    </div>
  );
};

export default AgriculturalResourcesPage;
