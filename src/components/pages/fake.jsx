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
  Calendar,
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
  Star,
  Loader2,
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

// Property categories with metadata
const PROPERTY_CATEGORIES = [
  { value: "plot", label: "Plot", icon: Square },
  { value: "house", label: "Individual House", icon: Home },
  { value: "apartment", label: "Apartment", icon: Building },
  { value: "land", label: "Land", icon: LandPlot },
];

// Validation utility functions
const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

const validateNumber = (value, min = 0) => {
  const num = Number(value);
  return !isNaN(num) && num >= min;
};

const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

const validatePhone = (value) => {
  const phoneRegex = /^(\+\d{1,3})?\d{7,15}$/;
  return phoneRegex.test(value.replace(/[-\s]/g, ""));
};

// Default form structure
const DEFAULT_FORM = {
  title: "",
  description: "",
  price: "",
  location: "",
  category: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  yearBuilt: undefined,
  sqft: "",
  floors: "",
  acres: "",
  ankanam: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  amenities: [],
  propertyStatus: "available",
  propertyType: "residential",
};

// Default amenities list
const AMENITIES_LIST = [
  "Parking",
  "Garden",
  "Swimming Pool",
  "Gym",
  "Security",
  "Balcony",
  "Air Conditioning",
  "Heating",
  "Furnished",
  "Pet Friendly",
  "Elevator",
  "Wheelchair Access",
  "Fireplace",
];

