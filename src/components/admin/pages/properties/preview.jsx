import {
  Bath,
  BedDouble,
  Building,
  Calendar,
  DollarSign,
  Home,
  ImageIcon,
  LandPlot,
  Layers,
  MapPin,
  Ruler,
  Square,
  Heart,
  Share2,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export const PropertiesPreviewPage = ({
  location,
  form,
  featuredImage,
  mediaFiles,
}) => {
  // Combine featured image with other media files
  const allMedia = mediaFiles;
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };
  console.log(location);
  // Get category label
  const getCategoryLabel = () => {
    switch (form.category) {
      case "plot":
        return "Plot";
      case "house":
        return "Individual House";
      case "apartment":
        return "Apartment";
      case "land":
        return "Land";
      default:
        return "Property";
    }
  };

  // Get icon based on category
  const getCategoryIcon = () => {
    switch (form.category) {
      case "plot":
        return <Square className="h-5 w-5" />;
      case "house":
        return <Home className="h-5 w-5" />;
      case "apartment":
        return <Building className="h-5 w-5" />;
      case "land":
        return <LandPlot className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  // Navigate through gallery images
  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % allMedia.length);
  };

  const prevImage = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + allMedia.length) % allMedia.length
    );
  };

  // Render property details based on category
  const renderPropertyDetails = () => {
    switch (form.category) {
      case "plot":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Square className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.sqft || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Sq Ft</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Ruler className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.ankanam || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Ankanam</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <span className="h-8 text-4xl w-8 text-blue-600 mb-2">₹</span>
              <span className="font-bold text-xl">
                {formatPrice(form.price)}
              </span>
              <span className="text-sm text-gray-600 mt-1">Price</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <MapPin className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.area || "N/A"}</span>
              <span className="text-sm text-gray-600 mt-1">Area</span>
            </div>
          </div>
        );

      case "house":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <BedDouble className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.bedrooms || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Bath className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.bathrooms || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Layers className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.floors || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Floors</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Square className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.sqft || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Sq Ft</span>
            </div>
          </div>
        );

      case "apartment":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <BedDouble className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.bedrooms || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Bath className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.bathrooms || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Square className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.sqft || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Sq Ft</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">
                {formatPrice(form.price)}
              </span>
              <span className="text-sm text-gray-600 mt-1">Price</span>
            </div>
          </div>
        );

      case "land":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6">
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">
                {formatPrice(form.price)}
              </span>
              <span className="text-sm text-gray-600 mt-1">Price</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <Ruler className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.area || "N/A"}</span>
              <span className="text-sm text-gray-600 mt-1">Area</span>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded">
              <LandPlot className="h-8 w-8 text-blue-600 mb-2" />
              <span className="font-bold text-xl">{form.acres || "0"}</span>
              <span className="text-sm text-gray-600 mt-1">Acres</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded z-0 overflow-hidden">
      {/* Property Header with Action Buttons */}
      <div className="p-6 border-b border-gray-100 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              {getCategoryIcon()}
              <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {getCategoryLabel()}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {form.title || "Property Title"}
            </h1>
            <div className="flex flex-col gap-2 text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">
                  {location.address || "Not Specified"}
                </span>
              </div>
              {location && (
                <div className="flex items-center gap-2 text-sm">
                  {location.city && (
                    <>
                      <span>{location.city}</span>
                      <span>•</span>
                    </>
                  )}
                  {location.state && (
                    <>
                      <span>{location.state}</span>
                      <span>•</span>
                    </>
                  )}
                  {location.country && (
                    <>
                      <span>{location.country}</span>
                      <span>•</span>
                    </>
                  )}
                  {location.pincode && <span>{location.pincode}</span>}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-end">
            {form.price && (
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(form.price)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Heart className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery with Improved UI */}
      {featuredImage ? (
        <div className="relative p-6">
          {/* Main Image */}
          <div className="relative aspect-video bg-gray-100">
            {featuredImage?.mime?.startsWith("video") ? (
              <video
                src={featuredImage.url}
                className="w-full h-full object-cover"
                controls
              />
            ) : (
              <Image
                width={800}
                height={600}
                src={featuredImage.url}
                alt="Featured Image"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <ImageIcon className="h-12 w-12 mx-auto mb-2" />
            <p>No images available</p>
          </div>
        </div>
      )}

      {/* Property Content */}
      <div className="p-6 space-y-3">
        {/* Key Details Card */}
        <div className="bg-blue-50 rounded p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Key Details
          </h2>
          {renderPropertyDetails()}
        </div>

        {/* Description Card */}
        <div className="bg-white border border-gray-100 rounded p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Description
          </h2>
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {form.description || "No description provided."}
          </p>
        </div>

        <div className="w-full rounded space-y-2">
          <h3 className="text-2xl md:text-4xl font-serif">Gallery</h3>
          <div className="relative">
            {allMedia.length > 1 ? (
              <>
                {/* Main Image */}
                <div className="relative aspect-video bg-gray-100">
                  {allMedia[activeImageIndex]?.mime?.startsWith("video") ? (
                    <video
                      src={allMedia[activeImageIndex].url}
                      className="w-full h-full object-cover"
                      controls
                    />
                  ) : (
                    <img
                      src={allMedia[activeImageIndex].url}
                      alt={`Property view ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover cursor-pointer"
                    />
                  )}

                  {/* Navigation Arrows */}
                  {allMedia.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>
                {/* Thumbnail Strip */}
                <div className="p-4 bg-gray-50">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allMedia.map((media, index) => (
                      <div
                        key={media.fileId}
                        className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 ${
                          index === activeImageIndex
                            ? "border-blue-500"
                            : "border-transparent"
                        }`}
                        onClick={() => setActiveImageIndex(index)}
                      >
                        {media.mime?.startsWith("video") ? (
                          <video
                            src={media.url}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={media.url}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p>No images/videos available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Details Card */}
        <div className="bg-white border border-gray-100 rounded p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Additional Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded">
              <div className="p-2 bg-blue-100 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Year Built</p>
                <p className="font-medium">
                  {form.yearBuilt
                    ? new Date(form.yearBuilt).toLocaleDateString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Not specified"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded">
              <div className="p-2 bg-blue-100 rounded-full">
                {getCategoryIcon()}
              </div>
              <div>
                <p className="text-sm text-gray-500">Property Type</p>
                <p className="font-medium">{getCategoryLabel()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">
            Interested in this property?
          </h3>
          <p className="mb-6 opacity-90">
            Contact us for more information or to schedule a viewing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded font-medium hover:bg-blue-50 transition-colors">
              <Phone className="h-5 w-5" />
              Call Agent
            </button>
            <button className="flex items-center justify-center gap-2 border border-white text-white px-6 py-3 rounded font-medium hover:bg-white/10 transition-colors">
              <MessageCircle className="h-5 w-5" />
              Message
            </button>
            <button className="flex items-center justify-center gap-2 bg-blue-800 text-white px-6 py-3 rounded font-medium hover:bg-blue-900 transition-colors">
              <Calendar className="h-5 w-5" />
              Schedule Visit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
