"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LoadingScreen from "@/app/components/LoadingScreen";
import CustomCursor from "@/app/components/CustomCursor";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <CustomCursor />
      {loading && <LoadingScreen />}
      <div className={`transition-opacity duration-500 ease-out ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Navbar />
        <ScrollBar />
        <main className="relative">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
