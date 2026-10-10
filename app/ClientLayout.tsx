"use client";
import { useEffect } from "react";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import CursorRing from "@/app/components/CursorRing";
import LoadingScreen from "@/app/components/LoadingScreen";
import FluidBackground from "@/app/components/FluidBackground";
import PerchedPerson from "@/app/components/PerchedPerson";
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

  // The first clue of the hidden flag. Console only, so it costs nothing for anyone who never opens it.
  useEffect(() => {
    console.log(
      "%cHey, you opened the console.%c There is a flag hidden on this site. The trail is short: crawlers are told where not to go. Start at /robots.txt",
      "font: 600 14px monospace; color: #14248a",
      "font: 12px monospace",
    );
  }, []);

  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <FluidBackground />
        <Navbar />
        <ScrollBar />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <CursorRing />
        <PerchedPerson />
        <LoadingScreen />
      </div>
    </CommandPaletteProvider>
  );
}
