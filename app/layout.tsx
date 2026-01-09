"use client";

import { useEffect, useState } from "react";
import DynamicBackground from "./components/DynamicBackground";

import Navbar from "./components/NavBar";
import ScrollBar from "./components/ScrollBar";
import LoadingScreen from "./components/LoadingScreen";

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
      <head>
        <title>Brian Kareithi</title>
        <meta name="description" content="Brian Kareithi - Fullstack Dev & Cybersecurity Enthusiast" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>BK</text></svg>" />
      </head>
      <body className="relative text-white overflow-x-hidden bg-gradient-to-b from-black to-blue-900">
        <LoadingScreen isLoading={isLoading} />
        
        <div className={`transition-opacity duration-600 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
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