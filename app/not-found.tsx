import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { routes } from "@/app/lib/nav";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested does not exist on Brian Kareithi's portfolio. Return home or explore selected work, the tech stack, and contact options.",
  robots: { index: false, follow: false },
};

const popularPaths = ["/", "/about", "/how-i-work", "/projects", "/contact", "/homelab"];
const popularLinks = popularPaths
  .map((path) => routes.find((r) => r.path === path))
  .filter((r): r is NonNullable<typeof r> => Boolean(r));

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="not-found-title">
      <div className="q-wrap nf-grid">
        <div>
          <p className="q-eyebrow"><b>404</b> Route not found</p>
          <p className="nf-number" aria-hidden="true">404</p>
          <h1 id="not-found-title" className="q-h2">
            This page <em>does not exist</em>
          </h1>
          <p className="q-lede" style={{ marginTop: "1.25rem" }}>
            The link may be broken, the page may have moved, or the address was mistyped.
          </p>
          <div className="nf-actions">
            <Link href="/" className="q-btn" data-solid>
              Back home
              <ArrowRight aria-hidden="true" />
            </Link>
            <Link href="/projects" className="q-link">
              Browse the work <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="term-window ink-slab nf-term">
          <div className="term-window-bar" aria-hidden="true"><i /><i /><i /><span>~/kareithi.sys</span></div>
          <p className="term-prompt" aria-hidden="true"><b>$</b> cd {"<where?>"} <span className="nf-err">no such route</span></p>
          <nav aria-label="Popular pages">
            <ul>
              {popularLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="term-row group">
                    <span className="term-num">{link.index}</span>
                    <span className="term-name">{link.label}</span>
                    <span className="term-desc">{link.description}</span>
                    <ArrowRight className="term-arrow h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
