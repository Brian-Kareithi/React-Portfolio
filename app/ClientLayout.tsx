"use client";
import { useState, useCallback } from "react";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LoadingScreen from "@/app/components/LoadingScreen";
import CustomCursor from "@/app/components/CustomCursor";
import DynamicBackground from "@/app/components/DynamicBackground";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <ThemeProvider>
      <DynamicBackground />
      <CustomCursor />
      {isLoading && <LoadingScreen onFinish={handleFinishLoading} />}

      <div className={`transition-opacity duration-700 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <Navbar />
        <ScrollBar />
      </div>

      <main className={`relative transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        {children}
      </main>

      <div className={`transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
