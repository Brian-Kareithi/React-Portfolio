"use client";
import { useEffect, useState, useCallback } from "react";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LoadingScreen from "@/app/components/LoadingScreen";
import { LiquidBackground } from "@/app/components/ui/LiquidBackground";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinishLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Brian Kareithi</title>
        <meta name="description" content="Brian Kareithi - Fullstack Developer & Cybersecurity Enthusiast" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>BK</text></svg>" />
      </head>
      <body className="relative overflow-x-hidden">
        <ThemeProvider>
          {isLoading && <LoadingScreen onFinish={handleFinishLoading} />}

          <div className={`transition-opacity duration-700 ${isLoading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
            <Navbar />
            <ScrollBar />
          </div>

          <main className={`relative transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}>
            <LiquidBackground />
            {children}
          </main>

          <div className={`transition-opacity duration-700 ${isLoading ? "opacity-0" : "opacity-100"}`}>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
