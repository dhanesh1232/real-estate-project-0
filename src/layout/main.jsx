"use client";
import { useEffect, useState } from "react";
import BackToTop from "@/components/Layout/back-to-top";
import Footer from "@/components/Layout/footer";
import Header from "@/components/Layout/header";
import FloatButton from "@/components/Layout/whatsapp-float";
import PulseLoader from "@/components/Layout/loader";
import { usePathname } from "next/navigation";
import { GoogleTap } from "@/components/Layout/google-auth";

const Wrap = ({ children }) => {
  const path = usePathname();

  if (path.startsWith("/auth") || path.startsWith("/admin")) {
    return children;
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
};

export default function MainLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PulseLoader />;
  }

  return (
    <>
      <Wrap>{children}</Wrap>
      {/*!session && status === "unauthenticated" && <GoogleTap />*/}
    </>
  );
}
