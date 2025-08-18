import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, MapPin } from "lucide-react";

export const SearchHandle = () => {
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

  return (
    <div className="w-full relative h-1/5 z-20 flex flex-col items-center justify-center space-y-4 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-serif font-bold tracking-tight">
          Find Your Dream Home
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-light">
          Explore thousands of premium properties for sale and rent.
        </p>
      </div>

      {/* Search Bar */}
      <div className="w-full max-w-4xl">
        <div className="bg-white/95 backdrop-blur-lg p-3 md:p-4 rounded shadow-xl flex flex-col md:flex-row gap-3 border border-white/20">
          <div className="flex-1 group relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="w-5 h-5 text-gold-400" />
            </div>
            <Input
              onFocus={() => handleFocus("location")}
              placeholder="Enter location"
              className="pl-10 w-full bg-transparent border border-gray-200/30 hover:border-gold-400/50 focus:border-gold-400 transition-colors rounded-md"
            />
          </div>

          <div className="flex-1 group relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Home className="w-5 h-5 text-gold-400" />
            </div>
            <Input
              onFocus={() => handleFocus("property")}
              placeholder="Property Type"
              className="pl-10 w-full bg-transparent border border-gray-200/30 hover:border-gold-400/50 focus:border-gold-400 transition-colors rounded-md"
            />
          </div>

          <Button
            variant="gold"
            size="lg"
            className="md:w-auto w-full rounded-md hover:scale-105 transition-transform"
          >
            Search Now
          </Button>
        </div>
      </div>
    </div>
  );
};
