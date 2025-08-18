import { v4 as uuidv4 } from "uuid";
export const propertySlides = [
  {
    id: uuidv4(),
    title: "Luxury Plot",
    "sub-heading": "Premium Land",
    description:
      "Experience luxury living at its finest with our premium land plots. Nestled in prime locations, these carefully curated properties offer the perfect foundation for your dream home. Enjoy spectacular views, exclusive amenities, and a prestigious address that reflects your success.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Modern Apartment",
    "sub-heading": "Urban Living",
    description:
      "Discover contemporary urban living in our state-of-the-art apartments. Featuring sleek designs, smart home technology, and panoramic city views. Perfect for young professionals and families seeking a sophisticated lifestyle in the heart of the city.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Seaside Villa",
    "sub-heading": "Beachfront Property",
    description:
      "Wake up to breathtaking ocean views in this exclusive beachfront villa. Featuring private beach access, infinity pool, and Mediterranean-inspired architecture. The perfect blend of luxury and coastal living for those seeking an exceptional lifestyle.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Country Estate",
    "sub-heading": "Rural Retreat",
    description:
      "Escape to tranquility in this magnificent country estate. Set on acres of manicured grounds, this property offers a grand main residence, guest house, and extensive recreational facilities. Perfect for those seeking privacy and refined country living.",
    image:
      "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Penthouse Suite",
    "sub-heading": "Sky-High Luxury",
    description:
      "Experience unparalleled luxury in this stunning penthouse suite. Floor-to-ceiling windows showcase spectacular city views, while premium finishes and smart home features create the ultimate urban sanctuary. The epitome of sophisticated city living.",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Mountain Lodge",
    "sub-heading": "Alpine Retreat",
    description:
      "Find serenity in this exclusive mountain lodge. Combining rustic charm with modern luxury, this property offers panoramic mountain views, ski-in/ski-out access, and cozy fireplaces. Perfect for those seeking adventure and comfort in nature.",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2065&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Smart Home",
    "sub-heading": "Tech-Enabled Living",
    description:
      "Step into the future with this fully automated smart home. Featuring cutting-edge home automation, energy-efficient systems, and contemporary design. Perfect for tech enthusiasts who appreciate modern convenience and sustainable living.",
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Historic Mansion",
    "sub-heading": "Heritage Property",
    description:
      "Own a piece of history with this meticulously restored mansion. Featuring original architectural details, modern amenities, and formal gardens. A rare opportunity to own a landmark property that combines historic charm with contemporary comfort.",
    image:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Eco-Friendly Home",
    "sub-heading": "Sustainable Living",
    description:
      "Embrace sustainable living in this environmentally conscious home. Solar panels, rainwater harvesting, and energy-efficient design make this property perfect for environmentally conscious buyers seeking a reduced carbon footprint without compromising on comfort.",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2080&auto=format&fit=crop",
  },
  {
    id: uuidv4(),
    title: "Golf Estate",
    "sub-heading": "Resort Living",
    description:
      "Live the resort lifestyle in this exclusive golf estate. Overlooking manicured fairways, this property offers luxury amenities, including a private club membership, tennis courts, and spa facilities. Perfect for golf enthusiasts and luxury seekers.",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=2070&auto=format&fit=crop",
  },
];

export const dummyProperties = [
  {
    id: 1,
    title: "Luxury 3BHK Apartment with Ocean View",
    location: "Downtown, New York",
    price: 750000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Apartment",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Modern 2BHK Villa with Private Pool",
    location: "Beverly Hills, Los Angeles",
    price: 1200000,
    beds: 2,
    baths: 2,
    sqft: 2200,
    type: "Villa",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Spacious 4BHK House with Garden",
    location: "Suburbs, Chicago",
    price: 950000,
    beds: 4,
    baths: 3,
    sqft: 3200,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Premium Commercial Office Space",
    location: "Financial District, San Francisco",
    price: 2500000,
    beds: 0,
    baths: 2,
    sqft: 5000,
    type: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Beautiful Plot for Sale - Waterfront",
    location: "Outskirts, Austin",
    price: 350000,
    beds: 0,
    baths: 0,
    sqft: 10000,
    type: "Plot",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Cozy 1BHK Apartment - City Center",
    location: "Midtown, Miami",
    price: 450000,
    beds: 1,
    baths: 1,
    sqft: 850,
    type: "Apartment",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Luxury Penthouse with Panoramic Views",
    location: "Downtown, New York",
    price: 2800000,
    beds: 3,
    baths: 3.5,
    sqft: 3500,
    type: "Apartment",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Historic Townhouse - Fully Renovated",
    location: "Georgetown, Washington DC",
    price: 1850000,
    beds: 4,
    baths: 3.5,
    sqft: 3800,
    type: "House",
    image:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];
