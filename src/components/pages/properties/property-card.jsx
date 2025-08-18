import { Badge } from "@/components/ui/badge";
import { Bath, Bed, Layers, MapPin } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export const PropertyCard = ({
  property,
  formatPrice,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition duration-300 group">
      <div className="relative h-60 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
        {property.featured && (
          <Badge className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            Featured
          </Badge>
        )}
        <button
          onClick={() => onToggleFavorite(property.id)}
          className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 rounded-full text-gray-800 hover:text-red-500 transition"
        >
          {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {property.title}
          </h3>
          <span className="text-blue-600 font-bold whitespace-nowrap ml-2">
            {formatPrice(property.price)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4 flex items-center">
          <MapPin className="mr-1" />
          <span className="line-clamp-1">{property.location}</span>
        </p>

        <div className="flex justify-between items-center border-t border-gray-100 pt-4">
          <div className="flex gap-4 text-sm text-gray-600">
            {property.beds > 0 && (
              <span className="flex items-center">
                <Bed className="mr-1" />
                {property.beds}
              </span>
            )}
            {property.baths > 0 && (
              <span className="flex items-center">
                <Bath className="mr-1" />
                {property.baths}
              </span>
            )}
            <span className="flex items-center">
              <Layers className="mr-1" />
              {property.sqft} sqft
            </span>
          </div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
            {property.type}
          </span>
        </div>
      </div>
    </div>
  );
};
