"use client";
import { useState, useCallback } from "react";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import LoadingScreen from "@/app/components/LoadingScreen";
import CustomCursor from "@/app/components/CustomCursor";
import SciFiSplash from "@/app/components/SciFiSplash";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"splash" | "loading" | "curtain" | "ready">("splash");
  const [showLoading, setShowLoading] = useState(false);
  const [curtainOpen, setCurtainOpen] = useState(false);

  const handleSplashComplete = useCallback(() => {
    setShowLoading(true);
    setTimeout(() => setPhase("loading"), 50);
  }, []);

  const handleFinishLoading = useCallback(() => {
    setShowLoading(false);
    setPhase("curtain");
    setTimeout(() => setCurtainOpen(true), 20);
    setTimeout(() => {
      setPhase("ready");
      setCurtainOpen(false);
    }, 750);
  }, []);

  const showMain = phase === "curtain" || phase === "ready";

  return (
    <ThemeProvider>
      <CustomCursor />
      {phase === "splash" && <SciFiSplash onBegin={handleSplashComplete} />}
      {showLoading && <LoadingScreen onFinish={handleFinishLoading} />}

      {/* Curtain reveal — page splits from the middle and pushes outward */}
      {phase === "curtain" && (
        <div className="fixed inset-0 z-[101]">
          <div
            className="absolute top-0 left-0 h-full"
            style={{
              width: "50%",
              backgroundColor: "var(--color-bg-primary)",
              transform: curtainOpen ? "translateX(-100%)" : "translateX(0%)",
              transition: "transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
          <div
            className="absolute top-0 right-0 h-full"
            style={{
              width: "50%",
              backgroundColor: "var(--color-bg-primary)",
              transform: curtainOpen ? "translateX(100%)" : "translateX(0%)",
              transition: "transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          />
        </div>
      )}

      <div className={`transition-opacity duration-500 ease-out ${showMain ? "opacity-100" : "opacity-0"}`}>
        <Navbar />
        <ScrollBar />
      </div>

      <main className={`relative transition-opacity duration-500 ease-out ${showMain ? "opacity-100" : "opacity-0"}`}>
        {children}
      </main>

      <div className={`transition-opacity duration-500 ease-out ${showMain ? "opacity-100" : "opacity-0"}`}>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
