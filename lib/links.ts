const isExternal = (href: string) => href.startsWith("http");

/** `target`/`rel` for an anchor: external links open in a new tab, everything else stays put. */
export const externalLinkProps = (href: string) =>
  isExternal(href) ? ({ target: "_blank", rel: "noopener noreferrer" } as const) : {};
