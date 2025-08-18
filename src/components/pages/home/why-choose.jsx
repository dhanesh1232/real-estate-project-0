"use client";
import { ShieldCheck, Users, Home, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const benefits = [
  {
    id: 1,
    icon: <ShieldCheck className="h-10 w-10" />,
    title: "Verified Luxury Listings",
    desc: "Every property undergoes rigorous verification with complete legal documentation and quality assurance.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: 2,
    icon: <Users className="h-10 w-10" />,
    title: "Elite Property Advisors",
    desc: "Our handpicked advisors average 10+ years experience in high-end real estate transactions.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    id: 3,
    icon: <Home className="h-10 w-10" />,
    title: "Exclusive Portfolio",
    desc: "Access off-market properties and private listings unavailable through conventional channels.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: 4,
    icon: <DollarSign className="h-10 w-10" />,
    title: "Value Optimization",
    desc: "We leverage our market dominance to secure privileged pricing for our clients.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
];

const BenefitCard = ({ benefit, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="h-full bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="h-full p-8 bg-white rounded border border-gray-100 hover:shadow-2xl hover:border-transparent transition-all duration-300 group overflow-hidden relative">
        {/* Decorative element */}
        <div
          className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full ${benefit.bg} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
        ></div>

        <div
          className={`w-16 h-16 ${benefit.bg} rounded-xl flex items-center justify-center mb-6 ${benefit.color} group-hover:scale-110 transition-transform duration-300`}
        >
          {benefit.icon}
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {benefit.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
      </div>
    </motion.div>
  );
};

export function WhyChooseUs() {
  return (
    <section
      className="py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50"
      id="why-us"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The LuxEstate Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Why discerning clients choose us for their most important property
            decisions
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <BenefitCard key={benefit.id} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
