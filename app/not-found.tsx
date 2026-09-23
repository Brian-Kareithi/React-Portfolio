import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Compass } from "lucide-react";
import { routes } from "@/app/lib/nav";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested does not exist on Brian Kareithi's portfolio. Return home or explore selected work, the tech stack, and contact options.",
  robots: { index: false, follow: false },
};

const popularPaths = ["/", "/about", "/projects", "/techstack", "/contact"];
const popularLinks = popularPaths
  .map((path) => routes.find((r) => r.path === path))
  .filter((r): r is NonNullable<typeof r> => Boolean(r));

export default function NotFound() {
  return (
    <section
      className="bg-field relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 py-24 sm:py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
      aria-labelledby="not-found-title"
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex w-full flex-col items-center">
          <p className="field-label mb-4 flex items-center gap-3">
            <span className="index-num">404</span>
            <span className="h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} />
            Error · Page not found
          </p>
          <p
            aria-hidden="true"
            className="display-xl text-[4.5rem] leading-none sm:text-8xl md:text-9xl"
            style={{ color: "var(--color-accent)" }}
          >
            404
          </p>
          <h1
            id="not-found-title"
            className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: "var(--color-text-primary)" }}
          >
            This route does not exist
          </h1>
          <div className="mx-auto my-5 h-px w-8" style={{ backgroundColor: "var(--color-accent)" }} />
          <p
            className="mx-auto max-w-md text-sm leading-relaxed sm:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            The link may be broken, the page may have moved, or the address was
            mistyped. Use the actions below to continue.
          </p>
        </div>

        <div className="flat-card w-full max-w-md overflow-hidden text-left">
          <div
            className="flex items-center gap-2 border-b px-4 py-2.5"
            style={{ borderColor: "var(--color-border)" }}
          >
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--color-border)" }} />
            <p className="ml-2 truncate font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
              brian@dev:~$ ./route.sh --status
            </p>
            <span className="ml-auto hidden font-mono text-[10px] sm:block" style={{ color: "var(--color-text-muted)" }}>
              exit 1
            </span>
          </div>
          <div className="flex items-center gap-3 px-4 py-3">
            <span
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: "var(--color-surface)", color: "var(--color-accent)" }}
            >
              <Compass className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="min-w-0 flex-1 truncate font-mono text-[11px]" style={{ color: "var(--color-text-secondary)" }}>
              error: route not found — no matching page
            </p>
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col gap-3 xs:flex-row xs:flex-wrap xs:justify-center">
          <Link href="/" className="btn-neon btn-neon-primary flex-1 justify-center xs:flex-none">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            Back to Home
          </Link>
          <Link href="/projects" className="btn-neon btn-neon-ghost flex-1 justify-center xs:flex-none">
            Browse work
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <Link href="/contact" className="btn-neon btn-neon-ghost flex-1 justify-center xs:flex-none">
            Start a project
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <nav className="mt-2 w-full max-w-md text-left" aria-label="Popular pages">
          <p className="field-label mb-3 text-center">Popular pages</p>
          <div className="border" style={{ borderColor: "var(--color-border)" }}>
            {popularLinks.map((link, i) => (
              <Link
                key={link.path}
                href={link.path}
                className={`group flex min-h-[44px] items-center justify-between gap-4 px-4 py-3 ${
                  i < popularLinks.length - 1 ? "border-b" : ""
                }`}
                style={{ borderColor: "var(--color-border)" }}
              >
                <span className="flex min-w-0 flex-1 items-baseline gap-3">
                  <span className="index-num flex-shrink-0">{link.index}</span>
                  <span
                    className="truncate text-sm font-medium transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {link.label}
                  </span>
                </span>
                <ArrowRight
                  className="h-3.5 w-3.5 flex-shrink-0 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                  style={{ color: "var(--color-accent)" }}
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </nav>

        <p className="font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
          brian@dev:~$ error: route not found — exit 1
        </p>
      </div>
    </section>
  );
}
