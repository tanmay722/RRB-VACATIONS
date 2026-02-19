import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-r from-orange-500 to-amber-500"></div>
        </div>

        <div className="relative h-full flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Please feel free to contact us for any enquiry. We'll respond as
              soon as possible to help plan your trip.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Head Office */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <MapPin className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Head Office</h3>
              <p className="text-gray-600 mb-2">
                Brahmdev Vihar Colony, Chunar Road, Chitaipur, Varanasi, Uttar
                Pradesh, 221106
              </p>
              <p className="text-gray-600"> +91 9839976261</p>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 p-6 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Mail className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Email Address</h3>
              <p className="text-gray-600">rrbvacations@gmail.com</p>
              <p className="text-gray-600">inbound@rrbvacationskashi.com</p>
            </motion.div>

            {/* Working Hours */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 p-6 rounded-lg text-center"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-8 w-8 text-orange-500" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">Working Hours</h3>
              <p className="text-gray-600">
                Monday to Saturday
                <br />
                9:00 AM - 7:00 PM
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">
                Contact Us for Custom Packages & Tours
              </h2>
              <p className="text-gray-600 mb-8">
                Looking for a personalized travel experience? Reach out to us to
                customize your package or tour. Our team will help you design
                the perfect itinerary tailored to your needs.
              </p>

              <div className="flex flex-col gap-4">
                {/* Email Button */}
                <a
                  href="mailto:rrbvacations@gmail.com?subject=Tour%20Inquiry&body=Hi%20Team,%0AI'd%20like%20to%20inquire%20about..."
                  className="inline-flex items-center justify-center px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition duration-300"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Send Email
                </a>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/919839976261?text=Hi%20RRB%20Vacations%20Kashi%20Team,%20I'm%20interested%20in%20a%20custom%20package%20tour."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600 transition duration-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Contact on WhatsApp
                </a>
                {/* Call Button */}
                <a
                  href="tel:+919839976261"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-[400px] md:h-full rounded-lg overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7212.138437618356!2d82.98037994198013!3d25.335458210488632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1s2nd%20Floor%2C%20Plot%20No%20-%2052%2C%20Patel%20Nagar%2C%20Mint%20Road%2C%20Nadesar%2C%20Varanasi%2C%20Uttar%20Pradesh%20221002%2C%C2%A0India!5e0!3m2!1sen!2sus!4v1747458935607!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="RRB Vacations, Kashi Office Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our tour packages and
              services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "How do I book a tour package?",
                answer:
                  "You can book a tour package through our website by selecting your desired package and following the booking process. Alternatively, you can contact our team via phone or email, and we'll assist you with the booking.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept various payment methods including credit/debit cards, net banking, UPI, and bank transfers. All payments are processed securely through our payment partners.",
              },
              {
                question: "Can I customize a tour package?",
                answer:
                  "Yes, we offer customization options for most of our tour packages. Please contact our team with your specific requirements, and we'll create a tailored itinerary for you.",
              },
              {
                question: "What is your cancellation policy?",
                answer:
                  "Our cancellation policy varies depending on the tour package and timing of cancellation. Generally, cancellations made 30 days or more before departure may be eligible for a full refund minus administrative fees. Please refer to our Refund Policy page for detailed information.",
              },
              {
                question: "Do you provide travel insurance?",
                answer:
                  "We recommend purchasing travel insurance for all tours. While we don't provide insurance directly, we can suggest reliable insurance providers and help you select appropriate coverage for your trip.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isLoaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="mb-6 border-b border-gray-200 pb-6 last:border-0"
              >
                <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
