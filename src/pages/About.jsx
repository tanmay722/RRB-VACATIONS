import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Award, MapPin, Clock, ThumbsUp, Phone } from "lucide-react";
import about1 from "../assets/About/about.jpg";
import about2 from "../assets/About/1.webp";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={about1}
            alt="About RRB Vacations, Kashi"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            >
              About RRB Vacations, Kashi
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Your trusted partner for exceptional travel experiences in India
              and around the world
            </motion.p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Founded in 2025, RRB Vacations, Kashi began with a clear
                  purpose: to reveal India's profound beauty and diversity
                  through meticulously designed travel experiences.
                </p>
                <p>
                  Evolving from a dedicated team of enthusiasts into a trusted
                  operator serving thousands annually, our growth is rooted in
                  an unwavering commitment to authenticity, attention to detail,
                  and personalized service.
                </p>
                <p>
                  Today, we offer an extensive portfolio of domestic and
                  international tours—from spiritual pilgrimages to luxury
                  honeymoons. Our seasoned professionals diligently craft every
                  journey to ensure an experience that surpasses expectations.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <img
                src={about2}
                alt="RRB Vacations, Kashi Team"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Guided by our core values, we strive to create memorable travel
              experiences for every customer
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-orange-500">
                Our Mission
              </h3>
              <p className="text-gray-700 mb-4">
                To provide exceptional travel experiences that create lasting
                memories, foster cultural understanding, and exceed our
                customers' expectations through personalized service and
                attention to detail.
              </p>
              <p className="text-gray-700">
                We are committed to showcasing the rich cultural heritage,
                natural beauty, and spiritual significance of destinations
                across India and around the world, while ensuring responsible
                and sustainable tourism practices.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold mb-4 text-teal-500">
                Our Vision
              </h3>
              <p className="text-gray-700 mb-4">
                To be the most trusted and preferred tour operator in India,
                recognized for our integrity, innovation, and commitment to
                customer satisfaction.
              </p>
              <p className="text-gray-700">
                We envision a future where travel is not just about visiting
                places, but about creating meaningful connections, understanding
                diverse cultures, and contributing positively to the communities
                we visit. We aim to make travel accessible, enjoyable, and
                enriching for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at RRB Vacations, Kashi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-10 w-10 text-orange-500" />,
                title: "Customer First",
                description:
                  "We prioritize our customers' needs and preferences, tailoring our services to provide personalized experiences that exceed expectations.",
              },
              {
                icon: <Award className="h-10 w-10 text-orange-500" />,
                title: "Excellence",
                description:
                  "We strive for excellence in every aspect of our service, from the planning stage to the execution of the tour, ensuring attention to detail and quality.",
              },
              {
                icon: <MapPin className="h-10 w-10 text-orange-500" />,
                title: "Authenticity",
                description:
                  "We believe in showcasing the true essence of each destination, promoting authentic cultural experiences and local interactions.",
              },
              {
                icon: <Clock className="h-10 w-10 text-orange-500" />,
                title: "Reliability",
                description:
                  "We are committed to being reliable partners, delivering on our promises and ensuring a smooth and hassle-free travel experience.",
              },
              {
                icon: <ThumbsUp className="h-10 w-10 text-orange-500" />,
                title: "Integrity",
                description:
                  "We conduct our business with honesty, transparency, and ethical practices, building trust with our customers and partners.",
              },
              {
                icon: <Phone className="h-10 w-10 text-orange-500" />,
                title: "Accessibility",
                description:
                  "We are always available to assist our customers, providing prompt support and guidance throughout their journey with us.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Explore with Us?
              </h2>
              <p className="text-white/90 max-w-xl">
                Contact our team today to start planning your dream vacation.
                We'll help you create the perfect itinerary tailored to your
                preferences.
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="px-8 py-4 bg-white text-orange-500 font-bold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
