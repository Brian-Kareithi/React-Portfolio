import type { CSSProperties } from "react";

function Chars({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span key={i} className="hh-char" style={{ "--c": start + i } as CSSProperties}>
          {ch}
        </span>
      ))}
    </>
  );
}

/**
 * The two-line name. Rendered twice by the hero: once as the real h1, and once as an
 * aria-hidden copy that the pointer lens reveals in inverted colours.
 */
export function HeroName({ lens = false }: { lens?: boolean }) {
  const Tag = lens ? "div" : "h1";
  return (
    <Tag id={lens ? undefined : "hero-name"} className="hh-name" aria-hidden={lens || undefined}>
      <span className="hh-line">
        <Chars text="Brian" />
      </span>
      <span className="hh-line hh-line-2">
        <em>
          <Chars text="Kareithi" start={5} />
        </em>
      </span>
    </Tag>
  );
}
