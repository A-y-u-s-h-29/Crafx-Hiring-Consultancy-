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
  FaQuoteLeft
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FeaturesPage from "../components/FeaturesPage";

const AboutUs = () => {

   const navigate= useNavigate();

  const goservice =()=>{
    navigate("/services")
    scrollTo(0,0)
  }
  const [visibleElements, setVisibleElements] = useState({});

  const values = [
    {
      title: "Integrity",
      description: "We operate with complete transparency and honesty in all our dealings with clients and candidates.",
      icon: FaHeart,
      color: "#18403C"
    },
    {
      title: "Excellence",
      description: "Striving for the highest quality in recruitment solutions and candidate placements.",
      icon: FaTrophy,
      color: "#18403C"
    },
    {
      title: "Innovation",
      description: "Embracing modern technology and innovative approaches to talent acquisition.",
      icon: FaLightbulb,
      color: "#18403C"
    },
    {
      title: "Partnership",
      description: "Building long-term relationships with clients and candidates based on trust and mutual success.",
      icon: FaHandshake,
      color: "#18403C"
    }
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
    <div className="bg-white min-h-screen park">
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
                Connecting Talent
                <span className="block text-white/90">with Opportunity</span>
              </h1>
              <p className="text-white/90 text-lg mb-8">
                Zenon Hiring Solution is your trusted recruitment partner in Noida, dedicated to bridging the gap between exceptional talent and leading organizations across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-white text-[#18403C] px-8 py-3 rounded-full font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                  Contact Us Today
                  <img src="/images/ok1.svg"/>
                </button>
                <button  onClick={goservice} className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#18403C] transition-all duration-300">
                  View Our Services
                </button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/about1.webp"
                  alt="Team Meeting"
                  className="w-full h-[90vh] object-cover rounded-2xl"
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
                    <div className="text-2xl font-bold text-[#18403C]">200+</div>
                    <div className="text-xs text-gray-600">Successful Placements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute -bottom-20 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaUsers className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">200+</div>
            <div className="text-xs md:text-sm text-gray-600">Placements Done</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaBuilding className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">20+</div>
            <div className="text-xs md:text-sm text-gray-600">Client Companies</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaGlobe className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">15+</div>
            <div className="text-xs md:text-sm text-gray-600">Cities Covered</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaStar className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">98%</div>
            <div className="text-xs md:text-sm text-gray-600">Client Satisfaction</div>
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
              Zenon Hiring Solution is a premier recruitment agency based in Noida, dedicated to transforming the way organizations find and hire talent.
            </p>
            <p className="text-gray-600 mb-6">
              With years of industry expertise, we've built a reputation for excellence in connecting top-tier professionals with leading companies across various sectors. Our deep understanding of the recruitment landscape, combined with our commitment to quality, makes us the preferred partner for businesses seeking the best talent.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#18403C]" />
                <span className="text-gray-600">Noida, India</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-[#18403C]" />
                <span className="text-gray-600">Est. 2023</span>
              </div>
            </div>
          </div>
          <div className="relative fade-up-element" id="who-we-are-image">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=500&fit=crop"
                alt="Office"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#18403C]/20 to-transparent"></div>
            </div>
           
          </div>
        </div>
      </div>
  <FeaturesPage/>
      {/* Our Values Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 fade-up-element" id="values-header">
            <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-4">
              Our Core Values
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mx-auto mb-6 rounded-full"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at Zenon Hiring Solution
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
              Visit our headquarters in Noida, the heart of India's corporate landscape.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#18403C] text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Address</h4>
                  <p className="text-gray-600">B-45, Sector 62, Noida, Uttar Pradesh - 201301, India</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-[#18403C] text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Phone</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaEnvelope className="text-[#18403C] text-xl mt-1" />
                <div>
                  <h4 className="font-semibold text-[#18403C] mb-1">Email</h4>
                  <p className="text-gray-600">info@zenonhiring.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaClock className="text-[#18403C] text-xl mt-1" />
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
              alt="Noida City"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                <p className="text-[#18403C] font-semibold">Zenon Hiring Solution</p>
                <p className="text-sm text-gray-600">Sector 62, Noida</p>
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
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
              Ready to Find Your Next Great Talent?
            </h3>
            <p className="text-white/90 text-base md:text-lg mb-6 max-w-2xl mx-auto">
              Let's work together to build your dream team. Contact us today for a consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-[#18403C] px-6 md:px-8 py-2.5 md:py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center">
                Get in Touch
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
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