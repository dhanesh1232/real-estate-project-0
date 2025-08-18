"use client";
import {
  Home,
  Building2,
  Warehouse,
  Landmark,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const categories = [
  {
    id: 1,
    icon: <Home className="w-8 h-8" />,
    label: "Luxury Residences",
    desc: "Exquisite homes & penthouses",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    icon: <Building2 className="w-8 h-8" />,
    label: "Premium Commercial",
    desc: "Elite offices & retail spaces",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    id: 3,
    icon: <Warehouse className="w-8 h-8" />,
    label: "Estate Lands",
    desc: "Prime development parcels",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    id: 4,
    icon: <Landmark className="w-8 h-8" />,
    label: "Signature Properties",
    desc: "Architectural masterpieces",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const CategoryCard = ({ category, index }) => {
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
      <div className="h-full p-8 rounded border border-border hover:border-transparent hover:shadow-xl transition-all duration-300 group bg-white flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative element */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 rounded-full ${category.bgColor} opacity-10 -translate-y-1/2 translate-x-1/2`}
        ></div>

        <div
          className={`w-20 h-20 flex items-center justify-center ${category.bgColor} rounded-2xl mb-6 ${category.iconColor} group-hover:scale-110 transition-transform duration-300`}
        >
          {category.icon}
        </div>

        <h3 className="font-bold text-xl text-gray-900 mb-2">
          {category.label}
        </h3>
        <p className="text-gray-500 mb-6">{category.desc}</p>

        <button className="mt-auto flex items-center text-sm font-medium text-primary group-hover:underline">
          Explore collection
          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};

export function PropertyCategories() {
  return (
    <section
      className="py-24 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
      id="categories"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Exclusive Property Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated categories of India's most distinguished properties
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
