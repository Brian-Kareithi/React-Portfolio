"use client";

export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="w-5 h-5 border-2 rounded-full animate-spin"
          style={{
            borderColor: "var(--color-border)",
            borderTopColor: "var(--color-accent)",
          }}
        />
        <span
          className="text-[10px] font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--color-text-muted)" }}
        >
          Loading
        </span>
      </div>
    </div>
  );
}
