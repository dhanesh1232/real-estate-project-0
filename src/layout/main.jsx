"use client";
import { useEffect, useState } from "react";
import BackToTop from "@/components/Layout/back-to-top";
import Footer from "@/components/Layout/footer";
import Header from "@/components/Layout/header";
import FloatButton from "@/components/Layout/whatsapp-float";
import PulseLoader from "@/components/Layout/loader";

export default function MainLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1s or until DOM is ready
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PulseLoader />;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <FloatButton />
      <BackToTop />
    </>
  );
}
