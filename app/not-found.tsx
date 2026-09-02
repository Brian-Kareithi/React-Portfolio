import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const popularLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Selected Work" },
  { href: "/techstack", label: "Tech Stack" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center gap-8 py-20 text-center">
        <div>
          <p className="font-mono text-xs mb-4 tracking-[0.3em] uppercase"
            style={{ color: "var(--color-accent)" }}>
            Error 404 · Page not found
          </p>
          <h1 className="text-7xl md:text-9xl font-black tracking-tight"
            style={{ color: "var(--color-accent)" }}>
            404
          </h1>
          <div className="w-8 h-px mx-auto my-5" style={{ backgroundColor: "var(--color-accent)" }} />
          <p className="text-sm md:text-base max-w-md mx-auto leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}>
            That route doesn&apos;t exist on this server. The link may be broken, the page may have been moved,
            or the address was mistyped. Here&apos;s where you can go instead.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-neon btn-neon-primary">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Link>
          <Link href="/contact" className="btn-neon btn-neon-ghost">
            Report this link
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="w-full max-w-md mt-4">
          <p className="text-[9px] font-medium tracking-[0.3em] uppercase mb-3"
            style={{ color: "var(--color-text-muted)" }}>
            Popular pages
          </p>
          <div className="border" style={{ borderColor: "var(--color-border)" }}>
            {popularLinks.map((link, i) => (
              <Link key={link.href} href={link.href}
                className={`group flex items-center justify-between px-4 py-3 ${i < popularLinks.length - 1 ? "border-b" : ""}`}
                style={{ borderColor: "var(--color-border)" }}>
                <span className="text-sm font-medium transition-colors duration-200 group-hover:text-[var(--color-accent)]"
                  style={{ color: "var(--color-text-primary)" }}>
                  {link.label}
                </span>
                <span className="font-mono text-[10px]" style={{ color: "var(--color-accent)" }}>
                  {link.href === "/" ? "01" : `0${i}`}/0{popularLinks.length}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <p className="font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
          brian@portfolio:~$ whoops — route not found
        </p>
      </div>
    </section>
  );
}