"use client";

import { useMemo, useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  timeline,
  timelineCategories,
  TIMELINE_CURRENT_YEAR,
  type TimelineCategory,
  type TimelineItem,
} from "@/data/about";

type Filter = "all" | TimelineCategory;

const filters: Filter[] = ["all", ...(Object.keys(timelineCategories) as TimelineCategory[])];

const counts = timeline.reduce<Record<string, number>>(
  (acc, item) => ({ ...acc, [item.category]: (acc[item.category] ?? 0) + 1 }),
  { all: timeline.length },
);

function groupByYear(items: TimelineItem[]) {
  const groups = new Map<number, TimelineItem[]>();
  for (const item of [...items].sort((a, b) => a.year - b.year)) {
    groups.set(item.year, [...(groups.get(item.year) ?? []), item]);
  }
  return [...groups].map(([year, entries]) => ({
    year,
    roles: entries.filter((e) => e.category !== "certification"),
    certs: entries.filter((e) => e.category === "certification"),
  }));
}

function RoleCard({ item }: { item: TimelineItem }) {
  const isCurrent = item.period.includes("Present");
  const isNext = item.year > TIMELINE_CURRENT_YEAR;
  return (
    <article className="a-card" data-cat={item.category} data-now={isCurrent || undefined} data-next={isNext || undefined}>
      <div className="a-card-top">
        <span className="a-tag">{timelineCategories[item.category].tag}</span>
        <span className="a-when">
          {isCurrent && <span className="live-dot" aria-hidden="true" />}
          {item.period}
        </span>
      </div>
      <h4 className="a-card-title">{item.title}</h4>
      <p className="a-where">{item.institution}</p>
      <p className="a-desc">{item.description}</p>
      {item.metrics && (
        <ul className="a-chips" aria-label="Highlights">
          {item.metrics.map((metric) => (
            <li key={metric} className="q-chip">
              {metric}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function CertificationList({ year, certs }: { year: number; certs: TimelineItem[] }) {
  return (
    <ul className="a-certs" aria-label={`Certifications earned in ${year}`}>
      {certs.map((cert) => (
        <li key={cert.title} className="a-cert">
          <span className="a-cert-issuer">{cert.institution}</span>
          <strong>{cert.title}</strong>
          <span className="a-cert-desc">{cert.description}</span>
        </li>
      ))}
    </ul>
  );
}

/** Year-by-year career timeline, filterable by category. */
export function Timeline() {
  const [filter, setFilter] = useState<Filter>("all");

  const years = useMemo(
    () => groupByYear(filter === "all" ? timeline : timeline.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section aria-labelledby="chapters-title" className="a-chapters">
      <aside className="a-rail">
        <Eyebrow as="h2" id="chapters-title" index="02">
          Chapters
        </Eyebrow>
        <div className="a-filters" role="group" aria-label="Filter the timeline">
          {filters.map((f) => (
            <button key={f} className="a-tab" aria-pressed={f === filter} onClick={() => setFilter(f)}>
              {f === "all" ? "Everything" : timelineCategories[f].label}
              <sup>{counts[f] ?? 0}</sup>
            </button>
          ))}
        </div>
      </aside>

      <ol className="a-line">
        {years.map(({ year, roles, certs }) => (
          <li key={year} className="a-year">
            <span className="a-dot" aria-hidden="true" />
            <h3 className="a-year-num">{year > TIMELINE_CURRENT_YEAR ? "Next" : year}</h3>
            <div className="a-year-body">
              {roles.map((item) => (
                <RoleCard key={item.title} item={item} />
              ))}
              {certs.length > 0 && <CertificationList year={year} certs={certs} />}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
