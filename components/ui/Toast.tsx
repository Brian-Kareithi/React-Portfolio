"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Check, TriangleAlert, X } from "lucide-react";

type ToastTone = "success" | "error";

interface ToastProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
  tone?: ToastTone;
}

/**
 * Toast portalled to <body>. A timer bar runs along its foot and closes it when it finishes;
 * hovering or focusing the toast pauses the bar, so a message never vanishes mid-read.
 * The last content is kept while it animates out.
 */
export function Toast({ open, onClose, title, children, tone = "success" }: ToastProps) {
  const [mounted, setMounted] = useState(false);
  // Hold on to what was shown so the exit animation still has content to animate.
  const [last, setLast] = useState({ title, children, tone });
  if (open && (last.title !== title || last.tone !== tone)) setLast({ title, children, tone });
  const shown = open ? { title, children, tone } : last;

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  const Icon = shown.tone === "error" ? TriangleAlert : Check;

  return createPortal(
    <div
      role={shown.tone === "error" ? "alert" : "status"}
      aria-live={shown.tone === "error" ? "assertive" : "polite"}
      className="toast-pop c-toast"
      data-open={open}
      data-tone={shown.tone}
      inert={!open}
    >
      <span className="c-toast-icon" aria-hidden="true">
        <Icon />
      </span>
      <div className="c-toast-copy">
        <p className="c-toast-title">{shown.title}</p>
        {shown.children && <p className="c-toast-body">{shown.children}</p>}
      </div>
      <button type="button" className="c-toast-close" onClick={onClose} aria-label="Dismiss notification">
        <X aria-hidden="true" />
      </button>
      {open && <span key={shown.title} className="c-toast-timer" aria-hidden="true" onAnimationEnd={onClose} />}
    </div>,
    document.body,
  );
}
