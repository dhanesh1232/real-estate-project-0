"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote, MapPin, Home, Building, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Tech Entrepreneur",
    review:
      "Found my dream villa in Hyderabad! The white-glove service made the entire process effortless. The virtual reality tours gave me confidence in my purchase decision before even visiting.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    location: "Hyderabad",
    purchaseType: "Luxury Villa",
    price: "₹12.5 Cr",
  },
  {
    id: 2,
    name: "Priya Nair",
    role: "Corporate Executive",
    review:
      "LuxEstate's concierge team handled everything from property search to closing. Their network of verified luxury properties saved me months of searching. Truly exceptional service.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    location: "Mumbai",
    purchaseType: "Penthouse",
    price: "₹8.2 Cr",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Investor",
    review:
      "Acquired a premium commercial space through their private listings. The market intelligence and negotiation support helped secure terms I couldn't have achieved on my own.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    location: "Bangalore",
    purchaseType: "Commercial Tower",
    price: "₹32 Cr",
  },
  {
    id: 4,
    name: "Sarah Khan",
    role: "Banking Professional",
    review:
      "The financial advisory team created a customized investment plan that matched my goals perfectly. Found a stunning heritage property that's already appreciated 20% in value.",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    location: "Delhi",
    purchaseType: "Heritage Estate",
    price: "₹18.7 Cr",
  },
  {
    id: 5,
    name: "Rajesh Patel",
    role: "Business Owner",
    review:
      "Their global property portfolio gave me access to international markets I wouldn't have considered. The comparative market analysis was worth its weight in gold.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    location: "London",
    purchaseType: "International Residence",
    price: "£4.2M",
  },
  {
    id: 6,
    name: "Neha Kapoor",
    role: "Film Producer",
    review:
      "The discretion and privacy maintained throughout the process was exceptional. Found a secluded beachfront property that wasn't listed anywhere else.",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    location: "Goa",
    purchaseType: "Beachfront Villa",
    price: "₹9.8 Cr",
  },
];

const PropertyIcon = ({ type }) => {
  switch (type) {
    case "Luxury Villa":
    case "Beachfront Villa":
      return <Home className="w-4 h-4 text-gray-500" />;
    case "Penthouse":
    case "Heritage Estate":
      return <Building className="w-4 h-4 text-gray-500" />;
    case "International Residence":
      return <Globe className="w-4 h-4 text-gray-500" />;
    default:
      return <Building className="w-4 h-4 text-gray-500" />;
  }
};

const TestimonialCard = ({ testimonial, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="h-full px-2 sm:px-0"
    >
      <div className="h-full p-8 bg-white rounded border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-500 group relative overflow-hidden min-w-[300px]">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Quote className="absolute -top-6 -right-6 w-32 h-32 text-gray-50 group-hover:text-gray-100 transition-all duration-700 transform group-hover:rotate-12" />

        {/* Client profile */}
        <div className="flex items-start mb-6 relative z-10">
          <div className="relative">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-lg transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
          <div className="ml-4">
            <h3 className="font-bold text-gray-900 text-lg tracking-tight">
              {testimonial.name}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {testimonial.role}
            </p>
            <div className="flex items-center mt-2 space-x-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-4 h-4 mr-1" />
                {testimonial.location}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial text */}
        <p className="text-gray-600 italic relative z-10 leading-relaxed mb-6">
          "{testimonial.review}"
        </p>

        {/* Property details */}
        <div className="mt-auto pt-4 border-t border-gray-100 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <PropertyIcon type={testimonial.purchaseType} />
              <span className="ml-2 text-sm font-medium text-gray-500">
                {testimonial.purchaseType}
              </span>
            </div>
            <span className="text-sm font-bold text-gray-900">
              {testimonial.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative overflow-hidden md:hidden">
      <motion.div
        ref={sliderRef}
        className="flex"
        animate={{
          x: -currentIndex * (sliderRef.current?.offsetWidth || 0),
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {testimonials.map((testimonial, index) => (
          <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
            <TestimonialCard testimonial={testimonial} index={index} />
          </div>
        ))}
      </motion.div>

      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-10 hover:bg-white transition-all"
        aria-label="Previous testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md z-10 hover:bg-white transition-all"
        aria-label="Next testimonial"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-gray-700 w-4" : "bg-gray-300"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export function Testimonials() {
  return (
    <section
      className="py-28 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50/50"
      id="testimonials"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Distinguished Client Experiences
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover why discerning individuals trust LuxEstate for their most
            valuable property acquisitions
          </p>
        </motion.div>

        {/* Mobile Slider (hidden on md and larger screens) */}
        <div className="md:hidden">
          <TestimonialSlider testimonials={testimonials} />
        </div>

        {/* Grid Layout (hidden on mobile, shown on md and larger screens) */}
        <div className="hidden md:grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">
            Trusted by over 1,200 high-net-worth individuals globally
          </p>
        </motion.div>
      </div>
    </section>
  );
}
