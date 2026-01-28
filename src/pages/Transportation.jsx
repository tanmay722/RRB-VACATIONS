import { FaWhatsapp } from "react-icons/fa";
import img1 from "../assets/1.jpg";
import Cab from "../assets/Cab.jpg";
import Bus from "../assets/Bus.jpg";
import Rental from "../assets/Rental.jpg";

const Transportation = () => (
  <section className="pt-12 sm:pt-16 lg:pt-20 pb-6">
    <div className="mx-auto overflow-hidden">
      {/* Heading Section */}
      <div className="relative">
        <img
          src={img1}
          alt="Transportation at Kumbh Mela"
          className="w-full h-64 object-cover brightness-75"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black via-transparent to-transparent flex justify-center items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-center px-6">
            Transportation Services
          </h2>
        </div>
      </div>

      {/* Intro Text Section */}
      <div className="px-4 py-2 sm:p-6 lg:p-8 flex flex-col justify-center items-center text-center">
        <p className="text-base sm:text-lg lg:text-xl text-gray-800 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Simplify your journey to the Kumbh Mela with our reliable and
          comfortable transportation services. Whether you’re coming from within
          India or abroad, we’ve got you covered!
        </p>

        <div className="text-center mb-4 sm:mb-6 lg:mb-8 animate__animated animate__fadeIn animate__delay-2s">
          <a
            href="https://wa.me/919415255168"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-orange-600 text-white py-3 px-8 rounded-full flex items-center justify-center hover:bg-orange-700 transition duration-300 ease-in-out shadow-lg transform hover:scale-105">
              <FaWhatsapp className="mr-2" size={20} /> Contact Us on WhatsApp
            </button>
          </a>
        </div>
      </div>

      {/* Services Section */}
      <div className="px-4 py-2 sm:p-6 lg:p-8">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-indigo-800 mb-0 sm:mb-4 lg:mb-8">
          Our Services
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Cab Service */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={Cab}
              alt="Cab Services"
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h4 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-2">
                Cab Services
              </h4>
              <p className="text-gray-600">
                Comfortable and affordable cab services for individuals or
                groups.
              </p>
            </div>
          </div>

          {/* Bus Service */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={Bus}
              alt="Bus Services"
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h4 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-2">
                Bus Services
              </h4>
              <p className="text-gray-600">
                Convenient buses for larger groups with flexible itineraries.
              </p>
            </div>
          </div>

          {/* Rental Vehicles */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src={Rental}
              alt="Rental Vehicles"
              className="w-full h-56 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h4 className="text-xl sm:text-2xl font-semibold text-indigo-700 mb-2">
                Rental Vehicles
              </h4>
              <p className="text-gray-600">
                Rent vehicles with or without drivers for complete flexibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="px-4 py-2 sm:p-6 lg:p-8">
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-center text-indigo-800 mb-8">
          Why Choose Our Transportation Services?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-4">🚗</span>
            <p className="text-gray-700">
              Comfortable travel with professional drivers.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-4">⏱️</span>
            <p className="text-gray-700">
              Punctual and reliable transportation for all your needs.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-4">💸</span>
            <p className="text-gray-700">
              Affordable pricing tailored for Kumbh Mela visitors.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-4">🛣️</span>
            <p className="text-gray-700">
              Customizable travel options for groups, families, and solo
              travelers.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
            <span className="text-4xl mb-4">🎉</span>
            <p className="text-gray-700">
              Enjoy a seamless experience with modern vehicles and amenities.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Transportation;
