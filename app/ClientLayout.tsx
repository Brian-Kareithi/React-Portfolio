"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import Cursor from "@/app/components/Cursor";
import LoadingScreen from "@/app/components/LoadingScreen";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { CommandPaletteProvider } from "@/app/components/CommandPalette";

const INITIAL_LOAD_MS = 2100;
const ROUTE_LOAD_MS = 900;
const EXIT_FADE_MS = 500;
const REDUCED_LOAD_MS = 400;

function prefersReducedMotion() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/hobbies";
  const [showLoader, setShowLoader] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const isFirstMount = useRef(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const playLoader = useCallback((visibleMs: number) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setShowLoader(true);
    setIsExiting(false);
    document.body.style.overflow = "hidden";
    timers.current.push(
      setTimeout(() => setIsExiting(true), visibleMs),
      setTimeout(() => {
        setShowLoader(false);
        document.body.style.overflow = "";
      }, visibleMs + EXIT_FADE_MS)
    );
  }, []);

  // Initial page load: let the Lottie loop play once before revealing.
  // State updates live inside timeout callbacks (subscriptions), keeping
  // the effect body to DOM sync + timer setup only.
  useEffect(() => {
    const initialMs = prefersReducedMotion() ? REDUCED_LOAD_MS : INITIAL_LOAD_MS;
    const fadeMs = prefersReducedMotion() ? 0 : EXIT_FADE_MS;
    document.body.style.overflow = "hidden";
    const exitTimer = setTimeout(() => setIsExiting(true), initialMs);
    const doneTimer = setTimeout(() => {
      setShowLoader(false);
      document.body.style.overflow = "";
    }, initialMs + fadeMs);
    timers.current = [exitTimer, doneTimer];
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  // Route transitions: brief branded beat on every navigation.
  // Deferred via timeout so setState runs in a callback, not the effect body.
  // Skipped for reduced-motion users to keep navigation instant.
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    if (prefersReducedMotion()) return;
    const kickoff = setTimeout(() => playLoader(ROUTE_LOAD_MS), 0);
    return () => clearTimeout(kickoff);
  }, [pathname, playLoader]);

  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <Cursor />
        {showLoader && <LoadingScreen isExiting={isExiting} />}
        <div className="flex min-h-screen flex-col overflow-x-clip">
          {!hideNavbar && <Navbar />}
          <ScrollBar />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </div>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
