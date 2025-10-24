import React, { useState } from "react";
import {
  Building2,
  Users,
  Layers,
  Network,
  ArrowRightLeft,
  Target,
  BarChart3,
  Eye,
  EyeOff,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Building,
  HeartPulse,
  GraduationCap,
  Sprout,
  Landmark,
  BanknoteIcon as Banknote,
} from "lucide-react";
import backgroundImage from "../../assets/structure.jpg";
const StructurePage = () => {
  const [viewMode, setViewMode] = useState("hierarchy");
  const [expandedSections, setExpandedSections] = useState([
    "executive",
    "departments",
  ]);
  const [zoomLevel, setZoomLevel] = useState(100);

  const toggleSection = (section) => {
    if (expandedSections.includes(section)) {
      setExpandedSections(expandedSections.filter((s) => s !== section));
    } else {
      setExpandedSections([...expandedSections, section]);
    }
  };

  const organizationalStructure = {
    executive: {
      title: "Executive Leadership",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      members: [
        { name: "Ato Kebede Chala", position: "Zone Administrator" },
        { name: "Woro Abebe Teshome", position: "Deputy Administrator" },
        { name: "Ato Getachew Wolde", position: "Chief of Staff" },
      ],
    },
    departments: {
      title: "Departments & Bureaus",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      children: {
        health: {
          title: "Health Department",
          icon: HeartPulse,
          color: "bg-yellow-100 text-yellow-700",
          description:
            "Overseeing healthcare services, hospitals, and public health initiatives",
          units: [
            "Public Health",
            "Hospital Services",
            "Disease Prevention",
            "Health Education",
          ],
        },
        education: {
          title: "Education Office",
          icon: GraduationCap,
          color: "bg-yellow-100 text-yellow-700",
          description:
            "Managing schools, educational programs, and teacher development",
          units: [
            "Primary Education",
            "Secondary Education",
            "Vocational Training",
            "Curriculum Development",
          ],
        },
        agriculture: {
          title: "Agriculture Bureau",
          icon: Sprout,
          color: "bg-yellow-100 text-yellow-700",
          description:
            "Supporting farmers, agricultural development, and food security",
          units: [
            "Crop Development",
            "Livestock",
            "Irrigation",
            "Agricultural Extension",
          ],
        },
        finance: {
          title: "Finance & Economic Development",
          icon: Banknote,
          color: "bg-yellow-100 text-yellow-700",
          description:
            "Managing budget, revenue collection, and economic development programs",
          units: [
            "Budget Planning",
            "Revenue Collection",
            "Economic Development",
            "Procurement",
          ],
        },
        infrastructure: {
          title: "Infrastructure Development",
          icon: Building,
          color: "bg-yellow-100 text-yellow-700",
          description:
            "Overseeing roads, buildings, and public infrastructure projects",
          units: [
            "Road Construction",
            "Public Buildings",
            "Water Resources",
            "Urban Planning",
          ],
        },
        trade: {
          title: "Trade & Industry",
          icon: Landmark,
          color: "bg-yellow-100 text-yellow-700",
          description:
            "Promoting business development, trade, and industrial growth",
          units: [
            "Business Licensing",
            "Market Development",
            "Industry Promotion",
            "Consumer Protection",
          ],
        },
      },
    },
    woredas: {
      title: "Woreda Administrations",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      description: "21 Kebele  under Nadhii Gibee District Administration",
      count: 21,
    },
  };

  const stats = [
    { value: "2,500+", label: "Employees", icon: Users },
    { value: "25", label: "Kebeles", icon: MapPin },
    { value: "15", label: "Sctors", icon: Building2 },
    { value: "27", label: "Health Facilities", icon: HeartPulse },
    { value: "250+", label: "Schools", icon: GraduationCap },
  ];

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
              Organizational Structure
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Understanding how Nadhii Gibee District Administration is
              organized to serve you better
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#1a1a2e]/80 rounded-full">
              <Layers size={20} className="mr-2" />
              Transparent Governance Structure
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="text-center p-4 bg-yellow-50 rounded-xl"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-[#1a1a2e] rounded-full text-white mb-2">
                    <Icon size={24} />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* View Controls */}
      <section className="py-8 bg-yellow-50 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <span className="font-medium mr-4">View:</span>
              <div className="flex bg-white rounded-lg p-1">
                <button
                  onClick={() => setViewMode("hierarchy")}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    viewMode === "hierarchy"
                      ? "bg-[#1a1a2e] text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Network size={18} className="inline mr-2" />
                  Hierarchy
                </button>
                <button
                  onClick={() => setViewMode("detailed")}
                  className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                    viewMode === "detailed"
                      ? "bg-[#1a1a2e] text-white"
                      : "text-gray-700"
                  }`}
                >
                  <BarChart3 size={18} className="inline mr-2" />
                  Detailed
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                <Download size={18} />
              </button>
              <div className="flex items-center bg-white rounded-lg p-1">
                <button
                  onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                  className="p-1 text-gray-700 hover:text-yellow-600"
                >
                  <ZoomOut size={18} />
                </button>
                <span className="px-2 text-sm font-medium">{zoomLevel}%</span>
                <button
                  onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
                  className="p-1 text-gray-700 hover:text-yellow-600"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organizational Chart */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Nadhii Gibee District Organizational Structure
              </h2>
              <button className="text-yellow-600 font-medium flex items-center">
                <Download size={18} className="mr-2" />
                Download Chart
              </button>
            </div>

            <div className="relative overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Top Level - Executive */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e] text-white rounded-xl p-6 text-center w-64 shadow-lg">
                    <h3 className="font-bold text-lg mb-2">
                      Nadhii Gibee District Administration
                    </h3>
                    <p className="text-white/90 text-sm">Governing Body</p>
                  </div>
                </div>

                {/* Connector */}
                <div className="flex justify-center mb-8">
                  <div className="h-8 w-1 bg-yellow-300"></div>
                </div>

                {/* Executive Row */}
                <div className="flex justify-center mb-12">
                  <div className="bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e] text-white rounded-xl p-4 text-center w-56 shadow-md">
                    <h4 className="font-bold mb-1">Executive Office</h4>
                    <p className="text-white/90 text-xs">
                      Kebele Administrator & Deputy
                    </p>
                  </div>
                </div>

                {/* Departments Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(
                    organizationalStructure.departments.children
                  ).map(([key, dept]) => {
                    const Icon = dept.icon;
                    return (
                      <div
                        key={key}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <div
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${dept.color} mb-3`}
                        >
                          <Icon size={20} />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">
                          {dept.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {dept.description}
                        </p>
                        <button className="text-yellow-600 text-sm font-medium flex items-center">
                          View Details
                          <ArrowRightLeft size={14} className="ml-1" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Woredas Connector */}
                <div className="flex justify-center mt-12 mb-8">
                  <div className="h-8 w-1 bg-yellow-300"></div>
                </div>

                {/* Woredas Row */}
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e] text-white rounded-xl p-6 text-center w-72 shadow-lg">
                    <h3 className="font-bold text-lg mb-2">
                      25 Kebeles Administrations
                    </h3>
                    <p className="text-white/90 text-sm">
                      Local Government Units
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Department View */}
          {viewMode === "detailed" && (
            <div className="space-y-6">
              {Object.entries(organizationalStructure).map(([key, section]) => (
                <div
                  key={key}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(key)}
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-yellow-50 transition-colors duration-300"
                  >
                    <h3 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                    {expandedSections.includes(key) ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </button>

                  {expandedSections.includes(key) && (
                    <div className="p-6 border-t border-gray-200">
                      {key === "executive" && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {section.members.map((member, index) => (
                            <div
                              key={index}
                              className="bg-yellow-50 rounded-xl p-4"
                            >
                              <h4 className="font-bold text-gray-900">
                                {member.name}
                              </h4>
                              <p className="text-gray-600">{member.position}</p>
                              <div className="flex mt-3 space-x-2">
                                <button className="text-yellow-600 hover:text-yellow-700">
                                  <Mail size={16} />
                                </button>
                                <button className="text-yellow-600 hover:text-yellow-700">
                                  <Phone size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {key === "departments" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {Object.entries(section.children).map(
                            ([deptKey, dept]) => {
                              const Icon = dept.icon;
                              return (
                                <div
                                  key={deptKey}
                                  className="border border-gray-200 rounded-xl p-5 hover:border-yellow-300 transition-colors duration-300"
                                >
                                  <div className="flex items-start mb-4">
                                    <div
                                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${dept.color} mr-4`}
                                    >
                                      <Icon size={24} />
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-gray-900">
                                        {dept.title}
                                      </h4>
                                      <p className="text-gray-600 text-sm">
                                        {dept.description}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <h5 className="font-medium text-gray-900 mb-2">
                                      Units:
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                      {dept.units.map((unit, index) => (
                                        <span
                                          key={index}
                                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                                        >
                                          {unit}
                                        </span>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center">
                                    <button className="text-yellow-600 text-sm font-medium">
                                      Contact Department
                                    </button>
                                    <button className="text-gray-500 hover:text-yellow-600">
                                      <ArrowRightLeft size={16} />
                                    </button>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}

                      {key === "woredas" && (
                        <div className="text-center py-8">
                          <div className="bg-yellow-50 rounded-xl p-6 max-w-md mx-auto">
                            <h4 className="font-bold text-gray-900 mb-2">
                              {section.count} Woreda Administrations
                            </h4>
                            <p className="text-gray-600 mb-4">
                              {section.description}
                            </p>
                            <button className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                              View Woreda Directory
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our <span className="text-[#1a1a2e]">Structure Works</span>
            </h2>
            <p className="text-lg text-gray-600">
              Understanding the governance flow and decision-making process in
              Nadhii Gibee District Administration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full text-yellow-700 mb-4">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Policy Direction
              </h3>
              <p className="text-gray-600">
                Executive leadership sets strategic goals and policy direction
                for the zone
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full text-yellow-700 mb-4">
                <ArrowRightLeft size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Implementation
              </h3>
              <p className="text-gray-600">
                Departments and bureaus implement policies through programs and
                services
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full text-yellow-700 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Local Execution
              </h3>
              <p className="text-gray-600">
                Woreda administrations deliver services directly to communities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need More Information?
            </h2>
            <p className="text-xl mb-8">
              Contact our administrative office for detailed organizational
              information or departmental contacts
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Administration
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Download Directory
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StructurePage;
