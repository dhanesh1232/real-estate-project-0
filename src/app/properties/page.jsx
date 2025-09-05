import PropertyListingsPage from "@/components/pages/properties/__page";
import { metadataForPath } from "@/lib/client/seo";

export async function metadata() {
  return metadataForPath("/properties", {
    title: "Properties for Sale & Rent | LuxEstate Real Estate",
    description:
      "Browse LuxEstate’s curated property listings – luxury villas, premium apartments, affordable plots, and commercial real estate. Use advanced filters and search to find your perfect property today.",
    keywords: [
      "properties for sale",
      "properties for rent",
      "luxury villas",
      "apartments for sale",
      "houses for sale",
      "affordable plots",
      "commercial real estate",
      "residential properties",
      "property search",
      "real estate listings",
      "buy property",
      "rent property",
      "luxestate properties",
      "property marketplace",
      "dream home listings",
    ],
    openGraph: {
      images: [
        {
          url: "/og-properties.jpg",
          width: 1200,
          height: 630,
          alt: "LuxEstate – Browse Properties for Sale & Rent",
        },
      ],
      type: "website",
      siteName: "LuxEstate",
      title: "Properties for Sale & Rent | LuxEstate",
      description:
        "Find your dream home with LuxEstate. Explore luxury villas, modern apartments, affordable plots, and commercial properties with powerful search & filters.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Browse Properties | LuxEstate Real Estate",
      description:
        "Search and filter properties with LuxEstate – luxury homes, plots, apartments, and commercial listings all in one place.",
      images: ["/og-properties.jpg"],
      creator: "@luxestate",
    },
  });
}

export default function Page() {
  return <PropertyListingsPage />;
}
