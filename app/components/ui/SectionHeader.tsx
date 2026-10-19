import type { CSSProperties, ReactNode } from "react";
import LensHeading from "@/app/components/LensHeading";

interface SectionHeaderProps {
  index: string;
  label: string;
  title: ReactNode;
  description?: string;
  aside?: ReactNode;
  variant?: "center" | "split";
}

export function SectionHeader({ index, label, title, description, aside, variant }: SectionHeaderProps) {
  const rise = (i: number) => ({ "--i": i }) as CSSProperties;
  return (
    <header className={`q-head${variant ? ` q-head-${variant}` : ""}`}>
      <p className="q-eyebrow q-rise" style={rise(0)}>
        <b>{index}</b> {label}
      </p>
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
