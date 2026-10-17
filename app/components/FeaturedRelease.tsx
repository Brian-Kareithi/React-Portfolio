import { ArrowDown, ArrowUpRight } from "lucide-react";
import FilmStrip from "@/app/components/FilmStrip";
import { currentProject as p } from "@/app/lib/current-project";

/** The current client build, on a full-bleed cobalt band, with its screens in a film strip. */
export default function FeaturedRelease() {
  return (
    <section id="now-building" aria-labelledby="now-building-title" className="band band-accent overflow-x-clip">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="field-label eyebrow mb-6" style={{ color: "var(--palette-sand)" }}>
              Now building · {p.kind}
            </p>
            <h2 id="now-building-title" className="display-xl title-xl">
              {p.title} <span className="font-serif-accent" style={{ color: "var(--palette-sand)" }}>{p.titleAccent}</span>
            </h2>
            <p className="measure mt-6 text-base leading-relaxed sm:text-lg" style={{ color: "var(--color-text-secondary)" }}>
              {p.summary}
            </p>
          </div>

          <div className="lg:col-span-5">
            <dl className="border-t" style={{ borderColor: "var(--hairline-strong)" }}>
              <div className="flex items-baseline justify-between gap-6 border-b py-3" style={{ borderColor: "var(--hairline-strong)" }}>
                <dt className="field-label" style={{ color: "var(--color-text-muted)" }}>Status</dt>
                <dd className="flex items-center gap-2 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--palette-sand)" }} />
                  {p.status}
                </dd>
              </div>
              {p.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 border-b py-3" style={{ borderColor: "var(--hairline-strong)" }}>
                  <dt className="field-label" style={{ color: "var(--color-text-muted)" }}>{f.label}</dt>
                  <dd className="text-right text-sm font-medium">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-primary justify-center">
                Try the live demo <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#proof" className="btn-neon btn-neon-ghost justify-center">
                Shipped work <ArrowDown className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-16">
        <FilmStrip frames={p.screens} label="Point of sale screens" />
      </div>
    </section>
  );
}
