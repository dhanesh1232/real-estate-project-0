import ContactPage from "@/components/pages/contact";
import { metadataForPath } from "@/lib/client/seo";

export async function metadata() {
  return metadataForPath("/contact", {
    title: "Contact Us | LuxEstate Real Estate",
    description:
      "Get in touch with LuxEstate for inquiries about luxury homes, premium apartments, affordable plots, and commercial real estate. Our team is here to help you find the perfect property.",
    keywords: [
      "contact LuxEstate",
      "real estate inquiries",
      "luxury property contact",
      "real estate support",
      "buy property contact",
      "sell property contact",
      "luxestate customer service",
      "property consultation",
      "real estate agents contact",
      "luxury homes contact",
    ],
    openGraph: {
      images: [
        {
          url: "/og-contact.jpg",
          width: 1200,
          height: 630,
          alt: "Contact LuxEstate – Real Estate Experts",
        },
      ],
      type: "website",
      siteName: "LuxEstate",
      title: "Contact Us | LuxEstate Real Estate",
      description:
        "Reach out to LuxEstate for personalized assistance with buying, selling, or investing in premium real estate.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact LuxEstate | Real Estate Experts",
      description:
        "Get in touch with LuxEstate for all real estate inquiries – from luxury homes to premium properties and investments.",
      images: ["/og-contact.jpg"],
      creator: "@luxestate",
    },
  });
}

export default function Page() {
  return <ContactPage />;
}
