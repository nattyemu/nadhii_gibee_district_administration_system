import React from "react";
import {
  Target,
  Eye,
  Compass,
  Star,
  Heart,
  Shield,
  Users,
  Leaf,
  Building2,
  ArrowRight,
  Award,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import backgroundImage from "../../assets/vision_hero.jpg";
const VisionMissionPage = () => {
  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our actions and decisions",
      color: "from-blue-500 to-blue-700",
    },
    {
      icon: Users,
      title: "Inclusivity",
      description:
        "We serve all communities equally and ensure everyone has a voice",
      color: "from-green-500 to-green-700",
    },
    {
      icon: TrendingUp,
      title: "Progress",
      description: "We are committed to continuous improvement and innovation",
      color: "from-purple-500 to-purple-700",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We serve with empathy and understanding for all residents",
      color: "from-red-500 to-red-700",
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We plan for the future while preserving our environment and resources",
      color: "from-emerald-500 to-emerald-700",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for the highest quality in all our services and programs",
      color: "from-amber-500 to-amber-700",
    },
  ];

  const strategicPillars = [
    {
      title: "Economic Development",
      description: "Fostering sustainable economic growth and job creation",
      icon: TrendingUp,
      color: "bg-green-100 text-green-700",
      objectives: [
        "Increase investment",
        "Support local businesses",
        "Develop infrastructure",
      ],
    },
    {
      title: "Social Welfare",
      description: "Improving quality of life for all residents",
      icon: Heart,
      color: "bg-red-100 text-red-700",
      objectives: [
        "Enhance healthcare",
        "Expand education",
        "Support vulnerable groups",
      ],
    },
    {
      title: "Environmental Sustainability",
      description: "Preserving our natural resources for future generations",
      icon: Leaf,
      color: "bg-emerald-100 text-emerald-700",
      objectives: [
        "Protect ecosystems",
        "Promote clean energy",
        "Sustainable agriculture",
      ],
    },
    {
      title: "Good Governance",
      description:
        "Ensuring transparent, accountable, and effective administration",
      icon: Shield,
      color: "bg-blue-100 text-blue-700",
      objectives: [
        "Digital transformation",
        "Community engagement",
        "Efficient services",
      ],
    },
  ];

  const timeline = [
    {
      year: "2023",
      title: "Digital Transformation Initiative",
      description: "Launch of online services and digital governance platforms",
    },
    {
      year: "2024",
      title: "Sustainable Agriculture Program",
      description: "Implementation of climate-resilient farming practices",
    },
    {
      year: "2025",
      title: "Education for All Initiative",
      description:
        "Expansion of educational facilities and vocational training centers",
    },
    {
      year: "2026",
      title: "Healthcare Access Expansion",
      description:
        "Construction of new clinics and healthcare outreach programs",
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
            <h1 className="text-4xl md:text-5xl font-bold  mb-4">
              Vision & Mission
            </h1>
            <p className="text-xl text-[#E5E4FF] mb-8">
              Guiding Nadhii Gibee District toward a prosperous and sustainable
              future
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#21203C]/80 rounded-full">
              <Compass size={20} className="mr-2" />
              Our Compass for Progress
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#F5F4FF]">
                <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800 mb-6">
                  <Eye size={16} className="mr-2" />
                  Our Vision
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  A <span className="text-[#21203C]">prosperous</span>,{" "}
                  <span className="text-[#21203C]">inclusive</span>, and{" "}
                  <span className="text-[#21203C]">sustainable</span> Nadhii
                  Gibee District
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  We envision Nadhii Gibee District as a model of sustainable
                  development, where every citizen enjoys high quality of life,
                  economic opportunity thrives in harmony with our natural
                  environment, and our rich cultural heritage is preserved for
                  future generations.
                </p>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-blue-800 font-medium italic">
                    "To be Ethiopia's leading zone in sustainable development,
                    innovation, and community wellbeing by 2035."
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#21203C] to-[#2D2B4A] rounded-2xl p-6 text-white h-40 flex items-end">
                  <div>
                    <Target size={32} className="mb-2" />
                    <h3 className="font-bold">Sustainable Growth</h3>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white h-40 flex items-end">
                  <div>
                    <Users size={32} className="mb-2" />
                    <h3 className="font-bold">Community Focus</h3>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white h-40 flex items-end">
                  <div>
                    <Building2 size={32} className="mb-2" />
                    <h3 className="font-bold">Infrastructure</h3>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white h-40 flex items-end">
                  <div>
                    <Star size={32} className="mb-2" />
                    <h3 className="font-bold">Excellence</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center rounded-full bg-[#21203C]/10 px-4 py-2 text-sm font-medium text-[#21203C] mb-4">
                <Target size={16} className="mr-2" />
                Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Drives Us
              </h2>
              <p className="text-lg text-gray-600">
                Our mission is to serve the people of Nadhii Gibee District
                through effective governance, sustainable development, and
                inclusive policies that improve quality of life for all
                residents.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#F5F4FF]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#F5F4FF] rounded-xl p-6 border border-[#21203C]/20">
                  <h3 className="font-bold text-gray-900 mb-3">Our Purpose</h3>
                  <p className="text-gray-600">
                    To provide transparent, efficient, and responsive
                    administration that meets the needs of our diverse
                    communities while preserving our cultural heritage and
                    natural environment.
                  </p>
                </div>
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-3">Our Approach</h3>
                  <p className="text-gray-600">
                    Through collaboration, innovation, and evidence-based
                    decision making, we implement programs that drive
                    sustainable development and create opportunities for all.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-4">Key Focus Areas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                      <Building2 size={24} />
                    </div>
                    <p className="text-sm">Infrastructure Development</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                      <Heart size={24} />
                    </div>
                    <p className="text-sm">Social Services</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                      <TrendingUp size={24} />
                    </div>
                    <p className="text-sm">Economic Growth</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2">
                      <Leaf size={24} />
                    </div>
                    <p className="text-sm">Environmental Protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#21203C]">Core Values</span>
            </h2>
            <p className="text-lg text-gray-600">
              These fundamental principles guide our decisions, actions, and
              relationships with the community we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 group"
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${value.color} text-white mb-4`}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Pillars */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Strategic <span className="text-yellow-400">Pillars</span>
            </h2>
            <p className="text-[#E5E4FF]">
              Our comprehensive framework for achieving sustainable development
              across Nadhii Gibee District
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategicPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-start mb-4">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${pillar.color} mr-4`}
                    >
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{pillar.title}</h3>
                      <p className="text-[#E5E4FF]">{pillar.description}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Key Objectives:</h4>
                    <ul className="space-y-2">
                      {pillar.objectives.map((objective, i) => (
                        <li key={i} className="flex items-center">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                          <span className="text-[#E5E4FF]">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#21203C]">Journey</span> Ahead
            </h2>
            <p className="text-lg text-gray-600">
              A roadmap of key initiatives and milestones as we work toward our
              vision for Nadhii Gibee District
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-1 bg-[#21203C]/20"></div>

              {timeline.map((item, index) => (
                <div key={index} className="mb-12 relative pl-16">
                  <div className="absolute left-0 w-8 h-8 bg-[#21203C] rounded-full flex items-center justify-center text-white font-bold">
                    {item.year}
                  </div>
                  <div className="bg-[#F5F4FF] rounded-xl p-6 border border-[#21203C]/20">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Us in{" "}
              <span className="text-[#21203C]">Building Tomorrow</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Our vision and mission are collective efforts. Together, we can
              build a brighter future for Nadhii Gibee District.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center">
                Get Involved
                <ArrowRight size={20} className="ml-2" />
              </button>
              <button className="bg-white hover:bg-gray-100 text-[#21203C] font-bold py-3 px-6 rounded-lg border border-[#21203C] transition-colors duration-300">
                Download Strategic Plan
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMissionPage;
