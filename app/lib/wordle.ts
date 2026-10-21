import { siteConfig } from "@/app/lib/site";

export type WordEntry = {
  word: string;
  label: string;
  where: string;
  href: string;
  external?: boolean;
};

export const MAX_GUESSES = 6;

export const WORDS: WordEntry[] = [
  { word: "HOME", label: "Home", where: "the top navigation bar, on every page", href: "/" },
  { word: "ABOUT", label: "About", where: "the top navigation bar, on every page", href: "/about" },
  { word: "MENU", label: "Open menu", where: "the navigation bar, when you are on a phone", href: "/" },
  { word: "EMAIL", label: "Email", where: "the round icons on the home page, and the footer", href: `mailto:${siteConfig.email}`, external: true },
  { word: "SEND", label: "Send message", where: "the contact form", href: "/contact" },
  { word: "DEMO", label: "Live demo", where: "the case studies on the Selected Work page", href: "/projects" },
  { word: "DECK", label: "Download the deck", where: "a project on the Selected Work page", href: "/projects" },
  { word: "SPECS", label: "Show specs", where: "the gear cards on the Homelab page", href: "/homelab" },
  { word: "RESET", label: "Reset game", where: "the Minigames page, under the flag list", href: "/games" },
  { word: "HINT", label: "hint", where: "a quick-command button under the terminal on the Minigames page", href: "/games" },
  { word: "HELP", label: "help", where: "a quick-command button under the terminal on the Minigames page", href: "/games" },
];

export type TileState = "correct" | "present" | "absent";

export function evaluate(guess: string, answer: string): TileState[] {
  const result: TileState[] = Array(answer.length).fill("absent");
  const left: Record<string, number> = {};
  for (let i = 0; i < answer.length; i++) {
    if (guess[i] === answer[i]) result[i] = "correct";
    else left[answer[i]] = (left[answer[i]] ?? 0) + 1;
  }
  for (let i = 0; i < answer.length; i++) {
    if (result[i] === "correct") continue;
    const ch = guess[i];
    if (left[ch] > 0) {
      result[i] = "present";
      left[ch]--;
    }
  }
  return result;
}
