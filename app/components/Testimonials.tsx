import { ArrowUpRight } from "lucide-react";
import { testimonials } from "@/app/lib/testimonials";

export default function Testimonials({
  kicker = "References",
  title = "What people I've worked with say",
}: {
  kicker?: string;
  title?: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" aria-label="Testimonials" className="scroll-mt-24">
      <div className="q-section-head">
        <p className="q-eyebrow"><b>●</b> {kicker}</p>
        <h2 data-split className="q-h2">{title}</h2>
      </div>
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
