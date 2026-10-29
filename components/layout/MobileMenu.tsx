"use client";

import { useEffect, useRef, type CSSProperties, type MouseEvent, type RefObject } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { externalLinkProps } from "@/lib/links";
import { externalLinks, routes } from "@/lib/navigation";

const DESKTOP_MIN_WIDTH = 1024;
const menuLinks = externalLinks.filter((l) => l.href !== "/llms.txt");

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (e: MouseEvent<HTMLAnchorElement>, path: string) => void;
  /** The header button that opens the menu: part of the focus trap, and where focus returns on close. */
  toggleRef: RefObject<HTMLButtonElement | null>;
}

/** Full-screen sheet with every page, for small screens. Traps focus while open. */
export function MobileMenu({ open, onClose, onNavigate, toggleRef }: MobileMenuProps) {
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      if (window.innerWidth >= DESKTOP_MIN_WIDTH) onClose();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const raf = requestAnimationFrame(() => sheetRef.current?.querySelector<HTMLElement>("a")?.focus());
      const trapFocus = (e: KeyboardEvent) => {
        if (e.key !== "Tab" || !sheetRef.current) return;
        const items = [toggleRef.current, ...sheetRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : i === items.length - 1 ? 0 : i + 1;
        e.preventDefault();
        items[next]?.focus();
      };
      window.addEventListener("keydown", trapFocus);
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("keydown", trapFocus);
      };
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      toggleRef.current?.focus();
    }
  }, [open, toggleRef]);

  return (
    <div id="mobile-menu" ref={sheetRef} className="m-sheet lg:hidden" data-open={open || undefined} aria-hidden={!open} inert={!open}>
      <div className="m-sheet-inner">
        <Eyebrow className="m-sheet-eyebrow">Menu</Eyebrow>
        <ul className="m-sheet-list">
          {routes.map((route, i) => {
            const isActive = route.path === pathname;
            return (
              <li key={route.path} style={{ "--i": i } as CSSProperties}>
                <Link href={route.path} onClick={(e) => onNavigate(e, route.path)} aria-current={isActive ? "page" : undefined} className="m-link">
                  <span className="m-link-num">{route.index}</span>
                  <span className="m-link-text">
                    <span className="m-link-label">{route.label}</span>
                    <span className="m-link-desc">{route.description}</span>
                  </span>
                  {isActive && <ArrowRight className="m-link-here" aria-hidden="true" />}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="m-sheet-foot" style={{ "--i": routes.length } as CSSProperties}>
          <p className="m-sheet-sign">Let&apos;s build something.</p>
          <div className="m-sheet-links">
            {menuLinks.map((link) => (
              <a key={link.label} href={link.href} {...externalLinkProps(link.href)} className="q-link">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
