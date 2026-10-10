import { ArrowUpRight } from "lucide-react";
import { testimonials } from "@/app/lib/testimonials";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function Testimonials({
  kicker = "References",
  title = "What people I've worked with say",
}: {
  kicker?: string;
  title?: string;
}) {
  // Nothing to show until there are real quotes.
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" aria-label="Testimonials" className="mt-16 scroll-mt-24">
      <div className="mb-6">
        <p className="field-label mb-2 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
          {kicker}
        </p>
        <h2 className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="flat-card flex flex-col justify-between gap-6 p-6 sm:p-7">
            <blockquote className="font-serif-accent text-xl leading-snug sm:text-2xl" style={{ color: "var(--color-text-primary)" }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 border-t pt-5" style={{ borderColor: "var(--color-border)" }}>
              <span
                aria-hidden="true"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold"
                style={{ backgroundColor: "var(--color-highlight)", color: "var(--color-accent)" }}
              >
                {initials(t.name)}
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                  {t.name}
                  {t.href && (
                    <a href={t.href} className="link-underline inline-flex items-center gap-0.5 text-xs font-medium" style={{ color: "var(--color-accent)" }}>
                      Project
                      <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                    </a>
                  )}
                </span>
                <span className="block text-xs" style={{ color: "var(--color-text-muted)" }}>
                  {t.title}
                  {t.company && `, ${t.company}`}
                </span>
              </span>
              {t.relation && <span className="pill ml-auto !py-0.5 !text-[10px]">{t.relation}</span>}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
