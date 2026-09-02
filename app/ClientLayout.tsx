"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/app/components/NavBar";
import ScrollBar from "@/app/components/ScrollBar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/components/ThemeProvider";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/hobbies";

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        {!hideNavbar && <Navbar />}
        <ScrollBar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}