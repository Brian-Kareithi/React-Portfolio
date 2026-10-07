"use client";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import CtfGame from "./CtfGame";

export default function GamesClient() {
  return (
    <section
      id="games"
      className="relative min-h-screen w-full px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <ScrollReveal>
        <div className="mx-auto w-full max-w-5xl">
          <Breadcrumbs compact />
          <div className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
            <h1 className="display-xl text-3xl sm:text-4xl" style={{ color: "var(--color-text-primary)" }}>
              Play a <em className="font-serif-accent">little</em>
            </h1>
            <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
              A sandbox. Nothing here touches anything real.
            </p>
          </div>

          <CtfGame />

          <NextSection
            title="Liked that?"
            description="The same instincts, applied to real work."
            links={[
              { href: "/troubleshooting", label: "Diagnostics", description: "How I find the real fault." },
              { href: "/homelab", label: "Homelab", description: "The lab that never sleeps." },
              { href: "/contact", label: "Contact", description: "Hire me or say hello." },
            ]}
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
