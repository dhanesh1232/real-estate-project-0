"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScroll, setIsScroll] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scroll = window.scrollY > 40;
      setIsScroll(scroll);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  });

  return (
    <header
      className={`w-full transition-all duration-500 ${
        isScroll
          ? isMenuOpen
            ? "bg-background backdrop-blur-md"
            : "bg-background/80 backdrop-blur-md border-b border-border/30"
          : isMenuOpen
          ? "bg-background backdrop-blur-md shadow-xl"
          : "bg-transparent"
      } fixed top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-3xl font-serif font-bold tracking-wider bg-gradient-to-r from-amber-500 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
                LuxEstate
              </span>
              <span className="ml-1 text-xs font-light bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent uppercase tracking-widest">
                Properties
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                <NavigationMenuItem
                  onMouseEnter={() => setHoveredItem("home")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavigationMenuLink
                    href="/"
                    className="px-3 py-2 text-gray-700 hover:text-gold-600 font-medium tracking-wide transition-colors duration-300 relative"
                  >
                    <span>Home</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem
                  onMouseEnter={() => setHoveredItem("properties")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-gray-700 hover:text-gold-600 px-3 py-2 font-medium tracking-wide transition-colors duration-300">
                    <span className="relative">Properties</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="shadow-xl rounded-none mt-2">
                    <ul className="w-[240px] p-4 space-y-3">
                      <li>
                        <NavigationMenuLink
                          href="/luxury-homes"
                          className="group flex flex-row items-center p-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="mr-3 text-gold-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-gold-600">
                              Luxury Homes
                            </div>
                            <div className="text-sm text-gray-500">
                              Exclusive residences
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/penthouses"
                          className="group flex flex-row items-center p-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="mr-3 text-gold-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-gold-600">
                              Penthouses
                            </div>
                            <div className="text-sm text-gray-500">
                              Sky-high luxury
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          href="/estates"
                          className="group flex flex-row items-center p-3 hover:bg-gray-50 transition-colors"
                        >
                          <div className="mr-3 text-gold-600">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-gold-600">
                              Private Estates
                            </div>
                            <div className="text-sm text-gray-500">
                              Secluded grandeur
                            </div>
                          </div>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem
                  onMouseEnter={() => setHoveredItem("about")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavigationMenuLink
                    href="/about"
                    className="px-3 py-2 text-gray-700 hover:text-gold-600 font-medium tracking-wide transition-colors duration-300 relative"
                  >
                    <span>About</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem
                  onMouseEnter={() => setHoveredItem("contact")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <NavigationMenuLink
                    href="/contact"
                    className="px-3 py-2 text-gray-700 hover:text-gold-600 font-medium tracking-wide transition-colors duration-300 relative"
                  >
                    <span>Contact</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4 pl-4">
              <Button className="bg-yellow-600 rounded hover:bg-yellow-700 text-white px-6 py-2 font-medium tracking-wide transition-colors duration-300 shadow-md hover:shadow-lg">
                List Property
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 transform transition-all duration-300 hover:text-gold-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="pt-2 pb-4 space-y-1 overflow-hidden"
              >
                <a
                  href="/properties"
                  className="block px-4 py-3 text-gray-700 hover:text-gold-600 hover:bg-gray-50 transition-colors duration-300 font-medium"
                >
                  Properties
                </a>
                <a
                  href="/about"
                  className="block px-4 py-3 text-gray-700 hover:text-gold-600 hover:bg-gray-50 transition-colors duration-300 font-medium"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="block px-4 py-3 text-gray-700 hover:text-gold-600 hover:bg-gray-50 transition-colors duration-300 font-medium"
                >
                  Contact
                </a>
                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 px-4">
                  <Button className="w-full rounded bg-yellow-600 hover:bg-yellow-700 text-white">
                    List Property
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
