import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Star } from "lucide-react";

export default function PackageCard({ package: pkg }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="package-card bg-white overflow-hidden"
    >
      <div className="relative h-48 w-full">
        <img
          src={pkg.image || "/placeholder.svg"}
          alt={pkg.title}
          className="object-cover h-full w-full"
        />
        <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
          {pkg.category}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{pkg.location}</span>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2">{pkg.title}</h3>

        <div className="flex items-center mb-3">
          <div className="flex items-center text-amber-500 mr-2">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-sm font-medium">{pkg.rating}</span>
          </div>
          <div className="text-xs text-gray-500">({pkg.reviews} Reviews)</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{pkg.duration}</span>
          </div>

          <Link
            to={`/packages/${pkg.slug}`}
            className="px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600 transition-colors duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
