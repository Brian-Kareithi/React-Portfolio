"use client";

import { useEffect, useState } from "react";
import DynamicBackground from "./components/DynamicBackground";
import Navbar from "./components/NavBar";
import ScrollBar from "./components/ScrollBar";
import "./globals.css";

// LoadingScreen component defined in the same file
const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative">

        {/* Inner spinning dot */}
        <div className="absolute inset-0 m-auto w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Brian Kareithi</title>
        <meta name="description" content="Brian Kareithi - Fullstack Developer & Cybersecurity Enthusiast" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>BK</text></svg>" />
      </head>
      <body className="relative text-white overflow-x-hidden bg-black">
        <LoadingScreen isLoading={isLoading} />
        
        <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <DynamicBackground />
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