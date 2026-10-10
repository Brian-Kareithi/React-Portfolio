"use client";
import type { ReactNode } from "react";
import Image from "next/image";
import cartoon from "@/public/Kareithi Cartoon.png";

export type MascotMood = "idle" | "wave" | "sleep" | "happy" | "lost";

const BADGE: Record<MascotMood, string | null> = {
  idle: null,
  wave: "hi",
  sleep: "zzz",
  happy: "!",
  lost: "?",
};

/** The cartoon, cropped to a face. Mood is a CSS animation on a data attribute, so it costs no JS per frame. */
export function Mascot({ mood = "idle", size = 48, className = "" }: { mood?: MascotMood; size?: number; className?: string }) {
  const badge = BADGE[mood];
  return (
    <span
      className={`mascot relative inline-block flex-shrink-0 ${className}`}
      data-mood={mood}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <span className="mascot-face block h-full w-full overflow-hidden rounded-full border-2" style={{ borderColor: "var(--palette-ink)" }}>
        <Image
          src={cartoon}
          alt=""
          width={size * 2}
          height={size * 2}
          sizes={`${size}px`}
          className="mascot-img h-full w-full object-cover"
          style={{ objectPosition: "50% 22%" }}
        />
      </span>
      {badge && (
        <span
          className="mascot-badge absolute -right-1.5 -top-2 rounded-full px-1.5 py-px font-mono text-[10px] font-bold leading-4"
          style={{ backgroundColor: "var(--palette-ink)", color: "var(--palette-cream)" }}
        >
          {badge}
        </span>
      )}
    </span>
  );
}

/** A short aside from the mascot, set in a speech bubble. Keep it to a sentence. */
export function MascotNote({ mood = "idle", children, className = "" }: { mood?: MascotMood; children: ReactNode; className?: string }) {
  return (
    <aside className={`flex items-end gap-3 ${className}`} aria-label="Mascot's note">
      <Mascot mood={mood} size={44} />
      <div className="relative max-w-md rounded-2xl rounded-bl-sm border px-4 py-2.5" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-bg-card)" }}>
        <p className="field-label mb-1">Mascot&rsquo;s note</p>
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
          {children}
        </p>
      </div>
    </aside>
  );
}
