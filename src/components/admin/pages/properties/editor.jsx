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
  bedrooms: "",
  bathrooms: "",
  area: "",
  yearBuilt: undefined,
  sqft: "",
  floors: "",
  acres: "",
  ankanam: "",
  propertyStatus: "draft",
  propertyType: "residential",
};

export const PropertyEditor = ({ propertyData }) => {
  const [form, setForm] = useState(propertyData || DEFAULT_FORM);
  const [currentMode, setCurrentMode] = useState("editing");
  const [errors, setErrors] = useState({});
  const [featuredImage, setFeaturedImage] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    }));
  }, []);

  useEffect(() => {
    console.log(form);
  });

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast("Validation Error");
      return;
    }

    setIsSaving(true);
    console.log("New Property:", { ...form, featuredImage, mediaFiles });

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast("Property Saved");
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

  // Input with icon component
  const InputWithIcon = ({ icon: Icon, error, value, onChange, ...props }) => (
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
      <div className="bg-white border-b sticky top-12 border-gray-200 px-4 py-3 flex items-center justify-between md:hidden">
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
              Add Property
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
      <div className="bg-white border-b sticky top-12 border-gray-200 px-2 py-4 items-center justify-between hidden md:flex">
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
              Add Property
            </h1>
            <p className="text-sm text-gray-500">
              Create a new property listing
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
            {/* Media Upload Card */}
            <Card className="overflow-hidden gap-0">
              <CardHeader className="bg-background py-2">
                <CardTitle className="text-base lg:text-lg">
                  Featured Image
                </CardTitle>
              </CardHeader>
              <CardContent className="py-1.5 px-3">
                <div>
                  {!featuredImage ? (
                    <ImagePickerModal
                      onSelect={(image) => setFeaturedImage(image)}
                    >
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
              </CardContent>
            </Card>

            {/* Property Details Card */}
            <Card className="overflow-hidden gap-1">
              <CardHeader className="bg-background py-1.5 lg:py-2.5">
                <CardTitle className="text-base lg:text-lg">
                  Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-2 lg:space-y-4">
                <div className="space-y-3">
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
                      className={`min-h-32 py-2 px-4 rounded ${
                        errors.description
                          ? "border-red-500 focus:ring-red-500"
                          : ""
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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
                        className={`py-2 px-4 rounded ${
                          errors.category
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
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
