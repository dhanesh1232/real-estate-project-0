// app/properties/page.js

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { FiX, FiGrid, FiList, FiHome, FiFilter } from "react-icons/fi";
import { dummyProperties } from "@/lib/client/default_data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PropertyCard } from "./property-card";
import { PropertyListCard } from "./property-list-card";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocalStorage } from "@/hooks/use-local-storage";

const PropertyListingsPage = () => {
  // State management
  const [properties, setProperties] = useState(dummyProperties);
  const [filteredProperties, setFilteredProperties] = useState(dummyProperties);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useLocalStorage("property-favorites", []);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [beds, setBeds] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sortOption, setSortOption] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Memoized derived values
  const locations = useMemo(
    () => [...new Set(dummyProperties.map((property) => property.location))],
    [dummyProperties]
  );

  const types = useMemo(
    () => [...new Set(dummyProperties.map((property) => property.type))],
    [dummyProperties]
  );

  // Toggle favorite with persistence
  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((prevFavorites) =>
        prevFavorites.includes(id)
          ? prevFavorites.filter((favId) => favId !== id)
          : [...prevFavorites, id]
      );
    },
    [setFavorites]
  );

  // Debounced search
  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        setSearchQuery(query);
      }, 300),
    []
  );

  // Combined filtering and sorting
  useEffect(() => {
    setIsLoading(true);

    const filterTimeout = setTimeout(() => {
      let filtered = [...properties];

      // Apply all filters
      if (searchQuery) {
        filtered = filtered.filter(
          (property) =>
            property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            property.location
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            property.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
      }

      filtered = filtered.filter(
        (property) =>
          property.price >= priceRange[0] && property.price <= priceRange[1]
      );

      if (selectedLocation && selectedLocation !== "all") {
        filtered = filtered.filter(
          (property) => property.location === selectedLocation
        );
      }

      if (selectedType && selectedType !== "all") {
        filtered = filtered.filter(
          (property) => property.type === selectedType
        );
      }

      if (beds > 0) {
        filtered = filtered.filter((property) => property.beds >= beds);
      }

      if (baths > 0) {
        filtered = filtered.filter((property) => property.baths >= baths);
      }

      // Apply sorting
      let sorted = [...filtered];
      switch (sortOption) {
        case "price-low-high":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "price-high-low":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "newest":
        default:
          sorted.sort(
            (a, b) => new Date(b.listedDate) - new Date(a.listedDate)
          );
          break;
      }

      setFilteredProperties(sorted);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(filterTimeout);
  }, [
    priceRange,
    selectedLocation,
    selectedType,
    beds,
    baths,
    properties,
    searchQuery,
    sortOption,
  ]);

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const resetFilters = useCallback(() => {
    setPriceRange([0, 3000000]);
    setSelectedLocation("");
    setSelectedType("");
    setBeds(0);
    setBaths(0);
    setSearchQuery("");
    setSortOption("newest");
  }, []);

  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      priceRange[0] > 0 ||
      priceRange[1] < 3000000 ||
      selectedLocation ||
      selectedType ||
      beds > 0 ||
      baths > 0 ||
      searchQuery
    );
  }, [priceRange, selectedLocation, selectedType, beds, baths, searchQuery]);

  const FilterSection = () => (
    <div className="bg-white p-6 rounded shadow-md mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">Filters</h3>
        <div className="flex gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="text-blue-600 cursor-pointer hover:text-blue-800"
            >
              Reset
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowFilters(false)}
            className="lg:hidden cursor-pointer"
          >
            <FiX size={20} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Keyword..."
              className="w-full pl-3 pr-8 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              defaultValue={searchQuery}
              onChange={(e) => debouncedSearch(e.target.value)}
            />
            <Search className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div className="md:col-span-2 lg:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price Range: {formatPrice(priceRange[0])} -{" "}
            {formatPrice(priceRange[1])}
          </label>
          <Slider
            min={0}
            max={3000000}
            step={50000}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            className="w-full mt-2"
          />
        </div>

        {/* Beds & Baths Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beds
          </label>
          <Select
            value={beds.toString()}
            onValueChange={(val) => setBeds(parseInt(val))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Baths
          </label>
          <Select
            value={baths.toString()}
            onValueChange={(val) => setBaths(parseInt(val))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-50 text-primary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-base md:text-lg text-slate-800 mb-3">
            Discover premium homes and apartments tailored to your lifestyle
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={16} />
            </div>
            <input
              type="text"
              placeholder="Search by location, property type, or keyword..."
              className="block w-full pl-10 pr-3 py-2 border border-border rounded bg-white bg-opacity-20 focus:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-primary placeholder-blue-100 focus:text-gray-800 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-6 flex items-center gap-4">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-3 rounded shadow-md"
          >
            <FiFilter size={18} /> Filters
            {hasActiveFilters && (
              <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold bg-white text-blue-600 rounded-full">
                !
              </span>
            )}
          </Button>

          <div className="flex-1 flex justify-end">
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                aria-label="Grid view"
              >
                <FiGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded cursor-pointer ${
                  viewMode === "list"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                aria-label="List view"
              >
                <FiList size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Show filters on mobile when toggled */}
        {(showFilters || window.innerWidth >= 1024) && <FilterSection />}

        {/* Main Content Area */}
        <div>
          {/* Results Summary and Controls */}
          <div className="bg-white p-5 rounded shadow-md mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  {isLoading ? (
                    <Skeleton className="h-6 w-32" />
                  ) : (
                    `${filteredProperties.length} ${
                      filteredProperties.length === 1
                        ? "Property"
                        : "Properties"
                    } Found`
                  )}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selectedLocation && `in ${selectedLocation}`}
                  {selectedType && ` • ${selectedType}`}
                  {beds > 0 && ` • ${beds}+ beds`}
                  {baths > 0 && ` • ${baths}+ baths`}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 hidden sm:block">
                    Sort by:
                  </span>
                  <Select value={sortOption} onValueChange={setSortOption}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort Listings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="newest">Newest Listings</SelectItem>
                        <SelectItem value="price-low-high">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="price-high-low">
                          Price: High to Low
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1 rounded">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 cursor-pointer rounded ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    aria-label="Grid view"
                  >
                    <FiGrid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 cursor-pointer rounded ${
                      viewMode === "list"
                        ? "bg-white shadow-sm text-blue-600"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                    aria-label="List view"
                  >
                    <FiList size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Property Listings */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-96 w-full rounded" />
              ))}
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="bg-white p-12 rounded shadow-md text-center">
              <div className="max-w-md mx-auto">
                <FiHome className="mx-auto text-gray-300 text-5xl mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500 mb-6">
                  We couldn't find any properties matching your criteria.
                </p>
                <Button
                  onClick={resetFilters}
                  className="px-6 cursor-pointer py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  formatPrice={formatPrice}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProperties.map((property) => (
                <PropertyListCard
                  key={property.id}
                  property={property}
                  formatPrice={formatPrice}
                  isFavorite={favorites.includes(property.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingsPage;
