import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RouteList } from "@/components/ui/RouteList";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { routes } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you requested does not exist on Brian Kareithi's portfolio. Return home or explore selected work, the tech stack, and contact options.",
  robots: { index: false, follow: false },
};

const POPULAR_PATHS = ["/", "/about", "/how-i-work", "/projects", "/contact", "/homelab"];
const popularRoutes = routes.filter((r) => POPULAR_PATHS.includes(r.path));

export default function NotFound() {
  return (
    <section className="nf" aria-labelledby="not-found-title">
      <div className="q-wrap nf-grid">
        <div>
          <Eyebrow index="404">Route not found</Eyebrow>
          <p className="nf-number" aria-hidden="true">
            404
          </p>
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

        <TerminalWindow title="~/kareithi.sys" className="nf-term">
          <p className="term-prompt" aria-hidden="true">
            <b>$</b> cd {"<where?>"} <span className="nf-err">no such route</span>
          </p>
          <nav aria-label="Popular pages">
            <RouteList routes={popularRoutes} />
          </nav>
        </TerminalWindow>
      </div>
    </section>
  );
}
