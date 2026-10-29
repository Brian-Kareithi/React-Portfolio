import type { ReactNode } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cx } from "@/lib/cx";

interface SectionProps {
  /** Used to label the section: the heading gets `${id}-title`. */
  id: string;
  index: ReactNode;
  label: string;
  title: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A titled page section: hairline rule, eyebrow, split-reveal heading, then content. */
export function Section({ id, index, label, title, className, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section aria-labelledby={titleId} className={cx("q-section", className)}>
      <SectionHeading index={index} label={label} title={title} titleId={titleId} />
      {children}
    </section>
  );
}