export const PropertyEditor = ({ propertyData = null, isEdit = false }) => {
  const [form, setForm] = useState(propertyData || DEFAULT_FORM);
  const [currentMode, setCurrentMode] = useState("editing");
  const [errors, setErrors] = useState({});
  const [featuredImage, setFeaturedImage] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState(
    propertyData?.amenities || []
  );
  const fileInputRef = useRef(null);
  const featuredImageRef = useRef(null);

  // Set form data if editing an existing property
  useEffect(() => {
    if (propertyData) {
      setForm(propertyData);
      if (propertyData.amenities) {
        setSelectedAmenities(propertyData.amenities);
      }
      // In a real app, you would also set featuredImage and mediaFiles from propertyData
    }
  }, [propertyData]);

  // Reset dependent fields when category changes
  useEffect(() => {
    if (form.category === "plot") {
      setForm((prev) => ({
        ...prev,
        bedrooms: "",
        bathrooms: "",
        floors: "",
        acres: "",
      }));
    } else if (form.category === "house") {
      setForm((prev) => ({ ...prev, acres: "", ankanam: "" }));
    } else if (form.category === "apartment") {
      setForm((prev) => ({ ...prev, acres: "", ankanam: "", floors: "" }));
    } else if (form.category === "land") {
      setForm((prev) => ({
        ...prev,
        bedrooms: "",
        bathrooms: "",
        floors: "",
        sqft: "",
      }));
    }
  }, [form.category]);

  // Toggle editor mode between preview and editing
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

  // Handle amenity selection
  const toggleAmenity = (amenity) => {
    const updatedAmenities = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter((a) => a !== amenity)
      : [...selectedAmenities, amenity];

    setSelectedAmenities(updatedAmenities);
    setForm((prev) => ({ ...prev, amenities: updatedAmenities }));
  };

  // Calculate ankanam when sqft changes
  const handleSqftChange = (value) => {
    const sqftValue = parseFloat(value) || 0;
    const ankanamValue = (sqftValue / 36).toFixed(2);
    setForm((prev) => ({ ...prev, sqft: value, ankanam: ankanamValue }));
  };

  // Calculate sqft when ankanam changes
  const handleAnkanamChange = (value) => {
    const ankanamValue = parseFloat(value) || 0;
    const sqftValue = (ankanamValue * 36).toFixed(2);
    setForm((prev) => ({ ...prev, ankanam: value, sqft: sqftValue }));
  };

  const processMediaFiles = useCallback((files) => {
    return files.map((file) => ({
      file,
      type: file.type.startsWith("image/") ? "image" : "video",
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
      isFeatured: false,
    }));
  }, []);

  const handleFeaturedImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 5MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    const processed = processMediaFiles([file])[0];
    setFeaturedImage(processed);
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check file sizes and types
    const oversizedFiles = files.filter((file) => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error("Some files are too large. Maximum size is 10MB per file.");
      return;
    }

    const invalidFiles = files.filter(
      (file) =>
        !file.type.startsWith("image/") && !file.type.startsWith("video/")
    );

    if (invalidFiles.length > 0) {
      toast.error("Please select only image or video files.");
      return;
    }

    const newMedia = processMediaFiles(files);
    setMediaFiles([...mediaFiles, ...newMedia]);
  };

  const removeMedia = (id) => {
    if (featuredImage && featuredImage.id === id) {
      setFeaturedImage(null);
    } else {
      setMediaFiles(mediaFiles.filter((item) => item.id !== id));
    }
  };

  const setAsFeatured = (media) => {
    setFeaturedImage(media);
    // Remove from mediaFiles if it's there
    setMediaFiles(mediaFiles.filter((item) => item.id !== media.id));
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
    if (!validateRequired(form.contactName))
      newErrors.contactName = "Contact name is required";
    if (!validateRequired(form.contactEmail))
      newErrors.contactEmail = "Contact email is required";
    if (!validateRequired(form.contactPhone))
      newErrors.contactPhone = "Contact phone is required";

    // Format validation
    if (form.contactEmail && !validateEmail(form.contactEmail))
      newErrors.contactEmail = "Please enter a valid email address";
    if (form.contactPhone && !validatePhone(form.contactPhone))
      newErrors.contactPhone = "Please enter a valid phone number";

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

    // Featured image validation
    if (!featuredImage) {
      newErrors.featuredImage = "Featured image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors before saving.");
      return;
    }

    setIsSaving(true);

    try {
      // In a real application, you would upload files to a server first
      // then submit the form data with the file references

      const formData = {
        ...form,
        featuredImage: featuredImage.file,
        mediaFiles: mediaFiles.map((m) => m.file),
        // In a real app, you'd have uploaded these to storage and stored URLs
      };

      console.log("Property Data:", formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success(
        isEdit
          ? "Property updated successfully!"
          : "Property created successfully!"
      );

      // In a real app, you would redirect or reset the form
      if (!isEdit) {
        setForm(DEFAULT_FORM);
        setFeaturedImage(null);
        setMediaFiles([]);
        setSelectedAmenities([]);
      }
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error("Failed to save property. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerFeaturedInput = () => {
    featuredImageRef.current?.click();
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
  const MediaPreview = ({
    media,
    onRemove,
    onSetFeatured,
    className,
    isFeatured = false,
  }) => (
    <div className={`relative ${className} w-full group aspect-square`}>
      {media.type === "image" ? (
        <img
          src={media.url}
          alt="Property media"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <video
          src={media.url}
          className="w-full h-full object-cover rounded-lg"
        />
      )}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg" />

      <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {media.type === "image" && !isFeatured && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={() => onSetFeatured(media)}
                className="bg-blue-500 text-white p-1 rounded-full"
              >
                <Star className="h-3 w-3 lg:h-4 lg:w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Set as featured</TooltipContent>
          </Tooltip>
        )}
        <button
          type="button"
          onClick={() => onRemove(media.id)}
          className="bg-red-500 text-white p-1 rounded-full"
        >
          <X className="h-3 w-3 lg:h-4 lg:w-4" />
        </button>
      </div>

      {isFeatured && (
        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full flex items-center">
          <Star className="h-3 w-3 mr-1" /> Featured
        </div>
      )}

      <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
        {media.type === "image" ? (
          <ImageIcon className="h-3 w-3 inline mr-1" />
        ) : (
          <VideoIcon className="h-3 w-3 inline mr-1" />
        )}
        {media.type}
      </div>
    </div>
  );

  // Upload area component
  const UploadArea = ({ onClick, title, description, supportsText }) => (
    <div
      className="border-2 border-dashed border-gray-300 rounded-lg p-6 lg:p-8 text-center cursor-pointer hover:border-blue-400 transition-colors"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-2 lg:gap-3">
        <Upload className="h-8 w-8 lg:h-10 lg:w-10 text-gray-400" />
        <h3 className="text-base lg:text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <p className="text-xs text-gray-400 mt-1">{supportsText}</p>
      </div>
    </div>
  );

  // Input with icon component
  const InputWithIcon = ({ icon: Icon, error, ...props }) => (
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        {...props}
        className={`py-2 px-4 pl-10 rounded ${
          error ? "border-red-500 focus:ring-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );

  // Render category-specific fields
  const renderCategoryFields = () => {
    switch (form.category) {
      case "plot":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Square Feet (Sqft)
              </Label>
              <InputWithIcon
                icon={Square}
                type="number"
                placeholder="Square feet"
                value={form.sqft}
                min={0}
                onChange={(e) => handleSqftChange(e.target.value)}
                error={errors.sqft}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Ankanam (1 Ankanam = 36 Sqft)
              </Label>
              <InputWithIcon
                icon={Ruler}
                type="number"
                placeholder="Ankanam"
                value={form.ankanam}
                min={0}
                step="0.01"
                onChange={(e) => handleAnkanamChange(e.target.value)}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Price (₹)
              </Label>
              <InputWithIcon
                icon={DollarSign}
                type="number"
                placeholder="Enter price"
                value={form.price}
                min={0}
                onChange={(e) => handleChange("price", e.target.value)}
                error={errors.price}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Area
              </Label>
              <InputWithIcon
                icon={Ruler}
                type="text"
                placeholder="Area details"
                value={form.area}
                onChange={(e) => handleChange("area", e.target.value)}
              />
            </div>
          </div>
        );

      case "house":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Bedrooms
              </Label>
              <InputWithIcon
                icon={BedDouble}
                type="number"
                placeholder="Number of bedrooms"
                value={form.bedrooms}
                min={0}
                onChange={(e) => handleChange("bedrooms", e.target.value)}
                error={errors.bedrooms}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Bathrooms
              </Label>
              <InputWithIcon
                icon={Bath}
                type="number"
                placeholder="Number of bathrooms"
                value={form.bathrooms}
                min={0}
                onChange={(e) => handleChange("bathrooms", e.target.value)}
                error={errors.bathrooms}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Floors
              </Label>
              <InputWithIcon
                icon={Layers}
                type="number"
                placeholder="Number of floors"
                value={form.floors}
                min={0}
                onChange={(e) => handleChange("floors", e.target.value)}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Square Feet (Sqft)
              </Label>
              <InputWithIcon
                icon={Square}
                type="number"
                placeholder="Total square feet"
                value={form.sqft}
                min={0}
                onChange={(e) => handleChange("sqft", e.target.value)}
                error={errors.sqft}
              />
            </div>
          </div>
        );

      case "apartment":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Price (₹)
              </Label>
              <InputWithIcon
                icon={DollarSign}
                type="number"
                placeholder="Enter price"
                value={form.price}
                min={0}
                onChange={(e) => handleChange("price", e.target.value)}
                error={errors.price}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Square Feet (Sqft)
              </Label>
              <InputWithIcon
                icon={Square}
                type="number"
                placeholder="Total square feet"
                value={form.sqft}
                min={0}
                onChange={(e) => handleChange("sqft", e.target.value)}
                error={errors.sqft}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Area
              </Label>
              <InputWithIcon
                icon={Ruler}
                type="text"
                placeholder="Area details"
                value={form.area}
                onChange={(e) => handleChange("area", e.target.value)}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Bedrooms
              </Label>
              <InputWithIcon
                icon={BedDouble}
                type="number"
                placeholder="Number of bedrooms"
                value={form.bedrooms}
                min={0}
                onChange={(e) => handleChange("bedrooms", e.target.value)}
                error={errors.bedrooms}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Bathrooms
              </Label>
              <InputWithIcon
                icon={Bath}
                type="number"
                placeholder="Number of bathrooms"
                value={form.bathrooms}
                min={0}
                onChange={(e) => handleChange("bathrooms", e.target.value)}
                error={errors.bathrooms}
              />
            </div>
          </div>
        );

      case "land":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Price (₹)
              </Label>
              <InputWithIcon
                icon={DollarSign}
                type="number"
                placeholder="Enter price"
                value={form.price}
                min={0}
                onChange={(e) => handleChange("price", e.target.value)}
                error={errors.price}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Area
              </Label>
              <InputWithIcon
                icon={Ruler}
                type="text"
                placeholder="Area details"
                value={form.area}
                onChange={(e) => handleChange("area", e.target.value)}
              />
            </div>
            <div>
              <Label className="block mb-2 font-medium text-gray-700">
                Acres
              </Label>
              <InputWithIcon
                icon={LandPlot}
                type="number"
                placeholder="Size in acres"
                value={form.acres}
                min={0}
                step="0.01"
                onChange={(e) => handleChange("acres", e.target.value)}
              />
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
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between md:hidden">
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
              {isEdit ? "Edit Property" : "Add Property"}
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
            <TooltipContent side="bottom" arrow>
              {currentMode === "preview" ? "Edit" : "Preview"}
            </TooltipContent>
          </Tooltip>
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            size="sm"
            className="gap-1 bg-blue-600 cursor-pointer hover:bg-blue-700"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            <span className="sr-only sm:not-sr-only">
              {isSaving ? "Saving..." : "Save"}
            </span>
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="bg-white border-b sticky border-gray-200 px-6 py-4 items-center justify-between hidden md:flex">
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
              {isEdit ? "Edit Property" : "Add Property"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEdit
                ? "Update property details"
                : "Create a new property listing"}
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
            <TooltipContent side="bottom" arrow>
              {currentMode === "preview" ? "Edit" : "Preview"}
            </TooltipContent>
          </Tooltip>

          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="gap-2 bg-blue-600 cursor-pointer hover:bg-blue-700"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                <span>{isEdit ? "Update Property" : "Save Property"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-4 md:p-6 gap-4 md:gap-6">
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
          fixed md:sticky top-16 left-0 h-full w-80 bg-white z-50 shadow-xl md:shadow-none
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

            <div className="space-y-4">
              {/* Status Card */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted py-3 px-4">
                  <CardTitle className="text-lg">Status</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
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
                      <p>
                        Created:{" "}
                        {propertyData?.createdAt
                          ? new Date(
                              propertyData.createdAt
                            ).toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </p>
                      {propertyData?.updatedAt && (
                        <p>
                          Updated:{" "}
                          {new Date(
                            propertyData.updatedAt
                          ).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organization Card */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted py-3 px-4">
                  <CardTitle className="text-lg">Organization</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700">
                        Property Type
                      </Label>
                      <Select
                        value={form.category}
                        onValueChange={(val) => handleChange("category", val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
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

              <Card className="overflow-hidden">
                <CardHeader className="bg-muted py-3 px-4">
                  <CardTitle className="text-lg">Additional Details</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <Calendar22
                    value={form.yearBuilt}
                    onSelectDate={(value) => handleChange("yearBuilt", value)}
                    error={errors.yearBuilt}
                  />
                </CardContent>
              </Card>

              {/* Contact Information Card */}
              <Card className="overflow-hidden">
                <CardHeader className="bg-muted py-3 px-4">
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                      Contact Name *
                    </Label>
                    <Input
                      placeholder="John Doe"
                      value={form.contactName}
                      onChange={(e) =>
                        handleChange("contactName", e.target.value)
                      }
                      className={errors.contactName ? "border-red-500" : ""}
                    />
                    {errors.contactName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.contactName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                      Contact Email *
                    </Label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={form.contactEmail}
                      onChange={(e) =>
                        handleChange("contactEmail", e.target.value)
                      }
                      className={errors.contactEmail ? "border-red-500" : ""}
                    />
                    {errors.contactEmail && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.contactEmail}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                      Contact Phone *
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+91 1234567890"
                      value={form.contactPhone}
                      onChange={(e) =>
                        handleChange("contactPhone", e.target.value)
                      }
                      className={errors.contactPhone ? "border-red-500" : ""}
                    />
                    {errors.contactPhone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.contactPhone}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {currentMode === "editing" ? (
          <div className="flex-1 space-y-6">
            {/* Media Upload Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted py-4 px-6">
                <CardTitle className="text-lg">Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div>
                  <input
                    type="file"
                    ref={featuredImageRef}
                    onChange={handleFeaturedImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {!featuredImage ? (
                    <UploadArea
                      onClick={triggerFeaturedInput}
                      title="Add featured image"
                      description="Drag and drop or click to upload"
                      supportsText="Supports JPG, PNG files (max 5MB)"
                    />
                  ) : (
                    <MediaPreview
                      media={featuredImage}
                      className="max-h-96"
                      onRemove={removeMedia}
                      isFeatured={true}
                    />
                  )}
                  {errors.featuredImage && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.featuredImage}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Property Details Card */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-muted py-4 px-6">
                <CardTitle className="text-lg">Property Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                      Title *
                    </Label>
                    <Input
                      placeholder="e.g. Spacious 3BHK Apartment with Mountain View"
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      className={errors.title ? "border-red-500" : ""}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.title}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                      Description *
                    </Label>
                    <Textarea
                      placeholder="Describe the property features, amenities, and unique selling points..."
                      value={form.description}
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      className={`min-h-32 ${
                        errors.description ? "border-red-500" : ""
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="font-semibold block mb-2 text-gray-700">
                      Media
                    </Label>
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleMediaUpload}
                        accept="image/*,video/*"
                        multiple
                        className="hidden"
                      />

                      {mediaFiles.length === 0 ? (
                        <UploadArea
                          onClick={triggerFileInput}
                          title="Add media"
                          description="Drag and drop or click to upload"
                          supportsText="Supports JPG, PNG, and MP4 files (max 10MB each)"
                        />
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {mediaFiles.map((media) => (
                            <MediaPreview
                              key={media.id}
                              media={media}
                              onRemove={removeMedia}
                              onSetFeatured={setAsFeatured}
                              className="h-auto"
                            />
                          ))}
                          <div
                            className="border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center cursor-pointer hover:border-blue-400 transition-colors aspect-square"
                            onClick={triggerFileInput}
                          >
                            <div className="text-center p-4">
                              <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Add more</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                      Location *
                    </Label>
                    <InputWithIcon
                      icon={MapPin}
                      placeholder="City / Address"
                      value={form.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      error={errors.location}
                    />
                  </div>

                  <div>
                    <Label className="block mb-2 font-medium text-gray-700">
                      Category *
                    </Label>
                    <Select
                      value={form.category}
                      onValueChange={(val) => handleChange("category", val)}
                    >
                      <SelectTrigger
                        className={errors.category ? "border-red-500" : ""}
                      >
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
                </div>

                {/* Category-specific fields */}
                {form.category && (
                  <div className="pt-6 border-t border-gray-200">
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

                {/* Amenities Section */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-medium mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {AMENITIES_LIST.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={`amenity-${amenity}`}
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={`amenity-${amenity}`}
                          className="text-sm font-medium text-gray-700"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <PropertiesPreviewPage
            form={form}
            featuredImage={featuredImage}
            mediaFiles={mediaFiles}
            amenities={selectedAmenities}
          />
        )}
      </div>
    </div>
  );
};
