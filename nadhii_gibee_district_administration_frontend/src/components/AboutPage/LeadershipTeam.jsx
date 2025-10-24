import React, { useState } from "react";

const LeadershipTeam = () => {
  const [activeDepartment, setActiveDepartment] = useState("all");
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'

  const leaders = [
    {
      id: 1,
      name: "Derartu Tulu",
      position: "Founder & Executive Director",
      bio: "Olympic gold medalist and world champion with over 20 years of experience in athletics. Derartu founded the institute with a vision to develop the next generation of Ethiopian athletic champions.",
      image:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "executive",
      achievements: [
        "2× Olympic Gold Medalist",
        "3× World Champion",
        "Order of the Star of Ethiopia",
      ],
      email: "derartu@derartutuluinstitute.edu.et",
      social: {
        twitter: "#",
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      name: "Dr. Samuel Bekele",
      position: "Director of Sports Science",
      bio: "PhD in Sports Physiology with 15 years of experience training elite athletes. Dr. Bekele has published numerous research papers on high-altitude training and athletic performance.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "research",
      achievements: [
        "PhD Sports Physiology",
        "Author of 30+ Research Papers",
        "Sports Science Innovator Award 2020",
      ],
      email: "samuel@derartutuluinstitute.edu.et",
      social: {
        twitter: "#",
        linkedin: "#",
        researchgate: "#",
      },
    },
    {
      id: 3,
      name: "Coach Alemitu Mekonnen",
      position: "Head of Athletics Training",
      bio: "Former national team coach with expertise in developing young talent. Coach Mekonnen has trained 15 Olympic athletes and 8 world record holders throughout her career.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "training",
      achievements: [
        "25+ Years Coaching Experience",
        "National Coach of the Year 2019",
        "Developed 8 World Record Holders",
      ],
      email: "alemitu@derartutuluinstitute.edu.et",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 4,
      name: "Dr. Helen Teshome",
      position: "Director of Nutrition",
      bio: "Registered dietitian specializing in sports nutrition for elite athletes. Dr. Teshome has developed innovative nutritional strategies that have been adopted by national teams across Africa.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "research",
      achievements: [
        "PhD in Sports Nutrition",
        "Author of 'Fueling Champions'",
        "International Nutrition Excellence Award",
      ],
      email: "helen@derartutuluinstitute.edu.et",
      social: {
        linkedin: "#",
        researchgate: "#",
      },
    },
    {
      id: 5,
      name: "Michael Asrat",
      position: "Head of Sports Psychology",
      bio: "Clinical psychologist specializing in peak performance mental training. Michael has worked with Olympic athletes to develop mental resilience and competition focus techniques.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "training",
      achievements: [
        "MSc in Sports Psychology",
        "Mental Training Program Developer",
        "Olympic Team Consultant",
      ],
      email: "michael@derartutuluinstitute.edu.et",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 6,
      name: "Sofia Girma",
      position: "Finance and Operations Director",
      bio: "CPA with extensive experience in sports organization management. Sofia has successfully managed budgets for major athletic programs and international competitions.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "administration",
      achievements: [
        "CPA Certification",
        "15+ Years Financial Management",
        "Sports Management Excellence Award",
      ],
      email: "sofia@derartutuluinstitute.edu.et",
      social: {
        linkedin: "#",
      },
    },
    {
      id: 7,
      name: "Coach Tewodros Abebe",
      position: "Head of Youth Development",
      bio: "Specialist in talent identification and youth athlete development. Coach Abebe has created the institute's renowned youth program that has identified numerous future champions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "training",
      achievements: [
        "Youth Coaching Pioneer",
        "National Talent Identification Program Lead",
        "Author of 5 Coaching Manuals",
      ],
      email: "tewodros@derartutuluinstitute.edu.et",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
    {
      id: 8,
      name: "Marta Haile",
      position: "Partnerships and Outreach Director",
      bio: "Expert in building strategic partnerships with international sports organizations. Marta has secured over $5M in funding and partnerships for the institute's programs.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
      department: "administration",
      achievements: [
        "Partnership Development Expert",
        "$5M+ in Funding Secured",
        "International Sports Diplomacy Award",
      ],
      email: "marta@derartutuluinstitute.edu.et",
      social: {
        twitter: "#",
        linkedin: "#",
      },
    },
  ];

  const departments = [
    { id: "all", name: "All Departments" },
    { id: "executive", name: "Executive Leadership" },
    { id: "training", name: "Training & Coaching" },
    { id: "research", name: "Research & Development" },
    { id: "administration", name: "Administration" },
  ];

  const filteredLeaders =
    activeDepartment === "all"
      ? leaders
      : leaders.filter((leader) => leader.department === activeDepartment);

  const openLeader = (leader) => {
    setSelectedLeader(leader);
  };

  const closeLeader = () => {
    setSelectedLeader(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="relative gradient-bg py-20 text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>

        {/* Animated elements */}
        <div className="absolute top-10 left-1/4 w-16 h-16 bg-green-500 rounded-full opacity-10 animate-bounce"></div>
        <div
          className="absolute bottom-10 right-1/4 w-20 h-20 bg-green-500 rounded-full opacity-10 animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 mt-2">
            Leadership <span className="text-green-500">Team</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Meet the visionary leaders guiding Derartu Tulu Sports Institute
            towards athletic excellence
          </p>
          <div className="flex justify-center mt-4">
            <div className="h-1 w-16 bg-green-500"></div>
            <div className="h-1 w-8 bg-green-500 mx-2"></div>
            <div className="h-1 w-4 bg-green-500"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Filters and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex flex-wrap gap-3 mb-4 md:mb-0">
            {departments.map((department) => (
              <button
                key={department.id}
                onClick={() => setActiveDepartment(department.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeDepartment === department.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-white text-blue-black hover:bg-green-100 shadow-md"
                }`}
              >
                {department.name}
              </button>
            ))}
          </div>

          <div className="flex bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-500"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-green-100 text-green-600"
                  : "text-gray-500"
              }`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;
