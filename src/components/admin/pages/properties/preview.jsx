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
} from "lucide-react";

export const PropertiesPreviewPage = ({ form, featuredImage, mediaFiles }) => {
  // Combine featured image with other media files
  const allMedia = featuredImage ? [featuredImage, ...mediaFiles] : mediaFiles;

  // Format price with commas
  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

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

  // Render property details based on category
  const renderPropertyDetails = () => {
    switch (form.category) {
      case "plot":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
            <div className="flex flex-col items-center text-center">
              <Square className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">{form.sqft || "0"}</span>
              <span className="text-sm text-gray-600">Sq Ft</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Ruler className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.ankanam || "0"}
              </span>
              <span className="text-sm text-gray-600">Ankanam</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {formatPrice(form.price)}
              </span>
              <span className="text-sm text-gray-600">Price</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <MapPin className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.area || "N/A"}
              </span>
              <span className="text-sm text-gray-600">Area</span>
            </div>
          </div>
        );

      case "house":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
            <div className="flex flex-col items-center text-center">
              <BedDouble className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.bedrooms || "0"}
              </span>
              <span className="text-sm text-gray-600">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Bath className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.bathrooms || "0"}
              </span>
              <span className="text-sm text-gray-600">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Layers className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.floors || "0"}
              </span>
              <span className="text-sm text-gray-600">Floors</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Square className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">{form.sqft || "0"}</span>
              <span className="text-sm text-gray-600">Sq Ft</span>
            </div>
          </div>
        );

      case "apartment":
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
            <div className="flex flex-col items-center text-center">
              <BedDouble className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.bedrooms || "0"}
              </span>
              <span className="text-sm text-gray-600">Bedrooms</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Bath className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.bathrooms || "0"}
              </span>
              <span className="text-sm text-gray-600">Bathrooms</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Square className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">{form.sqft || "0"}</span>
              <span className="text-sm text-gray-600">Sq Ft</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {formatPrice(form.price)}
              </span>
              <span className="text-sm text-gray-600">Price</span>
            </div>
          </div>
        );

      case "land":
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-t border-b border-gray-200">
            <div className="flex flex-col items-center text-center">
              <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {formatPrice(form.price)}
              </span>
              <span className="text-sm text-gray-600">Price</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <Ruler className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">
                {form.area || "N/A"}
              </span>
              <span className="text-sm text-gray-600">Area</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <LandPlot className="h-6 w-6 text-blue-600 mb-2" />
              <span className="font-semibold text-lg">{form.acres || "0"}</span>
              <span className="text-sm text-gray-600">Acres</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-white overflow-hidden">
      {/* Property Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          {getCategoryIcon()}
          <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {getCategoryLabel()}
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {form.title || "Property Title"}
        </h1>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{form.location || "Location not specified"}</span>
        </div>
        {form.price && (
          <div className="mt-4">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(form.price)}
            </span>
          </div>
        )}
      </div>

      {/* Media Gallery */}
      {allMedia.length > 0 ? (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2 bg-gray-100">
            {allMedia.slice(0, 5).map((media, index) => (
              <div
                key={media.id}
                className={`${
                  index === 0 ? "md:col-span-2 md:row-span-2" : ""
                } relative aspect-video`}
              >
                {media.type === "image" ? (
                  <img
                    src={media.url}
                    alt={`Property view ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <video
                    src={media.url}
                    className="w-full h-full object-cover rounded-lg"
                    controls
                  />
                )}
                {index === 4 && allMedia.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <span className="text-white text-lg font-bold">
                      +{allMedia.length - 5} more
                    </span>
                  </div>
                )}
              </div>
            ))}
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

      {/* Property Details */}
      <div className="p-6">
        {renderPropertyDetails()}

        {/* Description */}
        <div className="py-6">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {form.description || "No description provided."}
          </p>
        </div>

        {/* Additional Details */}
        <div className="py-4 border-t border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-gray-500" />
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
            <div className="flex items-center gap-3">
              {getCategoryIcon()}
              <div>
                <p className="text-sm text-gray-500">Property Type</p>
                <p className="font-medium">{getCategoryLabel()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Interested in this property?
          </h3>
          <p className="text-gray-600 mb-4">
            Contact us for more information or to schedule a viewing.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Contact Agent
            </button>
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Schedule Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
