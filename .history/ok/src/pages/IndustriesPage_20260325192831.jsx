import React, { useState, useEffect } from "react";
import { 
  FaArrowRight, 
  FaCheckCircle,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaIndustry,
  FaBuilding,
  FaCar,
  FaBolt,
  FaLeaf,
  FaLaptopCode,
  FaChargingStation,
  FaCogs,
  FaHeadset,
  FaRocket,
  FaBullhorn,
  FaFlask,
  FaPalette
} from "react-icons/fa";
import { GiMining, GiOilRig, GiBridge } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";

const IndustriesPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleElements, setVisibleElements] = useState({});

  const industries = [
    {
      title: "Information Technology",
      description: "We provide advice, guidelines and a road map for sourcing, utilizing and managing IT assets and resources.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
      icon: FaLaptopCode,
      stats: "24/7 Support",
      vacancies: "100+ Vacancy",
      color: "#18403C"
    },
    {
      title: "Customer Service",
      description: "Expert customer service professionals dedicated to delivering exceptional support and client satisfaction.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
      icon: FaHeadset,
      stats: "Unlimited",
      vacancies: "Unlimited Vacancy",
      color: "#18403C"
    },
    {
      title: "Human Resource",
      description: "Skilled HR professionals to manage talent acquisition, employee relations, and organizational development.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
      icon: FaUsers,
      stats: "200+ Openings",
      vacancies: "200+ Vacancy",
      color: "#18403C"
    },
    {
      title: "BFSI",
      description: "Financial experts for accounting, auditing, budgeting, and financial planning and analysis.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
      icon: FaChartLine,
      stats: "200+ Openings",
      vacancies: "200+ Vacancy",
      color: "#18403C"
    },
    {
      title: "Business Development",
      description: "Strategic business development professionals to drive growth and expand market presence.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      icon: FaRocket,
      stats: "Unlimited",
      vacancies: "Unlimited Vacancy",
      color: "#18403C"
    },
    {
      title: "Sales & Marketing",
      description: "Dynamic sales and marketing experts to boost brand visibility and drive revenue growth.",
      image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=600&h=400&fit=crop",
      icon: FaBullhorn,
      stats: "Unlimited",
      vacancies: "Unlimited Vacancy",
      color: "#18403C"
    },
    {
      title: "Pharma & FMCG",
      description: "Specialized professionals for pharmaceutical and fast-moving consumer goods industries.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop",
      icon: FaFlask,
      stats: "100+ Openings",
      vacancies: "100+ Vacancy",
      color: "#18403C"
    },
    {
      title: "Design & Creative",
      description: "Creative designers and artists for UI/UX, graphic design, and visual communication.",
      image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&h=400&fit=crop",
      icon: FaPalette,
      stats: "100+ Openings",
      vacancies: "100+ Vacancy",
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
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen park">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#18403C] to-[#2c6b64] overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 md:py-28 mt-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-6">
              <FaIndustry className="text-white text-sm" />
              <span className="text-white font-medium text-sm">Industries We Contribute</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Empowering Industries
              <span className="block text-white/90">with Expert Solutions</span>
            </h1>
            <p className="text-white/90 text-base md:text-xl mb-8 max-w-2xl mx-auto">
              Delivering specialized staffing, inspection, and management solutions across diverse sectors worldwide
            </p>
          </div>
        </div>
        
        {/* Wave Decoration */}
        <div className="absolute -bottom-10 left-0 right-0 ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaUsers className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">50K+</div>
            <div className="text-xs md:text-sm text-gray-600">Professionals Placed</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaChartLine className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">98%</div>
            <div className="text-xs md:text-sm text-gray-600">Client Satisfaction</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <FaGlobe className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">15+</div>
            <div className="text-xs md:text-sm text-gray-600">States Served</div>
          </div>
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 text-center">
            <MdOutlineSecurity className="text-3xl md:text-4xl text-[#18403C] mx-auto mb-2" />
            <div className="text-2xl md:text-3xl font-bold text-[#18403C]">100%</div>
            <div className="text-xs md:text-sm text-gray-600">Compliance Rate</div>
          </div>
        </div>
      </div>

      {/* Industries Grid Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-12 fade-up-element" id="industries-header">
          <h2 className="text-3xl md:text-4xl font-bold text-[#18403C] mb-4">
            Our Industry Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#18403C] to-[#2c6b64] mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Explore current opportunities across various industries
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {industries.map((industry, index) => {
            const isHovered = hoveredIndex === index;
            const elementId = `industry-${index}`;
            const IconComponent = industry.icon;
            
            return (
              <div
                key={index}
                className="fade-up-element"
                id={elementId}
                style={{
                  opacity: visibleElements[elementId] ? 1 : 0,
                  transform: visibleElements[elementId] ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${Math.min(index * 0.05, 0.5)}s`
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={industry.image} 
                      alt={industry.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg">
                      <IconComponent className="text-2xl text-[#18403C]" />
                    </div>
                    
                   
                  </div>
                  
                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#18403C] mb-2 group-hover:text-[#2c6b64] transition-colors">
                      {industry.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">
                      {industry.description}
                    </p>
                    
                   
                    
                    {/* Learn More Button */}
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-gray-100">
                     
                      <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-green-500 text-xs" />
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated Bottom Border */}
                  <div 
                    className="absolute bottom-0 left-0 h-1 transition-all duration-500 rounded-full"
                    style={{
                      width: isHovered ? "100%" : "0%",
                      background: "linear-gradient(90deg, #18403C 0%, #2c6b64 100%)",
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="bg-gradient-to-r from-[#18403C] to-[#2c6b64] rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Start Your Career Journey?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Submit your resume and let our experts find the perfect opportunity for you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#18403C] px-6 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
              Upload Resume
            </button>
           
          </div>
        </div>
      </div>

      {/* Add custom styles for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default IndustriesPage;