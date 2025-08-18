import { Badge } from "@/components/ui/badge";
import { Bath, Bed, Heart, Layers, MapPin } from "lucide-react";
import { FaRegHeart } from "react-icons/fa";

export // List View Card Component
const PropertyListCard = ({
  property,
  formatPrice,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="bg-white rounded shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col md:flex-row">
      <div className="md:w-1/3 h-64 md:h-auto overflow-hidden relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
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
          {isFavorite ? <Heart className="text-red-500" /> : <FaRegHeart />}
        </button>
      </div>
      <div className="p-6 md:w-2/3 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
          <span className="text-blue-600 font-bold text-lg whitespace-nowrap ml-4">
            {formatPrice(property.price)}
          </span>
        </div>

        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin className="mr-1" />
          {property.location}
        </p>

        <p className="text-gray-700 mb-6 line-clamp-2">
          {property.description ||
            "Beautiful property in a prime location with modern amenities and stunning views."}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-4 text-sm text-gray-600">
            {property.beds > 0 && (
              <span className="flex items-center">
                <Bed className="mr-1" />
                {property.beds} bed{property.beds !== 1 ? "s" : ""}
              </span>
            )}
            {property.baths > 0 && (
              <span className="flex items-center">
                <Bath className="mr-1" />
                {property.baths} bath{property.baths !== 1 ? "s" : ""}
              </span>
            )}
            <span className="flex items-center">
              <Layers className="mr-1" />
              {property.sqft} sqft
            </span>
          </div>

          <div className="flex gap-3">
            <Badge className="text-xs bg-slate-200 text-gray-600 px-3 py-1.5 rounded">
              {property.type}
            </Badge>
            <button className="px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded text-sm transition">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
