import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Find Your Dream Job",
    text: "Browse through thousands of job listings and find your dream job today.",
    buttonText: "Get Started",
    bgColor: "bg-rose-300",
  },
  {
    title: "Hiring Made Easy",
    text: "Connect with top recruiters and land your next big opportunity.",
    buttonText: "Explore Talents",
    bgColor: "bg-blue-300",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative overflow-hidden h-[300px] flex items-center justify-center">
      <AnimatePresence >
        <motion.div
          key={currentSlide}
          className={`absolute w-full h-full flex flex-col justify-center items-center text-center ${slides[currentSlide].bgColor}`}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 10 }}
        >
          <h1 className="text-4xl font-semibold text-black">{slides[currentSlide].title}</h1>
          <p className="text-lg text-black mt-4">{slides[currentSlide].text}</p>
          <div className="mt-6">
            <Link to="/login" className="bg-white text-sky-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100">
              {slides[currentSlide].buttonText}
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Next Button */}
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-sky-600 px-4 py-2 rounded-md shadow-md hover:bg-gray-100"
      >
        →
      </button>
    </div>
  );
}
