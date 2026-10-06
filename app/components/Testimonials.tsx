import { testimonials } from "@/app/lib/testimonials";
import { siteConfig } from "@/app/lib/site";

export default function Testimonials() {
  if (testimonials.length === 0) {
    const subject = encodeURIComponent("Referee request for Brian Kareithi");
    return (
      <div className="mt-16">
        <div className="flat-card flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <div className="max-w-xl">
            <p className="field-label mb-2">Referees</p>
            <p className="font-serif-accent text-xl leading-snug sm:text-2xl" style={{ color: "var(--color-text-primary)" }}>
              People I&apos;ve worked with are happy to vouch for me.
            </p>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
              I haven&apos;t put their quotes on this page yet, so for now you&apos;ll have to take my word for it. The work is public, and referees are available on request.
            </p>
          </div>
          <a href={`mailto:${siteConfig.email}?subject=${subject}`} className="btn-neon btn-neon-ghost flex-shrink-0 justify-center">
            Request referees
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <p className="field-label mb-6">What people I&apos;ve worked with say</p>
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure key={t.name} className="flat-card flex flex-col justify-between gap-6 p-6 sm:p-7">
            <blockquote className="font-serif-accent text-xl leading-snug sm:text-2xl" style={{ color: "var(--color-text-primary)" }}>
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption>
              <p className="text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>{t.name}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>{t.title}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
