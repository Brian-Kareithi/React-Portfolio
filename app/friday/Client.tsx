"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ArrowUp, RotateCcw } from "lucide-react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import NextSection from "@/app/components/NextSection";

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

type Status = "idle" | "waiting" | "streaming";

const GREETING: ChatMessage = {
  role: "assistant",
  content: "FRIDAY online. I'm Brian's assistant: ask me about his skills, projects, certifications or how to work with him.",
};

const suggestions = [
  "What does Brian build?",
  "Which certifications does he hold?",
  "Tell me about his homelab",
  "How do I hire him?",
];

const orbFor: Record<Status, OrbState> = {
  idle: "breathing",
  waiting: "searching",
  streaming: "composing",
};

const statusLabel: Record<Status, string> = {
  idle: "Standing by",
  waiting: "Searching files",
  streaming: "Responding",
};

export default function FridayClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const busy = status !== "idle";

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;

    const history = [...messages, { role: "user" as const, content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStatus("waiting");

    const controller = new AbortController();
    abortRef.current = controller;

    const writeReply = (reply: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: reply }]);

    try {
      const res = await fetch("/api/friday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // The greeting is UI-only; the API expects the conversation to open with the visitor.
        body: JSON.stringify({ messages: history.filter((m) => m !== GREETING) }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        writeReply((await res.text()) || "I couldn't reach my core systems. Try again in a moment.");
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let reply = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setStatus("streaming");
        writeReply(reply);
      }
      if (!reply.trim()) writeReply("I lost my train of thought there. Ask me again?");
    } catch (err) {
      if ((err as Error).name !== "AbortError") writeReply("Connection dropped. Try that again?");
    } finally {
      abortRef.current = null;
      setStatus("idle");
      inputRef.current?.focus();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const reset = () => {
    abortRef.current?.abort();
    setMessages([GREETING]);
    setStatus("idle");
  };

  return (
    <section
      id="friday"
      className="min-h-screen w-full pt-24 md:pt-28 pb-24 md:pb-32 px-4 relative overflow-hidden isolate"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <ScrollReveal className="relative z-10">
        <div className="max-w-3xl mx-auto w-full">
          <Breadcrumbs />
          <SectionHeader
            index="10"
            label="Surprise"
            title={<>Meet <em className="font-serif-accent">FRIDAY</em></>}
            description="An AI assistant in the spirit of Tony Stark's. Ask her anything about Brian's work, skills and experience."
          />

          <div className="flat-card overflow-hidden">
            {/* HUD header */}
            <div className="flex items-center gap-4 border-b px-4 py-3 sm:px-5" style={{ borderColor: "var(--color-border)" }}>
              <div className="relative flex h-16 w-16 flex-shrink-0 items-center justify-center">
                <span className="friday-ring absolute inset-0 rounded-full border" style={{ borderColor: "var(--color-accent)" }} aria-hidden="true" />
                <ThinkingOrb state={orbFor[status]} size={64} aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-bold tracking-[0.3em]" style={{ color: "var(--color-text-primary)" }}>
                  F.R.I.D.A.Y.
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--color-accent)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent)" }} />
                  <span aria-live="polite">{statusLabel[status]}</span>
                </p>
              </div>
              <button
                onClick={reset}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors duration-200 hover:text-[var(--color-accent)]"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="h-[55vh] min-h-[320px] max-h-[560px] space-y-4 overflow-y-auto px-4 py-5 sm:px-5" role="log" aria-label="Conversation with FRIDAY">
              {messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                if (m.role === "assistant" && !m.content && isLast) {
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <ThinkingOrb state="searching" size={20} aria-hidden="true" />
                      <span className="font-mono text-[11px]" style={{ color: "var(--color-text-muted)" }}>
                        Thinking…
                      </span>
                    </div>
                  );
                }
                return m.role === "assistant" ? (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0">
                      <ThinkingOrb state={isLast && status === "streaming" ? "composing" : "breathing"} size={20} paused={!(isLast && busy)} aria-hidden="true" />
                    </span>
                    <p className="max-w-[85%] whitespace-pre-wrap break-words text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
                      {m.content}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <p
                      className="max-w-[85%] whitespace-pre-wrap break-words rounded-xl px-3.5 py-2 text-sm leading-relaxed"
                      style={{ backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }}
                    >
                      {m.content}
                    </p>
                  </div>
                );
              })}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="min-h-[36px] rounded-lg border px-3 py-1.5 text-[11px] font-medium transition-colors duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      style={{ borderColor: "var(--color-border)", color: "var(--color-text-secondary)" }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Composer */}
            <form onSubmit={onSubmit} className="flex items-end gap-2 border-t p-3 sm:p-4" style={{ borderColor: "var(--color-border)" }}>
              <label htmlFor="friday-input" className="sr-only">
                Message FRIDAY
              </label>
              <textarea
                id="friday-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                maxLength={2000}
                placeholder="Ask FRIDAY about Brian…"
                className="max-h-32 min-h-[44px] flex-1 resize-none rounded-lg border bg-transparent px-3 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg transition-opacity duration-200 disabled:opacity-40"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }}
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </form>
          </div>

          <p className="mt-3 text-center font-mono text-[10px]" style={{ color: "var(--color-text-muted)" }}>
            FRIDAY is powered by Claude and can make mistakes. Check important details on the resume page.
          </p>

          <NextSection
            title="Prefer to read it yourself?"
            description="Everything FRIDAY knows lives on these pages."
            links={[
              { href: "/projects", label: "Selected Work", description: "Delivered products and experiments." },
              { href: "/resume", label: "Resume", description: "Role-tailored CV, three ways." },
              { href: "/contact", label: "Contact", description: "Talk to the human instead." },
            ]}
          />
        </div>
      </ScrollReveal>
      <style jsx>{`
        .friday-ring {
          opacity: 0.35;
          animation: friday-pulse 2.8s ease-in-out infinite;
        }
        @keyframes friday-pulse {
          0%, 100% { transform: scale(1); opacity: 0.35; }
          50% { transform: scale(1.08); opacity: 0.1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .friday-ring { animation: none; }
        }
      `}</style>
    </section>
  );
}
