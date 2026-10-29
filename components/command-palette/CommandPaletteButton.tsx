"use client";

import type { ReactNode } from "react";
import { useCommandPalette } from "@/components/command-palette/CommandPaletteProvider";

/** Any button that opens the command palette, so server components can render one. */
export function CommandPaletteButton({ className, children }: { className?: string; children: ReactNode }) {
  const { open } = useCommandPalette();
  return (
    <button type="button" onClick={open} className={className}>
      {children}
    </button>
  );
}
