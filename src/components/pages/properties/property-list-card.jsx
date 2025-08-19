import { Badge } from "@/components/ui/badge";
import { Bath, Bed, Layers, MapPin } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const PropertyListCard = ({
  property,
  formatPrice,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col md:flex-row max-w-6xl mx-auto">
      <div className="md:w-2/5 lg:w-1/3 h-72 sm:h-80 md:h-auto relative overflow-hidden group">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm">
            Featured
          </Badge>
        )}
        <button
          onClick={() => onToggleFavorite(property.id)}
          className="absolute top-4 right-4 p-2.5 bg-white bg-opacity-90 rounded-full text-gray-800 hover:text-red-500 transition shadow-sm hover:shadow-md"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xl" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
        </button>
      </div>

      <div className="p-5 sm:p-6 md:p-8 md:w-3/5 lg:w-2/3 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 line-clamp-1">
            {property.title}
          </h3>
          <span className="text-blue-600 font-bold text-lg sm:text-xl whitespace-nowrap">
            {formatPrice(property.price)}
          </span>
        </div>

        <p className="text-gray-600 mb-4 flex items-center text-sm sm:text-base">
          <MapPin className="mr-2 h-5 w-5" />
          {property.location}
        </p>

        <p className="text-gray-700 mb-6 line-clamp-3 text-sm sm:text-base">
          {property.description ||
            "Beautiful property in a prime location with modern amenities and stunning views."}
        </p>

        <div className="mt-auto space-y-4 sm:space-y-6">
          <div className="flex flex-wrap gap-6 text-sm sm:text-base text-gray-600">
            {property.beds > 0 && (
              <span className="flex items-center">
                <Bed className="mr-2 h-5 w-5" />
                {property.beds} bed{property.beds !== 1 ? "s" : ""}
              </span>
            )}
            {property.baths > 0 && (
              <span className="flex items-center">
                <Bath className="mr-2 h-5 w-5" />
                {property.baths} bath{property.baths !== 1 ? "s" : ""}
              </span>
            )}
            <span className="flex items-center">
              <Layers className="mr-2 h-5 w-5" />
              {property.sqft} sqft
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <p className="text-sm bg-slate-100 text-gray-700 px-4 py-2 text-center rounded font-medium">
              {property.type}
            </p>
            <button className="px-6 py-1.5 bg-gold-600 hover:bg-gold-700 text-white rounded text-sm sm:text-base font-semibold transition-colors duration-200 flex-shrink-0">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
