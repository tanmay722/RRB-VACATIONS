import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import FeaturedDestinations from "../components/FeaturedDestinations";
import TestimonialSection from "../components/TestimonialSection";
import WhyChooseUs from "../components/WhyChooseUs";
import DomesticPackage from "../components/home/DomesticPackage";
import InternationalPackage from "../components/home/InternationalPackage";
import { Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Featured Domestic Packages */}
      <DomesticPackage />

      {/* Featured International Packages */}
      <InternationalPackage />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Featured Destinations */}
      <FeaturedDestinations />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for Your Next Adventure?
              </h2>
              <p className="text-white/90 max-w-xl">
                Contact our travel experts today and start planning your dream
                vacation. We'll help you create the perfect itinerary tailored
                to your preferences.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex px-8 py-4 bg-white text-orange-500 font-bold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open("tel:+919415292315")}
            >
              <Phone className="h-5 w-5 mr-2" />
              <span className="font-medium">+91 9415292315</span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  );
}
