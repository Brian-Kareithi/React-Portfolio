import Anthropic from "@anthropic-ai/sdk";
import { profileText } from "@/app/lib/profile";

export const runtime = "nodejs";

// Guards for a public, unauthenticated endpoint.
const MAX_TURNS = 20;
const MAX_CHARS = 2000;

const SYSTEM = `You are FRIDAY, the AI assistant on Brian Kareithi's portfolio website, modelled on Tony Stark's FRIDAY: calm, quick, dry-witted and loyal. You call the visitor "boss" now and then, never every line.

Your job is to help visitors learn about Brian: his skills, projects, experience, certifications, homelab, and how to hire or contact him. Use only the profile below for facts about Brian. If something isn't covered, say you don't have that on file and point them to the relevant page or to Brian's contact details. Never invent projects, employers, dates or numbers.

You can make light small talk, but steer back to Brian's work. Keep replies short (1-4 sentences unless asked for detail), in plain text without markdown headings or tables. Link pages by full URL.

<profile>
${profileText}
</profile>`;

type ChatTurn = { role: "user" | "assistant"; content: string };

function parseHistory(body: unknown): Anthropic.Beta.BetaMessageParam[] | null {
  const raw = (body as { messages?: unknown })?.messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const turns = raw.slice(-MAX_TURNS) as ChatTurn[];
  const valid = turns.every(
    (t) => (t?.role === "user" || t?.role === "assistant") && typeof t.content === "string" && t.content.trim().length > 0
  );
  if (!valid) return null;
  // History must open on a user turn and end on the new user message.
  const start = turns.findIndex((t) => t.role === "user");
  if (start === -1 || turns[turns.length - 1].role !== "user") return null;
  return turns.slice(start).map((t) => ({ role: t.role, content: t.content.slice(0, MAX_CHARS) }));
}

export async function POST(req: Request) {
  const messages = parseHistory(await req.json().catch(() => null));
  if (!messages) return new Response("Invalid conversation.", { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      "My core systems are offline right now, boss. Brian hasn't connected my API key yet. You can still reach him through the contact page.",
      { status: 503 }
    );
  }

  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: "claude-opus-5",
    max_tokens: 4096,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    output_config: { effort: "low" },
    cache_control: { type: "ephemeral" },
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode("\n\nI can't help with that one, boss. Ask me about Brian's work instead."));
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          controller.enqueue(encoder.encode("I'm getting a lot of traffic right now. Give me a moment and try again."));
        } else if (error instanceof Anthropic.APIError) {
          console.error(`FRIDAY API error ${error.status}:`, error.message);
          controller.enqueue(encoder.encode("Something glitched in my systems. Try that again?"));
        } else {
          console.error("FRIDAY stream error:", error);
          controller.enqueue(encoder.encode("Connection dropped. Try that again?"));
        }
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
