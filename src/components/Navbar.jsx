// Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const domesticPackages = [
  { name: "Andaman Honeymoon Packages", href: "/packages/andaman" },
  { name: "Ayodhya Temple Tour Packages", href: "/packages/ayodhya" },
  {
    name: "Buddhist Temple Tour Packages Bodhgaya",
    href: "/packages/buddhist-temple",
  },
  { name: "Buddhist Tour Packages India", href: "/packages/buddhist-india" },
  {
    name: "Complete Buddhist Pilgrimage Tour Packages",
    href: "/packages/buddhist-pilgrimage",
  },
  {
    name: "Darjeeling Gangtok Tour Packages",
    href: "/packages/darjeeling-gangtok",
  },
  { name: "Goa Honeymoon Tour Packages", href: "/packages/goa" },
  { name: "Kashi Tour Packages", href: "/packages/kashi" },
  { name: "Kashmir Honeymoon Tour Packages", href: "/packages/kashmir" },
  { name: "Kerala Mysore Tour Packages", href: "/packages/kerala-mysore" },
  { name: "Leh Ladakh Tour Packages", href: "/packages/leh-ladakh" },
  { name: "Pind Daan Complete Tour Packages", href: "/packages/pind-daan" },
  {
    name: "Prayagraj Sangam Kumbh Mela Tour Packages",
    href: "/packages/prayagraj",
  },
  { name: "Rajasthan Honeymoon Tour Packages", href: "/packages/rajasthan" },
  {
    name: "Shimla Kufri Manali Tour Packages",
    href: "/packages/shimla-manali",
  },
  { name: "Varanasi Tour Packages", href: "/packages/varanasi" },
];

const internationalPackages = [
  { name: "Bali Paradise Tour ", href: "/packages/bali-paradise" },
  { name: "Dubai Adventure Tour ", href: "/packages/dubai" },
  { name: "Nepal Kathmandu Tour ", href: "/packages/nepal" },
  { name: "Oman Honeymoon Tour ", href: "/packages/oman" },
  { name: "Switzerland Holidays Tour ", href: "/packages/switzerland" },
  {
    name: "Thailand Discovery Tour ",
    href: "/packages/thailand-discovery",
  },
  { name: "Umrah Tour ", href: "/packages/umrah" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDomesticDropdown, setActiveDomesticDropdown] = useState(false);
  const [activeInternationalDropdown, setActiveInternationalDropdown] =
    useState(false);
  const navRef = useRef();

  // 🔒 Prevent background scroll on mobile menu open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  // 🔄 Sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-white backdrop-blur-md py-4"
      }`}
    >
      <div ref={navRef} className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/Logo.jpg"
              alt="RRB Vacations, Kashi Logo"
              className="h-14 md:h-14 lg:h-16 w-auto"
            />
            <div className="relative h-12 w-64">
              <div className="font-bold text-2xl text-orange-500">
                RRB Vacations, Kashi{" "}
              </div>
              <div className="text-xs text-gray-500">
                Explore the world with us
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/packages", label: "View All Packages" },
              { to: "/transportation", label: "Car Rental" },
              { to: "/contact", label: "Contact Us" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="text-gray-700 hover:text-orange-500 font-medium transition"
              >
                {label}
              </Link>
            ))}

            {/* Domestic Tour Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveDomesticDropdown(true)}
              onMouseLeave={() => setActiveDomesticDropdown(false)}
            >
              <button
                className="flex items-center text-gray-700 hover:text-orange-500 font-medium transition"
                aria-expanded={activeDomesticDropdown}
              >
                Domestic Tour <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {activeDomesticDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50 max-h-96 overflow-y-auto"
                  >
                    {domesticPackages.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* International Tour Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveInternationalDropdown(true)}
              onMouseLeave={() => setActiveInternationalDropdown(false)}
            >
              <button
                className="flex items-center text-gray-700 hover:text-orange-500 font-medium transition"
                aria-expanded={activeInternationalDropdown}
              >
                International Tour <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <AnimatePresence>
                {activeInternationalDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md z-50"
                  >
                    {internationalPackages.map((item, index) => (
                      <Link
                        key={index}
                        to={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Phone Contact (Desktop Only) */}
          <div className="hidden lg:flex items-center text-orange-500 font-semibold">
            <Phone className="h-5 w-5 mr-2" />
            +91 9415255168
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-[70px] left-0 w-full bg-white z-40 max-h-[calc(100vh-70px)] overflow-y-auto border-t shadow-md"
          >
            <div className="px-4 py-4 space-y-4">
              {[
                { to: "/", label: "Home" },
                { to: "/about", label: "About Us" },
                { to: "/packages", label: "View All Packages" },
                { to: "/packages/kashi", label: "Kashi Tour" },
                { to: "/packages/ayodhya", label: "Ayodhya Tour" },
              ].map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => {
                    setIsOpen(false);
                    setActiveDomesticDropdown(false);
                    setActiveInternationalDropdown(false);
                  }}
                  className="block text-gray-700 hover:text-orange-500 py-2 border-b"
                >
                  {label}
                </Link>
              ))}

              {/* Mobile Dropdown - Domestic */}
              <div className="border-b">
                <button
                  onClick={() => {
                    setActiveDomesticDropdown((prev) => {
                      const newState = !prev;
                      if (newState) setActiveInternationalDropdown(false); // close the other
                      return newState;
                    });
                  }}
                  className="flex justify-between items-center w-full text-gray-700 hover:text-orange-500 py-2"
                >
                  Domestic Tour
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform ${
                      activeDomesticDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeDomesticDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 py-2 space-y-1"
                    >
                      {domesticPackages.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveDomesticDropdown(false);
                            setActiveInternationalDropdown(false);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-orange-100 hover:text-orange-600 transition"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Dropdown - International */}
              <div className="border-b">
                <button
                  onClick={() => {
                    setActiveInternationalDropdown((prev) => {
                      const newState = !prev;
                      if (newState) setActiveDomesticDropdown(false); // close the other
                      return newState;
                    });
                  }}
                  className="flex justify-between items-center w-full text-gray-700 hover:text-orange-500 py-2"
                >
                  International Tour
                  <ChevronDown
                    className={`h-4 w-4 transform transition-transform ${
                      activeInternationalDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeInternationalDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 py-2 space-y-1"
                    >
                      {internationalPackages.map((item, index) => (
                        <Link
                          key={index}
                          to={item.href}
                          onClick={() => {
                            setIsOpen(false);
                            setActiveDomesticDropdown(false);
                            setActiveInternationalDropdown(false);
                          }}
                          className="block px-4 py-2 text-sm text-gray-700 rounded hover:bg-orange-100 hover:text-orange-600 transition"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {[
                { to: "/transportation", label: "Car Rental" },
                { to: "/contact", label: "Contact Us" },
              ].map(({ to, label }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={() => {
                    setIsOpen(false);
                    setActiveDomesticDropdown(false);
                    setActiveInternationalDropdown(false);
                  }}
                  className="block text-gray-700 hover:text-orange-500 py-2 border-b"
                >
                  {label}
                </Link>
              ))}

              {/* Phone (Mobile) */}
              <div
                onClick={() => {
                  setIsOpen(false);
                  window.open("tel:+919415255168");
                }}
                className="flex items-center text-orange-500 font-medium py-2"
              >
                <Phone className="h-5 w-5 mr-2" />
                +91 9415255168
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
