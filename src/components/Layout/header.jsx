"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { AnimatePresence, motion } from "framer-motion";
import { ContactData, NavLinks, SocialData } from "@/lib/client/default_data";
import { Icons } from "../icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuToggle } from "./menu-toggle";
import { Join, ProfileHandle } from "./join-button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrolledPercentage, setScrolledPercentage] = useState(0);
  const headerRef = useRef(null);
  const path = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY > 40;
      setIsScroll(scroll);

      // Calculate scroll percentage for progress indicator
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrolledPercentage(percentage);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Animation variants
  const underlineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: { width: "100%", opacity: 1 },
  };

  const mobileMenuVariants = {
    hidden: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { y: -10, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
  };

  const logoVariants = {
    normal: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
  };

  return (
    <header
      ref={headerRef}
      className={`w-full transition-all duration-500 ${
        isScroll
          ? isMenuOpen
            ? "bg-background backdrop-blur-md"
            : "bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm"
          : isMenuOpen
          ? "bg-background backdrop-blur-md shadow-xl"
          : "bg-white md:bg-transparent"
      } fixed top-0 z-50`}
    >
      {/* Scroll progress indicator */}
      <motion.div
        className="h-0.5 fixed inset-0 z-50 top-0 bg-gradient-to-r from-amber-500 to-yellow-600 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolledPercentage / 100 }}
        transition={{ duration: 0.2 }}
      />

      <AnimatePresence>
        {!isScroll && path === "/" && (
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className={`max-w-full hidden sm:block mx-auto px-4 sm:px-6 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/30 text-yellow-500 text-center`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 lg:space-x-4">
                {SocialData.map((each) => {
                  const Icon = Icons[each.icon];
                  return (
                    <li
                      key={each.id}
                      className="border-l border-r border-white/30 m-0 list-none p-2 px-3"
                    >
                      <Link
                        target="_blank"
                        href={each.href}
                        className="hover:text-yellow-600"
                      >
                        <Icon size={16} />
                      </Link>
                    </li>
                  );
                })}
              </div>

              <div className="flex items-center space-x-2 lg:space-x-4">
                {ContactData.map((each) => {
                  const Icon = Icons[each.icon];
                  return (
                    <li
                      key={each.id}
                      className="border-l border-r border-white/30 m-0 list-none p-2 lg:px-2 px-3"
                    >
                      <Link
                        target="_blank"
                        href={each.href}
                        className="hover:text-yellow-600 inline-flex gap-1"
                      >
                        <Icon size={16} />
                        <span className="text-xs lg:block hidden">
                          {each.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            variants={logoVariants}
            initial="normal"
            whileHover="hover"
          >
            <a href="/" className="flex items-center flex-col group relative">
              <span className="text-2xl font-serif font-bold tracking-wider bg-gradient-to-r from-amber-500 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
                LuxEstate
              </span>
              <span className="ml-1 absolute right-0 -bottom-2 text-xs text-end font-light bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent uppercase tracking-widest">
                Properties
              </span>
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-yellow-600"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {NavLinks.map((item) => (
                  <NavigationMenuItem
                    key={item.id}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <NavigationMenuLink
                      href={item.href}
                      className={`px-3 py-2 font-medium tracking-wide transition-colors duration-300 relative group
                        ${
                          path === item.href
                            ? "text-yellow-600"
                            : "text-gray-700 hover:text-yellow-600"
                        }`}
                      data-active={path === item.href}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-2 pl-2">
              {/* <Button
                variant="gold"
                asChild
                className="bg-yellow-600 rounded hover:bg-yellow-700 text-white px-3 py-2 font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Link href="/properties">Top Properties</Link>
              </Button> */}
              <Join />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden inline-flex items-center gap-2">
            <ProfileHandle className="block md:hidden" align="end" />
            <MenuToggle setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              <ul className="pt-2 pb-4 space-y-1">
                {NavLinks.map((each) => {
                  const Icon = Icons[each.icon];
                  return (
                    <motion.li
                      key={each.id}
                      className="px-4 py-3 block hover:text-yellow-600 hover:bg-amber-50 rounded-sm transition-all duration-300 font-medium"
                      variants={navItemVariants}
                      custom={0}
                      whileHover={{ x: 1.5 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link
                        href={each.href}
                        className="inline-flex w-full justify-start items-center gap-2 text-sm"
                      >
                        <Icon className="text-gray-500" />
                        <span className="text-gray-700">{each.label}</span>
                      </Link>
                    </motion.li>
                  );
                })}

                <motion.div
                  className="mt-4 pt-2 border-t border-gray-200 space-y-3 px-0"
                  variants={navItemVariants}
                  custom={3}
                >
                  <Join />
                </motion.div>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
};

export default Header;
