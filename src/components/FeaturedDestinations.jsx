import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import img1 from "../assets/Domestic/Varanasi/1.jpg";
import img2 from "../assets/Domestic/Rajasthan/1.jpg";
import img3 from "../assets/Domestic/Mysore/1.jpg";
import img4 from "../assets/Domestic/Goa/1.jpg";
import img5 from "../assets/International/Dubai/1.jpg";
import img6 from "../assets/International/Switzerland/1.jpg";
import img7 from "../assets/International/Nepal/1.jpg";
import img8 from "../assets/International/Bali/1.jpg";

const destinations = [
  {
    id: 1,
    name: "Varanasi",
    image: img1,
    category: "Religious",
  },
  {
    id: 2,
    name: "Rajasthan",
    image: img2,
    category: "Heritage",
  },
  {
    id: 3,
    name: "Kerala",
    image: img3,
    category: "Nature",
  },
  {
    id: 4,
    name: "Goa",
    image: img4,
    category: "Beach",
  },
  {
    id: 5,
    name: "Dubai",
    image: img5,
    category: "Luxury",
  },
  {
    id: 6,
    name: "Switzerland",
    image: img6,
    category: "Adventure",
  },
  {
    id: 7,
    name: "Nepal",
    image: img7,
    category: "Trekking",
  },
  {
    id: 8,
    name: "Bali",
    image: img8,
    category: "Adventure",
  },
];

export default function FeaturedDestinations() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Popular Destinations
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most sought-after destinations with exclusive tours
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative rounded-lg overflow-hidden group"
            >
              <div className="relative h-48 md:h-64 w-full">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center text-white mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{destination.name}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {destination.category}
                </h3>
              </div>

              {/* <Link
                to={`/destinations/${destination.id}`}
                className="absolute inset-0"
              >
                <span className="sr-only">
                  View {destination.name} packages
                </span>
              </Link> */}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
