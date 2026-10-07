"use client";
import { useEffect } from "react";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import CursorRing from "@/app/components/CursorRing";
import LoadingScreen from "@/app/components/LoadingScreen";
import { CommandPaletteProvider } from "@/app/components/CommandPalette";

const SPOT_TARGETS = ".flat-card, .plate, .liquid-card, .liquid-card-hover";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  // Feeds the card spotlight: hand the pointer position to the card under it.
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(SPOT_TARGETS);
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <Navbar />
        <ScrollBar />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <CursorRing />
        <LoadingScreen />
      </div>
    </CommandPaletteProvider>
  );
}
