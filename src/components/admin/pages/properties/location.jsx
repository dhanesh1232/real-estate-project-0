"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Building2, MapPinned, Globe, Hash } from "lucide-react";
export function Location({ location, onValueChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4">
      <div className="space-y-2">
        <Label>Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            className={`py-2 px-4 pl-10 rounded`}
            placeholder="Enter street address"
            value={location.address}
            onChange={(e) => onValueChange("address", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>City</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            className={`py-2 px-4 pl-10 rounded`}
            type="text"
            placeholder="Enter city name"
            value={location.city}
            onChange={(e) => onValueChange("city", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>State</Label>
        <div className="relative">
          <MapPinned className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            className={`py-2 px-4 pl-10 rounded`}
            type="text"
            placeholder="Enter state name"
            value={location.state}
            onChange={(e) => onValueChange("state", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Country</Label>
        <div className="relative">
          <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            className={`py-2 px-4 pl-10 rounded`}
            type="text"
            placeholder="Enter country name"
            value={location.country}
            onChange={(e) => onValueChange("country", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Pincode</Label>
        <div className="relative">
          <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            className={`py-2 px-4 pl-10 rounded`}
            type="text"
            placeholder="Enter postal code"
            value={location.pincode}
            onChange={(e) => onValueChange("pincode", e.target.value)}
          />
        </div>
      </div>
      {/* <div className="space-y-2">
        <Label>Map Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
          <Input
            className={`py-2 px-4 pl-10 rounded`}
            type="text"
            placeholder="Enter preview location url"
            value={location.map_preview}
            onChange={(e) => onValueChange("map_preview", e.target.value)}
          />
        </div>
      </div> */}
    </div>
  );
}
