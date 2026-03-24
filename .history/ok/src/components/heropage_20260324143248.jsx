import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const navigate= useNavigate();

  const goservice =()=>{
    navigate("/services")
  }
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of background images
  const slides = [
    {
      url: "/images/main1.jpg",
      alt: "Recruitment background 1"
    },
    {
      url: "/images/ne",
      alt: "Recruitment background 2"
    },
    {
      url: "/images/ne3.jpg",
      alt: "Recruitment background 3"
    },
    {
      url: "/images/ne5.jpg",
      alt: "Recruitment background 4"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  // Manual navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };



  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center  bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${slide.url}')`,
            }}
          >
            {/* Dark Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>


      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="container mx-auto px-4 mt-20">
          <div className="max-w-2xl">
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-light text-white mb-4 leading-tight park">
              <span className="font-semibold">Recruitment</span> process <br />
              <span className="">with smart solutions.</span>
            </h1>

            {/* Subheading */}
            <p className="text-md text-gray-200 mb-8 park">
              Linkrow is your trusted partner in recruitment, offering
              personalized HR solutions that connect top talent with the right
              opportunities.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 park">
              {/* Get Started Button with Arrow Icon */}
              <button className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-[#1F514C] font-semibold rounded-4xl transition duration-300 transform hover:scale-105 shadow-lg group">
                <span>Free Consultation</span>
                <img src="/images/ok.svg" alt="arrow" />
              </button>

              {/* Learn More Button with Info Icon */}
              <button onClick={goservice} className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold rounded-4xl transition duration-300 transform hover:scale-105 group">
                <span>Explore Our Services</span>
                <img src="/images/ok1.svg" alt="arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;