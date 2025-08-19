import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Layout/header";
import Footer from "@/components/Layout/footer";
import FloatButton from "@/components/Layout/whatsapp-float";
import BackToTop from "@/components/Layout/back-to-top";

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
    "Discover exclusive luxury homes, premium properties, and high-end real estate listings. LuxEstate offers curated selections of prestigious properties, expert real estate services, and personalized property solutions.",
  keywords:
    "luxury real estate, premium properties, high-end homes, luxury apartments, exclusive listings, real estate investment, luxury property market",
  openGraph: {
    title: "LuxEstate | Luxury Real Estate & Premium Properties",
    description:
      "Discover exclusive luxury homes and premium properties with LuxEstate. Your gateway to prestigious real estate.",
    type: "website",
    locale: "en_US",
    siteName: "LuxEstate",
  },
  twitter: {
    card: "summary_large_image",
    title: "LuxEstate | Luxury Real Estate",
    description:
      "Discover exclusive luxury homes and premium properties with LuxEstate",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <FloatButton />
        <BackToTop />
      </body>
    </html>
  );
}
