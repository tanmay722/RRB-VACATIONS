import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Delhi",
    rating: 5,
    text: "Our Varanasi tour was absolutely amazing! The arrangements were perfect, and our guide was very knowledgeable. The Dev Deepawali experience was magical. Highly recommend RRB Vacations, Kashi for any religious tour in India.",
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Mumbai",
    rating: 5,
    text: "We booked the Rajasthan honeymoon package and it exceeded our expectations. The hotels were luxurious, and the itinerary was well-planned. Our driver was courteous and helpful throughout the journey. Thank you RRB Vacations, Kashi!",
  },
  {
    id: 3,
    name: "Amit Verma",
    location: "Bangalore",
    rating: 4,
    text: "The Buddhist pilgrimage tour was a spiritual journey like no other. The team at RRB Vacations, Kashi ensured we had a comfortable and meaningful experience. The only suggestion would be to add more time at Bodhgaya.",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    location: "Kolkata",
    rating: 5,
    text: "Our family trip to Kerala was perfectly organized by RRB Vacations, Kashi. From houseboat stays to wildlife safaris, everything was seamless. The kids especially loved the elephant sanctuary. Will definitely book with them again!",
  },
  {
    id: 5,
    name: "Vikram Singh",
    location: "Jaipur",
    rating: 5,
    text: "The Dubai honeymoon package was worth every penny! Luxury accommodations, desert safari, and city tours were all excellent. RRB Vacations, Kashi's attention to detail made our special trip truly memorable.",
  },
];

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

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
            What Our Customers Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read testimonials from our satisfied customers who have experienced
            our tour packages
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gray-50 rounded-lg p-6 md:p-8 testimonial-card">
                    <div className="flex items-center mb-6">
                      <div>
                        <h3 className="text-lg font-bold">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-500 text-sm">
                          {testimonial.location}
                        </p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 italic">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 -left-4 md:-left-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 -right-4 md:-right-8 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-orange-500 w-6" : "bg-gray-300"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
