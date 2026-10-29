import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function WorkQuote() {
  return (
    <section aria-label="How I work, in one line" className="h-quote">
      <div className="q-wrap">
        <figure>
          <blockquote>
            <p data-split className="h-quote-text">
              Real users, real deadlines, <em>systems that need to stay up.</em>
            </p>
          </blockquote>
          <figcaption className="h-quote-cap">
            <span className="q-eyebrow">On the school systems I run at Steadfast Academy</span>
            <Link href="/how-i-work" className="q-link">
              How I work <ArrowRight aria-hidden="true" />
            </Link>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
