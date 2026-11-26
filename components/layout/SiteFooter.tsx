"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { SoundToggle } from "@/components/ui/SoundToggle";
import { allSocials } from "@/data/socials";
import { useHomelabSnapshot } from "@/hooks/useHomelabSnapshot";
import { useLocalTime } from "@/hooks/useLocalTime";
import { externalLinkProps } from "@/lib/links";
import { pageRoutes } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

const builtWith = ["Next.js", "React", "TypeScript", "Tailwind"];

/**
 * Nairobi time and homelab status. The big "Let's build" sign-off is the home page's ending only:
 * every inner page already closes with its own "Next" card, and one ending lands harder than two.
 */
/** Letters of one word, each its own span; the word stays unbreakable so lines never split mid-word. */
function RiseWord({ text, start }: { text: string; start: number }) {
  return (
    <span className="sf-rise-word">
      {text.split("").map((ch, i) => (
        <span key={i} className="sf-rise-char" style={{ "--c": start + i } as CSSProperties}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/**
 * The visit closes with the same gesture it opened on: the sign-off rises letter by letter, like
 * the hero name, the first time it scrolls into view. Armed only on the client and only with motion
 * allowed, so without JS or with reduced motion it is simply there.
 */
function useRiseOnView() {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    el.dataset.rise = "armed";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.rise = "in";
        io.disconnect();
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function FooterSignoff({ full }: { full: boolean }) {
  const time = useLocalTime();
  const lab = useHomelabSnapshot();
  const riseRef = useRiseOnView();
  const lastSeen =
    lab &&
    new Date(lab.generatedAt).toLocaleString([], {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="sf-sign" data-compact={full ? undefined : ""}>
      {full && (
        <Link ref={riseRef} href="/contact" className="sf-sign-title" aria-label="Let's build something">
          <RiseWord text="Let's" start={0} /> <RiseWord text="build" start={5} />{" "}
          <span className="sf-sign-tail">
            <em>
              <RiseWord text="something" start={10} />
            </em>
            <ArrowUpRight aria-hidden="true" />
          </span>
        </Link>
      )}
      <dl className="sf-sign-meta">
        <div>
          <dt>Nairobi</dt>
          <dd>
            <time>{time ?? "--:--"}</time> EAT
          </dd>
        </div>
        {lab && (
          <div>
            <dt>Homelab</dt>
            <dd>
              <span
                className="sf-lab-dot"
                data-stale={lab.stale || undefined}
                aria-hidden="true"
              />
              {lab.stale ? `Last seen ${lastSeen}` : "Online"}
            </dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="q-wrap">
        <FooterSignoff full={pathname === "/"} />

        <div className="sf-top">
          <div className="sf-id">
            <Link href="/" className="sf-brand">
              Brian Kareithi<i>.</i>
            </Link>
            <span>Full-stack developer</span>
          </div>

          <nav aria-label="Footer" className="sf-nav">
            {pageRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="sf-link"
                aria-current={route.path === pathname ? "page" : undefined}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <p className="sf-blurb">
            Web and mobile products from the interface down to the
            infrastructure, built in {siteConfig.location}.
          </p>
        </div>

        <div className="sf-bottom">
          <div className="sf-socials">
            {allSocials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                title={label}
                {...externalLinkProps(href)}
                className="sf-social"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>

          <p className="sf-copy">
            © {year} Brian Kareithi. All rights reserved.
          </p>

          <div className="sf-right">
            <ul className="sf-built" aria-label="Built with">
              {builtWith.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <SoundToggle />
            <a
              href="#top"
              aria-label="Back to top"
              title="Back to top"
              className="sf-icon"
            >
              <ArrowUp aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
