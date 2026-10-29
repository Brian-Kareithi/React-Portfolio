import type { Metadata } from "next";
import { CtfGame } from "@/components/games/ctf/CtfGame";
import { GamesDeck } from "@/components/games/GamesDeck";
import { WordleGame } from "@/components/games/wordle/WordleGame";
import { NextSection } from "@/components/ui/NextSection";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Minigames: Capture the Flag and Guess the Button",
  heading: "Minigames",
  description: "Two minigames: a mini capture the flag in a sandboxed terminal, and a Wordle-style game where the answer is a button on this site.",
  path: "/games",
});

export default function GamesPage() {
  return (
    <div id="games" className="q-page">
      <div className="q-wrap">
        <PageHeader
          index="08"
          label="Minigames"
          title={<>Play a <em>little</em></>}
          description="A sandbox. Nothing here touches anything real. It is where the security habits get exercised for fun."
          aside={<GamesDeck />}
        />

        <section id="ctf" aria-label="Capture the flag" className="g-game">
          <CtfGame />
        </section>

        <WordleGame />

        <p className="q-small g-hint">
          I hid one more flag, and it is not on this page. If you like a trail to follow, start in the browser console.
        </p>

        <NextSection
          title="Liked that?"
          links={[
            { href: "/troubleshooting", label: "Diagnostics", description: "How I find the real fault." },
            { href: "/homelab", label: "Homelab", description: "The lab that never sleeps." },
            { href: "/about", label: "About", description: "Where the habits came from." },
          ]}
        />
      </div>
    </div>
  );
}
