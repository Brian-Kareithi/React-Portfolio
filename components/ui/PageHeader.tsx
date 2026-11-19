import type { CSSProperties, ReactNode } from "react";
import { LensHeading } from "@/components/ui/LensHeading";

interface PageHeaderProps {
  /** Drawn as the faded watermark word behind the header. */
  label: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
}

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

/** The top of every inner page: ghost label, lens-effect h1, lede and an optional aside. */
export function PageHeader({ label, title, description, aside }: PageHeaderProps) {
  return (
    <header className="q-head">
      <span className="q-ghost" aria-hidden="true" style={{ "--chars": label.length } as CSSProperties}>
        {Array.from(label, (char, i) => (
          <span key={i} className="q-ghost-char" style={{ "--c": i } as CSSProperties}>
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
      <div className={aside ? "q-head-grid" : undefined}>
        <div>
          <LensHeading style={rise(1)}>{title}</LensHeading>
          {description && (
            <p className="q-lede q-rise" style={rise(2)}>
              {description}
            </p>
          )}
        </div>
        {aside && (
          <div className="q-head-aside q-rise" style={rise(3)}>
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
