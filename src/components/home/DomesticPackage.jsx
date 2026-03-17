import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PackageCard from "../PackageCard";
import { ChevronRight, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../services/api";

const DomesticPackage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPackages();
    setIsLoaded(true);
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await api.get("/packages?type=domestic");
      // Our backend handles filtering if we add it, but for now we filter here
      const domestic = res.data.filter((pkg) => pkg.type === "domestic");
      setPackages(domestic.slice(0, 3));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching domestic packages:", err);
      setLoading(false);
    }
  };

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

          {loading ? (
            <div className="flex justify-center py-10">
              <Loader className="animate-spin text-orange-500 h-10 w-10" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
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
          )}

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
