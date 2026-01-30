import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import img1 from "../../assets/Home/1.jpg";
import img2 from "../../assets/Home/2.jpg";
import img3 from "../../assets/Home/3.jpg";
import img4 from "../../assets/Home/4.jpg";

const slides = [
  {
    id: 1,
    image: img1,
    title: "Discover the Beauty of India",
    subtitle:
      "Explore sacred temples, majestic mountains, and vibrant cultures",
    cta: "Explore all Tours",
    link: "/packages",
  },
  {
    id: 2,
    image: img2,
    title: "Enlightening Spiritual Journey Experience",
    subtitle:
      "Guided pilgrimage tours to sacred spiritual destinations across India",
    cta: "Explore all Tours",
    link: "/packages",
  },
  {
    id: 3,
    image: img3,
    title: "Adventure, Wildlife and Culture Tours",
    subtitle:
      "From thrilling wildlife to vibrant cultural festivals, experience it all",
    cta: "Explore all Tours",
    link: "/packages",
  },
  {
    id: 4,
    image: img4,
    title: "Discover the Beauty of Nature",
    subtitle:
      "Experience breathtaking landscapes, wildlife, and cultural heritage",
    cta: "Explore all Tours",
    link: "/packages",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[95vh]">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative pt-20 h-full w-full">
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="object-cover h-full w-full pointer-events-none"
            />
            <div className="absolute inset-0 hero-gradient pointer-events-none"></div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-8 text-center md:text-left pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: index === currentSlide ? 1 : 0,
                  y: index === currentSlide ? 0 : 20,
                }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-8">
                  {slide.subtitle}
                </p>
                <Link to={slide.link}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-all duration-300"
                  >
                    {slide.cta}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-orange-500 w-8" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
