// Property categories with metadata
export const PROPERTY_CATEGORIES = [
  { value: "plot", label: "Plot", icon: "square" },
  { value: "house", label: "Individual House", icon: "home" },
  { value: "apartment", label: "Apartment", icon: "building" },
  { value: "land", label: "Land", icon: "landPlot" },
];

// Facing directions
export const FACING_OPTIONS = [
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
export const FURNISHING_OPTIONS = [
  { value: "unfurnished", label: "Unfurnished" },
  { value: "semi-furnished", label: "Semi-Furnished" },
  { value: "fully-furnished", label: "Fully Furnished" },
];

// Water supply options
export const WATER_SUPPLY_OPTIONS = [
  { value: "municipal", label: "Municipal" },
  { value: "borewell", label: "Borewell" },
  { value: "both", label: "Both" },
  { value: "other", label: "Other" },
];

export const PROPERTY_VISUAL = [
  {
    value: "published",
    label: "Publish",
  },
  {
    value: "draft",
    label: "Draft",
  },
];
export const PROPERTY_STATUS = [
  "For Sale",
  "For Rent",
  "Sold",
  "Rented",
  "Upcoming",
  "Under Construction",
  "Ready to Move",
  "Off Market",
];

export const AMENITIES_BY_CATEGORY = {
  // Common amenities for all property types
  common: [
    { id: "parking", label: "Parking", icon: "car" },
    { id: "security", label: "24/7 Security", icon: "shield" },
    { id: "powerBackup", label: "Power Backup", icon: "battery" },
  ],

  // Plot-specific amenities
  plot: [
    { id: "fencing", label: "Boundary Fencing", icon: "square" },
    { id: "plot-gate", label: "Main Gate", icon: "square" },
    { id: "plot-road-access", label: "Road Access", icon: "square" },
  ],

  // House-specific amenities
  house: [
    { id: "garden", label: "Garden", icon: "trees" },
    { id: "compound-wall", label: "Compound Wall", icon: "square" },
    { id: "prayer-room", label: "Prayer Room", icon: "home" },
    { id: "servant-room", label: "Servant Room", icon: "home" },
    { id: "pooja-room", label: "Pooja Room", icon: "home" },
    { id: "study-room", label: "Study Room", icon: "home" },
  ],

  // Apartment-specific amenities
  apartment: [
    { id: "gym", label: "Gym", icon: "dumbbell" },
    { id: "swimming-pool", label: "Swimming Pool", icon: "waves" },
    { id: "clubhouse", label: "Clubhouse", icon: "club" },
    {
      id: "children-play-area",
      label: "Children's Play Area",
      icon: "palette",
    },
    { id: "lift", label: "Lift/Elevator", icon: "arrowUpDown" },
    { id: "community-hall", label: "Community Hall", icon: "building" },
    { id: "intercom", label: "Intercom Facility", icon: "square" },
  ],

  // Land-specific amenities
  land: [
    { id: "land-fencing", label: "Fencing", icon: "square" },
    { id: "land-road-access", label: "Road Access", icon: "square" },
    { id: "land-drainage", label: "Drainage System", icon: "square" },
  ],
};

export const DEFAULT_FORM = {
  title: "",
  description: "",
  category: "",
  price: "",
  pricePerSqft: "",
  propertyStatus: "For Sale",
  bedrooms: "",
  bathrooms: "",
  balconies: "",
  sqft: "",
  acres: "",
  ankanam: "",
  floors: "",
  floor: "",
  totalFloors: "",
  visual: "draft",
  propertyType: "residential",
  yearBuilt: "",
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

export const DEFAULT_SEO = {
  slug: "",
  title: "",
  description: "",
  keywords: [],
  ogImage: "",
};

export const DEFAULT_LOCATION = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
};
