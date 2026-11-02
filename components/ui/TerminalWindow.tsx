"use client";

import { useState, type ReactNode } from "react";
import { cx } from "@/lib/cx";

type Move = "close" | "min" | "zoom";

/**
 * Dark window chrome with traffic-light dots and a title, used for terminal-style panels.
 * The dots only pretend to work: close shakes its head, minimise folds the window and zoom gives it a little pulse.
 */
export function TerminalWindow({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  const [folded, setFolded] = useState(false);
  const [move, setMove] = useState<Move | null>(null);

  const dots: { id: Move; label: string }[] = [
    { id: "close", label: "Close window" },
    { id: "min", label: folded ? "Unfold window" : "Fold window" },
    { id: "zoom", label: "Zoom window" },
  ];

  const press = (id: Move) => {
    if (id === "min") setFolded((f) => !f);
    else if (folded) setFolded(false);
    setMove(null);
    // Restart the animation even when the same dot is pressed twice in a row.
    requestAnimationFrame(() => setMove(id));
  };

  return (
    <div className={cx("term-window ink-slab", className)} data-move={move ?? undefined} onAnimationEnd={() => setMove(null)}>
      <div className="term-window-bar">
        {dots.map((d) => (
          <button key={d.id} type="button" className="term-dot" data-dot={d.id} aria-label={d.label} onClick={() => press(d.id)} />
        ))}
        <span aria-hidden="true">{title}</span>
      </div>
      <div className="term-window-body" data-folded={folded || undefined} inert={folded}>
        <div>{children}</div>
      </div>
    </div>
  );
}
