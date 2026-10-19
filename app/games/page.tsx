import type { Metadata } from "next";
import GamesClient from "./Client";
import { pageMeta } from "@/app/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Minigames: Capture the Flag and Guess the Button",
  heading: "Minigames",
  description: "Two minigames: a mini capture the flag in a sandboxed terminal, and a Wordle-style game where the answer is a button on this site.",
  path: "/games",
});

export default function GamesPage() {
  return <GamesClient />;
}
