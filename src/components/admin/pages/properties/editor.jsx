"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Home, Eye, Save, ArrowLeft, Menu, PenBox } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { PropertiesPreviewPage } from "./preview";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar22 } from "./date-picker";
import { Icons } from "@/components/icons";
import { isEqual, validateNumber, validateRequired } from "./helper/helper";
import {
  DEFAULT_LOCATION,
  DEFAULT_SEO,
  PROPERTY_CATEGORIES,
} from "./helper/default_data";
import { SeoContainer } from "./meta";
import { api_handles } from "@/lib/client/api_handles";
import { RenderTabContent, RenderTabs } from "./helper/compo";

export const PropertyEditor = ({ propertyData, locationData, seoData }) => {
  const [form, setForm] = useState(propertyData);
  const [isChange, setIsChange] = useState(false);
  const [seoMeta, setSeoMeta] = useState(seoData);
  const [location, setLocationData] = useState(locationData);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [mediaFiles, setMediaFiles] = useState([]);

  const [currentMode, setCurrentMode] = useState("editing");
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  useEffect(() => {
    const hasChanges =
      !isEqual(form, propertyData) ||
      !isEqual(seoMeta, propertyData?.seoMeta || {}) ||
      !isEqual(location, propertyData?.location || {}) ||
      !isEqual(featuredImage, propertyData?.featuredImage || null) ||
      !isEqual(mediaFiles, propertyData?.mediaFiles || []);

    setIsChange(hasChanges);
  }, [form, seoMeta, location, featuredImage, mediaFiles, propertyData]);

  useEffect(() => {
    if (propertyData) {
      setForm(propertyData);
      setSeoMeta(propertyData.seoMeta || DEFAULT_SEO);
      setLocationData(propertyData.location || DEFAULT_LOCATION);
      setFeaturedImage(propertyData.featuredImage || null);
      setMediaFiles(propertyData.mediaFiles || []);
    }
  }, [propertyData]);

  useEffect(() => {
    if (form.category === "plot" || form.category === "land") {
      setForm((prev) => ({
        ...prev,
        bedrooms: "",
        bathrooms: "",
        floors: "",
        totalFloors: "",
        balconies: "",
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

  // Auto-generate SEO Meta when property details change
  useEffect(() => {
    if (!form) return;
    const { title, description, category, price, bedrooms, bathrooms, sqft } =
      form;
    const { city, state } = location;

    // Auto slug (based on title + city)
    const slug = title
      ? `${title.toLowerCase().replace(/\s+/g, "-")}-${city.toLowerCase()}`
      : "";

    // Auto title
    const seoTitle = title
      ? `${title} for Sale in ${city || state || ""} | ${
          category || "Property"
        }`
      : "";

    // Auto description
    const seoDescription =
      description &&
      (description ||
        `${bedrooms ? bedrooms + " BHK " : ""}${
          category || "property"
        } available in ${city || state || "prime location"}. ${
          sqft ? sqft + " sqft " : ""
        } ${price ? "at ₹" + price : ""}.`);

    // Auto keywords
    const seoKeywords =
      seoMeta.keywords &&
      [
        title,
        category,
        city,
        state,
        `${bedrooms} bhk`,
        `${sqft} sqft`,
        price ? `${price} price` : null,
      ].filter(Boolean);

    setSeoMeta((prev) => {
      // Check if the user has manually edited any fields
      const hasManualSlug = prev.slug && prev.slug !== (prev.autoSlug || "");
      const hasManualTitle =
        prev.title && prev.title !== (prev.autoTitle || "");
      const hasManualDescription =
        prev.description && prev.description !== (prev.autoDescription || "");
      const hasManualKeywords =
        prev.keywords?.length &&
        !isEqual(prev.keywords, prev.autoKeywords || []);

      return {
        ...prev,
        // Store auto-generated values for comparison
        autoSlug: slug,
        autoTitle: seoTitle,
        autoDescription: seoDescription,
        autoKeywords: seoKeywords,
        autoOgImage: featuredImage?.url || "",

        // Only update if user hasn't manually edited
        slug: hasManualSlug ? prev.slug : slug,
        title: hasManualTitle ? prev.title : seoTitle,
        description: hasManualDescription ? prev.description : seoDescription,
        keywords: hasManualKeywords ? prev.keywords : seoKeywords,
        ogImage:
          prev.ogImage !== featuredImage?.url
            ? featuredImage?.url
            : prev.ogImage || "",
      };
    });
  }, [form, location, featuredImage]);

  const validateForm = () => {
    const newErrors = {};

    // Required fields validation
    if (!validateRequired(form.title)) newErrors.title = "Title is required";
    if (!validateRequired(form.description))
      newErrors.description = "Description is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the validation errors");
      return;
    }

    setIsSaving(true);
    try {
      const data = {
        ...form,
        featuredImage,
        mediaFiles,
        locationsData: location,
        seoMeta,
      };
      const res = await api_handles.AddNewProperty(data);
      if (res.status && !res.ok) {
        const value = await res.json();
        throw new Error(
          value.message || "Unable to add property please try again"
        );
      }

      setIsSaving(false);
    } catch (err) {
      setIsSaving(false);
      toast.error(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Get category icon based on selection
  const getCategoryIcon = () => {
    const category = PROPERTY_CATEGORIES.find((c) => c.value === form.category);
    const Icon = Icons[category.icon];
    return category ? (
      <Icon className="h-4 w-4 text-gray-400" />
    ) : (
      <Home className="h-4 w-4 text-gray-400" />
    );
  };

  return (
    <div className="min-h-full bg-background">
      {/* Mobile Header */}
      <div className="bg-white border-b sticky z-20 top-12 border-gray-200 px-4 py-3 flex items-center justify-between md:hidden">
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
            disabled={isSaving || isChange}
            size="sm"
            className="gap-1 bg-blue-600 cursor-pointer hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">Save</span>
          </Button>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="bg-white border-b z-20 sticky top-12 border-gray-200 px-2 py-4 items-center justify-between hidden md:flex">
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
            disabled={isSaving || isChange}
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
          fixed md:sticky top-0 md:top-34 left-0 h-full max-w-80 w-full md:w-auto md:min-w-56 bg-white z-50 md:z-0 shadow-xl md:shadow-none
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
                <CardContent className="px-2.5 pb-2">
                  <div className="space-y-2">
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700">
                        Property Status
                      </Label>
                      <Select
                        value={form.propertyStatus}
                        onValueChange={(val) =>
                          handleChange("propertyStatus", val)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROPERTY_STATUS.map((each, ind) => (
                            <SelectItem value={each.value} key={each.id + ind}>
                              {each.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="block mb-2 font-medium text-gray-700">
                        Visibility
                      </Label>
                      <Select
                        value={form.visual}
                        onValueChange={(val) => handleChange("visual", val)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Publish</SelectItem>
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
                <CardContent className="px-2.5 pb-2">
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
                          {PROPERTY_CATEGORIES.map((category) => {
                            const Icon = Icons[category.icon];
                            return (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {category.label}
                                </div>
                              </SelectItem>
                            );
                          })}
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
                <CardContent className="px-2.5 pb-2">
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
                <RenderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                <div className="p-4 lg:p-6">
                  <RenderTabContent
                    activeTab={activeTab}
                    form={form}
                    handleChange={handleChange}
                    errors={errors}
                    getCategoryIcon={getCategoryIcon}
                    removeMedia={removeMedia}
                    location={location}
                    featuredImage={featuredImage}
                    mediaFiles={mediaFiles}
                    handleAnkanamChange={handleAnkanamChange}
                    handleSqftChange={handleSqftChange}
                    handleAmenityChange={handleAmenityChange}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden gap-0 max-w-lg">
              <CardContent className="p-0">
                <SeoContainer
                  metadata={seoMeta}
                  onChangeMeta={(key, value) =>
                    setSeoMeta((prev) => ({ ...prev, [key]: value }))
                  }
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <PropertiesPreviewPage
            location={location}
            form={form}
            featuredImage={featuredImage}
            mediaFiles={mediaFiles}
          />
        )}
      </div>
    </div>
  );
};
