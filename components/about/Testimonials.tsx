import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/data/testimonials";

/** Quotes from clients and colleagues. Renders nothing until `data/testimonials.ts` has entries. */
export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" aria-label="Testimonials" className="q-section scroll-mt-24">
      <SectionHeading index="●" label="References" title="What people I've worked with say" />
      <div className="t-grid">
        {testimonials.map((t) => (
          <figure key={t.name} className="t-item">
            <blockquote className="t-quote">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="t-cap">
              <span className="t-name">
                {t.name}
                {t.href && (
                  <a href={t.href} className="q-link" style={{ minHeight: 0 }}>
                    Project <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </span>
              <span className="q-small">
                {t.title}
                {t.company && `, ${t.company}`}
                {t.relation && ` · ${t.relation}`}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
