import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";

const stats = [
  { value: "28", label: "Public repositories" },
  { value: "2022", label: "Building since" },
  { value: "9", label: "Languages used" },
];

export function GithubStats() {
  return (
    <section aria-label="GitHub" className="q-section p-github">
      <dl className="p-github-stats">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dd>{stat.value}</dd>
            <dt>{stat.label}</dt>
          </div>
        ))}
      </dl>
      <div className="p-github-cta">
        <p className="q-body" style={{ maxWidth: "26rem" }}>
          Browse the code, question the decisions, borrow what is useful.
        </p>
        <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="q-link">
          github.com/Brian-Kareithi <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
