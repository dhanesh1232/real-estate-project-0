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

export const ContactData = [
  {
    id: "phone",
    icon: "phone",
    tag: "Phone",
    label: "+91 9876543210",
    href: "tel:+919876543210",
    description: "Call us for immediate assistance",
  },
  {
    id: "whatsapp",
    icon: "whatsapp",
    tag: "Whatsapp",
    label: "+91 9876543210",
    href: "https://wa.me/919876543210",
    description: "Chat with us on WhatsApp",
  },
  {
    id: "mail",
    icon: "mail",
    tag: "Mail",
    label: "contact@ecodrixrealty.com",
    href: "mailto:contact@ecodrixrealty.com",
    description: "Email us your queries",
  },
  {
    id: "map",
    icon: "map",
    tag: "Location",
    label: "123 Business Hub, Tirupati Main Road",
    href: "https://maps.google.com/?q=Tirupati,Andhra+Pradesh",
    description: "Visit our office in Tirupati",
    address: {
      street: "123 Business Hub",
      area: "Tirupati Main Road",
      city: "Tirupati",
      state: "Andhra Pradesh",
      country: "India",
      pincode: "517501",
    },
  },
];

export const SocialData = [
  {
    id: "facebook",
    icon: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    color: "#1877F2", // Facebook blue
  },
  {
    id: "instagram",
    icon: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    color: "#E4405F", // Instagram gradient pink/purple
  },
  {
    id: "linkedIn",
    icon: "linkedIn",
    label: "LinkedIn",
    href: "https://linkedin.com",
    color: "#0A66C2", // LinkedIn blue
  },
  {
    id: "twitter",
    icon: "twitter",
    label: "Twitter",
    href: "https://twitter.com",
    color: "#1DA1F2", // Twitter blue
  },
];

export const NavLinks = [
  {
    id: "home",
    href: "/",
    icon: "home",
    label: "Home",
    description: "Return to homepage",
  },
  {
    id: "properties",
    href: "/properties",
    icon: "building",
    label: "Properties",
    description: "Browse available properties",
  },
  {
    id: "about",
    href: "/about",
    icon: "info",
    label: "About Us",
    description: "Learn more about our company",
  },
  {
    id: "contact",
    href: "/contact",
    icon: "headset",
    label: "Contact",
    description: "Get in touch with us",
  },
  // {
  //   id: "blog",
  //   href: "/blog",
  //   icon: "newspaper",
  //   label: "Blog",
  //   description: "Read our latest articles",
  // },
  // {
  //   id: "favorites",
  //   href: "/favorites",
  //   icon: "heart",
  //   label: "Favorites",
  //   description: "View your saved properties",
  // },
  // {
  //   id: "search",
  //   href: "/search",
  //   icon: "search",
  //   label: "Search",
  //   description: "Search properties",
  // },
];

