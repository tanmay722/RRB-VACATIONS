import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  // Scroll to top handler
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="mb-4 flex items-center space-x-2">
                <img
                  src="/Logo.jpg"
                  alt="RRB Vacations, Kashi Logo"
                  className="h-10 md:h-14 lg:h-16 w-auto"
                />
                <div>
                  <span className="block md:ml-4 text-xl font-bold">
                    RRB Vacations, Kashi{" "}
                  </span>
                  <span className="block md:ml-4 textsm font-light text-gray-400">
                    DMC of Uttar Pradesh
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Your trusted partner for domestic and international tour
                packages. We provide exceptional travel experiences with
                personalized service.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    All Tour Packages
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages?type=domestic"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Domestic Tours
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages?type=international"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    International Tours
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Popular Packages */}
            <div>
              <h3 className="text-xl font-bold mb-4">Popular Packages</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/packages/varanasi"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Varanasi Tour Package
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages/rajasthan"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Rajasthan Honeymoon Package
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages/kerala-mysore"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Kerala Mysore Package
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages/buddhist-pilgrimage"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Buddhist Pilgrimage Tour
                  </Link>
                </li>
                <li>
                  <Link
                    to="/packages/dubai"
                    onClick={handleScrollTop}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Dubai Adventure Tour
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-orange-500 mt-1" />
                  <span className="text-gray-400">
                    <strong>Head Office:</strong> Brahmdev Vihar Colony, Chunar
                    Road, Chitaipur, Varanasi, Uttar Pradesh, 221106
                  </span>
                </li>
                <li className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-orange-500 mt-1" />
                  <span className="text-gray-400">
                    <strong>Contact:</strong> +91 9415292315 |
                    inbound@rrbvacationskashi.com
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} RRB Vacations, Kashi . All
                rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  to="/terms"
                  onClick={handleScrollTop}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Terms of Use
                </Link>
                <Link
                  to="/privacy"
                  onClick={handleScrollTop}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
                <Link
                  to="/refund"
                  onClick={handleScrollTop}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  Refund Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="fixed bottom-1 sm:bottom-2 right-0 sm:right-2 flex flex-col items-center space-y-2">
        <Link
          to="https://wa.me/919415292315"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-gray-400 p-1 sm:p-2 rounded-full text-green-500 transition-colors duration-300"
        >
          <FaWhatsapp className="text-3xl sm:text-4xl" />
        </Link>
      </div>
    </>
  );
}
