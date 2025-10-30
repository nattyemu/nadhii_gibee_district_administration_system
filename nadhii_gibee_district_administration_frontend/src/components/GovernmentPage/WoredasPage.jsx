import React, { useState, useEffect } from "react";
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
import kebeleService from "../../Service/kebeleService";

const WoredasPage = () => {
  const [activeWoreda, setActiveWoreda] = useState(null);
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [woredas, setWoredas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKebeles();
  }, []);

  const fetchKebeles = async () => {
    try {
      setLoading(true);
      const response = await kebeleService.getKebeles();

      if (response.success && response.data.length > 0) {
        // Transform the backend data to match our frontend structure
        const transformedWoredas = response.data.map((kebele) => ({
          id: kebele.id,
          name: kebele.name,
          type: kebele.type,
          population: kebele.population,
          area: kebele.area,
          elevation: kebele.elevation,
          image: kebele.image,
          description: kebele.description,
          features: kebele.features || [],
          contact: {
            mayor: kebele.contact?.administrator || "Administrator",
            phone: kebele.contact?.phone || "Not available",
            email: kebele.contact?.email || "Not available",
          },
          stats: {
            schools: kebele.status?.schools || 0,
            healthCenters: kebele.status?.healthCenters || 0,
            roads: kebele.status?.roads || "Not available",
            developmentIndex: kebele.status?.developmentIndex || "Medium",
          },
        }));

        setWoredas(transformedWoredas);
        // Set the first kebele as active by default
        if (transformedWoredas.length > 0) {
          setActiveWoreda(transformedWoredas[0].id);
        }
      } else {
        setError(response.message || "No kebeles data available");
      }
    } catch (err) {
      // console.error("Error fetching kebeles:", err);
      setError("Failed to load kebeles data");
    } finally {
      setLoading(false);
    }
  };

  const currentWoreda = woredas.find((woreda) => woreda.id === activeWoreda);
  const filteredWoredas = woredas.filter(
    (woreda) =>
      woreda.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      woreda.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      woreda.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };
  // Calculate statistics from actual data
  const woredaStats = {
    totalWoredas: woredas.length,
    totalPopulation:
      woredas
        .reduce((sum, woreda) => {
          const pop = parseInt(woreda.population.replace(/[^\d]/g, "")) || 0;
          return sum + pop;
        }, 0)
        .toLocaleString() + "+",
    totalArea:
      woredas
        .reduce((sum, woreda) => {
          const area = parseFloat(woreda.area.replace(/[^\d.]/g, "")) || 0;
          return sum + area;
        }, 0)
        .toFixed(0) + " km²",
    averageElevation:
      woredas.length > 0
        ? Math.round(
            woredas.reduce((sum, woreda) => {
              const elev =
                parseInt(woreda.elevation.replace(/[^\d]/g, "")) || 0;
              return sum + elev;
            }, 0) / woredas.length
          ) + " m"
        : "0 m",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading kebeles data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">Error Loading Kebeles</h2>
            <p>{error}</p>
            <button
              onClick={fetchKebeles}
              className="mt-4 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

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
              {woredas.length} Unique kebeles
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

      {/* Search and Filter Section */}
      <section className="py-8 bg-[#21203C]/20 sticky top-0 z-20 shadow-md">
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
      </section>

      {/* Woreda Navigation and Content */}
      <section className="py-12">
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
                    <span className="font-medium">{woredas.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Urban Kebeles</span>
                    <span className="font-medium">
                      {
                        woredas.filter(
                          (w) =>
                            w.type.toLowerCase().includes("urban") ||
                            w.type.toLowerCase().includes("city")
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rural Kebeles</span>
                    <span className="font-medium">
                      {
                        woredas.filter((w) =>
                          w.type.toLowerCase().includes("rural")
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Population</span>
                    <span className="font-medium">
                      {woredaStats.totalPopulation}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Area</span>
                    <span className="font-medium">{woredaStats.totalArea}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              {currentWoreda && (
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#21203C]/20">
                  <div className="relative h-64">
                    <img
                      src={getImageUrl(currentWoreda.image)}
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
                            Kebele Administrator
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

                    {/* <div className="flex justify-between mt-6">
                      <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                        <Eye size={18} className="mr-2" />
                        View Detailed Profile
                      </button>
                      <button className="bg-white border border-[#21203C] text-[#21203C] hover:bg-[#21203C]/5 font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                        <Navigation size={18} className="mr-2" />
                        Get Directions
                      </button>
                    </div> */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 bg-[#F5F4FF]">
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
                    Interactive map showing all {woredas.length} kebeles of
                    Nadhii Gibee District
                  </p>
                  <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                    Explore Interactive Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Programs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kebele Development{" "}
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
              kebeles in Nadhii Gibee District
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white hover:bg-gray-100 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300"
              >
                Contact Administration
              </Link>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Download Kebele Profiles
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WoredasPage;
