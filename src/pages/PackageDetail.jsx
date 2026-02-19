import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  Clock,
  Star,
  Users,
  Utensils,
  Hotel,
  Car,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  Phone,
} from "lucide-react";
import domesticTours from "../data/domestic-tours";
import internationalTours from "../data/international-tours";
import importantNotes from "../data/important-notes";

export default function PackageDetail() {
  const { id } = useParams(); // `id` here refers to the slug in the URL
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedPackages, setRelatedPackages] = useState([]);

  // Combine domestic and international tours
  const allTours = [...domesticTours, ...internationalTours];

  // Fetch package data based on slug
  const packageData = allTours.find((pkg) => pkg.slug === id);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Generate related packages based on type
  useEffect(() => {
    if (packageData) {
      // Filter packages by type, excluding current package
      const sameTypePackages = allTours.filter(
        (pkg) => pkg.type === packageData.type && pkg.slug !== packageData.slug,
      );

      // Shuffle and get 3 random packages
      const shuffled = sameTypePackages.sort(() => 0.5 - Math.random());
      setRelatedPackages(shuffled.slice(0, 3));
    }
  }, [packageData]);

  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % (packageData?.images?.length || 1),
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      return (
        (prevIndex - 1 + (packageData?.images?.length || 1)) %
        (packageData?.images?.length || 1)
      );
    });
  };

  if (!packageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Package not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh]">
        <div className="absolute inset-0">
          <img
            src={packageData.image || "/placeholder.svg"}
            alt={packageData.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <div className="inline-block bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded mb-4">
                {packageData.category}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                {packageData.title}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {packageData.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-white">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  <span>{packageData.location}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" />
                  <span>{packageData.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 mr-1 text-amber-400" />
                  <span>
                    {packageData.rating} ({packageData.reviews} reviews)
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Package Details */}
            <div className="lg:col-span-2">
              {/* Navigation Tabs */}
              <div className="flex overflow-x-auto space-x-4 mb-8 pb-2">
                {[
                  "overview",
                  "itinerary",
                  "inclusions",
                  "gallery",
                  "important-notes",
                ].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium whitespace-nowrap capitalize transition-colors duration-300 ${
                      activeTab === tab
                        ? "text-orange-500 border-b-2 border-orange-500"
                        : "text-gray-600 hover:text-orange-500"
                    }`}
                  >
                    {tab === "important-notes" ? "Important Notes" : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-4">Overview</h2>
                    <p className="text-gray-700 mb-8">{packageData.overview}</p>

                    <h3 className="text-xl font-bold mb-4">
                      Package Highlights
                    </h3>
                    <ul className="grid gap-3 mb-8">
                      {packageData.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="text-xl font-bold mb-4">
                      Additional Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Best Time to Visit</h4>
                        <p className="text-gray-700">
                          {packageData.additionalInfo.bestTimeToVisit}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Languages Spoken</h4>
                        <p className="text-gray-700">
                          {packageData.additionalInfo.languages}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Currency</h4>
                        <p className="text-gray-700">
                          {packageData.additionalInfo.currency}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold mb-2">Visa Requirements</h4>
                        <p className="text-gray-700">
                          {packageData.additionalInfo.visa || "N/A"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Itinerary Tab */}
                {activeTab === "itinerary" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Itinerary</h2>

                    <div className="space-y-8">
                      {packageData.itinerary.map((day, index) => (
                        <div
                          key={index}
                          className="relative pl-8 pb-8 border-l-2 border-gray-200 last:border-0 last:pb-0"
                        >
                          <div className="absolute left-[-9px] top-0 bg-orange-500 w-4 h-4 rounded-full"></div>
                          <h3 className="text-xl font-bold mb-2">{day.day}</h3>
                          <p className="text-gray-700">{day.description}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Inclusions Tab */}
                {activeTab === "inclusions" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">
                      Inclusions & Exclusions
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 text-green-600">
                          What's Included
                        </h3>
                        <ul className="space-y-3">
                          {packageData.inclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-4 text-red-600">
                          What's Not Included
                        </h3>
                        <ul className="space-y-3">
                          {packageData.exclusions.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <X className="h-5 w-5 text-red-500 mr-2 mt-1 flex-shrink-0" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>

                    <div className="relative mb-6">
                      <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
                        <img
                          src={
                            packageData.images[currentImageIndex] ||
                            "/placeholder.svg"
                          }
                          alt={`${packageData.title} - Image ${
                            currentImageIndex + 1
                          }`}
                          className="object-cover w-full h-full"
                        />
                      </div>

                      <button
                        onClick={prevImage}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors duration-300"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white transition-colors duration-300"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6 text-gray-800" />
                      </button>
                    </div>

                    <div className="grid grid-cols-5 gap-2">
                      {packageData.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative h-20 rounded-md overflow-hidden ${
                            currentImageIndex === index
                              ? "ring-2 ring-orange-500"
                              : ""
                          }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${packageData.title} - Thumbnail ${
                              index + 1
                            }`}
                            className="object-cover w-full h-full"
                          />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Important Notes Tab */}
                {activeTab === "important-notes" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Important Notes</h2>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      {importantNotes.map((note, idx) => (
                        <li key={idx}>{note}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div>
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                {/* <h3 className="text-2xl font-bold mb-2">Price</h3> */}
                {/* <p className="text-gray-600 mb-4">Starting from (per person)</p> */}
                <div className="text-lg font-bold text-orange-500 mb-6">
                  Contact us for best price
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium">Duration</div>
                      <div className="text-gray-600">
                        {packageData.duration}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium">Group Size</div>
                      <div className="text-gray-600">2-15 people</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Utensils className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium">Meals</div>
                      <div className="text-gray-600">Breakfast</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Hotel className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium">Accommodation</div>
                      <div className="text-gray-600">3-star hotel</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Car className="h-5 w-5 text-gray-600 mr-3" />
                    <div>
                      <div className="font-medium">Transportation</div>
                      <div className="text-gray-600">Private AC vehicle</div>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open("tel:+919415292315")}
                  className="w-full py-3 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-colors duration-300 mb-4"
                >
                  <span className="flex justify-center">
                    <Phone className="h-5 w-5 mr-2" />
                    Book Now
                  </span>
                </motion.button>

                <Link
                  to="/contact"
                  className="block w-full py-3 bg-teal-500 text-white font-bold rounded-md hover:bg-teal-600 transition-colors duration-300 text-center"
                >
                  Customize Package
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Packages */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Packages You May Like</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md">
                  <div className="relative h-48 w-full">
                    <img
                      src={pkg.image || "/placeholder.svg"}
                      alt={pkg.title}
                      className="object-cover w-full h-full"
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

                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {pkg.title}
                    </h3>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-amber-500 mr-2">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">
                          {pkg.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        ({pkg.reviews}+ Reviews)
                      </div>
                    </div>

                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{pkg.duration}</span>
                    </div>

                    <Link
                      to={`/packages/${pkg.slug}`}
                      className="block w-full px-4 py-2 bg-teal-500 text-white text-sm font-medium rounded hover:bg-teal-600 transition-colors duration-300 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
