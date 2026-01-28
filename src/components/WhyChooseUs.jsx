import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  Award,
  Headphones,
  MapPin,
  CreditCard,
} from "lucide-react";

const features = [
  {
    icon: <Shield className="h-10 w-10 text-orange-500" />,
    title: "100% Secure Payments",
    description:
      "We ensure your money is safe. Multiple secure payment options available.",
  },
  {
    icon: <Clock className="h-10 w-10 text-orange-500" />,
    title: "Dedicated Support 24/7",
    description:
      "Get assistance anytime with our round-the-clock customer service.",
  },
  {
    icon: <Award className="h-10 w-10 text-orange-500" />,
    title: "Best Price Guarantee",
    description:
      "We offer the best prices for our tours. Find it cheaper, we'll match it.",
  },
  {
    icon: <Headphones className="h-10 w-10 text-orange-500" />,
    title: "Expert Travel Advisors",
    description: "Our experienced team helps you plan the perfect trip.",
  },
  {
    icon: <MapPin className="h-10 w-10 text-orange-500" />,
    title: "Handpicked Destinations",
    description:
      "We carefully select the best locations and experiences for you.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-orange-500" />,
    title: "Flexible Payment Options",
    description:
      "Pay in installments or full payment with multiple payment methods.",
  },
];

export default function WhyChooseUs() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose RRB Vacations, Kashi
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We strive to provide exceptional travel experiences with
            personalized service and attention to detail. Here's why travelers
            choose us for their journeys.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
