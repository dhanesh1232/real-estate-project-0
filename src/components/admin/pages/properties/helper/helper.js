import { AMENITIES_BY_CATEGORY } from "./default_data";

// Validation utility functions
export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateNumber = (value, min = 0) => {
  const num = Number(value);
  return !isNaN(num) && num >= min;
};

export const getAmenitiesByCategory = (category) => {
  return [...(AMENITIES_BY_CATEGORY[category] || [])];
};

// Helper function to compare two objects for equality
export const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const convertUnderscoreSmall = (value) => {
  return value.replace(" ", "-").toLowerCase();
};
export const formatPrice = (price) => {
  if (!price) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};
