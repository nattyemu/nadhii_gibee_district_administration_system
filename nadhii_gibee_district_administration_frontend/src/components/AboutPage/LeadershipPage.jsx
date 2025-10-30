import React, { useState, useEffect } from "react";
import {
  Users,
  Award,
  Shield,
  Mail,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  HeartHandshake,
  Target,
  Scale,
} from "lucide-react";
import cabineService from "../../Service/cabinesService";
import administratorService from "../../Service/administratorService";
import { toast } from "react-toastify";
import backgroundImage from "../../assets/leadership.jpg";

const LeadershipPage = () => {
  const [expandedProfile, setExpandedProfile] = useState(null);
  const [cabinets, setCabinets] = useState([]);
  const [administrator, setAdministrator] = useState(null);
  const [loading, setLoading] = useState(true);

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our actions and decisions.",
    },
    {
      icon: HeartHandshake,
      title: "Service",
      description:
        "We are committed to serving the people of Nadhii Gibee with dedication and compassion.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in all our programs and initiatives.",
    },
    {
      icon: Scale,
      title: "Accountability",
      description:
        "We take responsibility for our actions and are transparent in our governance.",
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch cabinets data
      const cabinetsResponse = await cabineService.getCabinets();
      if (cabinetsResponse.success) {
        setCabinets(cabinetsResponse.data);
      } else {
        // console.error("Failed to fetch cabinets:", cabinetsResponse.message);
        setCabinets([]);
      }

      // Fetch administrator data
      const adminResponse = await administratorService.getAdministrators();
      if (adminResponse.success && adminResponse.data.length > 0) {
        const adminData = adminResponse.data[0];
        let imageUrl = adminData.image;
        if (
          imageUrl &&
          !imageUrl.startsWith("http") &&
          !imageUrl.startsWith("blob:")
        ) {
          imageUrl = `${import.meta.env.VITE_BACKEND_URL || ""}${imageUrl}`;
        }
        setAdministrator({
          ...adminData,
          image: imageUrl || "",
        });
      } else {
        setAdministrator(null);
      }
    } catch (error) {
      // console.error("Error fetching data:", error);
      toast.error("Failed to load leadership data.");
      setCabinets([]);
      setAdministrator(null);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/api/placeholder/300/200";
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  const toggleProfile = (index) => {
    if (expandedProfile === index) {
      setExpandedProfile(null);
    } else {
      setExpandedProfile(index);
    }
  };

  // Transform cabinet data for leadership display
  const transformCabinetToLeader = (cabinet) => ({
    id: cabinet.id,
    name: cabinet.name,
    position: cabinet.position,
    title: cabinet.title,
    image: getImageUrl(cabinet.image),
    bio:
      cabinet.description ||
      `${cabinet.name} leads the ${cabinet.title} department with dedication and expertise.`,
    responsibilities: [
      cabinet.title,
      cabinet.position,
      "Department Leadership",
    ],
    email: cabinet.email,
    phone: cabinet.phone,
    achievements: [
      `Leading ${cabinet.title} initiatives`,
      "Department management and oversight",
      "Public service and community development",
    ],
  });

  // Get all cabinets as leaders
  const leaders = cabinets.map(transformCabinetToLeader);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leadership data...</p>
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
              Leadership & Governance
            </h1>
            <p className="text-xl text-[#E5E4FF] mb-8">
              Meet the dedicated team guiding Nadhii Gibee District towards
              prosperity and sustainable development
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#21203C]/80 rounded-full">
              <Shield size={20} className="mr-2" />
              Committed to Transparent Governance
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#21203C]">Guiding Principles</span>
            </h2>
            <p className="text-lg text-gray-600">
              The leadership of Nadhii Gibee District Administration is
              committed to these core values in serving our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-[#21203C]/5 rounded-2xl p-6 text-center group hover:bg-[#21203C]/10 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#21203C] rounded-full text-white mb-4 group-hover:bg-[#2D2B4A]">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#21203C] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[#21203C]/80">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {leaders.length === 0 ? (
            <div className="text-center py-12">
              <Users size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-600 mb-2">
                No Leadership Data Available
              </h3>
              <p className="text-gray-500">
                Leadership information will be available soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {leaders.map((leader, index) => (
                <div
                  key={leader.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <h3 className="text-xl font-bold">{leader.name}</h3>
                      <p className="text-[#E5E4FF]">{leader.position}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {leader.responsibilities.slice(0, 3).map((resp, i) => (
                        <span
                          key={i}
                          className="bg-[#21203C]/10 text-[#21203C] text-xs px-2 py-1 rounded-full"
                        >
                          {resp}
                        </span>
                      ))}
                    </div>

                    <p className="text-[#21203C]/80 mb-6 line-clamp-3">
                      {leader.bio}
                    </p>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => toggleProfile(index)}
                        className="text-[#21203C] font-medium flex items-center hover:text-[#21203C]/80"
                      >
                        {expandedProfile === index ? (
                          <>
                            <ChevronUp size={16} className="mr-1" />
                            Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown size={16} className="mr-1" />
                            Learn More
                          </>
                        )}
                      </button>

                      <div className="flex space-x-2">
                        {leader.email && (
                          <a
                            href={`mailto:${leader.email}`}
                            className="text-gray-500 hover:text-[#21203C]"
                          >
                            <Mail size={18} />
                          </a>
                        )}
                        {leader.phone && (
                          <a
                            href={`tel:${leader.phone}`}
                            className="text-gray-500 hover:text-[#21203C]"
                          >
                            <Phone size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    {expandedProfile === index && (
                      <div className="mt-6 pt-6 border-t border-gray-100">
                        <h4 className="font-bold text-[#21203C] mb-3">
                          Key Focus Areas
                        </h4>
                        <ul className="list-disc list-inside text-[#21203C]/80 space-y-2 mb-6">
                          {leader.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>

                        <div className="flex space-x-4">
                          {leader.email && (
                            <a
                              href={`mailto:${leader.email}`}
                              className="flex-1 bg-[#21203C] hover:bg-[#2D2B4A] text-white text-center py-2 px-4 rounded-lg transition-colors duration-300"
                            >
                              Send Message
                            </a>
                          )}
                          <button className="bg-[#21203C]/10 hover:bg-[#21203C]/20 text-[#21203C] p-2 rounded-lg transition-colors duration-300">
                            <MessageCircle size={20} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Organizational <span className="text-[#21203C]">Structure</span>
            </h2>
            <p className="text-lg text-[#21203C]/80">
              Understanding how Nadhii Gibee District Administration is
              organized to serve you better
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="relative h-96 bg-gradient-to-r from-[#21203C]/10 to-[#2D2B4A]/10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Users size={48} className="text-[#21203C] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Organizational Chart
                  </h3>
                  <p className="text-[#21203C]/80">
                    Interactive organizational structure of Nadhii Gibee
                    District Administration
                  </p>
                  <button className="mt-4 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                    View Full Chart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message from Leadership */}
      {administrator && (
        <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <img
                    src={getImageUrl(administrator.image)}
                    alt={administrator.name}
                    className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Message from the Administrator
                  </h2>
                  <blockquote className="text-lg italic mb-6">
                    "
                    {administrator.message ||
                      `It is my honor to serve the people of Nadhii Gibee District. Our administration is committed to transparency, development, and improving the quality of life for all our residents. Together, we are building a brighter future while preserving our rich heritage.`}
                    "
                  </blockquote>
                  <div>
                    <p className="font-bold">{administrator.name}</p>
                    <p className="text-[#E5E4FF]">
                      {administrator.title ||
                        "District Administrator, Nadhii Gibee District"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contact Leadership */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Connect with <span className="text-[#21203C]">Leadership</span>
            </h2>
            <p className="text-lg text-[#21203C]/80 mb-8">
              We value your input and are here to serve you. Reach out to our
              leadership team with your questions and suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Administration
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
