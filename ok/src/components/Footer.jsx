import React from "react";
import { 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope, 
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaArrowRight,
  FaHome,
  FaInfoCircle,
  FaBriefcase,
  FaUserTie,
  FaEnvelope as FaEnvelopeIcon,
  FaShieldAlt,
  FaHandshake,
  FaAward,
  FaGlobe,
  FaHeart,
  FaRocket
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "About Us", path: "/about", icon: FaInfoCircle },
    { name: "Services", path: "/services", icon: FaBriefcase },
    { name: "Career", path: "/career", icon: FaUserTie },
    { name: "Contact Us", path: "/contact", icon: FaEnvelopeIcon },
  ];

  const services = [
    { name: "Project Management Consultancy (PMC)", path: "#project-management" },
    { name: "General Consultancy", path: "#general-consultancy" },
    { name: "Products Promotion", path: "#products-promotion" },
    { name: "Property & Real Estate Consultancy", path: "#real-estate" },
    { name: "Structural & Architectural Design & Drawings", path: "#design-drawings" },
    { name: "Project Liaising", path: "#project-liaising" },
    { name: "Manpower Supply", path: "#manpower-supply" },
    { name: "Security Services", path: "#security-services" },
    { name: "Other Professional Support Services", path: "#other-services" },
  ];

  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "7th Floor, Gateway Plaza, Hiranandani Business Park, Powai, Mumbai - 400076", link: null },
    { icon: FaPhoneAlt, text: "+91 7715011000", link: "tel:+917715011000" },
    { icon: FaPhoneAlt, text: "+91 9818865522", link: "tel:+919818865522" },
    { icon: FaEnvelope, text: "ceo@crafx.in", link: "mailto:ceo@crafx.in" },
    { icon: FaEnvelope, text: "info@crafx.in", link: "mailto:info@crafx.in" },
    { icon: FaClock, text: "Mon - Fri: 9:00 AM - 6:00 PM", link: null },
  ];

  const socialLinks = [
    { icon: FaFacebookF, link: "https://facebook.com", color: "#1877f2" },
    { icon: FaTwitter, link: "https://twitter.com", color: "#1da1f2" },
    { icon: FaLinkedinIn, link: "https://linkedin.com", color: "#0a66c2" },
    { icon: FaInstagram, link: "https://instagram.com", color: "#e4405f" },
    { icon: FaYoutube, link: "https://youtube.com", color: "#ff0000" },
  ];

  return (
    <footer className="relative text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=800&fit=crop')",
        }}
      >
        {/* Enhanced Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a2a27]/95 via-[#0a2a27]/90 to-[#0a2a27]/85"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative container mx-auto px-4 py-24 md:py-24 lg:py-24">
        {/* Grid Layout with better spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12">
          
          {/* Company Info Section - Improved alignment */}
          <div className="space-y-4 md:space-y-5">
            <div className="flex items-center">
              <img src="/images/logo5.png" alt="Crafx Logo" className="h-24 w-auto object-contain"/>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Crafx Services Pvt. Ltd. is a technology-driven organization specializing in Supply Chain Management, Procurement & Contracts, and Project Execution for large-scale infrastructure developments across India.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <FaHeart className="text-red-400 text-sm" />
              <span className="text-white/70 text-xs">Building India's infrastructure since 2020</span>
            </div>
          </div>

          {/* Quick Links Section - Improved spacing */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-[#2c6b64] rounded-full"></div>
            </h3>
            <ul className="space-y-2.5 md:space-y-3">
              {quickLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <li key={index}>
                    <a 
                      href={link.path} 
                      className="flex items-center gap-3 text-white/70 hover:text-white transition-all duration-300 group text-sm"
                    >
                      <IconComponent className="text-[#2c6b64] text-sm group-hover:translate-x-1 transition-transform" />
                      <span>{link.name}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Our Services Section - Improved display */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-6 relative inline-block">
              Our Sectors
              <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-[#2c6b64] rounded-full"></div>
            </h3>
            <ul className="space-y-2.5 md:space-y-3">
              {services.slice(0, 6).map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.path} 
                    className="flex items-start gap-2.5 text-white/70 hover:text-white transition-all duration-300 group text-sm"
                  >
                    <img src="/images/ok2.svg" alt="bullet" className="w-3.5 h-3.5 mt-0.5 group-hover:translate-x-1 transition-transform flex-shrink-0"/>
                    <span className="leading-relaxed">{service.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section - Improved layout */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-5 md:mb-6 relative inline-block">
              Contact Info
              <div className="absolute -bottom-2 left-0 w-10 h-0.5 bg-[#2c6b64] rounded-full"></div>
            </h3>
            <ul className="space-y-4 md:space-y-5">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <li key={index} className="flex items-start gap-3">
                    <IconComponent className="text-[#2c6b64] text-lg mt-0.5 flex-shrink-0" />
                    {info.link ? (
                      <a href={info.link} className="text-white/70 hover:text-white transition-colors text-sm leading-relaxed break-all">
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-white/70 text-sm leading-relaxed">{info.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            
            {/* Social Links - Improved styling */}
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-4 text-white/80">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                      style={{ 
                        transition: "all 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = social.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "";
                      }}
                    >
                      <IconComponent className="text-white text-sm group-hover:text-[#0a2a27] transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Copyright Section */}
        <div className="relative mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm text-center md:text-left">
              © {currentYear} Crafx Services Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-white text-xs transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white text-xs transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white text-xs transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;