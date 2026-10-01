"use client";
import Image from "next/image";

type LoadingScreenProps = {
  /** True while the exit fade is playing. */
  isExiting?: boolean;
};

const dots = ["var(--palette-true-cobalt)", "var(--palette-soft-periwinkle)", "var(--palette-periwinkle)"];

export default function LoadingScreen({ isExiting = false }: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden overscroll-none px-3 select-none transition-opacity duration-500 ease-out ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "var(--color-bg-primary)", minHeight: "100dvh" }}
    >
      <div className="flex flex-col items-center">
        {/* Site icon */}
        <div
          className="loader-card flex h-24 w-24 items-center justify-center rounded-[1.75rem] border sm:h-28 sm:w-28"
          style={{
            backgroundColor: "var(--color-bg-card)",
            borderColor: "var(--color-border)",
            boxShadow: "6px 6px 0 var(--palette-periwinkle)",
          }}
        >
          <Image src="/logo.png" alt="" width={80} height={80} priority className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
        </div>

        {/* Bouncing dots */}
        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          {dots.map((color, i) => (
            <span
              key={color}
              className="loader-dot h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: color, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <p className="mt-4 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Loading Brian&apos;s portfolio…
        </p>

        {/* Indeterminate progress pill */}
        <div
          className="mt-5 h-1.5 overflow-hidden rounded-full"
          style={{ backgroundColor: "var(--color-border)", width: "clamp(8rem, 40vw, 11rem)" }}
          aria-hidden="true"
        >
          <div className="loader-bar h-full w-1/3 rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </div>
      </div>
    </div>
  );
}
