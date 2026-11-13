import type { ReactNode } from "react";

/**
 * Animated show/hide for accordion rows: the content stays mounted and the row
 * eases its height open (grid rows 0fr → 1fr). Closed content is inert, so it is
 * skipped by the keyboard and assistive tech exactly as if it were not rendered.
 */
export function Disclosure({ open, children }: { open: boolean; children: ReactNode }) {
  return (
    <div className="disclose" data-open={open || undefined} inert={!open}>
      <div>{children}</div>
    </div>
  );
}
