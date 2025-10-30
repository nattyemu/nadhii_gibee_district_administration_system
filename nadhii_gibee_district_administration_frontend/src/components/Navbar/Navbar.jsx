import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Globe,
  Phone,
  MapPin,
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };

  const navigation = {
    main: [
      { name: "Home", href: "/" },
      {
        name: "About",
        href: "#",
        dropdown: [
          { name: "History", href: "/history" },
          { name: "Leadership", href: "/leadership" },
          { name: "Structure", href: "/structure" },
          { name: "Vision & Mission", href: "/vision" },
        ],
      },
      {
        name: "Government",
        href: "#",
        dropdown: [
          { name: "Administrator", href: "/administrator" },
          { name: "Cabinets", href: "/cabinets" },
          { name: "Kebeles", href: "/kebeles" },
          { name: "Sector", href: "/sector" },
        ],
      },
      {
        name: "Resources",
        href: "#",
        dropdown: [
          {
            name: "Investment Opportunities",
            href: "/investment-opportunities",
          },
          { name: "Business Resources", href: "/business-resources" },
          { name: "Agricultural Resources", href: "/agricultural-resources" },
          // { name: "Permits & Licenses", href: "/permits" },
        ],
      },
      // {
      //   name: "Departments",
      //   href: "#",
      //   dropdown: [
      //     { name: "Education", href: "/education" },
      //     { name: "Health", href: "/health" },
      //     { name: "Agriculture", href: "/agriculture" },
      //     { name: "Infrastructure", href: "/infrastructure" },
      //     { name: "Finance", href: "/finance" },
      //   ],
      // },
      { name: "News", href: "/news" },
      { name: "Contact", href: "/contact" },
    ],
    language: [
      // { code: "am", name: "አማርኛ" },
      { code: "or", name: "Afan Oromo" },
      { code: "en", name: "English" },
    ],
  };

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-[#21203C] text-white py-2 px-4 text-sm text-center">
        <p>
          Nadhii Gibee District Administration - Serving our community with
          excellence and integrity
        </p>
      </div>

      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg"
            : "bg-gradient-to-r from-[#21203C] to-[#2D2B4A]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center">
                <img
                  src="/logo_jz.JPG"
                  alt="Nadhii Gibee District Administration Logo"
                  className="h-10 w-auto mr-3 rounded-full"
                />
                <div className="hidden md:block">
                  <span
                    className={`text-xl font-bold ${
                      isScrolled ? "text-green-800" : "text-white"
                    }`}
                  >
                    Nadhii Gibee District
                  </span>
                  <span
                    className={`block text-xs ${
                      isScrolled ? "text-gray-600" : "text-green-100"
                    }`}
                  >
                    Administration
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-1">
              {navigation.main.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                          isScrolled
                            ? "text-gray-700 hover:text-[#21203C]"
                            : "text-white hover:text-[#E5E4FF]"
                        }`}
                      >
                        {item.name}
                        <ChevronDown size={16} className="ml-1" />
                      </button>

                      {openDropdown === item.name && (
                        <div className="absolute z-10 left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div className="py-1">
                            {item.dropdown.map((subItem) => (
                              <a
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F4FF] hover:text-[#21203C]"
                              >
                                {subItem.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isScrolled
                          ? "text-gray-700 hover:text-[#21203C]"
                          : "text-white hover:text-[#E5E4FF]"
                      }`}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Search */}
              <button
                className={`p-2 rounded-full ${
                  isScrolled
                    ? "text-gray-600 hover:text-[#21203C]"
                    : "text-white hover:text-[#E5E4FF]"
                }`}
              >
                <Search size={20} />
              </button>

              {/* Language selector */}
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("language")}
                  className={`flex items-center ${
                    isScrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  <Globe size={20} className="mr-1" />
                  <span className="text-sm">EN</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>

                {openDropdown === "language" && (
                  <div className="absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {navigation.language.map((lang) => (
                        <button
                          key={lang.code}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-[#F5F4FF] hover:text-[#21203C]"
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Contact button */}
              {isAuthenticated() ? (
                <button
                  onClick={logout}
                  className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center transition-colors duration-300"
                >
                  <LogOut size={16} className="mr-1" />
                  Logout
                </button>
              ) : (
                <a
                  href="/contact"
                  className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] px-4 py-2 rounded-md text-sm font-medium flex items-center"
                >
                  <Phone size={16} className="mr-1" />
                  Contact
                </a>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md ${
                  isScrolled ? "text-gray-700" : "text-white"
                } hover:text-[#21203C] focus:outline-none`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.main.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-[#F5F4FF] hover:text-[#21203C]"
                  >
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <div className="pl-6">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-[#F5F4FF] hover:text-[#21203C]"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-500">
                      Access government Resources
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {isAuthenticated() ? (
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      Logout
                    </button>
                  ) : (
                    <a
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-[#F5F4FF] hover:text-[#21203C]"
                    >
                      Sign In
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
