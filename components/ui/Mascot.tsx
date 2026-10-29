import Image from "next/image";
import cartoon from "@/public/Kareithi Cartoon.png";

type MascotMood = "idle" | "wave" | "sleep" | "happy" | "lost";

const BADGE: Record<MascotMood, string | null> = {
  idle: null,
  wave: "hi",
  sleep: "zzz",
  happy: "!",
  lost: "?",
};

/** Cartoon avatar with a mood badge. */
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

