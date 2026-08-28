"use client";
import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const pathname = usePathname();
  const hideNavbar = pathname === "/hobbies";

  useEffect(() => {
    let hasSeen = false;
    try {
      hasSeen = window.sessionStorage.getItem("loader-seen") === "1";
    } catch {
      /* storage unavailable */
    }
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setLoading(!hasSeen);
    setShowLoader(!hasSeen);
  }, []);

  const handleLoadingFinish = useCallback(() => {
    try {
      window.sessionStorage.setItem("loader-seen", "1");
    } catch {
      /* storage unavailable */
    }
    setLoading(false);
  }, []);

  return (
    <ThemeProvider>
      {showLoader && loading && <LoadingScreen onFinish={handleLoadingFinish} />}
      <div className={`transition-opacity duration-500 ease-out ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        {!hideNavbar && <Navbar />}
        <ScrollBar />
        <main className="relative">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
