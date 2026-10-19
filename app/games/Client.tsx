"use client";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import CtfGame from "./CtfGame";
import WordleGame from "./WordleGame";

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
            <div className="g-deck">
              <a href="#ctf" className="g-card g-card-ctf" aria-label="Capture the flag">
                <span className="g-card-label">01 · capture the flag</span>
                <code>$ cat README.txt</code>
                <code>six flags, some decoys</code>
                <code className="g-caret">$ _</code>
              </a>
              <a href="#wordle-title" className="g-card g-card-word" aria-label="Guess the button">
                <span className="g-card-label">02 · guess the button</span>
                <span className="g-tiles" aria-hidden="true">
                  {["B", "U", "T", "T", "O", "N"].map((l, i) => (
                    <i key={i} data-s={["g", "y", "x", "g", "x", "y"][i]}>{l}</i>
                  ))}
                </span>
              </a>
            </div>
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
