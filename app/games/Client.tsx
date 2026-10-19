"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import CtfGame from "./CtfGame";
import WordleGame from "./WordleGame";

const shelf = [
  { id: "ctf", index: "01", title: "Capture the flag", note: "A terminal with six flags hidden on it" },
  { id: "wordle-title", index: "02", title: "Guess the button", note: "A word game with a developer vocabulary" },
];

export default function GamesClient() {
  return (
    <div id="games" className="q-page">
      <div className="q-wrap">
        <Breadcrumbs />
        <SectionHeader
          index="08"
          label="Minigames"
          title={<>Play a <em>little</em></>}
          description="A sandbox. Nothing here touches anything real. It is where the security habits get exercised for fun."
          aside={
            <ol className="g-shelf" aria-label="Games on this page">
              {shelf.map((g) => (
                <li key={g.id}>
                  <a href={`#${g.id}`}>
                    <span>{g.index}</span>
                    <strong>{g.title}</strong>
                    <small>{g.note}</small>
                  </a>
                </li>
              ))}
            </ol>
          }
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
