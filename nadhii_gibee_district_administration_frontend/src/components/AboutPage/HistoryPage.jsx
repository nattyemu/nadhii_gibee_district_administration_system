import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Play,
  Award,
  Landmark,
  Coffee,
  Heart,
  Mountain,
  Building,
  BarChart3,
  Target,
  Sprout,
  Navigation,
} from "lucide-react";
import backgroundImage from "../../assets/jimma2.png";
import hero_img from "../../assets/jimma9.png";
import event2 from "../../assets/Holqa_Abbaa_Dikoo_(Ganda_Afataa).jpg";
import event3 from "../../assets/holqa_kuraa.jpg";
import event4 from "../../assets/Riqicha_uumamaa(Ganda_Jaatoo).jpg";
import event5 from "../../assets/Bosona_karra_baddeessaaGanda_Qananii,Kitinbillee,Karrayyu.jpg";
import event6 from "../../assets/Holqa jijjiguu(Ganda Dachaa Gibee).jpg";
import event7 from "../../assets/jimma6.jpg";
const HistoryPage = () => {
  const [activeEra, setActiveEra] = useState("geography");
  const [expandedItems, setExpandedItems] = useState([0]);

  const toggleItem = (index) => {
    if (expandedItems.includes(index)) {
      setExpandedItems(expandedItems.filter((item) => item !== index));
    } else {
      setExpandedItems([...expandedItems, index]);
    }
  };

  const districtEras = [
    {
      id: "geography",
      title: "Geography & Location",
      period: "Strategic Position",
      color: "from-emerald-500 to-emerald-700",
      icon: MapPin,
    },
    {
      id: "demographics",
      title: "Population & Administration",
      period: "Community Structure",
      color: "from-[#21203C] to-[#2D2B4A]",
      icon: Users,
    },
    {
      id: "development",
      title: "Development & Potential",
      period: "Growth Opportunities",
      color: "from-[#4A476B] to-[#5A5780]",
      icon: Target,
    },
  ];

  const timelineEvents = [
    {
      year: "Geography",
      title: "Strategic Location & Topography",
      description:
        "Nadhii Gibee District is located in the western part of Oromia, within Jimma Zone, featuring a diverse topography of elevated and flat lands suitable for agriculture and settlement.",
      image: hero_img,
      era: "geography",
      achievements: [
        "12.8% highland areas",
        "86.5% midland areas",
        "0.7% lowland areas",
        "Total area: 74,956 hectares",
      ],
    },
    {
      year: "Boundaries",
      title: "Geographical Boundaries",
      description:
        "The district shares borders with four neighboring districts, creating a strategic position within Jimma Zone.",
      image: event2,
      era: "geography",
      achievements: [
        "East: Sokorru District",
        "South: Omo Nadda District",
        "West: Qarsa District",
        "North: Limmu Kossa District",
      ],
    },
    {
      year: "Population",
      title: "District Population Profile",
      description:
        "Nadhii Gibee District is home to a vibrant and growing population with balanced gender distribution.",
      image: event3,
      era: "demographics",
      achievements: [
        "Male: 97,126 residents",
        "Female: 93,318 residents",
        "Total: 190,000+ residents",
        "25 total kebeles",
      ],
    },
    {
      year: "Administration",
      title: "Administrative Structure",
      description:
        "The district is organized into efficient administrative units to serve the community effectively.",
      image: event4,
      era: "demographics",
      achievements: [
        "23 Rural Kebeles",
        "2 Urban Kebeles",
        "15 Development Sectors",
        "Total 25 administrative units",
      ],
    },
    {
      year: "Investment",
      title: "Investment Potential",
      description:
        "The district offers excellent investment opportunities supported by favorable conditions and resources.",
      image: event5,
      era: "development",
      achievements: [
        "Reliable peace and security",
        "Development workforce (youth labor force)",
        "Favorable climate conditions",
        "Strong cultural values and integrity",
      ],
    },
    {
      year: "Agriculture",
      title: "Agricultural Production",
      description:
        "Nadhii Gibee District is known for its diverse agricultural products that form the backbone of the local economy.",
      image: event6,
      era: "development",
      achievements: [
        "Grains: Teff, Maize, Millet, Sorghum",
        "Cereals: Barley, Wheat",
        "Roots: Sweet Potato, Potato, Taro",
        "Cash crops: Coffee, Nug, Linseed",
      ],
    },
    {
      year: "Accessibility",
      title: "Transport & Connectivity",
      description:
        "The district enjoys good connectivity with major urban centers, facilitating trade and movement.",
      image: event7,
      era: "development",
      achievements: [
        "310 km from Addis Ababa",
        "64 km from Jimma city",
        "Well-connected road networks",
        "Access to regional markets",
      ],
    },
  ];

  const filteredEvents = timelineEvents.filter(
    (event) => event.era === activeEra
  );

  const districtFeatures = [
    {
      title: "Agricultural Hub",
      description:
        "Leading producer of diverse crops including coffee, teff, maize, and various cereals that support the local economy.",
      icon: Sprout,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Strategic Location",
      description:
        "Well-positioned within Jimma Zone with good connectivity to major cities and regional markets.",
      icon: Navigation,
      color: "bg-[#21203C]/10 text-[#21203C]",
    },
    {
      title: "Youth Potential",
      description:
        "Young and dynamic workforce ready for development initiatives and economic growth opportunities.",
      icon: Users,
      color: "bg-[#4A476B]/10 text-[#4A476B]",
    },
    {
      title: "Natural Resources",
      description:
        "Rich agricultural lands with favorable climate conditions supporting year-round farming activities.",
      icon: Mountain,
      color: "bg-amber-100 text-amber-700",
    },
  ];

  const quickStats = [
    { number: "190,000+", label: "Total Population", icon: Users },
    { number: "25", label: "Kebeles", icon: Building },
    { number: "74,956", label: "Hectares Total Area", icon: BarChart3 },
    { number: "15", label: "Development Sectors", icon: Target },
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nadhii Gibee District
            </h1>
            <p className="text-xl text-[#E5E4FF] mb-8">
              Discover the rich heritage, strategic location, and development
              potential of one of Jimma Zone's most promising districts
            </p>
            <div className="flex justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg flex items-center transition-all duration-300">
                <Play size={20} className="mr-2" />
                Explore Our District
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 bg-white -mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#21203C] to-[#2D2B4A] text-white rounded-xl p-6 text-center shadow-lg"
                >
                  <Icon size={32} className="mx-auto mb-3 text-yellow-400" />
                  <div className="text-2xl md:text-3xl font-bold mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[#E5E4FF] text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Era Navigation */}
      <section className="py-12 bg-white sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {districtEras.map((era) => {
              const Icon = era.icon;
              return (
                <button
                  key={era.id}
                  onClick={() => setActiveEra(era.id)}
                  className={`flex items-center px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeEra === era.id
                      ? `bg-gradient-to-r ${era.color} text-white shadow-lg`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <div className="text-left">
                    <div className="font-bold">{era.title}</div>
                    <div className="text-sm">{era.period}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#21203C]/20 transform -translate-x-1/2"></div>

              {filteredEvents.map((event, index) => {
                const isExpanded = expandedItems.includes(index);
                return (
                  <div key={index} className="mb-12 relative">
                    <div className="flex flex-col md:flex-row items-start">
                      <div className="flex-1 md:mr-8 md:text-right mb-4 md:mb-0 order-2 md:order-1">
                        <div className="md:pr-8">
                          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#21203C]/10 text-[#21203C] text-sm font-medium mb-2">
                            <Calendar size={14} className="mr-1" />
                            {event.year}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {event.description}
                          </p>

                          {isExpanded && (
                            <div className="bg-[#21203C]/5 rounded-lg p-4 mb-4">
                              <h4 className="font-bold text-[#21203C] mb-2">
                                Key Features:
                              </h4>
                              <ul className="list-disc list-inside text-[#21203C]/80">
                                {event.achievements.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <button
                            onClick={() => toggleItem(index)}
                            className="inline-flex items-center text-[#21203C] font-medium hover:text-[#21203C]/80"
                          >
                            {isExpanded ? (
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
                        </div>
                      </div>

                      <div className="w-10 h-10 bg-[#21203C] rounded-full flex items-center justify-center text-white font-bold z-10 mx-auto md:mx-0 mb-4 md:mb-0 order-1 md:order-2">
                        {index + 1}
                      </div>

                      <div className="flex-1 md:ml-8 order-3">
                        <div className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                              <MapPin size={14} className="mr-1" />
                              Nadhii Gibee District, Jimma Zone
                            </div>
                            <p className="text-gray-600 text-sm">
                              District feature highlights
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* District Features Section */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              District Strengths
            </h2>
            <p className="text-lg text-gray-600">
              Nadhii Gibee District combines natural advantages with human
              potential to create a thriving community with bright prospects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {districtFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item.color} mb-4`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Investment Potential Section */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Investment Ready District
            </h2>
            <p className="text-xl mb-8">
              Nadhii Gibee District offers exceptional investment opportunities
              supported by reliable infrastructure, skilled workforce, and
              favorable climate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">190K+</div>
                <div className="text-[#E5E4FF]">Potential Workforce</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">74,956</div>
                <div className="text-[#E5E4FF]">Hectares Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-[#E5E4FF]">Agricultural Products</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Nadhii Gibee District
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Discover investment opportunities, agricultural potential, and
              community development initiatives in our vibrant district.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Investment Guide
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Administration
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HistoryPage;
