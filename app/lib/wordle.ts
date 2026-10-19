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
  { word: "CONTACT", label: "Contact", where: "the top navigation bar and the footer", href: "/contact" },
  { word: "RESUME", label: "Resume", where: "the footer and the mobile navigation menu", href: "/resume" },
  { word: "SEARCH", label: "Search", where: "the search field in the navigation bar (Ctrl K opens it)", href: "/" },
  { word: "MENU", label: "Open menu", where: "the navigation bar, when you are on a phone", href: "/" },
  { word: "HOMELAB", label: "Homelab", where: "the footer and the closing “where to next” panels", href: "/homelab" },
  { word: "MINIGAMES", label: "Minigames", where: "the footer and the navigation menu", href: "/games" },
  { word: "GITHUB", label: "GitHub", where: "the round icons on the home page, and the footer", href: siteConfig.github, external: true },
  { word: "LINKEDIN", label: "LinkedIn", where: "the round icons on the home page, and the footer", href: siteConfig.linkedin, external: true },
  { word: "EMAIL", label: "Email", where: "the round icons on the home page, and the footer", href: `mailto:${siteConfig.email}`, external: true },
  { word: "INSTAGRAM", label: "Instagram", where: "the footer and the contact page", href: siteConfig.instagram, external: true },
  { word: "SEND", label: "Send message", where: "the contact form", href: "/contact" },
  { word: "DEMO", label: "Live demo", where: "the case studies on the Selected Work page", href: "/projects" },
  { word: "SOURCE", label: "Source", where: "the project cards on the Selected Work page", href: "/projects" },
  { word: "DECK", label: "Download the deck", where: "a project on the Selected Work page", href: "/projects" },
  { word: "DOWNLOAD", label: "Download PDF", where: "the Resume page, one for each role", href: "/resume" },
  { word: "FRONTEND", label: "Frontend Engineer", where: "a role button on the Resume page", href: "/resume" },
  { word: "MOBILE", label: "Mobile Developer", where: "a role button on the Resume page", href: "/resume" },
  { word: "EDUCATION", label: "Education", where: "a filter on the About page", href: "/about" },
  { word: "COMPUTING", label: "Computing", where: "a filter on the Homelab page", href: "/homelab" },
  { word: "DISPLAYS", label: "Displays", where: "a filter on the Homelab page", href: "/homelab" },
  { word: "SPECS", label: "Show specs", where: "the gear cards on the Homelab page", href: "/homelab" },
  { word: "SURPRISE", label: "Open the surprise", where: "the “Is it Friday yet?” card on the Homelab page", href: "/homelab" },
  { word: "HARDWARE", label: "Hardware", where: "a tab on the How I Work page", href: "/how-i-work" },
  { word: "SECURITY", label: "Security", where: "a tab on the How I Work page", href: "/how-i-work" },
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
