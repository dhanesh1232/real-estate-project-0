import { Icons } from "@/components/icons";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUpDown,
  Bath,
  Battery,
  BedDouble,
  Building2,
  Car,
  DollarSign,
  Home,
  ImageIcon,
  IndianRupee,
  LandPlot,
  Layers,
  MapPin,
  Pen,
  Plus,
  Ruler,
  Shield,
  Square,
  Upload,
  VideoIcon,
} from "lucide-react";
import { Location } from "../location";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { formatPrice, getAmenitiesByCategory } from "./helper";
import {
  FACING_OPTIONS,
  FURNISHING_OPTIONS,
  PROPERTY_CATEGORIES,
  WATER_SUPPLY_OPTIONS,
} from "./default_data";
import { ImagePickerModal } from "../image-picker";
import { Button } from "@/components/ui/button";

// Checkbox component for amenities
export const AmenityCheckbox = ({ amenity, checked, onCheckedChange }) => {
  const IconComponent = Icons[amenity.icon];
  return (
    <div className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50 transition-colors">
      <Checkbox
        id={amenity.id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={amenity.id} className="flex items-center cursor-pointer">
        <IconComponent className="h-4 w-4 mr-2" />
        {amenity.label}
      </Label>
    </div>
  );
};

// Media preview component
export const MediaPreview = ({ media, onRemove, className }) => (
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
      <Icons.x className="h-3 w-3 lg:h-4 lg:w-4" />
    </button>
    <div className="absolute bottom-1 left-1 flex items-center justify-center lg:bottom-2 lg:left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 lg:px-2 lg:py-1 rounded">
      {media.mime?.startsWith("video") ? (
        <VideoIcon className="h-2.5 w-2.5 lg:h-3 lg:w-3 inline mr-1" />
      ) : (
        <ImageIcon className="h-2.5 w-2.5 lg:h-3 lg:w-3 inline mr-1" />
      )}
      <span className="capitalize">{media.type}</span>
    </div>
  </div>
);

export const InputWithLabel = ({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div>
      <Label className="block mb-2 font-medium text-gray-700">{label}</Label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        )}
        <Input
          value={value === undefined || value === null ? "" : value}
          onChange={onChange}
          placeholder={placeholder}
          className={`py-2 px-4 ${
            Icon && "pl-10"
          } rounded border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500`}
          {...props}
        />
      </div>
    </div>
  );
};

