"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export default function NextSection({
  title = "Keep exploring",
  description = "More about how I work and what I've built.",
  links,
}: NextSectionProps) {
  return (
    <section className="mt-16 xs:mt-20 sm:mt-24 pt-8 xs:pt-10 border-t" style={{ borderColor: "var(--color-border)" }}>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-2 flex items-center gap-2"
            style={{ color: "var(--color-text-muted)" }}>
            <span className="w-4 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
            Continue
          </p>
          <h3 className="text-lg xs:text-xl font-bold tracking-tight mb-2" style={{ color: "var(--color-text-primary)" }}>
            {title}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {description}
          </p>
        </div>
        <div className="lg:col-span-3 grid gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl transition-colors duration-200"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div className="min-w-0">
                <span className="block text-sm font-semibold group-hover:text-[var(--color-accent)] transition-colors duration-200"
                  style={{ color: "var(--color-text-primary)" }}>
                  {link.label}
                </span>
                <span className="block text-[11px] truncate" style={{ color: "var(--color-text-muted)" }}>
                  {link.description}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                style={{ color: "var(--color-accent)" }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}