"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { gearCategories } from "@/data/homelab";

const ALL = "All";

const tabs = [
  { title: ALL, count: gearCategories.reduce((n, c) => n + c.items.length, 0) },
  ...gearCategories.map((c) => ({ title: c.title, count: c.items.length })),
];

/** Every piece of gear, filterable by category, with specs behind each row. */
export function GearInventory() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [category, setCategory] = useState(ALL);

  const items = (category === ALL ? gearCategories : gearCategories.filter((c) => c.title === category)).flatMap((c) =>
    c.items.map((item, i) => ({ ...item, key: `${c.title}-${i}`, category: c.title })),
  );

  return (
    <Section id="gear" index="03" label="Equipment" title={<>The gear that <em>runs it</em></>}>
      <div className="q-tabs" role="group" aria-label="Filter equipment">
        {tabs.map((tab) => (
          <button key={tab.title} onClick={() => setCategory(tab.title)} aria-pressed={category === tab.title} className="q-tab">
            {tab.title}
            <sup>{tab.count}</sup>
          </button>
        ))}
      </div>

      <ul className="l-inventory">
        {items.map((item) => {
          const isOpen = openKey === item.key;
          return (
            <li key={item.key}>
              <button className="l-row" onClick={() => setOpenKey(isOpen ? null : item.key)} aria-expanded={isOpen}>
                <span className="l-row-name">{item.name}</span>
                <span className="l-row-cat">{item.category}</span>
                <span className="l-row-outcome">{item.outcome}</span>
                <span className="q-chip">{item.skill}</span>
                <Plus className="l-row-plus" data-open={isOpen || undefined} aria-hidden="true" />
              </button>
              {isOpen && (
                <div className="l-specs animate-fade-in-up">
                  <p className="q-body l-specs-outcome">{item.outcome}</p>
                  <ul>
                    {item.specs.map((spec) => (
                      <li key={spec} className="q-mono">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
