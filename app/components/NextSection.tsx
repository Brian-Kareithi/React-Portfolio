"use client";
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

const indexFor = (href: string) => routes.find((r) => r.path === href)?.index ?? "—";

export default function NextSection({
  title = "Keep exploring",
  description = "More about how I work and what I've built.",
  links,
}: NextSectionProps) {
  return (
    <section
      className="mt-16 xs:mt-20 sm:mt-24 border-t pt-8 xs:pt-10"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="field-label mb-3 flex items-center gap-2">
            <span className="h-px w-4" style={{ backgroundColor: "var(--color-accent)" }} />
            Continue
          </p>
          <h2 className="mb-2 text-lg xs:text-xl font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
            {title}
          </h2>
          <p className="text-xs leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            {description}
          </p>
        </div>
        <ul className="lg:col-span-3">
          {links.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center gap-4 border-t py-4 transition-colors duration-200"
                style={{ borderColor: "var(--color-border)", borderBottomWidth: i === links.length - 1 ? 1 : 0 }}
              >
                <span className="index-num w-6 flex-shrink-0">{indexFor(link.href)}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block text-sm font-semibold transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {link.label}
                  </span>
                  <span className="block truncate text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                    {link.description}
                  </span>
                </span>
                <ArrowRight
                  className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  style={{ color: "var(--color-accent)" }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
