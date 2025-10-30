import React, { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Search,
  Filter,
  ArrowRight,
  Download,
  Navigation,
  Calendar,
  BookOpen,
  Shield,
  Award,
  HeartPulse,
  GraduationCap,
  Sprout,
  Landmark,
  Banknote,
  Car,
  Eye,
} from "lucide-react";
import backgroundImage from "../../assets/sectore_bg.jpg";
import sectorService from "../../Service/sectorService";

const OfficesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const officeCategories = [
    { id: "all", label: "All Sectors", icon: Building2 },
    { id: "administrative", label: "Administrative", icon: Shield },
    { id: "health", label: "Health", icon: HeartPulse },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "agriculture", label: "Agriculture", icon: Sprout },
    { id: "infrastructure", label: "Infrastructure", icon: Car },
  ];

  useEffect(() => {
    fetchSectors();
  }, []);

  const fetchSectors = async () => {
    try {
      setLoading(true);
      const response = await sectorService.getSectors();

      if (response.success) {
        // Transform the backend data to match our frontend structure
        const transformedOffices = response.data.map((sector) => ({
          id: sector.id,
          name: sector.name,
          category: sector.category,
          description: sector.description,
          image: sector.image
            ? `${import.meta.env.VITE_BACKEND_URL || ""}${sector.image}`
            : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
          address: sector.address,
          phone: sector.phone,
          email: sector.email,
          hours: sector.hours,
          services: sector.services || [],
          officials: sector.officials || [],
          stats: {
            employees: sector.status?.employees || 0,
            departments: sector.status?.departments || 0,
            facilities: sector.status?.facilities || 0,
            schools: sector.status?.schools || 0,
            students: sector.status?.students || "",
            programs: sector.status?.programs || 0,
            farmers: sector.status?.farmers || "",
            projects: sector.status?.projects || 0,
            roads: sector.status?.roads || "",
            budget: sector.status?.budget || "",
            serving: getServingText(sector.category, sector.status),
          },
        }));

        setOffices(transformedOffices);
      } else {
        setError(response.message || "Failed to fetch sectors");
      }
    } catch (err) {
      // console.error("Error fetching sectors:", err);
      setError("Failed to load sectors data");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate serving text based on category and status
  const getServingText = (category, status) => {
    switch (category) {
      case "health":
        return status?.facilities
          ? `${status.facilities} facilities`
          : "All Kebeles";
      case "education":
        return status?.students;
      case "agriculture":
        return status?.farmers;
      case "infrastructure":
        return status?.roads;
      case "administrative":
        return "2.5M people";
      default:
        return "All Kebeles";
    }
  };

  const filteredOffices =
    activeCategory === "all"
      ? offices
      : offices.filter((office) => office.category === activeCategory);

  const searchedOffices = filteredOffices.filter(
    (office) =>
      office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      office.services.some((service) =>
        service.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Calculate statistics from actual data
  const totalEmployees = offices.reduce(
    (sum, office) => sum + (office.stats.employees || 0),
    0
  );
  const totalServices = offices.reduce(
    (sum, office) => sum + (office.services?.length || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sectors data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-2">Error Loading Sectors</h2>
            <p>{error}</p>
            <button
              onClick={fetchSectors}
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
              Government Sectors
            </h1>
            <p className="text-xl text-[#E5E4FF] mb-8">
              Discover the various government Sectors serving the Nadhii Gibee
              District community
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#21203C]/80 rounded-full">
              <Building2 size={20} className="mr-2" />
              Serving the People of Jimma
            </div>
          </div>
        </div>
      </section>

      {/* Office Statistics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#F5F4FF] rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#21203C] rounded-full text-white mb-2">
                <Building2 size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {offices.length}
              </div>
              <div className="text-gray-600">Government Sectors</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-700 rounded-full text-white mb-2">
                <Users size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {totalEmployees}+
              </div>
              <div className="text-gray-600">Government Employees</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-700 rounded-full text-white mb-2">
                <Award size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {totalServices}+
              </div>
              <div className="text-gray-600">Services Offered</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-700 rounded-full text-white mb-2">
                <MapPin size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">25</div>
              <div className="text-gray-600">Kebeles Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="py-8 bg-[#F5F4FF] sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {officeCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-[#21203C] text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-[#F5F4FF]"
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search Sectors or services..."
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
          </div>
        </div>
      </section>

      {/* Offices Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {searchedOffices.length === 0 ? (
            <div className="text-center py-12">
              <Building2 size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No Sectors found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedOffices.map((office) => (
                <div
                  key={office.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={office.image}
                      alt={office.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#21203C] text-white px-2 py-1 rounded-full text-xs font-medium">
                      {office.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {office.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {office.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <MapPin size={14} className="mr-1" />
                      <span className="truncate">{office.address}</span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {office.services.slice(0, 3).map((service, index) => (
                        <span
                          key={index}
                          className="bg-[#F5F4FF] text-[#21203C] text-xs px-2 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                      {office.services.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                          +{office.services.length - 3} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedOffice(office)}
                      className="w-full bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Office Detail Modal */}
      {selectedOffice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img
                src={selectedOffice.image}
                alt={selectedOffice.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedOffice(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 transition-colors duration-300"
              >
                ✕
              </button>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="bg-[#21203C] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {selectedOffice.category.toUpperCase()}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">
                    {selectedOffice.name}
                  </h2>
                  <p className="text-gray-600">{selectedOffice.description}</p>
                </div>
                <button className="bg-[#F5F4FF] text-[#21203C] p-2 rounded-lg hover:bg-[#E5E4FF] transition-colors duration-300">
                  <Download size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <MapPin size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">
                        {selectedOffice.address}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">
                        {selectedOffice.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Mail size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">
                        {selectedOffice.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">
                        {selectedOffice.hours}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Key Officials
                  </h3>
                  <ul className="space-y-2">
                    {selectedOffice.officials.map((official, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-[#21203C] rounded-full mr-3"></div>
                        <span className="text-gray-700">{official}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Services Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedOffice.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-[#F5F4FF] text-[#21203C] px-3 py-1 rounded-full text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    Sector Statistics
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedOffice.stats)
                      .filter(
                        ([key, value]) => value && value !== "" && value !== 0
                      )
                      .map(([key, value], index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 text-center"
                        >
                          <div className="font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-between">
                <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                  <Navigation size={18} className="mr-2" />
                  Get Directions
                </button>
                <button className="bg-white border border-[#21203C] text-[#21203C] hover:bg-[#F5F4FF] font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Schedule Visit
                </button>
              </div> */}
            </div>
          </div>
        </div>
      )}

      {/* Services Section */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Government <span className="text-[#21203C]">Services</span>
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive services offered by Nadhii Gibee District government
              Sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Document Services",
                description: "Certificates, licenses, and official documents",
                icon: BookOpen,
                color: "bg-blue-100 text-blue-700",
              },
              {
                title: "Health Services",
                description: "Healthcare programs and medical services",
                icon: HeartPulse,
                color: "bg-red-100 text-red-700",
              },
              {
                title: "Education Services",
                description: "School programs and educational support",
                icon: GraduationCap,
                color: "bg-purple-100 text-purple-700",
              },
              {
                title: "Agricultural Support",
                description: "Farming assistance and rural development",
                icon: Sprout,
                color: "bg-green-100 text-green-700",
              },
              {
                title: "Infrastructure",
                description: "Construction and development projects",
                icon: Car,
                color: "bg-amber-100 text-amber-700",
              },
              {
                title: "Financial Services",
                description: "Budget, revenue, and economic programs",
                icon: Banknote,
                color: "bg-emerald-100 text-emerald-700",
              },
              {
                title: "Administrative",
                description: "Governance and public administration",
                icon: Shield,
                color: "bg-gray-100 text-gray-700",
              },
              {
                title: "Legal Services",
                description: "Legal documentation and compliance",
                icon: Landmark,
                color: "bg-indigo-100 text-indigo-700",
              },
            ].map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${service.color} mb-4`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sectors <span className="text-[#21203C]">Locations</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find government sectors across Nadhii Gibee District
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-md border border-[#F5F4FF]">
            <div className="h-96 bg-gradient-to-r from-[#F5F4FF] to-[#E5E4FF] rounded-xl relative">
              {/* This would be replaced with an actual interactive map component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <MapPin size={48} className="text-[#21203C] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Interactive Office Map
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore government office locations across Nadhii Gibee
                    District
                  </p>
                  <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto">
                    <Eye size={18} className="mr-2" />
                    View Interactive Map
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help Finding an Office?
            </h2>
            <p className="text-xl mb-8">
              Our administration team can help you find the right office for
              your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Assistance
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Download Directory
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfficesPage;
