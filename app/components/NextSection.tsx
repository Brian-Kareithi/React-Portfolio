import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NextSectionLink {
  href: string;
  label: string;
  description: string;
}

interface NextSectionProps {
  title?: string;
  description?: string;
  links: NextSectionLink[];
}

export default function NextSection({ title = "Keep exploring", description, links }: NextSectionProps) {
  const [main, ...rest] = links;
  return (
    <nav aria-label="Continue" className="q-next">
      <div className="q-next-grid">
        <Link href={main.href} className="q-next-main">
          <p className="q-eyebrow" style={{ marginBottom: "1.25rem" }}>
            {title}
          </p>
          <span className="q-title">
            {main.label}
            <ArrowRight aria-hidden="true" />
          </span>
          {(description ?? main.description) && (
            <span className="q-small" style={{ display: "block", marginTop: "0.9rem", maxWidth: "26rem" }}>
              {main.description}
            </span>
          )}
        </Link>
        {rest.length > 0 && (
          <ul className="q-next-list">
            {rest.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>
                  {l.label}
                  <span>{l.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
