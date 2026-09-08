"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import Cursor from "@/app/components/Cursor";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { CommandPaletteProvider } from "@/app/components/CommandPalette";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/hobbies";

  return (
    <ThemeProvider>
      <CommandPaletteProvider>
        <Cursor />
        <div className="flex min-h-screen flex-col">
          {!hideNavbar && <Navbar />}
          <ScrollBar />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </div>
      </CommandPaletteProvider>
    </ThemeProvider>
  );
}
