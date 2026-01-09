"use client";

import { useEffect, useState } from "react";

import DynamicBackground from "./components/DynamicBackground";
import Navbar from "./components/NavBar";
import ScrollBar from "./components/ScrollBar";
import LoadingScreen from "./components/LoadingScreen";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <div
        className={`transition-opacity duration-600 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <DynamicBackground />
        <Navbar />
        <ScrollBar />
      </div>

      <main
        className={`relative z-10 transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </main>
    </>
  );
}
