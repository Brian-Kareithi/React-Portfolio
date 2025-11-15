"use client";

import { useEffect, useState } from "react";
import DynamicBackground from "./components/DynamicBackground";
import Navbar from "./components/NavBar";
import ScrollBar from "./components/ScrollBar";
import LoadingScreen from "./components/loadingscreen";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body className="relative text-black overflow-x-hidden">
        {isLoading && <LoadingScreen />}
        <DynamicBackground />
        
        <div className={`transition-opacity duration-600 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <Navbar />
          <ScrollBar />
        </div>

        <main className={`relative z-10 transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </main>
      </body>
    </html>
  );
}