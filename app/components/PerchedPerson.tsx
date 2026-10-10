"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Lottie from "lottie-react";
import sittingPerson from "@/app/lib/sitting-person.json";
import useMediaQuery from "@/app/components/ui/useMediaQuery";

const CANDIDATES = "main .flat-card, main .plate, main .ink-slab, main .liquid-card";
const SETTLE_MS = 1600;
const MIN_WIDTH = 240;

interface Perch {
  host: HTMLElement;
  /** Horizontal position along the edge, as a percentage of the container's width. */
  left: number;
}

/**
 * The sitting person from the contact card, dropped onto the top edge of one random container on
 * each page. It is picked after the page's entrance animations settle, and only from containers
 * that do not clip their overflow, otherwise the legs would be cut off. The contact page already
 * seats him on purpose, so that route is skipped.
 */
export default function PerchedPerson() {
  const pathname = usePathname();
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [perch, setPerch] = useState<Perch | null>(null);

  useEffect(() => {
    if (pathname === "/contact") return;
    let restore: (() => void) | undefined;

    const timer = window.setTimeout(() => {
      const hosts = Array.from(document.querySelectorAll<HTMLElement>(CANDIDATES)).filter((el) => {
        const cs = getComputedStyle(el);
        return el.offsetWidth >= MIN_WIDTH && cs.overflow === "visible" && el.getBoundingClientRect().top > 60;
      });
      if (!hosts.length) return;

      const host = hosts[Math.floor(Math.random() * hosts.length)];
      // The person is absolutely positioned against the container, so it must be a containing block.
      if (getComputedStyle(host).position === "static") {
        host.style.position = "relative";
        restore = () => (host.style.position = "");
      }
      setPerch({ host, left: 8 + Math.random() * 70 });
    }, SETTLE_MS);

    return () => {
      window.clearTimeout(timer);
      restore?.();
      setPerch(null);
    };
  }, [pathname]);

  if (!perch) return null;
  return createPortal(
    <div
      className="pointer-events-none absolute z-10 h-[70px] w-[52px]"
      style={{ top: -44, left: `${perch.left}%` }}
      aria-hidden="true"
    >
      <Lottie animationData={sittingPerson} loop={!reduce} autoplay={!reduce} rendererSettings={{ preserveAspectRatio: "xMidYMax meet" }} />
    </div>,
    perch.host,
  );
}
