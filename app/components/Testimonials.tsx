import { testimonials } from "@/app/lib/testimonials";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

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
