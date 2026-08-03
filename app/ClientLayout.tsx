"use client";
import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const hideNavbar = pathname === "/hobbies";

  const handleLoadingFinish = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      {loading && <LoadingScreen onFinish={handleLoadingFinish} />}
      <div className={`transition-opacity duration-500 ease-out ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {!hideNavbar && <Navbar />}
        <ScrollBar />
        <main className="relative">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
