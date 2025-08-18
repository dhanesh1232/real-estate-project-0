"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveRight, Star, MapPin, BedDouble, Bath, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
      <Card className="h-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group border-0">
        <div className="relative">
          <div className="h-72 overflow-hidden">
            <img
              src={property.image}
              alt={property.title}
              className="h-full w-full object-cover ease-in-out group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute top-4 left-4 flex gap-2">
            {property.featured && (
              <Badge
                variant="premium"
                className="flex shadow-2xl items-center gap-1 border-none"
              >
                <Star className="h-3 w-3" />
                Featured
              </Badge>
            )}
            {property.premium && (
              <Badge variant="luxury" className="border-none">
                Premium
              </Badge>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl truncate font-bold text-gray-900">
                {property.title}
              </h3>
              <div className="flex items-center text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-primary">{property.price}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col items-center">
              <BedDouble className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 mt-1">
                {property.beds} Beds
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 mt-1">
                {property.baths} Baths
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Ruler className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600 mt-1">
                {property.area}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="px-6 pb-6 pt-0">
          <Button className="w-full group rounded cursor-pointer" size="lg">
            Explore Property
            <MoveRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
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
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Exclusive Properties
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
          <Button variant="outline-primary" className="group" size="lg">
            View All Properties
            <MoveRight className="ml-1 h-4 w-4 group-hover:translate-x-1 ease-in-out duration-150 transition-all" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
