"use client";
import { useEffect, ViewTransition } from "react";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import SmoothScroll from "@/app/components/SmoothScroll";
import ScrollEffects from "@/app/components/ScrollEffects";
import CursorGlow from "@/app/components/CursorGlow";
import { CommandPaletteProvider } from "@/app/components/CommandPalette";

const SPOT_TARGETS = ".flat-card, .plate, .liquid-card, .liquid-card-hover";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
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

  useEffect(() => {
    console.log(
      "%cHey, you opened the console.%c There is a flag hidden on this site. The trail is short: crawlers are told where not to go. Start at /robots.txt",
      "font: 600 14px monospace; color: #f2f4f3; background: #49111c; padding: 2px 6px",
      "font: 12px monospace",
    );
  }, []);

  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <div id="top" tabIndex={-1} className="absolute top-0 h-0 w-0 outline-none" />
        <SmoothScroll />
        <ScrollEffects />
        <CursorGlow />
        <Navbar />
        <ScrollBar />
        <main className="relative flex-1">
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <Footer />
      </div>
    </CommandPaletteProvider>
  );
}
