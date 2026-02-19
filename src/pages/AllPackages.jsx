import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import PackageCard from "../components/PackageCard";
import domesticTours from "../data/domestic-tours";
import internationalTours from "../data/international-tours";
import { useLocation } from "react-router-dom";

import img1 from "../assets/International/Dubai/1.jpg";

// Combine all packages from both sources
const allPackages = [...domesticTours, ...internationalTours];

export default function AllPackages() {
  const location = useLocation();
  // Parse query params for initial filter
  const params = new URLSearchParams(location.search);
  const initialType = params.get("type") || "all";

  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(initialType);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredPackages, setFilteredPackages] = useState(allPackages);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Update filter if URL changes (e.g., user navigates with query param)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get("type") || "all";
    setSelectedType(type);
  }, [location.search]);

  useEffect(() => {
    let filtered = allPackages;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pkg.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((pkg) => pkg.type === selectedType);
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((pkg) => pkg.category === selectedCategory);
    }

    setFilteredPackages(filtered);
  }, [searchTerm, selectedType, selectedCategory]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <div className="absolute inset-0">
          <img
            src={img1}
            alt="Tour Packages"
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
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              All Tour Packages
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Discover our wide range of domestic and international tour
              packages
            </motion.p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6 -mt-16 relative z-10"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by destination or package name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-2 md:gap-4 overflow-hidden">
                <div className="relative">
                  <Filter className="absolute left-1 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    className="pl-8 md:pl-10 md:pr-8 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="domestic">Domestic</option>
                    <option value="international">International</option>
                  </select>
                </div>

                <div className="relative">
                  <Filter className="absolute left-1 md:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    className="pl-8 md:pl-10 pr-1 md:pr-8 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="RELIGIOUS">Religious</option>
                    <option value="HONEYMOON">Honeymoon</option>
                    <option value="FAMILY">Family</option>
                    <option value="ADVENTURE">Adventure</option>
                    <option value="BEACH">Beach</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold">
              {filteredPackages.length}{" "}
              {selectedType !== "all"
                ? selectedType === "domestic"
                  ? "Domestic"
                  : "International"
                : ""}{" "}
              Tour Packages Found
            </h2>
          </div>

          {filteredPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <PackageCard package={pkg} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">😕</div>
              <h3 className="text-2xl font-bold mb-2">No Packages Found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                We couldn't find any packages matching your search criteria.
                Please try different filters or search terms.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Can't Find What You're Looking For?
              </h2>
              <p className="text-white/90 max-w-xl">
                Contact our travel experts to create a custom tour package
                tailored to your preferences and requirements.
              </p>
            </div>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/contact"
              className="px-8 py-4 bg-white text-orange-500 font-bold rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Request Custom Package
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
