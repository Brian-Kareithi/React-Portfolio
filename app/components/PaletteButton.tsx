"use client";
import type { ReactNode } from "react";
import { useCommandPalette } from "@/app/components/CommandPalette";

export default function PaletteButton({ className, children }: { className?: string; children: ReactNode }) {
  const { open } = useCommandPalette();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
