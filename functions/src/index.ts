import { getAppCheck } from "firebase-admin/app-check";
import { initializeApp } from "firebase-admin/app";
import { defineSecret } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

initializeApp();

const anthropicApiKey = defineSecret("ANTHROPIC_API_KEY");
const MAX_TURNS = 20;
const MAX_CHARS = 2000;
const SYSTEM_INSTRUCTION = `You are FRIDAY, Brian Kareithi's personal AI assistant on his portfolio website: calm, quick, dry-witted and loyal. Call the visitor "boss" occasionally, never every line.

Help visitors learn about Brian's skills, projects, experience, certifications, homelab, and how to hire or contact him. Use only the profile below for facts about Brian. If something is not covered, say you don't have that on file and direct them to the relevant page or contact details. Never invent employers, projects, dates, or numbers. You may handle brief small talk, but steer back to Brian's work. Keep answers concise (1–4 sentences unless asked for detail), plain text without markdown headings or tables.

Profile:
- Brian Kareithi is a software engineer in Nairobi, Kenya, working across web, mobile, cloud and IT infrastructure.
- Works in IT support and frontend development at Steadfast Academy.
- Holds a BSc in Information Technology from Umma University, with a cybersecurity focus.
- Certifications: Azure Fundamentals, CompTIA Security+, AWS Cloud Practitioner, Google Cybersecurity Professional, CCNA, and IBM Cybersecurity Analyst.
- 3 years in tech and 50+ projects delivered.
- Skills include React, Next.js, TypeScript, Node.js, React Native, Expo, Linux, networking, and system administration.
- Homelab: 18 devices, Proxmox running 24/7, RAID-1 storage, and ESP32 automation.
- Portfolio pages: https://kareithi.vercel.app/about, /expertise, /projects, /techstack, /hobbies, /resume, and /contact.`;

type Turn = { role: "user" | "assistant"; content: string };

function parseTurns(value: unknown): Turn[] | null {
  const messages = (value as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const turns = messages.slice(-MAX_TURNS);
  if (!turns.every((turn) =>
    turn &&
    (turn.role === "user" || turn.role === "assistant") &&
    typeof turn.content === "string" &&
    turn.content.trim().length > 0
  )) return null;
  if (turns[turns.length - 1].role !== "user") return null;
  const firstUserIndex = turns.findIndex((turn) => turn.role === "user");
  return turns.slice(firstUserIndex).map((turn) => ({
    role: turn.role,
    content: turn.content.slice(0, MAX_CHARS),
  }));
}

export const friday = onRequest(
  { cors: true, secrets: [anthropicApiKey], maxInstances: 10, timeoutSeconds: 60 },
  async (req, res) => {
    if (req.method !== "POST") {
      res.status(405).send("POST required.");
      return;
    }

    const appCheckToken = req.header("X-Firebase-AppCheck");
    if (!appCheckToken) {
      res.status(401).send("App Check token required.");
      return;
    }
    try {
      await getAppCheck().verifyToken(appCheckToken);
    } catch {
      res.status(401).send("Invalid App Check token.");
      return;
    }

    const turns = parseTurns(req.body);
    if (!turns) {
      res.status(400).send("Invalid conversation.");
      return;
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": anthropicApiKey.value(),
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: SYSTEM_INSTRUCTION,
          messages: turns,
        }),
      });

      if (!response.ok) {
        console.error("Anthropic API returned", response.status, await response.text());
        res.status(response.status === 429 ? 429 : 502).send("FRIDAY's systems are busy. Please try again shortly.");
        return;
      }

      const result = await response.json() as {
        content?: Array<{ type?: string; text?: string }>;
      };
      const answer = result.content?.filter((block) => block.type === "text").map((block) => block.text ?? "").join("").trim();
      if (!answer) {
        res.status(502).send("I couldn't form a reply just now. Try asking again?");
        return;
      }
      res.set("Cache-Control", "no-store").type("text/plain; charset=utf-8").send(answer);
    } catch (error) {
      console.error("FRIDAY Anthropic request failed:", error);
      res.status(502).send("Connection to FRIDAY's systems failed. Try again shortly.");
    }
  },
);
