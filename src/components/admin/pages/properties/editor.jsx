"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  X,
  Upload,
  ImageIcon,
  VideoIcon,
  MapPin,
  Home,
  DollarSign,
  BedDouble,
  Bath,
  Ruler,
  Eye,
  Save,
  ArrowLeft,
  Menu,
  Layers,
  Square,
  Building,
  LandPlot,
  Plus,
  PenBox,
  Car,
  Shield,
  Battery,
  Dumbbell,
  Waves,
  Club,
  Palette,
  ArrowUpDown,
  Trees,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PropertiesPreviewPage } from "./preview";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar22 } from "./date-picker";
import { ImagePickerModal } from "./image-picker";

// Property categories with metadata
const PROPERTY_CATEGORIES = [
  { value: "plot", label: "Plot", icon: Square },
  { value: "house", label: "Individual House", icon: Home },
  { value: "apartment", label: "Apartment", icon: Building },
  { value: "land", label: "Land", icon: LandPlot },
];

// Amenities options
const AMENITIES_OPTIONS = [
  { id: "gym", label: "Gym", icon: Dumbbell },
  { id: "swimming-pool", label: "Swimming Pool", icon: Waves },
  { id: "clubhouse", label: "Clubhouse", icon: Club },
  { id: "park", label: "Park", icon: Trees },
  { id: "playground", label: "Playground", icon: Palette },
];

// Facing directions
const FACING_OPTIONS = [
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "north", label: "North" },
  { value: "south", label: "South" },
  { value: "north-east", label: "North-East" },
  { value: "north-west", label: "North-West" },
  { value: "south-east", label: "South-East" },
  { value: "south-west", label: "South-West" },
];

// Furnishing options
const FURNISHING_OPTIONS = [
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "fully-furnished", label: "Fully Furnished" },
];

// Water supply options
const WATER_SUPPLY_OPTIONS = [
  { value: "municipal", label: "Municipal" },
  { value: "borewell", label: "Borewell" },
  { value: "both", label: "Both" },
  { value: "other", label: "Other" },
];

// Validation utility functions
const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

const validateNumber = (value, min = 0) => {
  const num = Number(value);
  return !isNaN(num) && num >= min;
};

const DEFAULT_FORM = {
  title: "",
  description: "",
  location: "",
  category: "",
  price: "",
  pricePerSqft: "",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  area: "",
  sqft: "",
  carpetArea: "",
  acres: "",
  ankanam: "",
  floors: "",
  totalFloors: "",
  propertyStatus: "draft",
  propertyType: "residential",
  yearBuilt: undefined,
  facing: "",
  furnishing: "",
  nearbyLandmark: "",
  // Amenities
  parking: false,
  lift: false,
  waterSupply: "",
  powerBackup: false,
  security: false,
  amenities: [],
};

