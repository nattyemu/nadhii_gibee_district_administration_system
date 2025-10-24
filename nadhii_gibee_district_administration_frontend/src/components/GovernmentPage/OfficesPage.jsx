import React, { useState } from "react";
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
const OfficesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const officeCategories = [
    { id: "all", label: "All Sectors", icon: Building2 },
    { id: "administrative", label: "Administrative", icon: Shield },
    { id: "health", label: "Health", icon: HeartPulse },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "agriculture", label: "Agriculture", icon: Sprout },
    { id: "infrastructure", label: "Infrastructure", icon: Car },
  ];

  const offices = [
    {
      id: 1,
      name: "Nadhii Gibee District Administration Sectors",
      category: "administrative",
      description:
        "The main administrative center for Nadhii Gibee District governance and policy implementation.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      address: "Jimma City Center, Main Road, Jimma",
      phone: "+251 47 111 0000",
      email: "admin@jimmazone.gov.et",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM, Sat: 9:00 AM - 12:00 PM",
      services: [
        "Document Services",
        "Permits",
        "Licenses",
        "Public Information",
      ],
      officials: [
        "Ato Kebede Chala - Chief Administrator",
        "Woro Abebe Teshome - Deputy Administrator",
      ],
      stats: { employees: 150, departments: 12, serving: "2.5M people" },
    },
    {
      id: 2,
      name: "Health Department Sector",
      category: "health",
      description:
        "Coordinating healthcare services and public health initiatives across Nadhii Gibee District.",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80",
      address: "Health Compound, Near Jimma Hospital, Jimma",
      phone: "+251 47 111 0100",
      email: "health@jimmazone.gov.et",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM, Sat: 9:00 AM - 1:00 PM",
      services: [
        "Health Programs",
        "Disease Control",
        "Hospital Coordination",
        "Public Health",
      ],
      officials: [
        "Dr. Selamawit Bekele - Head of Health",
        "Dr. Mohammed Ahmed - Public Health Director",
      ],
      stats: { employees: 85, facilities: 47, serving: "All Kebeles" },
    },
    {
      id: 3,
      name: "Education Sector",
      category: "education",
      description:
        "Overseeing educational institutions and programs throughout Nadhii Gibee District.",
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      address: "Education Complex, Next to Jimma University, Jimma",
      phone: "+251 47 111 0200",
      email: "education@jimmazone.gov.et",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM",
      services: [
        "School Administration",
        "Curriculum Development",
        "Teacher Training",
        "Student Programs",
      ],
      officials: [
        "Woro Tigist Lemma - Education Head",
        "Ato Solomon Bekele - Curriculum Director",
      ],
      stats: { employees: 120, schools: 350, students: "250,000+" },
    },
    {
      id: 4,
      name: "Agriculture Development Sector",
      category: "agriculture",
      description:
        "Supporting farmers and agricultural development across Nadhii Gibee District.",
      image:
        "https://images.unsplash.com/photo-1625246335525-f887eccf60ff?auto=format&fit=crop&w=800&q=80",
      address: "Agricultural Complex, Airport Road, Jimma",
      phone: "+251 47 111 0300",
      email: "agriculture@jimmazone.gov.et",
      hours: "Mon-Fri: 8:00 AM - 5:00 PM",
      services: [
        "Farmer Support",
        "Crop Development",
        "Irrigation Programs",
        "Market Access",
      ],
      officials: [
        "Ato Jemal Hussein - Agriculture Head",
        "Woro Aster Demissie - Rural Development Director",
      ],
      stats: { employees: 65, programs: 15, farmers: "100,000+" },
    },
    {
      id: 5,
      name: "Infrastructure Development Sector",
      category: "infrastructure",
      description:
        "Managing infrastructure projects and public works across Nadhii Gibee District.",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80",
      address: "Public Works Compound, Near Stadium, Jimma",
      phone: "+251 47 111 0400",
      email: "infrastructure@jimmazone.gov.et",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM",
      services: [
        "Road Construction",
        "Building Projects",
        "Urban Planning",
        "Water Resources",
      ],
      officials: [
        "Ato Daniel Mekonnen - Infrastructure Head",
        "Ato Teshome Abebe - Urban Planning Director",
      ],
      stats: { employees: 90, projects: 25, roads: "1,200 km" },
    },
    {
      id: 6,
      name: "Finance and Economic Development Sector",
      category: "administrative",
      description:
        "Managing budget, revenue, and economic development programs for Nadhii Gibee District.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
      address: "Finance Building, City Center, Jimma",
      phone: "+251 47 111 0500",
      email: "finance@jimmazone.gov.et",
      hours: "Mon-Fri: 8:30 AM - 5:30 PM",
      services: [
        "Budget Planning",
        "Revenue Collection",
        "Economic Development",
        "Procurement",
      ],
      officials: [
        "Ato Samuel Tadesse - Finance Head",
        "Woro Hanna Girma - Economic Development Director",
      ],
      stats: { employees: 75, budget: "ETB 2.5B", projects: 30 },
    },
  ];

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
              <div className="text-2xl font-bold text-gray-900">15</div>
              <div className="text-gray-600">Government Sectors</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-700 rounded-full text-white mb-2">
                <Users size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">285+</div>
              <div className="text-gray-600">Government Employees</div>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-700 rounded-full text-white mb-2">
                <Award size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">120+</div>
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
                    {Object.entries(selectedOffice.stats).map(
                      ([key, value], index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg p-3 text-center"
                        >
                          <div className="font-bold text-gray-900">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                  <Navigation size={18} className="mr-2" />
                  Get Directions
                </button>
                <button className="bg-white border border-[#21203C] text-[#21203C] hover:bg-[#F5F4FF] font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center">
                  <Calendar size={18} className="mr-2" />
                  Schedule Visit
                </button>
              </div>
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
