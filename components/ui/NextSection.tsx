import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface NextLink {
  href: string;
  label: string;
  description: string;
}

/** End-of-page navigation: one large lead link and a short list of alternatives. */
export function NextSection({ title = "Keep exploring", links }: { title?: string; links: NextLink[] }) {
  const [main, ...rest] = links;
  return (
    <nav aria-label="Continue" className="q-next">
      <div className="q-next-grid">
        <Link href={main.href} className="q-next-main">
          <Eyebrow style={{ marginBottom: "1.25rem" }}>{title}</Eyebrow>
          <span className="q-title">
            {main.label}
            <ArrowRight aria-hidden="true" />
          </span>
          <span className="q-small" style={{ display: "block", marginTop: "0.9rem", maxWidth: "26rem" }}>
            {main.description}
          </span>
        </Link>
        {rest.length > 0 && (
          <ul className="q-next-list">
            {rest.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>
                  {link.label}
                  <span>{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
