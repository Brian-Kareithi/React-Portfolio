import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/lib/cx";

interface EyebrowProps {
  id?: string;
  index?: ReactNode;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "p" | "h2" | "h3" | "h4";
}

/** Small mono label above a heading, e.g. "01 Featured". */
export function Eyebrow({ id, index, children, className, style, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag id={id} className={cx("q-eyebrow", className)} style={style}>
      {index !== undefined && (
        <>
          <b>{index}</b>{" "}
        </>
      )}
      {children}
    </Tag>
  );
}
