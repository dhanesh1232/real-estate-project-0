"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";
import { propertySlides } from "@/lib/client/default_data";
import { SearchHandle } from "./search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function ModernHero() {
  const [index, setIndex] = useState(0);
  const [isMount, setIsMount] = useState(false);
  const [direction, setDirection] = useState(1);
  const [slides, setSlides] = useState(propertySlides);
  const thumbnailContainerRef = useRef(null);
  const thumbnailListRef = useRef(null);
  const timerRef = useRef(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

  // Handle drag start
  const handleDragStart = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
    setIsDragging(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Handle drag end
  const handleDragEnd = (e, info) => {
    if (!isDragging) return;

    setIsDragging(false);
    const clientX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const deltaX = clientX - dragStartX;

    // Determine if the drag was significant enough to change slides
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    // Restart the timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 8000);
  };
  const MotionImage = motion(Image);

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

  if (!isMount) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
    );
  }

  return (
    <div className="w-full h-screen relative flex flex-col justify-center overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />

      {/* Background Image with drag handlers */}
      <AnimatePresence mode="wait" custom={direction}>
        <MotionImage
          key={slides[index].id}
          custom={direction}
          src={slides[index].image}
          alt={slides[index].title || ""}
          fill
          priority={index === 0} // first slide loads eagerly
          sizes="100vw"
          className="absolute inset-0 object-cover touch-none"
          initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => setIsDragging(false)}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        />
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 h-4/5 lg:h-3/4 flex flex-row items-center md:items-end justify-between px-6 pb-16 sm:px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-32">
        {/* Text Content */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[index].id}
            custom={direction}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl p-2 md:p-4 flex flex-col bg-gradient-to-r from-transparent via-slate-600 to-transparent items-center md:items-start w-full md:w-1/2"
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
              className="text-2xl md:text-3xl font-serif italic lg:text-4xl xl:text-5xl font-bold text-white mb-1 leading-tight"
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
              className="flex items-center w-full justify-center md:justify-start gap-1 sm:gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button asChild variant="gold" size="lg">
                <Link
                  href="/properties"
                  className="relative group truncate rounded-none"
                >
                  View Property
                  <MoveRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link
                  className="group text-white bg-transparent truncate rounded-none text-center relative border-2 border-border"
                  href="/contact"
                >
                  Contact
                  <MoveRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 left-4 right-4 flex justify-between -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-1.5 md:p-3 rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-1.5 md:p-3 rounded-full text-white transition-all duration-300 hover:scale-110 border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
          </button>
        </div>

        {/* Thumbnail Navigation */}
        <div
          ref={thumbnailContainerRef}
          className="w-1/2 md:block hidden overflow-x-auto pb-2 scrollbar-hide relative"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div
            ref={thumbnailListRef}
            className="flex space-x-3 p-1 mx-auto w-max px-[50%]"
          >
            {propertySlides.map((slide, i) => {
              // Find the current position of this slide in our rotated array
              const currentPos = slides.findIndex((s) => s.id === slide.id);
              const isActive = currentPos === index;

              return (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(i)}
                  className={`flex-shrink-0 m-1 relative cursor-pointer group transition-all ease-in-out rounded duration-300 ${
                    isActive ? "scale-95 ring-2 ring-blue-600" : "scale-100"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div className="w-20 h-12 md:w-24 md:h-16 lg:w-28 lg:h-18 overflow-hidden rounded">
                    <Image
                      width={100}
                      height={100}
                      src={slide.image}
                      alt={slide["sub-heading"] || ""}
                      className={`w-full h-full object-cover transition-all border-none duration-300 ${
                        isActive
                          ? "opacity-100 brightness-100"
                          : "opacity-60 brightness-50 group-hover:opacity-80"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <SearchHandle />
    </div>
  );
}
