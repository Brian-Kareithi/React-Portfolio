"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type LoadingScreenProps = {
  /** True while the exit fade is playing. */
  isExiting?: boolean;
};

export default function LoadingScreen({ isExiting = false }: LoadingScreenProps) {
  return (
    <div
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden overscroll-none px-4 py-8 select-none transition-opacity duration-500 ease-out sm:px-6 ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{
        backgroundColor: "var(--color-bg-primary)",
        minHeight: "100dvh",
        paddingTop: "max(2rem, env(safe-area-inset-top))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* Hairline top rule, matches site chrome */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundColor: "var(--color-accent)" }}
      />

      <div className="flex min-h-0 w-full max-w-sm flex-col items-center">
        {/* Fluid animation box: scales with both viewport width and height,
            so it stays compact on small phones and short landscape screens,
            and caps out on tablets/desktops. */}
        <div
          className="aspect-square w-full shrink-0"
          style={{ width: "clamp(7rem, min(52vw, 34dvh), 15rem)" }}
        >
          <DotLottieReact
            src="/QcEL6uqLNr.lottie"
            loop
            autoplay
            speed={1}
            style={{ width: "100%", height: "100%", display: "block" }}
          />
        </div>

        <p
          className="mt-1 text-center font-mono text-[10px] tracking-[0.28em] uppercase sm:mt-2 sm:text-[11px] sm:tracking-[0.3em]"
          style={{ color: "var(--color-text-muted)" }}
        >
          Loading
        </p>
        <p
          className="mt-1 max-w-full overflow-hidden text-center font-mono text-[9px] whitespace-nowrap tabular-nums text-ellipsis sm:text-[10px]"
          style={{ color: "var(--color-text-muted)", opacity: 0.7 }}
        >
          brian@dev:~$ ./boot.sh
        </p>

        {/* Indeterminate progress hairline */}
        <div
          className="loader-progress h-px overflow-hidden"
          style={{
            backgroundColor: "var(--color-border)",
            width: "clamp(8rem, 40vw, 10rem)",
          }}
        >
          <div
            className="loader-bar h-full w-1/3"
            style={{ backgroundColor: "var(--color-accent)" }}
          />
        </div>
      </div>

      {/* Hidden on short viewports (landscape phones) to avoid crowding */}
      <p
        className="loader-footnote absolute text-center font-mono text-[9px] tracking-[0.2em] uppercase sm:text-[10px]"
        style={{
          color: "var(--color-text-muted)",
          opacity: 0.6,
          bottom: "max(1rem, env(safe-area-inset-bottom))",
        }}
      >
        Nairobi · EAT
      </p>
    </div>
  );
}
