import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Dark window chrome with traffic-light dots and a title, used for terminal-style panels. */
export function TerminalWindow({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={cx("term-window ink-slab", className)}>
      <div className="term-window-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}
