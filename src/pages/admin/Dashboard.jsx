import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Package, Users, MessageSquare, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllTours } from "../../data";
import {
  tourFormSubmissions,
  customTourFormSubmissions,
  newsletterSubscriptions,
} from "../../data/forms";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalTours: 0,
    totalInquiries: 0,
    totalCustomRequests: 0,
    totalSubscribers: 0,
  });

  const [recentInquiries, setRecentInquiries] = useState([]);
  const [popularTours, setPopularTours] = useState([]);

  useEffect(() => {
    // Calculate stats
    const tours = getAllTours();
    const inquiries = tourFormSubmissions;
    const customRequests = customTourFormSubmissions;
    const subscribers = newsletterSubscriptions.filter(
      (sub) => sub.status === "Active"
    );

    setStats({
      totalTours: tours.length,
      totalInquiries: inquiries.length,
      totalCustomRequests: customRequests.length,
      totalSubscribers: subscribers.length,
    });

    // Get recent inquiries
    const recent = [...inquiries]
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
      .slice(0, 5);
    setRecentInquiries(recent);

    // Get popular tours based on ratings and reviews
    const popular = [...tours]
      .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
      .slice(0, 5);
    setPopularTours(popular);
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Tours</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalTours}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
              <MessageSquare size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tour Inquiries</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalInquiries}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
              <Map size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Custom Requests</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalCustomRequests}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">Subscribers</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.totalSubscribers}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Inquiries and Popular Tours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Inquiries
            </h2>
          </div>
          <div className="p-6">
            {recentInquiries.length > 0 ? (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start">
                    <div
                      className={`w-2 h-2 mt-2 rounded-full mr-3 ${
                        inquiry.status === "New"
                          ? "bg-blue-500"
                          : inquiry.status === "Contacted"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-gray-800">
                          {inquiry.name}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            inquiry.status === "New"
                              ? "bg-blue-100 text-blue-800"
                              : inquiry.status === "Contacted"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {inquiry.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {inquiry.packageName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(inquiry.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent inquiries
              </p>
            )}
            <div className="mt-4 text-center">
              <Link
                to="/admin/tour-forms"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all inquiries
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Popular Tours
            </h2>
          </div>
          <div className="p-6">
            {popularTours.length > 0 ? (
              <div className="space-y-4">
                {popularTours.map((tour) => (
                  <div key={tour.id} className="flex items-center">
                    <div className="w-12 h-12 rounded-md overflow-hidden mr-4">
                      <img
                        src={tour.image || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{tour.title}</p>
                      <div className="flex items-center text-sm">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-gray-600">{tour.rating}</span>
                        <span className="mx-2 text-gray-400">|</span>
                        <span className="text-gray-600">
                          {tour.reviews} reviews
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {/* <p className="font-bold text-blue-600">{tour.price}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No tours available
              </p>
            )}
            <div className="mt-4 text-center">
              <Link
                to="/admin/tours"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                View all tours
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow mb-8"
      >
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/admin/add-tour"
              className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                <Package size={20} />
              </div>
              <span className="font-medium text-blue-800">Add New Tour</span>
            </Link>

            <Link
              to="/admin/tour-forms"
              className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <MessageSquare size={20} />
              </div>
              <span className="font-medium text-green-800">View Inquiries</span>
            </Link>

            <Link
              to="/admin/custom-tour-forms"
              className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <Map size={20} />
              </div>
              <span className="font-medium text-purple-800">
                Custom Requests
              </span>
            </Link>

            <Link
              to="/admin/newsletter"
              className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
            >
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <Users size={20} />
              </div>
              <span className="font-medium text-yellow-800">Subscribers</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
