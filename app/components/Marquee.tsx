import { Fragment } from "react";

/**
 * One slow ticker on the ink band. The first group is the real, readable list; the copy that
 * makes the loop seamless is hidden from assistive tech. Pauses on hover and focus, and stops
 * (and wraps) under reduced motion. Pure CSS, no JS.
 */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const group = (hidden: boolean) => (
    <ul className="marquee-group" aria-hidden={hidden || undefined} aria-label={hidden ? undefined : label}>
      {items.map((item) => (
        <Fragment key={item}>
          <li className="whitespace-nowrap px-5 font-mono text-sm uppercase tracking-[0.22em] sm:px-8 sm:text-base">{item}</li>
          <li aria-hidden="true" className="text-lg" style={{ color: "var(--palette-sand)" }}>
            ✦
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <section aria-label={label} className="band-dark marquee py-5 sm:py-7" style={{ color: "var(--palette-cream)" }}>
      <div className="marquee-track">
        {group(false)}
        {group(true)}
      </div>
    </section>
  );
}
