"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Section } from "@/components/ui/Section";
import { gearCategories, type GearItem } from "@/data/homelab";
import { useSlidingIndicator } from "@/hooks/useSlidingIndicator";
import { revealDetail } from "@/lib/reveal-detail";

const ALL = "All";

type Entry = GearItem & { key: string; category: string; host: string | null; model: string };

/** "Dreezy0 · HP Tower Server" → host "Dreezy0", model "HP Tower Server". Plain names have no host. */
function splitName(name: string): { host: string | null; model: string } {
  const [first, ...rest] = name.split(" · ");
  return rest.length ? { host: first, model: rest.join(" · ") } : { host: null, model: name };
}

const entries: Entry[] = gearCategories.flatMap((c) =>
  c.items.map((item, i) => ({ ...item, ...splitName(item.name), key: `${c.title}-${i}`, category: c.title })),
);

const tabs = [{ title: ALL, count: entries.length }, ...gearCategories.map((c) => ({ title: c.title, count: c.items.length }))];

/**
 * The gear as a bench: a compact grid of devices on the left, and one glass detail pane
 * that shows the selected device's role and specs. Twenty devices fit on one screen
 * instead of running as a long list.
 */
export function GearInventory() {
  const [category, setCategory] = useState(ALL);
  const [selectedKey, setSelectedKey] = useState(entries[0].key);
  const tabsRef = useSlidingIndicator<HTMLDivElement>();
  const detailRef = useRef<HTMLElement>(null);

  const visible = category === ALL ? entries : entries.filter((e) => e.category === category);
  const selected = visible.find((e) => e.key === selectedKey) ?? visible[0];

  return (
    <Section id="gear" index="03" label="Equipment" title={<>The gear that <em>runs it</em></>}>
      <div ref={tabsRef} className="a-filters g-filters" data-indicator="pill" role="group" aria-label="Filter equipment">
        {tabs.map((tab) => (
          <button key={tab.title} type="button" onClick={() => setCategory(tab.title)} aria-pressed={category === tab.title} className="a-tab">
            {tab.title}
            <sup>{tab.count}</sup>
          </button>
        ))}
      </div>

      <div className="gb">
        <ul key={category} className="gb-grid tab-swap" aria-label={`${category === ALL ? "All" : category} equipment`}>
          {visible.map((item, i) => {
            const isOn = item.key === selected.key;
            return (
              <li key={item.key} style={{ "--n": Math.min(i, 7) } as CSSProperties}>
                <button
                  type="button"
                  className="gb-tile"
                  aria-pressed={isOn}
                  aria-controls="gear-detail"
                  onClick={() => {
                    setSelectedKey(item.key);
                    requestAnimationFrame(() => revealDetail(detailRef.current));
                  }}
                >
                  <span className="gb-tile-top">
                    <span className="gb-host">{item.host ?? item.category}</span>
                    <span className="gb-led" aria-hidden="true" />
                  </span>
                  <span className="gb-model">{item.model}</span>
                  <span className="gb-skill">{item.skill}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <article ref={detailRef} id="gear-detail" className="gb-detail" aria-live="polite">
          <div key={selected.key} className="gb-detail-body">
            <p className="gb-detail-kicker">
              {selected.host && <span className="gb-host">{selected.host}</span>}
              <span>{selected.category}</span>
            </p>
            <h3 className="gb-detail-title">{selected.model}</h3>
            <p className="q-body">{selected.outcome}</p>
            <p className="gb-detail-role">
              Role <strong>{selected.skill}</strong>
            </p>
            <ul className="gb-specs" aria-label="Specifications">
              {selected.specs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
          </div>
        </article>
      </div>
    </Section>
  );
}
