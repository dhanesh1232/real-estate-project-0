"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Building2,
  Home,
  Landmark,
  Award,
  Handshake,
  BarChart2,
} from "lucide-react";

export const AboutPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: <Building2 className="w-8 h-8 text-gold-600" />,
      title: "Our Mission",
      description:
        "To deliver unparalleled real estate experiences through bespoke white-glove service, elite market expertise, and curated property solutions.",
      bg: "bg-gradient-to-br from-gold-50 to-gold-100/50",
    },
    {
      icon: <Landmark className="w-8 h-8 text-platinum-600" />,
      title: "Our Vision",
      description:
        "To set the pinnacle of luxury real estate by establishing unprecedented standards in service excellence and property curation worldwide.",
      bg: "bg-gradient-to-br from-platinum-50 to-platinum-100/50",
    },
    {
      icon: <Handshake className="w-8 h-8 text-gold-600" />,
      title: "Our Values",
      description:
        "Unwavering integrity, absolute discretion, and revolutionary innovation guide every exclusive client relationship and distinguished transaction.",
      bg: "bg-gradient-to-br from-gold-50 to-gold-100/50",
    },
    {
      icon: <Home className="w-8 h-8 text-platinum-600" />,
      title: "Residential Expertise",
      description:
        "Elite specialists in ultra-luxury residences, prestigious penthouses, and distinguished estates with unrivaled market intelligence.",
      bg: "bg-gradient-to-br from-platinum-50 to-platinum-100/50",
    },
    {
      icon: <Award className="w-8 h-8 text-gold-600" />,
      title: "Award-Winning Excellence",
      description:
        "Globally acclaimed industry leaders with prestigious international accolades and recognition.",
      bg: "bg-gradient-to-br from-gold-50 to-gold-100/50",
    },
    {
      icon: <BarChart2 className="w-8 h-8 text-platinum-600" />,
      title: "Market Dominance",
      description:
        "Revolutionary data-driven strategies delivering exceptional investment performance and market-leading returns.",
      bg: "bg-gradient-to-br from-platinum-50 to-platinum-100/50",
    },
  ];

  return (
    <section
      className="py-32 px-8 bg-gradient-to-b from-white via-gray-50/30 to-gray-100/20"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            The{" "}
            <span className="text-gold-600 font-serif italic">LuxEstate</span>{" "}
            Experience
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-light">
            As the epitome of luxury real estate excellence, we seamlessly blend
            global sophistication with unparalleled local expertise to
            orchestrate extraordinary outcomes for the world's most discerning
            clientele.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="h-full"
            >
              <div
                className={`h-full p-10 rounded border border-gray-200/80 backdrop-blur-sm hover:shadow-2xl hover:border-transparent transition-all duration-500 group ${feature.bg}`}
              >
                <div className="w-16 h-16 rounded bg-white/80 backdrop-blur flex items-center justify-center mb-8 shadow-lg group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-xl border border-gray-200/50">
            <span className="text-lg font-medium text-gray-700">
              Trusted by{" "}
              <span className="text-gold-600 font-bold text-xl">1,200+</span>{" "}
              distinguished clients across{" "}
              <span className="text-platinum-600 font-bold text-xl">
                12 countries
              </span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
