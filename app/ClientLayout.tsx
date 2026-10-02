"use client";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { CommandPaletteProvider } from "@/app/components/CommandPalette";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <Navbar />
        <ScrollBar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </div>
    </CommandPaletteProvider>
  );
}
