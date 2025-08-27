"use client";
import { motion } from "framer-motion";

export const MenuToggle = ({ setIsMenuOpen, isMenuOpen }) => {
  const topVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 },
  };

  const middleVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 },
  };

  return (
    <motion.button
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      className="text-gray-700 cursor-pointer transform transition-all duration-300 hover:text-yellow-600 focus:outline-none"
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle menu"
    >
      <motion.svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* Top line */}
        <motion.line
          x1="4"
          y1="6"
          x2="20"
          y2="6"
          variants={topVariants}
          transition={{ duration: 0.4 }}
          strokeLinecap="round"
        />
        {/* Middle line */}
        <motion.line
          x1="4"
          y1="12"
          x2="16"
          y2="12"
          variants={middleVariants}
          transition={{ duration: 0.3 }}
          strokeLinecap="round"
        />
        {/* Bottom line */}
        <motion.line
          x1="4"
          y1="18"
          x2="20"
          y2="18"
          variants={bottomVariants}
          transition={{ duration: 0.4 }}
          strokeLinecap="round"
        />
      </motion.svg>
    </motion.button>
  );
};
