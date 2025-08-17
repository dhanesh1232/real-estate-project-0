"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  MapPin,
  MoveRight,
} from "lucide-react";
import { propertySlides } from "@/lib/client/default_data";
import { Input } from "@/components/ui/input";

export function ModernHero() {
  const [index, setIndex] = useState(0);
  const [isMount, setIsMount] = useState(false);
  const [direction, setDirection] = useState(1);
  const [slides, setSlides] = useState(propertySlides);
  const thumbnailContainerRef = useRef(null);
  const thumbnailListRef = useRef(null);
  const timerRef = useRef(null);

  // Scroll to center the active thumbnail
  const centerActiveThumbnail = useCallback((activeIndex) => {
    if (thumbnailContainerRef.current && thumbnailListRef.current) {
      const container = thumbnailContainerRef.current;
      const list = thumbnailListRef.current;
      const thumbnails = list.children;

      if (thumbnails.length > 0) {
        const activeThumb = thumbnails[activeIndex];
        if (activeThumb) {
          const containerWidth = container.offsetWidth;
          const thumbWidth = activeThumb.offsetWidth;
          const thumbLeft = activeThumb.offsetLeft;
          const thumbCenter = thumbLeft + thumbWidth / 2;
          const scrollTo = thumbCenter - containerWidth / 2;

          container.scrollTo({
            left: scrollTo,
            behavior: "smooth",
          });
        }
      }
    }
  }, []);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setIndex((prev) => {
      const newIndex = (prev + 1) % slides.length;
      return newIndex;
    });

    // Update slides array after animation completes
    setTimeout(() => {
      setSlides((prevSlides) => {
        const [first, ...rest] = prevSlides;
        return [...rest, first];
      });
      setIndex(0); // Reset index since we've rotated the array
    }, 1000);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setIndex((prev) => {
      const newIndex = (prev - 1 + slides.length) % slides.length;
      return newIndex;
    });

    // Update slides array after animation completes
    setTimeout(() => {
      setSlides((prevSlides) => {
        const last = prevSlides[prevSlides.length - 1];
        const rest = prevSlides.slice(0, -1);
        return [last, ...rest];
      });
      setIndex(0); // Reset index since we've rotated the array
    }, 1000);
  }, [slides.length]);

  const goToSlide = useCallback(
    (i) => {
      // Find the current position of the selected slide in our rotated array
      const targetSlide = propertySlides[i];
      const currentPos = slides.findIndex(
        (slide) => slide.id === targetSlide.id
      );

      if (currentPos !== -1) {
        setDirection(currentPos > index ? 1 : -1);
        setIndex(currentPos);
        centerActiveThumbnail(i);
      }
    },
    [index, slides, centerActiveThumbnail]
  );

  useEffect(() => {
    setIsMount(true);
    // Center the first thumbnail on mount
    setTimeout(() => {
      centerActiveThumbnail(0);
    }, 100);
  }, [centerActiveThumbnail]);

  useEffect(() => {
    // Set up the timer for auto-rotation
    const startTimer = () => {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 8000);
    };

    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [nextSlide]);

  // Center active thumbnail when index changes
  useEffect(() => {
    if (isMount) {
      // Find the original index in propertySlides
      const originalIndex = propertySlides.findIndex(
        (slide) => slide.id === slides[index].id
      );
      if (originalIndex !== -1) {
        centerActiveThumbnail(originalIndex);
      }
    }
  }, [index, slides, isMount, centerActiveThumbnail]);

  const handleScrollFocus = () => {
    const scroll = window.scrollY;
    if (scroll <= 100) {
      window.scrollTo({
        top: 400,
        behavior: "smooth",
      });
    }
  };

  const handleFocus = (id) => {
    handleScrollFocus();
  };

  if (!isMount) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />

      {/* Background Image */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={slides[index].id}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${slides[index].image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 h-4/5 flex flex-row items-end justify-between pb-16 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        {/* Text Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[index].id}
            custom={direction}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl flex flex-col items-center md:items-start w-full md:w-1/2"
          >
            <motion.p
              className="text-gold-400 font-light tracking-[0.2em] text-xs mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {slides[index]["sub-heading"]}
            </motion.p>
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-serif font-bold text-white mb-1 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {slides[index].title}
            </motion.h2>
            <motion.p
              className="text-white/80 font-light text-base md:text-lg mb-2 leading-relaxed max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {slides[index].description}
            </motion.p>
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <button className="group relative bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 font-medium tracking-wide transition-all duration-300 hover:shadow-lg flex items-center">
                View Property
                <MoveRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </button>
              <button className="group relative border-2 border-white/80 text-white hover:bg-white/10 px-8 py-3 font-medium tracking-wide transition-all duration-300 flex items-center">
                Contact Agent
                <MoveRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div
          ref={thumbnailContainerRef}
          className="mt-8 w-1/2 md:block hidden overflow-x-auto pb-2 scrollbar-hide relative"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            ref={thumbnailListRef}
            className="flex space-x-3 mx-auto w-max px-[50%]"
          >
            {propertySlides.map((slide, i) => {
              // Find the current position of this slide in our rotated array
              const currentPos = slides.findIndex((s) => s.id === slide.id);
              const isActive = currentPos === index;

              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(i)}
                  className={`flex-shrink-0 relative group transition-all duration-300 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div className="w-20 h-12 md:w-24 md:h-16 lg:w-28 lg:h-18 overflow-hidden rounded-sm">
                    <img
                      src={slide.image}
                      alt=""
                      className={`w-full h-full object-cover transition-all duration-300 ${
                        isActive
                          ? "opacity-100 brightness-100 border-2 border-gold-400"
                          : "opacity-60 brightness-75 group-hover:opacity-80 border border-transparent"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full relative h-1/5 z-20 flex flex-col items-center justify-center">
        <h1 className="text-2xl text-white md:text-3xl font-sans font-bold">
          Find Your Dream Home
        </h1>
        <p className="mb-1 text-white text-lg md:text-xl">
          Explore thousands of properties for sale and rent.
        </p>
        {/* Search Bar */}
        <div className="bg-background p-2 gap-2 rounded-sm flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 border border-border px-2">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <Input
              onFocus={() => handleFocus("location")}
              placeholder="Enter location"
              className="border-0 w-full bg-white focus:ring-0"
            />
          </div>
          <div className="flex items-center gap-2 flex-1 border border-border rounded px-3">
            <Home className="w-5 h-5 text-gray-500" />
            <Input
              onFocus={() => handleFocus("property")}
              placeholder="Property Type"
              className="border-0 w-full bg-white focus:ring-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
