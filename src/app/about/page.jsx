import { AboutPage } from "@/components/pages/about";
import { metadataForPath } from "@/lib/client/seo";

export async function metadata() {
  return metadataForPath("/about", {
    title: "About Us | LuxEstate Real Estate Experts",
    description:
      "Learn more about LuxEstate, a trusted name in luxury real estate. Our mission is to connect you with premium properties, luxury homes, and exclusive real estate opportunities with transparency and trust.",
    keywords: [
      "about LuxEstate",
      "luxestate real estate",
      "luxury property experts",
      "trusted real estate company",
      "premium property services",
      "luxury homes team",
      "real estate professionals",
      "luxury property consultants",
      "about our real estate company",
      "real estate expertise",
    ],
    openGraph: {
      images: [
        {
          url: "/og-about.jpg",
          width: 1200,
          height: 630,
          alt: "About LuxEstate – Trusted Real Estate Experts",
        },
      ],
      type: "website",
      siteName: "LuxEstate",
      title: "About Us | LuxEstate Real Estate Experts",
      description:
        "Discover the story behind LuxEstate. Dedicated to providing luxury homes, premium apartments, and trusted real estate services worldwide.",
    },
    twitter: {
      card: "summary_large_image",
      title: "About LuxEstate | Luxury Real Estate Experts",
      description:
        "Get to know LuxEstate – trusted professionals in luxury homes and premium property solutions.",
      images: ["/og-about.jpg"],
      creator: "@luxestate",
    },
  });
}

export default function Page() {
  return <AboutPage />;
}
