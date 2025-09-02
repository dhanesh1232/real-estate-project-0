// models/Property.js
const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {},
  { _id: false, strict: false } // disables strict mode for this subdocument
);

const locationSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    pincode: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: Number,
      lng: Number,
    },
  },
  { _id: false }
);

const seoMetaSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keywords: [String],
    ogImage: String,
  },
  { _id: false }
);

const propertySchema = new mongoose.Schema(
  {
    // Basic Information
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    // Category & Type
    category: {
      type: String,
      required: true,
      enum: ["apartment", "house", "plot", "land", "villa", "commercial"],
    },
    propertyType: {
      type: String,
      enum: ["residential", "commercial", "industrial", "agricultural"],
      default: "residential",
    },
    propertyStatus: {
      type: String,
      enum: ["For Sale", "For Rent", "Sold", "Rented"],
      default: "For Sale",
    },

    // Pricing
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    pricePerSqft: {
      type: Number,
      min: 0,
    },

    // Dimensions
    bedrooms: {
      type: Number,
      min: 0,
      default: 0,
    },
    bathrooms: {
      type: Number,
      min: 0,
      default: 0,
    },
    balconies: {
      type: Number,
      min: 0,
      default: 0,
    },
    sqft: {
      type: Number,
      min: 0,
    },
    acres: {
      type: Number,
      min: 0,
    },
    ankanam: {
      type: Number,
      min: 0,
    },
    floors: {
      type: Number,
      min: 0,
    },
    floor: {
      type: Number,
      min: 0,
    },
    totalFloors: {
      type: Number,
      min: 0,
    },

    // Additional Details
    yearBuilt: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },
    facing: {
      type: String,
      enum: [
        "north",
        "south",
        "east",
        "west",
        "north-east",
        "north-west",
        "south-east",
        "south-west",
      ],
      lowercase: true,
    },
    furnishing: {
      type: String,
      enum: ["furnished", "semi-furnished", "unfurnished"],
      lowercase: true,
    },
    nearbyLandmark: String,

    // Amenities
    parking: {
      type: Boolean,
      default: false,
    },
    lift: {
      type: Boolean,
      default: false,
    },
    waterSupply: {
      type: String,
      enum: ["municipal", "borewell", "tank", "both"],
      lowercase: true,
    },
    powerBackup: {
      type: Boolean,
      default: false,
    },
    security: {
      type: Boolean,
      default: false,
    },
    amenities: [
      {
        type: String,
      },
    ],

    // Media
    featuredImage: mediaSchema,
    mediaFiles: [mediaSchema],

    // Location
    location: locationSchema,

    // SEO
    seoMeta: seoMetaSchema,

    // Status
    visual: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    // Timestamps
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },

    // Views and engagement
    views: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
propertySchema.index({ category: 1, propertyStatus: 1 });
propertySchema.index({ "location.city": 1 });
propertySchema.index({ price: 1 });
propertySchema.index({ createdAt: -1 });

// Pre-save middleware to update timestamps
propertySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for like count
propertySchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

// Method to check if property is available
propertySchema.methods.isAvailable = function () {
  return (
    this.propertyStatus === "For Sale" || this.propertyStatus === "For Rent"
  );
};

export const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);
