import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PackageCard from "../PackageCard";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import img1 from "../../assets/Domestic/Varanasi/1.jpg";
import img2 from "../../assets/Domestic/Darjeeling/1.jpg";
import img3 from "../../assets/Domestic/Rajasthan/1.jpg";

// Sample data for domestic packages
const domesticPackages = [
  {
    id: 1,
    title: "Kashi Tour Package",
    location: "Varanasi",
    image: img1,
    duration: "3 Days / 2 Nights",
    price: "₹12,999",
    rating: 4.8,
    category: "RELIGIOUS",
    featured: true,
    slug: "kashi",
  },
  {
    id: 2,
    title: "Darjeeling Gangtok Tour",
    location: "West Bengal, Sikkim",
    image: img2,
    duration: "6 Days / 5 Nights",
    price: "₹28,999",
    rating: 4.9,
    category: "ADVENTURE",
    featured: true,
    slug: "darjeeling-gangtok",
  },
  {
    id: 3,
    title: "Rajasthan Honeymoon Tour",
    location: "Jaipur, Udaipur, Jodhpur",
    image: img3,
    duration: "6 Days / 5 Nights",
    price: "₹32,999",
    rating: 4.9,
    category: "HONEYMOON",
    featured: true,
    slug: "rajasthan",
  },
];

const DomesticPackage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div>
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Popular Domestic Packages
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the rich cultural heritage and breathtaking landscapes of
              India with our carefully curated domestic tour packages.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {domesticPackages
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
              to="/packages?type=domestic"
              className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-all duration-300"
            >
              View All Domestic Packages
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DomesticPackage;
