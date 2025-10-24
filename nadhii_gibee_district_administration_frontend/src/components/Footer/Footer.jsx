import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Heart,
  ArrowUp,
  Shield,
  Award,
  Users,
  Building,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/investment-opportunities" },
    { name: "Departments", href: "#" },
    { name: "News & Updates", href: "/news" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "#" },
  ];

  const services = [
    { name: "Document Resourse", href: "#" },
    { name: "Business Registration", href: "/business-resources" },
    { name: "Permits & Licenses", href: "#" },
    { name: "Health Resourse", href: "#" },
    { name: "Education", href: "#" },
    { name: "Agriculture Support", href: "/agricultural-resources" },
  ];

  const departments = [
    { name: "Health Department", href: "#" },
    { name: "Education Office", href: "#" },
    { name: "Agriculture Bureau", href: "#" },
    { name: "Trade & Industry", href: "#" },
    { name: "Infrastructure", href: "#" },
    { name: "Finance & Economy", href: "#" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-[#21203C] to-[#2D2B4A] text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500"></div>
      <div className="absolute top-10 right-10 w-24 h-24 bg-yellow-400/10 rounded-full hidden lg:block"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 bg-[#21203C]/50 rounded-full hidden lg:block"></div>

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10 pattern-dots pattern-[#21203C] pattern-size-4"></div>

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500 rounded-full h-12 w-12 flex items-center justify-center mr-3">
                <span className="text-[#21203C] font-bold text-xl">NG</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Nadhii Gibee District</h3>
                <p className="text-[#E5E4FF] text-sm">Administration</p>
              </div>
            </div>
            <p className="text-[#E5E4FF] mb-6 max-w-md">
              Serving the people of Nadhii Gibee District with dedication,
              transparency, and excellence in public service.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="bg-[#21203C] hover:bg-[#2D2B4A] text-white p-2 rounded-full transition-colors duration-300"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-yellow-400"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#E5E4FF] hover:text-yellow-400 transition-colors duration-300 flex items-center"
                  >
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mr-3"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Our Services
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-yellow-400"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-[#E5E4FF] hover:text-yellow-400 transition-colors duration-300 flex items-center"
                  >
                    <div className="w-1 h-1 bg-yellow-400 rounded-full mr-3"></div>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info column */}
          <div>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Contact Us
              <div className="absolute bottom-0 left-0 w-10 h-0.5 bg-yellow-400"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin
                  className="text-yellow-400 mt-1 mr-3 flex-shrink-0"
                  size={18}
                />
                <p className="text-[#E5E4FF]">
                  Nadhii Gibee District Administration Office
                  <br />
                  Dimtu City, Oromia Region
                  <br />
                  Ethiopia
                </p>
              </div>
              <div className="flex items-center">
                <Phone
                  className="text-yellow-400 mr-3 flex-shrink-0"
                  size={18}
                />
                <a
                  href="tel:+251923428994"
                  className="text-[#E5E4FF] hover:text-yellow-400 transition-colors duration-300"
                >
                  +251 92 342 8994
                </a>
              </div>
              {/* <div className="flex items-center">
                <Mail
                  className="text-yellow-400 mr-3 flex-shrink-0"
                  size={18}
                />
                <a
                  href="mailto:info@nadhiigibee.gov.et"
                  className="text-[#E5E4FF] hover:text-yellow-400 transition-colors duration-300"
                >
                  info@nadhiigibee.gov.et
                </a>
              </div> */}
              <div className="flex items-center">
                <Clock
                  className="text-yellow-400 mr-3 flex-shrink-0"
                  size={18}
                />
                <p className="text-[#E5E4FF]">
                  Mon - Fri: 8:30 AM - 5:30 PM
                  <br />
                  Sat: 9:00 AM - 12:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-[#21203C]/80 backdrop-blur-md rounded-xl p-6 mb-12 border border-[#2D2B4A]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">
                Stay Updated with Nadhii Gibee District
              </h3>
              <p className="text-[#E5E4FF]">
                Subscribe to our newsletter for important announcements and
                updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border border-[#2D2B4A] rounded-l-lg sm:rounded-r-none rounded-r-lg sm:rounded-l-lg px-4 py-3 text-white placeholder-[#E5E4FF] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent mb-2 sm:mb-0 flex-grow"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-r-lg sm:rounded-l-none rounded-l-lg sm:rounded-r-lg transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-[#2D2B4A] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <p className="text-[#E5E4FF] text-sm flex items-center">
                © {currentYear} Nadhii Gibee District Administration. Made with{" "}
                <Heart size={14} className="mx-1 text-red-400" /> for the people
                of Jimma.
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a
                href="/privacy"
                className="text-[#E5E4FF] hover:text-yellow-400 text-sm transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-[#E5E4FF] hover:text-yellow-400 text-sm transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/accessibility"
                className="text-[#E5E4FF] hover:text-yellow-400 text-sm transition-colors duration-300"
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-yellow-500 hover:bg-yellow-600 text-[#21203C] p-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 z-50"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>

      {/* Ethiopian pattern decorative element at the very bottom */}
      <div
        className="h-2 bg-repeat-x bg-center"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='20' height='4' viewBox='0 0 20 4' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='8' height='4' fill='%23FCD34D'/%3E%3Crect x='12' width='8' height='4' fill='%23FCD34D'/%3E%3C/svg%3E\")",
        }}
      ></div>
    </footer>
  );
};

export default Footer;
