import type { CSSProperties, ReactNode } from "react";
import { LensHeading } from "@/components/ui/LensHeading";
import { Eyebrow } from "@/components/ui/Eyebrow";

interface PageHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
}

const rise = (i: number) => ({ "--i": i }) as CSSProperties;

/** The top of every inner page: ghost label, eyebrow, lens-effect h1, lede and an optional aside. */
export function PageHeader({ index, label, title, description, aside }: PageHeaderProps) {
  return (
    <header className="q-head">
      <span className="q-ghost" aria-hidden="true" style={{ "--chars": label.length } as CSSProperties}>
        {label}
      </span>
      <Eyebrow index={index} className="q-rise" style={rise(0)}>
        {label}
      </Eyebrow>
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
