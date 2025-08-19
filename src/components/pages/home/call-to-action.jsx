"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-r from-primary/5 to-primary/60 text-white text-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-2xl ms:text-3xl md:text-5xl font-bold mb-6 leading-tight">
          Discover Your Luxury Dream Home
        </h2>
        <p className="mb-8 text-base md:text-lg text-white/95 max-w-2xl mx-auto leading-relaxed">
          Experience unparalleled elegance and sophistication. Let our premium
          real estate experts guide you to your perfect sanctuary.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            variant="gold"
            className="min-w-[200px] text-base font-semibold hover:scale-105 transition-transform"
            asChild
          >
            <Link href="/contact">Contact</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] text-base font-semibold border-white/30 hover:border-white hover:bg-white/10 transition-all"
            asChild
          >
            <Link href="/properties">View Luxury Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
