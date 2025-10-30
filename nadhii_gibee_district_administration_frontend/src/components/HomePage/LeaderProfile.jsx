import React, { useState, useEffect } from "react";
import { Award, Star, MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import administratorService from "../../Service/administratorService";

const LeaderProfile = () => {
  const [administrator, setAdministrator] = useState(null);
  const [loading, setLoading] = useState(true);

  // Image URL helper function with better error handling
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${import.meta.env.VITE_BACKEND_URL || ""}${imagePath}`;
  };

  useEffect(() => {
    const fetchAdministrator = async () => {
      try {
        const response = await administratorService.getAdministrators();

        if (response.success && response.data.length > 0) {
          const adminData = response.data[0];

          // Use getImageUrl function to handle image path
          const imageUrl = getImageUrl(adminData.image);

          setAdministrator({
            ...adminData,
            image: imageUrl,
          });
        } else {
          setAdministrator(null);
        }
      } catch (error) {
        // console.error("Error fetching administrator:", error);
        setAdministrator(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAdministrator();
  }, []);

  if (loading) {
    return (
      <section className="relative py-16 bg-white overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1a2e]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!administrator) {
    return null;
  }

  // Safe data access with fallbacks
  const safeData = {
    name: administrator.name || "Administrator",
    title: administrator.title || "Chief Administrator",
    image: administrator.image,
    bio: administrator.bio || "",
    message:
      administrator.message ||
      "Committed to excellence, focused on progress, dedicated to our community's success.",
    tenure: administrator.tenure || "2020 - Present",
    achievements: administrator.achievements || [],
  };

  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1a1a2e] to-yellow-500"></div>
      <div className="absolute -right-24 -top-24 w-48 h-48 bg-white/50 rounded-full opacity-50"></div>
      <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-yellow-100 rounded-full opacity-50"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Leader Photo - Enhanced Design */}
          <div className="relative lg:col-span-1 group">
            <div className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                <img
                  src={getImageUrl(safeData.image)}
                  alt={safeData.name}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/40 via-transparent to-transparent"></div>
              </div>

              {/* Floating Status Badge */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-[#1a1a2e] px-6 py-2 rounded-full font-bold text-sm shadow-lg border-4 border-white">
                {safeData.name}
              </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-white/50 to-yellow-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Leader Info - Compact & Impactful */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-gradient-to-r from-[#1a1a2e] to-yellow-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 shadow-lg">
                <Star className="w-4 h-4 mr-2" />
                Leadership Spotlight
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e] mb-2">
                {safeData.title}
              </h2>
              <p className="text-[#1a1a2e] text-lg">
                Guiding Nadhii Gibee District to New Heights
              </p>
            </div>

            {/* Key Message */}
            <div className="bg-gradient-to-r from-white/50 to-yellow-50 rounded-xl p-6 border-l-4 border-yellow-500 shadow-sm">
              <p className="text-[#1a1a2e] text-lg font-medium italic text-center lg:text-left">
                "{safeData.message}"
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#1a1a2e]">
                  {safeData.achievements.length}+
                </div>
                <div className="text-sm text-[#1a1a2e]">Achievements</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-[#1a1a2e] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#1a1a2e]">98%</div>
                <div className="text-sm text-[#1a1a2e]">Approval</div>
              </div>
              <div className="text-center p-4 bg-white/50 rounded-lg">
                <MapPin className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#1a1a2e]">21</div>
                <div className="text-sm text-[#1a1a2e]">Woredas</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Star className="w-8 h-8 text-[#1a1a2e] mx-auto mb-2" />
                <div className="text-2xl font-bold text-[#1a1a2e]">
                  {safeData.tenure.split(" - ")[0] || "3"}
                </div>
                <div className="text-sm text-[#1a1a2e]">Years</div>
              </div>
            </div>

            {/* Quick Bio */}
            {safeData.bio && (
              <div className="text-center lg:text-left">
                <p className="text-[#1a1a2e] line-clamp-3">{safeData.bio}</p>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
                Meet the Full Team
              </button>
              <Link
                to="/administrator"
                className="border-2 border-[#1a1a2e] text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 text-center"
              >
                View Achievements
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Pattern */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="w-2 h-2 bg-[#1a1a2e]/30 rounded-full"
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeaderProfile;
