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

const indexFor = (href: string) => routes.find((r) => r.path === href)?.index ?? ":";

export default function NextSection({
  title = "Keep exploring",
  description = "More about how I work and what I've built.",
  links,
}: NextSectionProps) {
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
        <ul className="lg:col-span-3">
          {links.map((link, i) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-center gap-4 border-t py-5 transition-colors duration-200"
                style={{ borderColor: "var(--color-border)", borderBottomWidth: i === links.length - 1 ? 1 : 0 }}
              >
                <span className="index-num w-7 flex-shrink-0">{indexFor(link.href)}</span>
                <span className="min-w-0 flex-1">
                  <span
                    className="block font-serif-accent text-2xl leading-tight transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {link.label}
                  </span>
                  <span className="line-clamp-2 block break-words text-xs" style={{ color: "var(--color-text-muted)" }}>
                    {link.description}
                  </span>
                </span>
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-on-accent)]"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-accent)" }}
                >
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:-rotate-45" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
