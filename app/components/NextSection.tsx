"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/app/lib/nav";

interface NextSectionLink {
  href: string;
  label: string;
  description: string;
}

interface NextSectionProps {
  title?: string;
  description?: string;
  links: NextSectionLink[];
}

const indexFor = (href: string) => routes.find((r) => r.path === href)?.index ?? ":";

export default function NextSection({
  title = "Keep exploring",
  description = "More about how I work and what I've built.",
  links,
}: NextSectionProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSeen(true);
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="ink-slab mt-16 xs:mt-20 sm:mt-24 px-6 py-10 xs:px-8 sm:px-12 sm:py-14">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="field-label mb-4 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            Continue
          </p>
          <h2 className="display-xl mb-3 text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
            {title}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {description}
          </p>
        </div>
        <ul ref={listRef} data-in={seen} className="next-list lg:col-span-3">
          {links.map((link, i) => (
            <li key={link.href} className="next-row" style={{ "--i": i } as CSSProperties}>
              <Link
                href={link.href}
                className="next-row-link group flex items-center gap-4 border-t py-5"
                style={{ borderColor: "var(--color-border)", borderBottomWidth: i === links.length - 1 ? 1 : 0 }}
              >
                <span className="index-num next-row-num w-7 flex-shrink-0">{indexFor(link.href)}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className="next-row-title block font-serif-accent text-2xl leading-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {link.label}
                  </span>
                  <span className="next-row-desc line-clamp-2 block break-words text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {link.description}
                  </span>
                </span>
                <span
                  className="next-row-arrow flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-accent)" }}
                >
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
