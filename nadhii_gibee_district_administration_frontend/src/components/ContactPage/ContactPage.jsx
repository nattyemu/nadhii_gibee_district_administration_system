import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  User,
  Building,
  Mailbox,
  Shield,
  CheckCircle,
  X,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import backgroundImage from "../../assets/contact_hero.jpg";
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    department: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeDepartment, setActiveDepartment] = useState("general");

  const departments = [
    { id: "general", label: "General Inquiry", icon: MessageCircle },
    { id: "health", label: "Health Department", icon: Shield },
    { id: "education", label: "Education Sectors", icon: Building },
    { id: "agriculture", label: "Agriculture Bureau", icon: Building },
    { id: "finance", label: "Finance & Economy", icon: Building },
    { id: "infrastructure", label: "Infrastructure", icon: Building },
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Main Office Address",
      details: [
        "Nadhii Gibee District Administration Office",
        "Dimtu City, Oromia Region",
        "Ethiopia",
      ],
      color: "bg-red-100 text-red-700",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+251 92 342 8994 (Main)",
        // "+251 47 111 0001 (Admin)",
        // "+251 47 111 0002 (Services)",
      ],
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@nadhiigibee.gov.et",
        // "admin@nadhiigibee.gov.et",
        // "services@nadhiigibee.gov.et",
      ],
      color: "bg-green-100 text-green-700",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        "Monday - Friday: 8:30 AM - 5:30 PM",
        "Saturday: 9:00 AM - 12:00 PM",
        "Sunday: Closed",
      ],
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle form submission to a backend
    // console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        department: "",
        message: "",
      });
    }, 3000);
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-[#E5E4FF] mb-8">
              Get in touch with Nadhii Gibee District Administration. We're here
              to serve you.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#21203C]/80 rounded-full">
              <MessageCircle size={20} className="mr-2" />
              We're here to help
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 text-center"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${item.color} mb-4 mx-auto`}
                    >
                      <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>
                    <div className="space-y-2">
                      {item.details.map((detail, i) => (
                        <p key={i} className="text-gray-600">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#F5F4FF]">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600">
                  We'll get back to you as soon as possible
                </p>
              </div>

              {/* Department Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Department
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {departments.map((dept) => {
                    const Icon = dept.icon;
                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => setActiveDepartment(dept.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-300 ${
                          activeDepartment === dept.id
                            ? "bg-[#21203C] text-white border-[#21203C]"
                            : "bg-white text-gray-700 border-gray-300 hover:border-[#21203C]"
                        }`}
                      >
                        <Icon size={18} className="mb-1" />
                        <span className="text-xs">{dept.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                  <CheckCircle
                    size={48}
                    className="text-green-600 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 border focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] py-3 px-4"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-500" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="pl-10 w-full rounded-lg border-gray-300 border focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] py-3 px-4"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 border focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] py-3 px-4"
                      placeholder="What is this regarding?"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-gray-300 border focus:ring-2 focus:ring-[#21203C] focus:border-[#21203C] py-3 px-4"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center"
                  >
                    <Send size={20} className="mr-2" />
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Map and Additional Info */}
            <div>
              {/* Map */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#F5F4FF] mb-8">
                <div className="h-64 bg-gradient-to-r from-[#F5F4FF] to-[#E5E4FF] relative">
                  {/* This would be replaced with an actual map component */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <MapPin
                        size={48}
                        className="text-[#21203C] mx-auto mb-4"
                      />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Nadhii Gibee District Administration
                      </h3>
                      <p className="text-gray-600">
                        Dimtu City, Oromia Region, Ethiopia
                      </p>
                      <button className="mt-4 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                        View on Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-red-800 mb-3">
                  Emergency Contact
                </h3>
                <p className="text-red-700 mb-4">
                  For urgent matters outside office hours
                </p>
                <div className="flex items-center">
                  <Phone size={20} className="text-red-700 mr-2" />
                  <span className="text-red-900 font-bold">
                    +251 92 342 8994
                  </span>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with our latest news and announcements
                </p>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="bg-[#F5F4FF] hover:bg-[#E5E4FF] text-[#21203C] p-3 rounded-full transition-colors duration-300"
                      >
                        <Icon size={20} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-[#21203C]">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find quick answers to common questions about our services and
              processes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How long does it take to get a response?",
                answer:
                  "We typically respond to inquiries within 24-48 hours during business days. Urgent matters are prioritized.",
              },
              {
                question: "What documents do I need for service requests?",
                answer:
                  "Required documents vary by service. Please check our Services page for specific requirements or contact the relevant department.",
              },
              {
                question: "Can I schedule an appointment online?",
                answer:
                  "Yes, many of our services offer online appointment scheduling. Please visit our Services page to book an appointment.",
              },
              {
                question: "How can I provide feedback about services?",
                answer:
                  "We welcome feedback through our online form, via email at feedback@nadhiigibee.gov.et, or in person at our office.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="text-[#21203C] font-medium hover:text-[#2D2B4A] flex items-center justify-center mx-auto">
              View All FAQs
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Visit Our Office
            </h2>
            <p className="text-xl mb-8">
              We welcome visitors to our administration office during business
              hours. Our staff is ready to assist you with any inquiries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Get Directions
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
