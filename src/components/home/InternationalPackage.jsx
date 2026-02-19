import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PackageCard from "../PackageCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import img1 from "../../assets/International/Dubai/1.jpg";
import img2 from "../../assets/International/Nepal/1.jpg";
import img3 from "../../assets/International/Mauritius/1.jpg";

// Sample data for international packages
const internationalPackages = [
  {
    id: 1,
    title: "Dubai Adventure Tour",
    location: "Dubai, Abu Dhabi",
    image: img1,
    duration: "7 Days / 6 Nights",
    rating: 4.7,
    category: "ADVENTURE",
    featured: true,
    slug: "dubai",
  },
  {
    id: 2,
    title: "Nepal Kathmandu Tour",
    location: "Kathmandu, Pokhara",
    image: img2,
    duration: "6 Days / 5 Nights",
    rating: 4.7,
    category: "ADVENTURE",
    featured: true,
    slug: "nepal",
  },
  {
    id: 3,
    title: "Mauritius Island Paradise Tour",
    location: "Mauritius",
    image: img3,
    duration: "7 Days / 6 Nights",
    rating: 4.8,
    category: "HONEYMOON",
    featured: true,
    slug: "mauritius",
  },
];

const InternationalPackage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore International Destinations
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover exotic locations and create unforgettable memories with
              our international tour packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {internationalPackages
              .filter((pkg) => pkg.featured)
              .slice(0, 3)
              .map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <PackageCard package={pkg} />
                </motion.div>
              ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/packages?type=international"
              className="inline-flex items-center px-6 py-3 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition-all duration-300"
            >
              View All International Packages
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InternationalPackage;