export const AdminLinks = [
  {
    id: "dashboard",
    href: "/admin",
    label: "Dashboard",
    icon: "dashboard",
  },
  {
    id: "properties",
    label: "Properties",
    href: "/admin/properties",
    icon: "building",
  },
  // {
  //   id: "blogs",
  //   label: "Blog",
  //   href: "/admin/blogs",
  //   icon: "bookOpen",
  // },
  {
    id: "leads",
    label: "Leads",
    href: "/admin/leads",
    icon: "userPlus",
  },
  // {
  //   id: "media",
  //   label: "Files",
  //   href: "/admin/files",
  //   icon: "media",
  // },
  // {
  //   id: "contact",
  //   label: "Contact",
  //   href: "/admin/contacts",
  //   icon: "users",
  // },
  // {
  //   id: "guide",
  //   label: "Guide",
  //   href: "/admin/guide",
  //   icon: "newsPaper",
  // },
  { id: "public", href: "/", label: "Public Pages", icon: "return" },
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
    floor: 15,
    amenities: ["Gym", "Swimming Pool", "Concierge", "Underground Parking"],
    yearBuilt: 2018,
    description:
      "Experience upscale living in this modern 3BHK apartment offering breathtaking ocean views. Features include open-plan design, luxury finishes, and access to world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
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
    lotSize: "5000 sqft",
    garage: "2 Car Garage",
    pool: true,
    amenities: ["Home Theater", "Smart Home System", "Private Garden"],
    yearBuilt: 2020,
    description:
      "This luxurious villa offers contemporary living with a private pool, landscaped garden, and smart automation. Located in Beverly Hills' prime area, ideal for high-end buyers.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
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
    lotSize: "7500 sqft",
    garage: "2 Car Garage",
    backyard: true,
    basement: true,
    yearBuilt: 2010,
    description:
      "Perfect family home with a large backyard, finished basement, and modern kitchen. Situated in a quiet suburb with excellent schools nearby.",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=800&q=80",
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
    floor: 10,
    parkingSpaces: 8,
    conferenceRooms: 3,
    furnished: true,
    yearBuilt: 2015,
    description:
      "State-of-the-art office space with open floor plan, meeting rooms, and city skyline views. Ideal for startups or established companies.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
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
    zoning: "Residential",
    frontage: "80 ft",
    depth: "125 ft",
    utilities: ["Water", "Electricity"],
    description:
      "Waterfront 10,000 sqft residential plot with ready access to utilities. Build your dream home in a tranquil neighborhood just minutes from Austin city.",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80",
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
    floor: 8,
    amenities: ["Gym", "Rooftop Lounge", "Security"],
    yearBuilt: 2016,
    description:
      "Compact and stylish 1BHK apartment in the heart of Miami Midtown. Ideal for professionals who enjoy vibrant city life.",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
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
    floor: 32,
    amenities: ["Private Elevator", "Terrace", "Concierge", "Infinity Pool"],
    yearBuilt: 2021,
    description:
      "High-rise penthouse with 360-degree views of Manhattan. Featuring private elevator access, an expansive terrace, and luxury finishes.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
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
    lotSize: "6000 sqft",
    garage: "1 Car Garage",
    backyard: true,
    yearBuilt: 1890,
    renovated: 2018,
    description:
      "A fully renovated historic townhouse featuring exposed brick, gourmet kitchen, and modern upgrades. Located in Georgetown's most sought-after neighborhood.",
    image:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "Mountain View Cabin",
    location: "Aspen, Colorado",
    price: 980000,
    beds: 3,
    baths: 2,
    sqft: 2100,
    type: "Cabin",
    featured: true,
    lotSize: "8000 sqft",
    amenities: ["Fireplace", "Hot Tub", "Ski Storage", "Mountain Views"],
    yearBuilt: 2019,
    description:
      "Luxurious mountain cabin with stunning views of the Rockies. Perfect for ski enthusiasts with easy access to slopes and premium winter sports facilities.",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    title: "Waterfront Studio Loft",
    location: "Seattle, Washington",
    price: 550000,
    beds: 1,
    baths: 1,
    sqft: 950,
    type: "Apartment",
    floor: 12,
    amenities: ["Floor-to-ceiling Windows", "Modern Kitchen", "Bike Storage"],
    yearBuilt: 2017,
    description:
      "Modern studio loft with spectacular waterfront views. Industrial-chic design with high ceilings and premium finishes throughout.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    title: "Desert Oasis Villa",
    location: "Scottsdale, Arizona",
    price: 1750000,
    beds: 4,
    baths: 4,
    sqft: 4200,
    type: "Villa",
    featured: true,
    lotSize: "12000 sqft",
    pool: true,
    amenities: ["Infinity Pool", "Outdoor Kitchen", "Desert Landscaping"],
    yearBuilt: 2022,
    description:
      "Contemporary desert villa featuring stunning architecture, resort-style pool, and seamless indoor-outdoor living spaces with mountain views.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    title: "Urban Industrial Loft",
    location: "Brooklyn, New York",
    price: 1100000,
    beds: 2,
    baths: 2,
    sqft: 1600,
    type: "Loft",
    floor: 4,
    amenities: ["Exposed Brick", "High Ceilings", "Artist Studio Space"],
    yearBuilt: 1920,
    renovated: 2021,
    description:
      "Converted warehouse loft with authentic industrial features, modern updates, and flexible living space. Perfect for artists and creative professionals.",
    image:
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80",
  },
];

export const propertyType = [];
