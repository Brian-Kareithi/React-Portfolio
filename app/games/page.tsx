import type { Metadata } from "next";
import GamesClient from "./Client";
import { pageMeta } from "@/app/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Minigames: Mini Capture the Flag",
  heading: "Minigames",
  description: "Play a mini capture the flag: six flags in a sandboxed terminal, using grep, find, pipes, chmod and base64.",
  path: "/games",
});

export default function GamesPage() {
  return <GamesClient />;
}
