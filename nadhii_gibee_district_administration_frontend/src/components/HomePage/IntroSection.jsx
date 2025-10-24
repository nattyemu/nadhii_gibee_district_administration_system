import React from "react";

const IntroSection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background  */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#F5F4FF] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#21203C] rounded-lg transform -rotate-12 opacity-20"></div>

              {/* Section label */}
              <div className="inline-flex items-center px-4 py-2 bg-[#F5F4FF] rounded-full mb-6">
                <div className="w-2 h-2 bg-[#21203C] rounded-full mr-2"></div>
                <span className="text-[#21203C] font-medium text-sm uppercase tracking-wide">
                  Excellence in Sports
                </span>
              </div>

              {/* Main heading */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-black mb-6 leading-tight">
                Empowering Champions <br />
                <span className="text-[#21203C]">Through Excellence</span>
              </h2>

              {/* divider */}
              <div className="flex items-center mb-8">
                <div className="h-1 w-16 bg-[#21203C]"></div>
                <div className="h-1 w-8 bg-[#21203C] mx-2"></div>
                <div className="h-1 w-4 bg-[#21203C]"></div>
              </div>

              {/* Description */}
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Derartu Tulu Sports Institute is a premier training and research
                center dedicated to nurturing athletic talent through
                cutting-edge coaching, scientific research, and world-class
                facilities. Founded on the principles of excellence, integrity,
                and innovation.
              </p>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Inspired by Olympic legend Derartu Tulu, we combine traditional
                training methods with modern sports science to develop champions
                who excel both on and off the field.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-[#21203C] mb-1">
                    25+
                  </div>
                  <div className="text-sm text-blue-black font-medium">
                    Years of Excellence
                  </div>
                </div>
                <div className="text-center p-4 bg-[#F5F4FF] rounded-lg">
                  <div className="text-3xl font-bold text-[#21203C] mb-1">
                    500+
                  </div>
                  <div className="text-sm text-blue-black font-medium">
                    Champions Trained
                  </div>
                </div>
              </div>

              {/* buttons */}
              <div className="flex flex-wrap gap-4">
                <button className="relative bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-[#21203C]/30 group overflow-hidden">
                  <span className="relative z-10">Explore Programs</span>
                  <div className="absolute inset-0 bg-[#2D2B4A] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button className="relative border-2 border-[#0a1931] text-blue-black hover:bg-blue-black hover:text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 overflow-hidden group">
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-blue-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Visual content */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-[#0a1931] to-[#21203C] rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1931]/80 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-[#21203C] rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Legacy of Champions
                      </h3>
                      <p className="text-gray-200">
                        Inspiring excellence since 1998
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-[#21203C] rounded-lg transform rotate-12 opacity-20 z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-black rounded-lg transform -rotate-12 opacity-20 z-0"></div>

              {/* Floating stats cards */}
              <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg z-10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#21203C]">50+</div>
                  <div className="text-xs text-blue-black font-medium">
                    Training Programs
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#21203C]">100+</div>
                  <div className="text-xs text-blue-black font-medium">
                    Qualified Coaches
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-blue-black {
          background-color: #0a1931;
        }
        .text-blue-black {
          color: #0a1931;
        }
      `}</style>
    </section>
  );
};

export default IntroSection;
