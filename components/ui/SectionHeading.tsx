import type { CSSProperties, ReactNode } from "react";

interface SectionHeadingProps {
  title: ReactNode;
  titleId?: string;
  /** Rendered beside the title inside `bodyClassName`, e.g. a link or a lede. */
  children?: ReactNode;
  bodyClassName?: string;
  style?: CSSProperties;
}

export function SectionHeading({ title, titleId, children, bodyClassName, style }: SectionHeadingProps) {
  const heading = (
    <h2 id={titleId} data-split className="q-h2">
      {title}
    </h2>
  );

  return (
    <div className="q-section-head" style={style}>
      {children ? (
        <div className={bodyClassName}>
          {heading}
          {children}
        </div>
      ) : (
        heading
      )}
    </div>
  );
}
