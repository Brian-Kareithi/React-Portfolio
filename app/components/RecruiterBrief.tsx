import Link from "next/link";
import { ArrowUpRight, Briefcase, Clock, FileDown, MapPin, MessagesSquare } from "lucide-react";
import { brief } from "@/app/lib/brief";

/** A scannable summary for hiring managers: role fit, availability, and three evidence links. */
export default function RecruiterBrief() {
  return (
    <section aria-labelledby="brief-heading" className="mt-16">
      <div className="ink-slab px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <p className="field-label mb-2 flex items-center gap-2">
              <MessagesSquare className="h-3.5 w-3.5 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
              Hiring brief
            </p>
            <h2 id="brief-heading" className="display-xl text-3xl sm:text-4xl">
              The 20-second version
            </h2>
          </div>
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-live)" }} />
            {brief.start}
          </span>
        </div>

        <p className="mb-8 max-w-2xl text-base leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {brief.headline}
        </p>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="field-label mb-3 flex items-center gap-2">
              <Briefcase className="h-3.5 w-3.5" style={{ color: "var(--color-accent)" }} />
              Roles I fit
            </p>
            <ul className="mb-6 flex flex-wrap gap-1.5">
              {brief.roles.map((role) => (
                <li
                  key={role}
                  className="rounded-md border px-2.5 py-1 text-xs"
                  style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}
                >
                  {role}
                </li>
              ))}
            </ul>

            <dl className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                <div>
                  <dt className="text-xs" style={{ color: "var(--color-text-muted)" }}>Availability</dt>
                  <dd style={{ color: "var(--color-text-primary)" }}>{brief.availability}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--color-accent)" }} />
                <div>
                  <dt className="text-xs" style={{ color: "var(--color-text-muted)" }}>Location</dt>
                  <dd style={{ color: "var(--color-text-primary)" }}>{brief.location}</dd>
                  <dd className="text-xs" style={{ color: "var(--color-text-muted)" }}>{brief.overlap}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="lg:col-span-8">
            <p className="field-label mb-3">Three things I&rsquo;ve shipped</p>
            <ol>
              {brief.wins.map((win, i) => (
                <li key={win.title}>
                  <Link
                    href={win.href}
                    className="group grid grid-cols-[auto_1fr] items-start gap-4 border-t py-4"
                    style={{ borderColor: "var(--hairline)", borderBottomWidth: i === brief.wins.length - 1 ? 1 : 0 }}
                  >
                    <span className="font-mono text-xs" style={{ color: "var(--color-accent)" }}>0{i + 1}</span>
                    <span>
                      <span className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
                        {win.title}
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: "var(--color-accent)" }} />
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                        {win.line}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={brief.contact.resume} className="btn-neon btn-neon-primary">
            <FileDown className="h-4 w-4" />
            Download my resume
          </Link>
          <Link href={brief.contact.message} className="btn-neon btn-neon-ghost">
            Start a conversation
          </Link>
        </div>
      </div>
    </section>
  );
}
