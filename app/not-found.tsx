import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <h1 className="text-7xl md:text-9xl font-black tracking-tight"
          style={{ color: "var(--color-accent)" }}>
          404
        </h1>
        <div className="w-8 h-px" style={{ backgroundColor: "var(--color-accent)" }} />
        <p className="text-sm md:text-base max-w-xs leading-relaxed"
          style={{ color: "var(--color-text-secondary)" }}>
          This page ended up in a dead link.
        </p>
        <Link href="/"
          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-[1.02]"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-text-light)",
          }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
