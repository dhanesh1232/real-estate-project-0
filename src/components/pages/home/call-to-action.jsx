"use client";
import { Button } from "@/components/ui/button";
import { Verified } from "lucide-react";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-br from-blue-50 to-white text-gray-900 text-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section header with elegant typography */}
        <div className="mb-2">
          <span className="text-blue-600 font-serif font-light tracking-widest text-sm uppercase">
            Exclusive Properties
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal mb-6 leading-tight">
          Discover Your <span className="text-blue-700">Luxury</span> Dream Home
        </h2>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto my-8"></div>

        <p className="mb-10 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-light">
          Experience unparalleled elegance and sophistication. Let our premium
          real estate experts guide you to your perfect sanctuary where luxury
          meets comfort.
        </p>

        {/* Action buttons with premium styling */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <Button
            size="lg"
            className="min-w-[220px] py-6 px-8 bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-800 hover:to-blue-900 text-white font-medium text-base transition-all duration-300 hover:shadow-lg hover:shadow-blue-700/20 border border-blue-700 rounded"
            asChild
          >
            <Link href="/contact">Schedule Consultation</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[220px] py-6 px-8 text-blue-700 font-medium text-base border border-blue-600/50 hover:border-blue-700 hover:bg-blue-50/50 rounded transition-all duration-300 bg-white/80 backdrop-blur-sm"
            asChild
          >
            <Link href="/properties">View Exclusive Properties</Link>
          </Button>
        </div>

        {/* Trust indicator */}
        <div className="mt-12 text-gray-600 text-sm flex flex-col sm:flex-row items-center justify-center gap-3">
          <span className="flex items-center gap-1.5">
            <Verified size={14} className="text-blue-600" />
            Trusted by elite clients worldwide
          </span>
          <span className="hidden sm:block text-blue-300">•</span>
          <span>Premium service since 2010</span>
        </div>
      </div>
    </section>
  );
}
