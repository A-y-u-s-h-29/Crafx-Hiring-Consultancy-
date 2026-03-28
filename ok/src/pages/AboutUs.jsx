import React, { useState, useEffect } from "react";
import { 
  FaArrowRight, 
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaGlobe,
  FaTrophy,
  FaHandshake,
  FaLightbulb,
  FaHeart,
  FaStar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaBuilding,
  FaBriefcase,
  FaRocket,
  FaAward,
  FaQuoteLeft,
  FaLinkedin,
  FaRegBuilding,
  FaTrain,
  FaPlane,
  FaRoad,
  FaIndustry,
  FaHardHat,
  FaSubway,
  FaUserTie
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FeaturesPage from "../components/FeaturesPage";

// Define the companies array inside your component or before the return statement
const companies = [
  { name: "ITDC (NTPC)", icon: FaIndustry },
  { name: "Reliance ADA", icon: FaBuilding },
  { name: "Emaar", icon: FaBuilding },
  { name: "Lanco", icon: FaIndustry },
  { name: "Kalpataru", icon: FaHardHat },
  { name: "Tata Projects", icon: FaIndustry },
  { name: "J Kumar Infraprojects", icon: FaSubway }
];

const AboutUs = () => {
  const navigate = useNavigate();

  const goservice = () => {
    navigate("/services");
    window.scrollTo(0, 0);
  };
  
  const [visibleElements, setVisibleElements] = useState({});

  const values = [
    {
      title: "Integrity",
      description: "We operate with complete transparency and honesty in all our dealings with clients and partners.",
      icon: FaHeart,
      color: "#18403C"
    },
    {
      title: "Excellence",
      description: "Striving for the highest quality in consultancy services and project execution.",
      icon: FaTrophy,
      color: "#18403C"
    },
    {
      title: "Innovation",
      description: "Embracing modern technology and innovative approaches to infrastructure development.",
      icon: FaLightbulb,
      color: "#18403C"
    },
    {
      title: "Partnership",
      description: "Building long-term relationships with clients based on trust, professionalism, and mutual success.",
      icon: FaHandshake,
      color: "#18403C"
    }
  ];

  const sectors = [
    { name: "Metro", icon: FaTrain },
    { name: "Airports", icon: FaPlane },
    { name: "Retail Infrastructure", icon: FaRegBuilding },
    { name: "Roads & Highways", icon: FaRoad },
    { name: "Urban Development", icon: FaBuilding }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    const elements = document.querySelectorAll(".fade-up-element");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#18403C] to-[#2c6b64] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="text-sm font-medium">About Us</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Delivering Excellence
                <span className="block text-white/90">in Infrastructure</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Crafx Services Pvt. Ltd. is a technology-driven organization specializing in Supply Chain Management, Procurement & Contracts, and Project Execution for large-scale infrastructure developments across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-white text-[#18403C] px-8 py-3 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                  Contact Us Today
                  <img src="/images/ok1.svg" className="w-5 h-5" alt="arrow" />
                </button>
                <button onClick={goservice} className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#18403C] transition-all duration-300">
                  View Our Services
                </button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/about1.webp"
                  alt="Infrastructure Project"
                  className="w-full h-auto max-h-[90vh] object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18403C]/20 to-transparent"></div>
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="bg-[#18403C]/10 rounded-full p-2">
                    <FaUsers className="text-[#18403C] text-xl" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#18403C]">25+</div>
                    <div className="text-xs text-gray-600">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute -bottom-20 left-0 right-0 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaBuilding className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">50+</div>
            <div className="text-xs md:text-sm text-gray-600">Projects Executed</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaGlobe className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">PAN India</div>
            <div className="text-xs md:text-sm text-gray-600">Geographic Reach</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaChartLine className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">98%</div>
            <div className="text-xs md:text-sm text-gray-600">Client Satisfaction</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaAward className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">25+</div>
            <div className="text-xs md:text-sm text-gray-600">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Madhu Sharma - CEO Section */}
<div className="bg-gradient-to-br from-gray-50 to-white py-14 md:py-20">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Decorative Element Section - Replacing Image */}
      <div className="relative fade-up-element order-2 md:order-1" id="ceo-decoration">
        <div className="relative bg-gradient-to-br from-[#18403C] to-[#2c6b64] rounded-2xl shadow-2xl p-6 md:p-12">
          {/* Quote or Vision Statement */}
          <div className="relative z-10">
            <FaQuoteLeft className="text-white/20 text-4xl md:text-6xl mb-6" />
            <p className="text-white text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-8">
              "Building excellence through integrated solutions and unwavering commitment to quality"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-0.5 bg-white/50"></div>
              <span className="text-white/80 text-sm font-medium">Our Vision</span>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-white/5 rounded-full -mr-12 md:-mr-16 -mt-12 md:-mt-16"></div>
          <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-white/5 rounded-full -ml-16 md:-ml-24 -mb-16 md:-mb-24"></div>
        </div>
        
        {/* Stats Badge - Updated */}
        <div className="absolute -bottom-6 -right-4 md:-right-6 bg-white rounded-xl p-3 md:p-4 shadow-xl border border-gray-100">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-[#18403C] rounded-full p-1.5 md:p-2">
              <FaAward className="text-white text-base md:text-xl" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-[#18403C]">24+</div>
              <div className="text-xs text-gray-500">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Section - Updated with Contact Information */}
      <div className="fade-up-element order-1 md:order-2" id="ceo-content">
        <div className="inline-flex items-center gap-2 bg-[#18403C]/10 px-4 py-2 rounded-full mb-4">
          <FaQuoteLeft className="text-[#18403C] text-sm" />
          <span className="text-sm font-medium text-[#18403C]">Leadership</span>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-2">
          Madhu Sharma
        </h2>
        <p className="text-lg text-[#18403C]/80 font-semibold mb-4">
          CEO, Crafx Services Pvt. Ltd.
        </p>
        <p className="text-gray-500 mb-4">
          Part of the Aayushmanbhava Group
        </p>
        
        <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mb-6 rounded-full"></div>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          With over <span className="font-semibold text-[#18403C]">24 years of diversified experience</span> across infrastructure, digital solutions, retail projects, and large-scale project execution, I have been closely associated with delivering complex, multi-location assignments for enterprise and government clients.
        </p>
        
        <p className="text-gray-600 mb-4 leading-relaxed">
          My experience spans strategic business development, client acquisition, and end-to-end execution of high-value projects across sectors such as:
        </p>
        
        {/* Sectors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                <Icon className="text-[#18403C] text-sm" />
                <span className="text-sm text-gray-700">{sector.name}</span>
              </div>
            );
          })}
        </div>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Through my journey, I have observed critical challenges in project execution—<span className="font-medium">vendor fragmentation, delays, cost inefficiencies, and lack of integrated coordination</span>.
        </p>
        
        {/* Contact Information - Added similar to Tarun section */}
        <div className="bg-gradient-to-r from-[#18403C]/5 to-transparent rounded-xl p-5 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-[#18403C] rounded-full p-2">
              <FaPhoneAlt className="text-white text-sm" />
            </div>
            <span className="text-gray-700 font-medium">+91 9891008636</span>
            <span className="text-gray-700 font-medium">+91 9818865522</span>
          </div>
          
          
        </div>
        
        {/* Additional Company Info */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Progrid Infra & Constructions Pvt. Ltd.:</span> www.progrid.in
          </p>
        </div>
        
       
      </div>
      
    </div>
  </div>
</div>

      {/* Tarun Anand - Founder Director Section */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            
            {/* Content Section - Now on the left (Order 1) */}
            <div className="fade-up-element order-1" id="tarun-content">
              <div className="inline-flex items-center gap-2 bg-[#18403C]/10 px-4 py-2 rounded-full mb-4">
                <FaUserTie className="text-[#18403C] text-sm" />
                <span className="text-sm font-medium text-[#18403C]">Leadership & Founder</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-2">
                Tarun Anand
              </h2>
              <p className="text-lg text-[#18403C]/80 font-semibold mb-4">
                Founder Director, Crafx Services Pvt. Ltd.
              </p>
              <p className="text-gray-500 mb-4">
                Civil Engineer | MBA (IB) | Doctor in Naturopathy & Ayurveda (Pursuing)
              </p>
              
              <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mb-6 rounded-full"></div>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                With over <span className="font-semibold text-[#18403C]">25 years of extensive experience</span> in Supply Chain Management, Procurement, Contracts Management, and Project Execution, I bring a holistic approach to infrastructure development.
              </p>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                My career journey includes leadership roles with India's premier infrastructure organizations:
              </p>
              
              {/* Companies Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {companies.map((company, idx) => {
                  const Icon = company.icon;
                  return (
                    <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                      <Icon className="text-[#18403C] text-sm" />
                      <span className="text-sm text-gray-700">{company.name}</span>
                    </div>
                  );
                })}
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                My expertise lies in awarding and managing large, complex subcontract packages across major infrastructure projects—<span className="font-medium">Metros, Roads & Highways, Tunnels, Bridges, Buildings, and Mining projects</span>—executed on a PAN India basis.
              </p>
              
              {/* Contact Information */}
              <div className="bg-gradient-to-r from-[#18403C]/5 to-transparent rounded-xl p-5 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[#18403C] rounded-full p-2">
                    <FaPhoneAlt className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">+91 9505971133</span>
                  <span className="text-gray-700 font-medium">+91 7715011000</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-[#18403C] rounded-full p-2">
                    <FaEnvelope className="text-white text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">tarun.india@rediffmail.com</span>
                </div>
              </div>
              
              
            </div>
            
            {/* Decorative Section with Quote - Now on the right (Order 2) */}
            <div className="relative fade-up-element order-2" id="tarun-decoration">
              <div className="relative bg-gradient-to-br from-[#18403C] to-[#2c6b64] rounded-2xl shadow-2xl p-6 md:p-12">
                {/* Quote or Vision Statement */}
                <div className="relative z-10">
                  <FaQuoteLeft className="text-white/20 text-4xl md:text-6xl mb-6" />
                  <p className="text-white text-lg md:text-xl lg:text-2xl font-light leading-relaxed mb-8">
                    "Strategic collaboration and integrated execution are the cornerstones of building a resilient infrastructure for tomorrow."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-0.5 bg-white/50"></div>
                    <span className="text-white/80 text-sm font-medium">Our Philosophy</span>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-white/5 rounded-full -mr-12 md:-mr-16 -mt-12 md:-mt-16"></div>
                <div className="absolute bottom-0 left-0 w-32 md:w-48 h-32 md:h-48 bg-white/5 rounded-full -ml-16 md:-ml-24 -mb-16 md:-mb-24"></div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-6 bg-white rounded-xl p-3 md:p-4 shadow-xl border border-gray-100">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-[#18403C] rounded-full p-1.5 md:p-2">
                    <FaBuilding className="text-white text-base md:text-xl" />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-[#18403C]">25+</div>
                    <div className="text-xs text-gray-500">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-up-element" id="who-we-are">
            <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-4">
              Who We Are
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mb-6 rounded-full"></div>
            <p className="text-gray-600 text-lg mb-4">
              Crafx Services Pvt. Ltd. is a premier consultancy and technical support firm dedicated to transforming infrastructure development across India.
            </p>
            <p className="text-gray-600 mb-6">
              With over 25 years of industry expertise, we've built a reputation for excellence in connecting complex projects with efficient solutions. Our deep understanding of Supply Chain Management, Procurement & Contracts, combined with our commitment to quality and safety, makes us the preferred partner for leading infrastructure organizations.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#18403C]" />
                <span className="text-gray-600">Mumbai, India</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-[#18403C]" />
                <span className="text-gray-600">Est. 2020</span>
              </div>
            </div>
          </div>
          <div className="relative fade-up-element" id="who-we-are-image">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                alt="Team at Work"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#18403C]/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
      
      <FeaturesPage />

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up-element" id="values-header">
            <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Crafx Services Pvt. Ltd.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group fade-up-element"
                  id={`value-${index}`}
                  style={{
                    opacity: visibleElements[`value-${index}`] ? 1 : 0,
                    transform: visibleElements[`value-${index}`] ? "translateY(0)" : "translateY(30px)",
                    transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                  }}
                >
                  <div className="bg-[#18403C]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#18403C] transition-all duration-300">
                    <IconComponent className="text-3xl text-[#18403C] group-hover:text-white transition-all duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#18403C] mb-3">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Location & Contact Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="fade-up-element" id="location">
            <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-4">
              Our Location
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mb-6 rounded-full"></div>
            <p className="text-gray-600 mb-6">
              Visit our headquarters in Mumbai, the heart of India's corporate landscape.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#18403C] text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Address</h4>
                  <p className="text-gray-600 break-words">7th Floor, Gateway Plaza, Hiranandani Business Park, Powai, Mumbai - 400076</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#18403C] text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Phone</h4>
                  <p className="text-gray-600">+91 7715011000</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-[#18403C] text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Email</h4>
                  <p className="text-gray-600 break-words">info@crafx.in</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="text-[#18403C] text-xl mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Working Hours</h4>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden shadow-xl fade-up-element" id="map">
            <img 
              src="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&h=400&fit=crop"
              alt="Mumbai City"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <p className="text-[#18403C] font-semibold">Crafx Services Pvt. Ltd.</p>
                <p className="text-sm text-gray-600">Powai, Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="relative bg-gradient-to-r from-[#18403C] to-[#2c6b64] rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative p-8 md:p-12 text-center">
            <h3 className="text-xl md:text-2xl lg:text-4xl font-bold text-white mb-4">
              Ready to Partner for Your Next Project?
            </h3>
            <p className="text-white/90 text-sm md:text-base lg:text-lg mb-6 max-w-2xl mx-auto">
              Let's work together to build India's infrastructure. Contact us today for a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <button onClick={goservice} className="border-2 border-white text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold hover:bg-white hover:text-[#18403C] transition-all duration-300">
                View Our Services
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;