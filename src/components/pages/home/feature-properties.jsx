"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  MoveRight,
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const properties = [
  {
    id: 1,
    title: "Luxury Villa in Hyderabad",
    location: "Banjara Hills, Hyderabad",
    price: "₹2.5 Cr",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=800",
    beds: 4,
    baths: 3,
    area: "3200 sq.ft",
    featured: true,
    premium: true,
  },
  {
    id: 2,
    title: "Luxury Penthouse in Bangalore",
    location: "Whitefield, Bangalore",
    price: "₹4.2 Cr",
    image:
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=800",
    beds: 3,
    baths: 2,
    area: "2800 sq.ft",
    featured: true,
    premium: true,
  },
  {
    id: 3,
    title: "Seafront Villa in Mumbai",
    location: "Juhu Beach, Mumbai",
    price: "₹8.5 Cr",
    image:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=800",
    beds: 5,
    baths: 4,
    area: "4500 sq.ft",
    featured: true,
    premium: true,
  },
  {
    id: 4,
    title: "Heritage Bungalow in Kolkata",
    location: "Alipore, Kolkata",
    price: "₹3.8 Cr",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800",
    beds: 4,
    baths: 3,
    area: "3800 sq.ft",
    featured: true,
    premium: false,
  },
  {
    id: 5,
    title: "Modern Apartment in Delhi",
    location: "Vasant Vihar, Delhi",
    price: "₹2.9 Cr",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800",
    beds: 3,
    baths: 2,
    area: "2200 sq.ft",
    featured: false,
    premium: true,
  },
  {
    id: 6,
    title: "Luxury Farmhouse in Chennai",
    location: "ECR, Chennai",
    price: "₹5.2 Cr",
    image:
      "https://images.unsplash.com/photo-1605146769289-440113cc3d00?q=80&w=800",
    beds: 6,
    baths: 5,
    area: "5200 sq.ft",
    featured: true,
    premium: true,
  },
];

const PropertyCard = ({ property, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group border-0 relative">
        <div className="relative">
          <div className="h-72 overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover ease-in-out group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            {property.featured && (
              <Badge
                variant="premium"
                className="flex shadow-xl items-center gap-1 border-none backdrop-blur-sm bg-amber-500/20"
              >
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                Featured
              </Badge>
            )}
            {property.premium && (
              <Badge
                variant="luxury"
                className="border-none backdrop-blur-sm bg-purple-500/20 text-purple-300"
              >
                Premium
              </Badge>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
        </div>

        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 pr-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-600 whitespace-nowrap">
              {property.price}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-col items-center p-2 bg-amber-50 rounded">
              <BedDouble className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-sm font-medium text-gray-700">
                {property.beds} Beds
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-amber-50 rounded">
              <Bath className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-sm font-medium text-gray-700">
                {property.baths} Baths
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-amber-50 rounded">
              <Ruler className="h-6 w-6 text-amber-600 mb-1" />
              <span className="text-sm font-medium text-gray-700">
                {property.area}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <Button
            className="w-full group rounded cursor-pointer bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-3 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            size="lg"
          >
            Explore Property
            <MoveRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const items = React.Children.toArray(children);

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      next();
    }

    if (touchStart - touchEnd < -50) {
      prev();
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0 px-3">
            {child}
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-10 transition-all duration-300 hover:scale-110"
        aria-label="Previous property"
      >
        <ChevronLeft className="h-5 w-5 text-amber-600" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg z-10 transition-all duration-300 hover:scale-110"
        aria-label="Next property"
      >
        <ChevronRight className="h-5 w-5 text-amber-600" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-amber-500"
                : "w-2 bg-gray-300 hover:bg-amber-300"
            }`}
            aria-label={`Go to property ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export function FeaturedProperties() {
  return (
    <section
      className="py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      id="featured"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
              <span className="italic font-serif">Exclusive</span> Properties
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Discover our curated collection of India's most prestigious
            residences
          </motion.p>
        </div>

        {/* Mobile Carousel (under 768px) */}
        <div className="md:hidden">
          <Carousel>
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
              />
            ))}
          </Carousel>
        </div>

        {/* Desktop Grid (768px and above) */}
        <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button
            variant="outline-primary"
            asChild
            size="lg"
            className="group relative overflow-hidden border-2 border-amber-500 text-amber-600 hover:bg-amber-50 hover:text-amber-700 px-8 py-3 rounded font-medium"
          >
            <Link href="/properties">
              <span className="relative z-10">
                View All Properties
                <MoveRight className="ml-2 h-5 w-5 inline-block group-hover:translate-x-1 ease-in-out duration-150 transition-all" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-amber-600/10 transform -translate-x-full group-hover:translate-x-0 transition duration-500 ease-out" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
