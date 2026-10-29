"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";

const AUTO_DISMISS_MS = 5000;

/** Success toast portalled to <body>. Dismisses itself after a few seconds. */
export function Toast({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, AUTO_DISMISS_MS);
    return () => window.clearTimeout(timer);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <div role="status" aria-live="polite" className="toast-pop c-toast" data-open={open}>
      {open && (
        <>
          <Check aria-hidden="true" />
          <span>{children}</span>
          <button onClick={onClose} aria-label="Dismiss">
            &times;
          </button>
        </>
      )}
    </div>,
    document.body,
  );
}