export const PropertyEditor = ({ propertyData }) => {
  const [form, setForm] = useState(propertyData || DEFAULT_FORM);
  const [currentMode, setCurrentMode] = useState("editing");
  const [errors, setErrors] = useState({});
  const [featuredImage, setFeaturedImage] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  // Reset dependent fields when category changes
  useEffect(() => {
    if (form.category === "plot" || form.category === "land") {
      setForm((prev) => ({
        ...prev,
        bedrooms: "",
        bathrooms: "",
        floors: "",
        totalFloors: "",
        balconies: "",
        carpetArea: "",
        furnishing: "",
        lift: false,
      }));
    } else if (form.category === "house") {
      setForm((prev) => ({
        ...prev,
        acres: "",
        ankanam: "",
        totalFloors: "",
        lift: false,
      }));
    } else if (form.category === "apartment") {
      setForm((prev) => ({
        ...prev,
        acres: "",
        ankanam: "",
        floors: "",
      }));
    }
  }, [form.category]);

  // change editor mode of view
  const handleChangeMode = () => {
    const mode = currentMode === "preview" ? "editing" : "preview";
    setCurrentMode(mode);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    // Clear error when field is updated
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleAmenityChange = (amenityId, isChecked) => {
    setForm((prev) => {
      if (isChecked) {
        return {
          ...prev,
          amenities: [...prev.amenities, amenityId],
        };
      } else {
        return {
          ...prev,
          amenities: prev.amenities.filter((id) => id !== amenityId),
        };
      }
    });
  };

  // Calculate ankanam when sqft changes
  const handleSqftChange = (value) => {
    const sqftValue = parseFloat(value) || 0;
    const ankanamValue = (sqftValue / 36).toFixed(2);
    const pricePerSqftValue =
      form.price && sqftValue > 0
        ? (parseFloat(form.price) / sqftValue).toFixed(2)
        : "";

    setForm((prev) => ({
      ...prev,
      sqft: value,
      ankanam: ankanamValue,
      pricePerSqft: pricePerSqftValue,
    }));
  };

  // Calculate sqft when ankanam changes
  const handleAnkanamChange = (value) => {
    const ankanamValue = parseFloat(value) || 0;
    const sqftValue = (ankanamValue * 36).toFixed(2);
    const pricePerSqftValue =
      form.price && sqftValue > 0
        ? (parseFloat(form.price) / sqftValue).toFixed(2)
        : "";

    setForm((prev) => ({
      ...prev,
      ankanam: value,
      sqft: sqftValue,
      pricePerSqft: pricePerSqftValue,
    }));
  };

  // Calculate price per sqft when price or sqft changes
  useEffect(() => {
    if (form.price && form.sqft) {
      const priceVal = parseFloat(form.price);
      const sqftVal = parseFloat(form.sqft);
      if (!isNaN(priceVal) && !isNaN(sqftVal) && sqftVal > 0) {
        const calculatedPricePerSqft = (priceVal / sqftVal).toFixed(2);
        if (form.pricePerSqft !== calculatedPricePerSqft) {
          setForm((prev) => ({
            ...prev,
            pricePerSqft: calculatedPricePerSqft,
          }));
        }
      }
    }
  }, [form.price, form.sqft]);

  const removeMedia = (id) => {
    if (featuredImage && featuredImage.fileId === id) {
      setFeaturedImage(null);
    } else {
      setMediaFiles(mediaFiles.filter((item) => item.fileId !== id));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!validateRequired(form.title)) newErrors.title = "Title is required";
    if (!validateRequired(form.description))
      newErrors.description = "Description is required";
    if (!validateRequired(form.location))
      newErrors.location = "Location is required";
    if (!validateRequired(form.category))
      newErrors.category = "Category is required";

    // Number validation
    if (form.price && !validateNumber(form.price, 0))
      newErrors.price = "Price must be a valid number";
    if (form.bedrooms && !validateNumber(form.bedrooms, 0))
      newErrors.bedrooms = "Bedrooms must be a valid number";
    if (form.bathrooms && !validateNumber(form.bathrooms, 0))
      newErrors.bathrooms = "Bathrooms must be a valid number";
    if (form.sqft && !validateNumber(form.sqft, 0))
      newErrors.sqft = "Square feet must be a valid number";
    if (form.yearBuilt && !validateNumber(form.yearBuilt, 1800))
      newErrors.yearBuilt = "Year built must be a valid year";
    if (form.pricePerSqft && !validateNumber(form.pricePerSqft, 0))
      newErrors.pricePerSqft = "Price per sqft must be a valid number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast("Please fix the validation errors");
      return;
    }

    setIsSaving(true);
    console.log("Property Data:", { ...form, featuredImage, mediaFiles });

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast("Property Saved Successfully");
    }, 1500);
  };

  // Get category icon based on selection
  const getCategoryIcon = () => {
    const category = PROPERTY_CATEGORIES.find((c) => c.value === form.category);
    return category ? (
      <category.icon className="h-4 w-4 text-gray-400" />
    ) : (
      <Home className="h-4 w-4 text-gray-400" />
    );
  };

  // Media preview component
  const MediaPreview = ({ media, onRemove, className }) => (
    <div className={`relative ${className} w-full group aspect-square`}>
      {media.mime?.startsWith("video") ? (
        <video
          src={media.url}
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <img
          src={media.url}
          alt="Property"
          className="w-full h-full object-cover rounded-lg"
        />
      )}
      <button
        type="button"
        onClick={() => onRemove(media.fileId)}
        className="absolute top-1 cursor-pointer right-1 lg:top-2 lg:right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-3 w-3 lg:h-4 lg:w-4" />
      </button>
      <div className="absolute bottom-1 left-1 lg:bottom-2 lg:left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full">
        {media.mime?.startsWith("video") ? (
          <VideoIcon className="h-2.5 w-2.5 lg:h-3 lg:w-3 inline mr-1" />
        ) : (
          <ImageIcon className="h-2.5 w-2.5 lg:h-3 lg:w-3 inline mr-1" />
        )}
        {media.type}
      </div>
    </div>
  );

  // Checkbox component for amenities
  const AmenityCheckbox = ({ amenity, checked, onCheckedChange }) => {
    const IconComponent = amenity.icon;
    return (
      <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 transition-colors">
        <Checkbox
          id={amenity.id}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <Label
          htmlFor={amenity.id}
          className="flex items-center cursor-pointer"
        >
          <IconComponent className="h-4 w-4 mr-2" />
          {amenity.label}
        </Label>
      </div>
    );
  };

  // Render category-specific fields
  const renderCategoryFields = () => {
    switch (form.category) {
      case "plot":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <InputWithLabel
              label="Square Feet (Sqft)"
              icon={Square}
              type="number"
              placeholder="Square feet"
              value={form.sqft}
              min={0}
              onChange={(e) => handleSqftChange(e.target.value)}
              error={errors.sqft}
            />

            <InputWithLabel
              label="Ankanam (1 Ankanam = 36 Sqft)"
              icon={Ruler}
              type="number"
              placeholder="Ankanam"
              value={form.ankanam}
              min={0}
              step="0.01"
              onChange={(e) => handleAnkanamChange(e.target.value)}
            />

            <InputWithLabel
              label="Price per Sqft (₹)"
              icon={DollarSign}
              type="number"
              placeholder="Price per sqft"
              value={form.pricePerSqft}
              min={0}
              step="0.01"
              onChange={(e) => handleChange("pricePerSqft", e.target.value)}
              error={errors.pricePerSqft}
            />
          </div>
        );

      case "house":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <InputWithLabel
              label="Bedrooms"
              icon={BedDouble}
              type="number"
              placeholder="Number of bedrooms"
              value={form.bedrooms}
              min={0}
              onChange={(e) => handleChange("bedrooms", e.target.value)}
            />

            <InputWithLabel
              label="Bathrooms"
              icon={Bath}
              type="number"
              placeholder="Number of bathrooms"
              value={form.bathrooms}
              min={0}
              onChange={(e) => handleChange("bathrooms", e.target.value)}
            />

            <InputWithLabel
              label="Floors"
              icon={Layers}
              type="number"
              placeholder="Number of floors"
              value={form.floors}
              min={0}
              onChange={(e) => handleChange("floors", e.target.value)}
            />

            <InputWithLabel
              label="Square Feet (Sqft)"
              icon={Square}
              type="number"
              placeholder="Total square feet"
              value={form.sqft}
              min={0}
              onChange={(e) => handleChange("sqft", e.target.value)}
              error={errors.sqft}
            />

            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Facing Direction
              </Label>
              <Select
                value={form.facing}
                onValueChange={(val) => handleChange("facing", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facing direction" />
                </SelectTrigger>
                <SelectContent>
                  {FACING_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Furnishing
              </Label>
              <Select
                value={form.furnishing}
                onValueChange={(val) => handleChange("furnishing", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select furnishing type" />
                </SelectTrigger>
                <SelectContent>
                  {FURNISHING_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "apartment":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <InputWithLabel
              label=" Square Feet (Sqft)"
              icon={Square}
              type="number"
              placeholder="Total square feet"
              value={form.sqft}
              min={0}
              onChange={(e) => handleChange("sqft", e.target.value)}
              error={errors.sqft}
            />

            <InputWithLabel
              label={"Carpet Area (Sqft)"}
              icon={Ruler}
              type="number"
              placeholder="Carpet area"
              value={form.carpetArea}
              min={0}
              onChange={(e) => handleChange("carpetArea", e.target.value)}
            />

            <InputWithLabel
              label={"Bedrooms"}
              icon={BedDouble}
              type="number"
              placeholder="Number of bedrooms"
              value={form.bedrooms}
              min={0}
              onChange={(e) => handleChange("bedrooms", e.target.value)}
              error={errors.bedrooms}
            />

            <InputWithLabel
              label={"Bathrooms"}
              icon={Bath}
              type="number"
              placeholder="Number of bathrooms"
              value={form.bathrooms}
              min={0}
              onChange={(e) => handleChange("bathrooms", e.target.value)}
              error={errors.bathrooms}
            />

            <InputWithLabel
              label="Balconies"
              icon={ArrowUpDown}
              type="number"
              placeholder="Number of balconies"
              value={form.balconies}
              min={0}
              onChange={(e) => handleChange("balconies", e.target.value)}
            />

            <InputWithLabel
              label="Total Floors in Building"
              icon={Layers}
              type="number"
              placeholder="Total floors"
              value={form.totalFloors}
              min={0}
              onChange={(e) => handleChange("totalFloors", e.target.value)}
            />

            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Facing Direction
              </Label>
              <Select
                value={form.facing}
                onValueChange={(val) => handleChange("facing", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select facing direction" />
                </SelectTrigger>
                <SelectContent>
                  {FACING_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Furnishing
              </Label>
              <Select
                value={form.furnishing}
                onValueChange={(val) => handleChange("furnishing", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select furnishing type" />
                </SelectTrigger>
                <SelectContent>
                  {FURNISHING_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case "land":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <InputWithLabel
              label={"Acres"}
              icon={LandPlot}
              type="number"
              placeholder="Size in acres"
              value={form.acres}
              min={0}
              step="0.01"
              onChange={(e) => handleChange("acres", e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  // Render amenities section
  const renderAmenitiesSection = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2 p-3 border rounded">
          <Checkbox
            id="parking"
            checked={form.parking}
            onCheckedChange={(checked) => handleChange("parking", checked)}
          />
          <Label htmlFor="parking" className="flex items-center cursor-pointer">
            <Car className="h-4 w-4 mr-2" />
            Parking
          </Label>
        </div>

        <div className="flex items-center space-x-2 p-3 border rounded">
          <Checkbox
            id="lift"
            checked={form.lift}
            onCheckedChange={(checked) => handleChange("lift", checked)}
            disabled={
              form.category === "house" ||
              form.category === "plot" ||
              form.category === "land"
            }
          />
          <Label htmlFor="lift" className="flex items-center cursor-pointer">
            <Layers className="h-4 w-4 mr-2" />
            Lift/Elevator
          </Label>
        </div>

        <div className="flex items-center space-x-2 p-3 border rounded">
          <Checkbox
            id="powerBackup"
            checked={form.powerBackup}
            onCheckedChange={(checked) => handleChange("powerBackup", checked)}
          />
          <Label
            htmlFor="powerBackup"
            className="flex items-center cursor-pointer"
          >
            <Battery className="h-4 w-4 mr-2" />
            Power Backup
          </Label>
        </div>

        <div className="flex items-center space-x-2 p-3 border rounded">
          <Checkbox
            id="security"
            checked={form.security}
            onCheckedChange={(checked) => handleChange("security", checked)}
          />
          <Label
            htmlFor="security"
            className="flex items-center cursor-pointer"
          >
            <Shield className="h-4 w-4 mr-2" />
            24/7 Security
          </Label>
        </div>
      </div>

      <div>
        <Label className="block mb-2 font-medium text-gray-700">
          Water Supply
        </Label>
        <Select
          value={form.waterSupply}
          onValueChange={(val) => handleChange("waterSupply", val)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select water supply type" />
          </SelectTrigger>
          <SelectContent>
            {WATER_SUPPLY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="block mb-2 font-medium text-gray-700">
          Additional Amenities
        </Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {AMENITIES_OPTIONS.map((amenity) => (
            <AmenityCheckbox
              key={amenity.id}
              amenity={amenity}
              checked={form.amenities.includes(amenity.id)}
              onCheckedChange={(checked) =>
                handleAmenityChange(amenity.id, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Navigation tabs
  const renderTabs = () => (
    <div className="border-b border-gray-200">
      <nav className="flex flex-wrap md:flex-nowrap overflow-x-auto scrollbar-hide">
        {["basic", "details", "amenities", "media"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-3 md:px-4 font-medium text-xs md:text-sm whitespace-nowrap rounded-t transition-colors flex-shrink-0 ${
              activeTab === tab
                ? "text-blue-700 border-b-2 border-blue-700 bg-blue-50/50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              {tab === "basic" && (
                <>
                  <Home className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Basic Info</span>
                </>
              )}
              {tab === "details" && (
                <>
                  <Layers className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Property Details</span>
                </>
              )}
              {tab === "amenities" && (
                <>
                  <Building2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Amenities</span>
                </>
              )}
              {tab === "media" && (
                <>
                  <ImageIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span>Media</span>
                </>
              )}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <div className="space-y-4">
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Title *
              </Label>
              <Input
                placeholder="e.g. Spacious 3BHK Apartment with Mountain View"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className={`py-2 px-4 rounded ${
                  errors.title ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Description *
              </Label>
              <Textarea
                placeholder="Describe the property features, amenities, and unique selling points..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className={`min-h-32 py-2 px-4 rounded ${
                  errors.description ? "border-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <InputWithLabel
                label={"Location *"}
                icon={MapPin}
                placeholder="City / Address"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                error={errors.location}
              />

              <InputWithLabel
                label="Price (₹)"
                icon={DollarSign}
                type="number"
                placeholder="Enter price"
                value={form.price}
                min={0}
                onChange={(e) => handleChange("price", e.target.value)}
                error={errors.price}
              />
            </div>
          </div>
        );

      case "details":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <Label className="block mb-2 font-medium text-gray-700">
                  Category *
                </Label>
                <Select
                  value={form.category}
                  onValueChange={(val) => handleChange("category", val)}
                >
                  <SelectTrigger
                    className={`py-2 px-4 min-w-[200px] rounded ${
                      errors.category ? "border-red-500 focus:ring-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    {PROPERTY_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>

              <div>
                <InputWithLabel
                  icon={Building2}
                  label="Nearby Landmark"
                  placeholder="e.g., Near Shree College"
                  value={form.nearbyLandmark}
                  onChange={(e) =>
                    handleChange("nearbyLandmark", e.target.value)
                  }
                />
              </div>
            </div>

            {/* Category-specific fields */}
            {form.category && (
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  {getCategoryIcon()}
                  {form.category === "plot" && "Plot Details"}
                  {form.category === "house" && "House Details"}
                  {form.category === "apartment" && "Apartment Details"}
                  {form.category === "land" && "Land Details"}
                </h3>
                {renderCategoryFields()}
              </div>
            )}
          </div>
        );

      case "amenities":
        return renderAmenitiesSection();

      case "media":
        return (
          <div className="space-y-4">
            <div>
              <Label className="font-semibold block mb-2 text-gray-700">
                Featured Image
              </Label>
              {!featuredImage ? (
                <ImagePickerModal onSelect={(image) => setFeaturedImage(image)}>
                  <Button
                    type="button"
                    className="border-2 flex flex-col items-center text-gray-400 border-dashed h-56 w-full border-gray-300 rounded-lg p-6 lg:p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8 lg:h-12 lg:w-12" />
                    {featuredImage
                      ? "Change Featured Image"
                      : "Select Featured Image"}
                  </Button>
                </ImagePickerModal>
              ) : (
                <MediaPreview
                  media={featuredImage}
                  className="max-h-72"
                  onRemove={removeMedia}
                />
              )}
            </div>

            <div>
              <Label className="font-semibold block mb-2 text-gray-700">
                Additional Media
              </Label>
              {mediaFiles.length === 0 ? (
                <ImagePickerModal
                  onSelect={(images) =>
                    setMediaFiles([...mediaFiles, ...images])
                  }
                  multiple
                >
                  <Button
                    type="button"
                    className="border-2 flex flex-col text-gray-400 items-center border-dashed h-56 w-full border-gray-300 rounded-lg p-6 lg:p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8 lg:h-12 lg:w-12" />
                    Add Media (Images/Videos)
                  </Button>
                </ImagePickerModal>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
                  {mediaFiles.map((media) => (
                    <MediaPreview
                      key={media.fileId}
                      media={media}
                      onRemove={removeMedia}
                      className="h-auto"
                    />
                  ))}
                  <ImagePickerModal
                    onSelect={(images) =>
                      setMediaFiles([...mediaFiles, ...images])
                    }
                    multiple
                  >
                    <Button
                      type="button"
                      className="border-2 flex flex-col text-gray-400 items-center border-dashed h-56 w-full border-gray-300 rounded-lg p-6 lg:p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                      variant="outline"
                    >
                      <Plus className="h-8 w-8 lg:h-12 lg:w-12" />
                      Add more (Images/Videos)
                    </Button>
                  </ImagePickerModal>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="bg-white border-b sticky z-10 top-12 border-gray-200 px-4 py-3 flex items-center justify-between md:hidden">
        <div className="flex items-center gap-3">
          {currentMode === "preview" ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded"
              onClick={handleChangeMode}
            >
              <ArrowLeft className="h-5 w-8" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="rounded"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {propertyData ? "Edit Property" : "Add Property"}
            </h1>
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 cursor-pointer"
                onClick={handleChangeMode}
              >
                {currentMode === "preview" ? (
                  <>
                    <PenBox className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Edit</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Preview</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {currentMode === "preview" ? "Edit" : "Preview"}
            </TooltipContent>
          </Tooltip>
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            size="sm"
            className="gap-1 bg-blue-600 cursor-pointer hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Save</span>
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="bg-white border-b z-10 sticky top-12 border-gray-200 px-2 py-4 items-center justify-between hidden md:flex">
        <div className="flex items-center gap-3">
          {currentMode === "preview" ? (
            <Button
              variant="ghost"
              size="icon"
              className="rounded"
              onClick={handleChangeMode}
            >
              <ArrowLeft className="h-5 w-8" />
            </Button>
          ) : (
            <Button variant="ghost" size="icon" className="rounded" asChild>
              <Link href="/admin/properties">
                <ArrowLeft className="h-5 w-7" />
              </Link>
            </Button>
          )}
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {propertyData ? "Edit Property" : "Add Property"}
            </h1>
            <p className="text-sm text-gray-500">
              {propertyData ? "Update existing" : "Create a new"} property
              listing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="gap-2 cursor-pointer"
                onClick={handleChangeMode}
              >
                {currentMode === "preview" ? (
                  <>
                    <PenBox className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Edit</span>
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Preview</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {currentMode === "preview" ? "Edit" : "Preview"}
            </TooltipContent>
          </Tooltip>

          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700"
          >
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>Save Property</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-2 md:p-3 gap-2 md:gap-4">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Mobile Drawer & Desktop Fixed */}
        <div
          className={`
          fixed md:sticky top-12 md:top-34 left-0 h-full max-w-80 w-full md:w-auto md:min-w-56 bg-white z-50 md:z-0 shadow-xl md:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 lg:flex-shrink-0
          ${currentMode === "preview" ? "hidden" : "block"}`}
        >
          <div className="h-full overflow-y-auto p-4 md:p-0">
            <div className="flex items-center justify-between mb-4 md:hidden">
              <h2 className="text-lg font-semibold">Options</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              {/* Status Card */}
              <Card className="overflow-hidden gap-0">
                <CardHeader className="bg-background py-1 px-3 md:py-1.5">
                  <CardTitle className="text-base lg:text-lg">Status</CardTitle>
                </CardHeader>
                <CardContent className="p-2.5">
                  <div className="space-y-2">
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700">
                        Visibility
                      </Label>
                      <Select
                        value={form.propertyStatus}
                        onValueChange={(val) =>
                          handleChange("propertyStatus", val)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="reserved">Reserved</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-sm text-gray-500">
                      <p>Created: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Card */}
              <Card className="overflow-hidden gap-0">
                <CardHeader className="bg-background py-1.5 px-3 lg:py-1.5">
                  <CardTitle className="text-base lg:text-lg">
                    Organization
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2.5">
                  <div className="space-y-2">
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700">
                        Category *
                      </Label>
                      <Select
                        value={form.category}
                        onValueChange={(val) => handleChange("category", val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROPERTY_CATEGORIES.map((category) => (
                            <SelectItem
                              key={category.value}
                              value={category.value}
                            >
                              <div className="flex items-center gap-2">
                                <category.icon className="h-4 w-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.category}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700">
                        Property Category
                      </Label>
                      <Select
                        value={form.propertyType}
                        onValueChange={(val) =>
                          handleChange("propertyType", val)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">
                            Residential
                          </SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="industrial">Industrial</SelectItem>
                          <SelectItem value="agricultural">
                            Agricultural
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden gap-0">
                <CardHeader className="bg-background py-1.5 px-3 lg:py-1.5">
                  <CardTitle className="text-base lg:text-lg">
                    Additional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2.5">
                  <Calendar22
                    value={form.yearBuilt}
                    onSelectDate={(value) => {
                      setForm((prev) => ({ ...prev, yearBuilt: value }));
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentMode === "editing" ? (
          <div className="flex-1 space-y-2 lg:space-y-4">
            {/* Navigation Tabs */}
            <Card className="overflow-hidden gap-0">
              <CardContent className="p-0">
                {renderTabs()}
                <div className="p-4 lg:p-6">{renderTabContent()}</div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <PropertiesPreviewPage
            form={form}
            featuredImage={featuredImage}
            mediaFiles={mediaFiles}
          />
        )}
      </div>
    </div>
  );
};

const InputWithLabel = ({
  icon: Icon,
  label,
  error,
  value,
  onChange,
  ...props
}) => {
  return (
    <div>
      <Label className="block mb-2 font-medium text-gray-700">{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          {...props}
          value={value}
          onChange={onChange}
          className={`py-2 px-4 pl-10 rounded ${
            error ? "border-red-500 focus:ring-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
};
