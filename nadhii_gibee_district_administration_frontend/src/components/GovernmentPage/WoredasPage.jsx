import React, { useState } from "react";
import {
  MapPin,
  Users,
  BarChart3,
  Search,
  Filter,
  ArrowRight,
  Download,
  Phone,
  Mail,
  Calendar,
  HeartPulse,
  GraduationCap,
  Sprout,
  Building2,
  Car,
  Eye,
  Navigation,
  BookOpen,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/woreda_hero.jpg";
const WoredasPage = () => {
  const [activeWoreda, setActiveWoreda] = useState("jimma");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const woredas = [
    {
      id: "jimma",
      name: "Jimma",
      type: "City Administration",
      population: "205,000",
      area: "50.2 km²",
      elevation: "1,780 m",
      image:
        "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
      description:
        "The capital city of Jimma Zone, known for its rich history as the former capital of the Jimma Kingdom and its vibrant commercial activity.",
      features: [
        "Commercial Hub",
        "Historical Sites",
        "Educational Centers",
        "Healthcare Facilities",
      ],
      contact: {
        mayor: "Ato Solomon Bekele",
        phone: "+251 47 111 1001",
        email: "jimma.admin@jimmazone.gov.et",
      },
      stats: {
        schools: 45,
        healthCenters: 8,
        roads: "120 km",
        developmentIndex: "High",
      },
    },
    {
      id: "limu",
      name: "Limu",
      type: "Rural Woreda",
      population: "120,000",
      area: "1,200 km²",
      elevation: "1,200 m",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80",
      description:
        "Known for its coffee production and agricultural activities, Limu is one of the major coffee-growing areas in the region.",
      features: [
        "Coffee Production",
        "Agricultural Zone",
        "Forest Areas",
        "Rural Development",
      ],
      contact: {
        mayor: "Woro Tigist Alemayehu",
        phone: "+251 47 111 2001",
        email: "limu.admin@jimmazone.gov.et",
      },
      stats: {
        schools: 32,
        healthCenters: 5,
        roads: "85 km",
        developmentIndex: "Medium",
      },
    },
    {
      id: "guma",
      name: "Guma",
      type: "Rural Woreda",
      population: "95,000",
      area: "950 km²",
      elevation: "1,650 m",
      image:
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80",
      description:
        "Guma woreda is characterized by its diverse agricultural production and beautiful natural landscapes.",
      features: [
        "Diverse Agriculture",
        "Natural Landscapes",
        "Eco-Tourism",
        "Water Resources",
      ],
      contact: {
        mayor: "Ato Getachew Wolde",
        phone: "+251 47 111 3001",
        email: "guma.admin@jimmazone.gov.et",
      },
      stats: {
        schools: 28,
        healthCenters: 4,
        roads: "70 km",
        developmentIndex: "Medium",
      },
    },
    {
      id: "kersa",
      name: "Kersa",
      type: "Rural Woreda",
      population: "110,000",
      area: "1,100 km²",
      elevation: "1,850 m",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
      description:
        "Kersa is known for its fertile land and is a major producer of cereals, pulses, and other agricultural products.",
      features: [
        "Cereal Production",
        "Fertile Land",
        "Agricultural Research",
        "Rural Industries",
      ],
      contact: {
        mayor: "Woro Aster Demissie",
        phone: "+251 47 111 4001",
        email: "kersa.admin@jimmazone.gov.et",
      },
      stats: {
        schools: 35,
        healthCenters: 6,
        roads: "95 km",
        developmentIndex: "Medium-High",
      },
    },
    {
      id: "mana",
      name: "Mana",
      type: "Rural Woreda",
      population: "85,000",
      area: "900 km²",
      elevation: "2,100 m",
      image:
        "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
      description:
        "Mana woreda features highland areas with unique biodiversity and is known for its honey production.",
      features: [
        "Highland Area",
        "Biodiversity",
        "Honey Production",
        "Forest Conservation",
      ],
      contact: {
        mayor: "Ato Mohammed Hassan",
        phone: "+251 47 111 5001",
        email: "mana.admin@jimmazone.gov.et",
      },
      stats: {
        schools: 25,
        healthCenters: 3,
        roads: "65 km",
        developmentIndex: "Medium",
      },
    },
    {
      id: "gomma",
      name: "Gomma",
      type: "Rural Woreda",
      population: "100,000",
      area: "1,050 km²",
      elevation: "1,700 m",
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      description:
        "Gomma is renowned for its cultural heritage and traditional practices alongside modern agricultural development.",
      features: [
        "Cultural Heritage",
        "Traditional Practices",
        "Modern Agriculture",
        "Community Tourism",
      ],
      contact: {
        mayor: "Ato Jemal Hussein",
        phone: "+251 47 111 6001",
        email: "gomma.admin@jimmazone.gov.et",
      },
      stats: {
        schools: 30,
        healthCenters: 5,
        roads: "80 km",
        developmentIndex: "Medium",
      },
    },
  ];

  const currentWoreda = woredas.find((woreda) => woreda.id === activeWoreda);
  const filteredWoredas = woredas.filter(
    (woreda) =>
      woreda.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      woreda.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      woreda.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const woredaStats = {
    totalWoredas: 25,
    totalPopulation: "190,000+",
    totalArea: "74,956 hectares",
    averageElevation: "1,700 m",
  };

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
              Kebeles of Nadhii Gibee District
            </h1>
            <p className="text-xl text-white mb-8">
              Discover the diverse kebeles that make up the beautiful Nadhii
              Gibee District
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#21203C]/80 rounded-full">
              <MapPin size={20} className="mr-2" />
              25 Unique kebeles
            </div>
          </div>
        </div>
      </section>

      {/* Woreda Statistics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#21203C]/5 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#21203C] rounded-full text-white mb-2">
                <MapPin size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {woredaStats.totalWoredas}
              </div>
              <div className="text-gray-600">Total kebeles</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-700 rounded-full text-white mb-2">
                <Users size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {woredaStats.totalPopulation}
              </div>
              <div className="text-gray-600">Total Population</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-700 rounded-full text-white mb-2">
                <BarChart3 size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {woredaStats.totalArea}
              </div>
              <div className="text-gray-600">Total Area</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-700 rounded-full text-white mb-2">
                <BarChart3 size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {woredaStats.averageElevation}
              </div>
              <div className="text-gray-600">Avg. Elevation</div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-8 bg-[#21203C]/20 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search kebeles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] w-full lg:w-80"
                />
              </div>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Filter size={20} className="mr-2" />
                Filter
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === "grid"
                      ? "bg-[#21203C] text-white"
                      : "text-gray-700"
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === "list"
                      ? "bg-[#21203C] text-white"
                      : "text-gray-700"
                  }`}
                >
                  List View
                </button>
              </div>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Download size={20} className="mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Woreda Navigation and Content */}
      {/* <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#21203C]/20">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  All Kebeles
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredWoredas.map((woreda) => (
                    <button
                      key={woreda.id}
                      onClick={() => setActiveWoreda(woreda.id)}
                      className={`w-full text-left p-4 rounded-lg transition-all duration-300 ${
                        activeWoreda === woreda.id
                          ? "bg-[#21203C] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-[#21203C]/5"
                      }`}
                    >
                      <div className="font-medium">{woreda.name}</div>
                      <div
                        className={`text-sm ${
                          activeWoreda === woreda.id
                            ? "text-[#21203C]/80"
                            : "text-gray-500"
                        }`}
                      >
                        {woreda.type}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md border border-[#21203C]/20 mt-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Zone Overview
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Kebeles</span>
                    <span className="font-medium">21</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urban Kebeles</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rural Kebeles</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Population</span>
                    <span className="font-medium">2.5 Million</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Area</span>
                    <span className="font-medium">15,000 km²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              {currentWoreda && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#21203C]/20">
                  <div className="relative h-64">
                    <img
                      src={currentWoreda.image}
                      alt={currentWoreda.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                      <h2 className="text-2xl font-bold">
                        {currentWoreda.name} Kebele
                      </h2>
                      <p className="text-[#21203C]/80">{currentWoreda.type}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="bg-[#21203C]/5 rounded-lg p-3 text-center">
                        <Users
                          size={20}
                          className="text-[#21203C] mx-auto mb-1"
                        />
                        <div className="font-bold text-gray-900">
                          {currentWoreda.population}
                        </div>
                        <div className="text-xs text-gray-600">Population</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <BarChart3
                          size={20}
                          className="text-blue-700 mx-auto mb-1"
                        />
                        <div className="font-bold text-gray-900">
                          {currentWoreda.area}
                        </div>
                        <div className="text-xs text-gray-600">Area</div>
                      </div>
                      <div className="bg-amber-50 rounded-lg p-3 text-center">
                        <BarChart3
                          size={20}
                          className="text-amber-700 mx-auto mb-1"
                        />
                        <div className="font-bold text-gray-900">
                          {currentWoreda.elevation}
                        </div>
                        <div className="text-xs text-gray-600">Elevation</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <Shield
                          size={20}
                          className="text-purple-700 mx-auto mb-1"
                        />
                        <div className="font-bold text-gray-900">
                          {currentWoreda.stats.developmentIndex}
                        </div>
                        <div className="text-xs text-gray-600">Development</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        About {currentWoreda.name}
                      </h3>
                      <p className="text-gray-600">
                        {currentWoreda.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">
                          Key Features
                        </h4>
                        <ul className="space-y-2">
                          {currentWoreda.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-2 h-2 bg-[#21203C] rounded-full mr-3"></div>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900 mb-3">
                          Statistics
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600 flex items-center">
                              <GraduationCap size={16} className="mr-2" />
                              Schools
                            </span>
                            <span className="font-medium">
                              {currentWoreda.stats.schools}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 flex items-center">
                              <HeartPulse size={16} className="mr-2" />
                              Health Centers
                            </span>
                            <span className="font-medium">
                              {currentWoreda.stats.healthCenters}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 flex items-center">
                              <Car size={16} className="mr-2" />
                              Road Network
                            </span>
                            <span className="font-medium">
                              {currentWoreda.stats.roads}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#21203C]/5 rounded-xl p-4 border border-[#21203C]/20">
                      <h4 className="font-bold text-gray-900 mb-3">
                        Contact Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-600 mb-1">
                            Woreda Administrator
                          </p>
                          <p className="font-medium">
                            {currentWoreda.contact.mayor}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Contact</p>
                          <div className="flex items-center text-gray-700 mb-1">
                            <Phone size={16} className="mr-2" />
                            {currentWoreda.contact.phone}
                          </div>
                          <div className="flex items-center text-gray-700">
                            <Mail size={16} className="mr-2" />
                            {currentWoreda.contact.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-6">
                      <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                        <Eye size={18} className="mr-2" />
                        View Detailed Profile
                      </button>
                      <button className="bg-white border border-[#21203C] text-[#21203C] hover:bg-[#21203C]/5 font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                        <Navigation size={18} className="mr-2" />
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section> */}

      {/* Interactive Map Section */}
      {/* <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Interactive <span className="text-[#21203C]">Map</span>
            </h2>
            <p className="text-lg text-gray-600">
              Explore the geographical distribution of kebeles across Nadhii
              Gibee District
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-[#21203C]/20">
            <div className="h-96 bg-gradient-to-r from-[#21203C]/10 to-[#2D2B4A]/10 rounded-xl relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin size={48} className="text-[#21203C] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Nadhii Gibee District Map
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Interactive map showing all 21 kebeles of Nadhii Gibee
                    District
                  </p>
                  <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    Explore Interactive Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Development Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Woreda Development{" "}
              <span className="text-[#21203C]">Programs</span>
            </h2>
            <p className="text-lg text-gray-600">
              Ongoing initiatives and development programs across Nadhii Gibee
              District kebeles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Rural Infrastructure",
                description:
                  "Road construction, water supply, and electrification projects",
                icon: Car,
                color: "bg-blue-100 text-blue-700",
              },
              {
                title: "Agricultural Development",
                description:
                  "Modern farming techniques and market access initiatives",
                icon: Sprout,
                color: "bg-[#21203C]/10 text-[#21203C]",
              },
              {
                title: "Education Enhancement",
                description:
                  "School construction and teacher training programs",
                icon: GraduationCap,
                color: "bg-purple-100 text-purple-700",
              },
              {
                title: "Healthcare Expansion",
                description:
                  "Clinic construction and healthcare worker training",
                icon: HeartPulse,
                color: "bg-red-100 text-red-700",
              },
              {
                title: "Urban Development",
                description:
                  "Urban planning and municipal service improvements",
                icon: Building2,
                color: "bg-amber-100 text-amber-700",
              },
              {
                title: "Cultural Preservation",
                description:
                  "Preserving cultural heritage and promoting tourism",
                icon: BookOpen,
                color: "bg-[#21203C]/10 text-[#21203C]",
              },
            ].map((program, index) => {
              const Icon = program.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${program.color} mb-4`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600">{program.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Kebele-Specific Information?
            </h2>
            <p className="text-xl mb-8">
              Contact our administration for detailed information about any
              kebeles in Contact our administration
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Contact Administration
              </Link>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Download kebele Profiles
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WoredasPage;
