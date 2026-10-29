"use client";

import { ViewTransition, type ReactNode } from "react";
import { CommandPaletteProvider } from "@/components/command-palette/CommandPaletteProvider";
import { ConsoleGreeting } from "@/components/effects/ConsoleGreeting";
import { CursorGlow } from "@/components/effects/CursorGlow";
import { HeadingReveal } from "@/components/effects/HeadingReveal";
import { MagneticButtons } from "@/components/effects/MagneticButtons";
import { SmoothScroll } from "@/components/effects/SmoothScroll";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

/** Everything around a page: header, footer, global effects and the command palette. */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CommandPaletteProvider>
      <div className="flex min-h-screen flex-col overflow-x-clip">
        <div id="top" tabIndex={-1} className="absolute top-0 h-0 w-0 outline-none" />
        <SmoothScroll />
        <HeadingReveal />
        <MagneticButtons />
        <CursorGlow />
        <ConsoleGreeting />
        <SiteHeader />
        <ScrollIndicator />
        <main className="relative flex-1">
          <Breadcrumbs />
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <SiteFooter />
      </div>
    </CommandPaletteProvider>
  );
}