// Navigation tabs
export const RenderTabs = ({ activeTab, setActiveTab }) => (
  <div className="border-b border-gray-200">
    <div className="flex flex-wrap md:flex-nowrap overflow-x-auto scrollbar-hide">
      {["basic", "details", "amenities", "media"].map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActiveTab(tab)}
          className={`py-1.5 px-3 cursor-pointer md:px-4 font-medium text-xs md:text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
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
    </div>
  </div>
);

// Render content based on active tab
export const RenderTabContent = ({
  activeTab,
  form,
  errors,
  handleChange,
  getCategoryIcon,
  location,
  removeMedia,
  featuredImage,
  mediaFiles,
  handleAnkanamChange,
  handleSqftChange,
  handleAmenityChange,
  setLocationData,
  setFeaturedImage,
  setMediaFiles,
}) => {
  switch (activeTab) {
    case "basic":
      return (
        <div className="space-y-4">
          <InputWithLabel
            label="Title *"
            placeholder="e.g. Spacious 3BHK Apartment with Mountain View"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={`py-2 px-4 rounded ${
              errors.title ? "border-red-500 focus:ring-red-500" : ""
            }`}
          />

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            <InputWithLabel
              label="Price (₹)"
              icon={IndianRupee}
              type="number"
              placeholder="Enter price"
              value={!form.price ? "" : form.price}
              min={0}
              onChange={(e) => {
                const price = e.target.value;
                handleChange("price", price);
              }}
            />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label className="inline-flex items-center gap-2 font-medium text-2xl">
              <MapPin className="text-gray-400 text-xl" />
              <span>Location</span>
            </Label>
            <Location
              location={location}
              onValueChange={(key, value) =>
                setLocationData((prev) => ({ ...prev, [key]: value }))
              }
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
                  {PROPERTY_CATEGORIES.map((category) => {
                    const Icon = Icons[category.icon];
                    return (
                      <SelectItem key={category.value} value={category.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {category.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div>
              <InputWithLabel
                icon={Building2}
                label="Nearby Landmark"
                placeholder="e.g., Near Shree College"
                value={form.nearbyLandmark}
                onChange={(e) => handleChange("nearbyLandmark", e.target.value)}
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
              <RenderCategoryFields
                form={form}
                errors={errors}
                handleAnkanamChange={handleAnkanamChange}
                handleSqftChange={handleSqftChange}
                handleChange={handleChange}
              />
            </div>
          )}
        </div>
      );

    case "amenities":
      return (
        <RenderAmenitiesSection
          form={form}
          handleChange={handleChange}
          handleAmenityChange={handleAmenityChange}
        />
      );

    case "media":
      return (
        <div className="space-y-4">
          <div>
            <Label className="font-semibold block mb-2 text-gray-700">
              Featured Image
            </Label>
            {!featuredImage ? (
              <ImagePickerModal
                defaultMedia={featuredImage}
                onSelect={(image) => setFeaturedImage(image)}
                trigger={
                  <Button
                    type="button"
                    className="border-2 flex flex-col items-center text-gray-400 border-dashed h-56 w-full border-gray-300 rounded-lg p-6 lg:p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8 lg:h-12 lg:w-12" />
                    Select Featured Image
                  </Button>
                }
              />
            ) : (
              <div className="relative group">
                <MediaPreview
                  isFeatured
                  media={featuredImage}
                  className="max-h-72"
                  onRemove={removeMedia}
                />
                <div className="absolute z-10 opacity-0 group-hover:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity">
                  <ImagePickerModal
                    defaultMedia={featuredImage}
                    onSelect={(image) => setFeaturedImage(image)}
                    trigger={
                      <Button
                        type="button"
                        variant="secondary"
                        className="h-10 w-10 p-0 rounded-full cursor-pointer bg-white/90 hover:bg-white"
                        aria-label="Edit image"
                      >
                        <Pen className="h-4 w-4 text-gray-700" />
                      </Button>
                    }
                  />
                </div>
              </div>
            )}
          </div>

          <div>
            <Label className="font-semibold block mb-2 text-gray-700">
              Additional Media
            </Label>
            {mediaFiles.length === 0 ? (
              <ImagePickerModal
                defaultMedia={mediaFiles}
                onSelect={(images) => setMediaFiles([...images])}
                multiple
                trigger={
                  <Button
                    type="button"
                    className="border-2 flex flex-col text-gray-400 items-center border-dashed h-56 w-full border-gray-300 rounded-lg p-6 lg:p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                    variant="outline"
                  >
                    <Upload className="h-8 w-8 lg:h-12 lg:w-12" />
                    Add Media (Images/Videos)
                  </Button>
                }
              />
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
                  defaultMedia={mediaFiles}
                  onSelect={(images) => setMediaFiles([...images])}
                  multiple
                  trigger={
                    <Button
                      type="button"
                      className="border-2 flex flex-col text-gray-400 items-center border-dashed h-56 w-full border-gray-300 rounded-lg p-6 lg:p-12 text-center cursor-pointer hover:border-blue-400 transition-colors"
                      variant="outline"
                    >
                      <Plus className="h-8 w-8 lg:h-12 lg:w-12" />
                      Add more (Images/Videos)
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

// Render amenities section with dynamic options
const RenderAmenitiesSection = ({
  form,
  handleChange,
  handleAmenityChange,
}) => {
  const categoryAmenities = getAmenitiesByCategory(form.category);

  return (
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
          {categoryAmenities.map((amenity) => (
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
};

// Render category-specific fields
const RenderCategoryFields = ({
  form,
  errors,
  handleAnkanamChange,
  handleChange,
  handleSqftChange,
}) => {
  switch (form.category) {
    case "plot":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          <InputWithLabel
            label="Square Feet (Sqft)"
            icon={Square}
            type="number"
            placeholder="Total square feet e.g: 2500 sqft"
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
            placeholder="Total square feet e.g: 2500 sqft"
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
            placeholder="Total square feet e.g: 2500 sqft"
            value={form.sqft}
            min={0}
            onChange={(e) => handleChange("sqft", e.target.value)}
            error={errors.sqft}
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
            label=" Floor"
            icon={Layers}
            type="number"
            placeholder="floors"
            value={form.floor}
            min={0}
            onChange={(e) => handleChange("floor", e.target.value)}
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

export const LabelWithSelect = ({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  object = false,
}) => {
  return (
    <div>
      <Label className="block mb-2 font-medium text-gray-700">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((each, ind) => {
            return (
              <SelectItem
                value={object ? each.value : each}
                key={object ? each.value + ind : each + ind}
              >
                {object ? each.label : each}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
