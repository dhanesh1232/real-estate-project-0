import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/layout/main";
import { MainProvider } from "@/context/main";
import Providers from "@/layout/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "LuxEstate | Luxury Real Estate & Premium Properties",
  description:
    "Explore luxury real estate, premium apartments, exclusive villas, and investment-ready properties. LuxEstate brings you curated high-end listings, trusted builders, and personalized real estate services.",
  keywords: [
    "luxury real estate",
    "premium properties",
    "high-end homes",
    "luxury apartments",
    "exclusive villas",
    "real estate investment",
    "exclusive listings",
    "luxury property market",
    "curated properties",
    "trusted real estate services",
  ],
  openGraph: {
    title: "LuxEstate | Luxury Real Estate & Premium Properties",
    description:
      "Discover exclusive luxury homes, villas, and premium real estate listings with LuxEstate. Your trusted gateway to prestigious properties worldwide.",
    url: "https://luxestate.ecodrix.com",
    siteName: "LuxEstate",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "LuxEstate – Luxury Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxEstate | Luxury Real Estate & Premium Properties",
    description:
      "Discover exclusive luxury homes, villas, and premium properties with LuxEstate. Curated listings, trusted realtors, and personalized solutions.",
    images: ["/og-image.jpg"],
    creator: "@luxestate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "real estate",
  applicationName: "LuxEstate",
  creator: "LuxEstate Team",
  publisher: "LuxEstate Realty Pvt. Ltd.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>
          <Providers>
            <MainLayout>
              {children}
              <Toaster />
            </MainLayout>
          </Providers>
        </MainProvider>
      </body>
    </html>
  );
}
