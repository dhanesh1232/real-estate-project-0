import HomePage from "@/components/pages/home/__page";
import { metadataForPath } from "@/lib/client/seo";

export async function metadata() {
  return metadataForPath("/", {
    title: "LuxEstate | Find Your Dream Home & Premium Properties",
    description:
      "Discover luxury villas, modern apartments, affordable plots, and prime commercial real estate with LuxEstate. Verified listings, trusted developers, and personalized solutions for all your property needs.",
    keywords: [
      "luxury real estate",
      "buy property",
      "sell property",
      "affordable plots",
      "luxury villas",
      "premium apartments",
      "commercial real estate",
      "residential properties",
      "property listings",
      "real estate services",
      "property investment",
      "house hunting",
      "luxestate properties",
      "trusted builders",
      "dream home",
    ],
    openGraph: {
      images: [
        {
          url: "/og-home.jpg",
          width: 1200,
          height: 630,
          alt: "LuxEstate – Real Estate Solutions",
        },
      ],
      type: "website",
      siteName: "LuxEstate",
      title: "LuxEstate | Luxury Villas, Apartments & Real Estate Listings",
      description:
        "Explore luxury homes, affordable plots, premium apartments, and commercial real estate with LuxEstate. Curated listings and trusted property solutions.",
    },
    twitter: {
      card: "summary_large_image",
      title: "LuxEstate | Premium Real Estate & Property Listings",
      description:
        "Find luxury villas, modern apartments, and affordable plots with LuxEstate. Your trusted partner in premium real estate solutions.",
      images: ["/og-home.jpg"],
      creator: "@luxestate",
    },
  });
}

export default function Page() {
  return <HomePage />;
}
