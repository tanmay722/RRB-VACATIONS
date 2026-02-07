import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import FeaturedDestinations from "../components/FeaturedDestinations";
import TestimonialSection from "../components/TestimonialSection";
import WhyChooseUs from "../components/WhyChooseUs";
import DomesticPackage from "../components/home/DomesticPackage";
import InternationalPackage from "../components/home/InternationalPackage";
import { Phone, MapPin, Users, Zap, MessageCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Company Credentials & Services */}
      <section className="py-12 px-4 md:px-6 lg:px-12 bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              About RRB Vacations, Kashi
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Your Trusted DMC for Unforgettable Travel Experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-5 md:p-6 rounded-lg shadow-md border-l-4 border-orange-500"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                Our Coverage
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                We are the trusted DMC of{" "}
                <strong>Uttar Pradesh, Bihar & Nepal</strong>, offering
                comprehensive travel solutions and authentic regional expertise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-5 md:p-6 rounded-lg shadow-md border-l-4 border-teal-500"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-teal-500" />
                Premium Fleet
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Sedan, SUV, Tempo Traveler, Kia Carnival, Force Urbania &
                Coaches with well-trained, professional chauffeurs.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-5 md:p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-500" />
                Expert Local Guides
              </h3>
              <p className="text-gray-700 mb-3 text-sm md:text-base">
                Multi-lingual, well-behaved, and knowledgeable guides:
              </p>
              <div className="space-y-1 text-sm">
                <p className="text-gray-600">
                  ✓ Tamil, Kannada, Telugu, English
                </p>
                <p className="text-gray-600">✓ Multiple Foreign Languages</p>
                <p className="text-gray-600">✓ Cultural expertise</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-5 md:p-6 rounded-lg shadow-md"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3">
                🙏 Spiritual Expertise
              </h3>
              <p className="text-gray-700 mb-2 text-sm md:text-base">
                Trained Pandits performing rituals and Pujas according to
                Sanatan Dharma using Vedic languages.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-gradient-to-r from-orange-500 to-amber-500 text-white p-5 md:p-6 rounded-lg"
          >
            <h3 className="text-lg md:text-xl font-bold mb-3 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Let's Plan Your Journey
            </h3>
            <p className="mb-2 text-white/90 text-sm md:text-base">
              Competitive B2B rates for FIT and Group departures. Available{" "}
              <strong>24 X 7</strong> for queries and bookings.
            </p>
            <p className="text-xs md:text-sm text-white/80">
              📧 Email your requirements | 💬 WhatsApp for quick response
            </p>
          </motion.div>
        </div>
      </section>

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
