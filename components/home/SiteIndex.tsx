import { Command } from "lucide-react";
import { CommandPaletteButton } from "@/components/command-palette/CommandPaletteButton";
import { RouteList } from "@/components/ui/RouteList";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { pageRoutes } from "@/lib/navigation";

/** "Where to next": every page as a terminal listing, plus a shortcut into the command palette. */
export function SiteIndex() {
  return (
    <section aria-labelledby="index-title" className="h-index">
      <div className="q-wrap">
        <div className="h-index-head">
          <h2 id="index-title" data-split className="q-h2">
            Where to <em>next</em>
          </h2>
          <CommandPaletteButton className="q-nav-search">
            <Command className="h-3 w-3" aria-hidden="true" /> Ctrl K to jump
          </CommandPaletteButton>
        </div>

        <TerminalWindow title="~/kareithi.sys">
          <p className="term-prompt" aria-hidden="true">
            <b>$</b> ls ./site
          </p>
          <RouteList routes={pageRoutes} reveal />
        </TerminalWindow>
      </div>
    </section>
  );
}
