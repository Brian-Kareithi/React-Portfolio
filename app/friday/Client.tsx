"use client";
import { FormEvent, Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUp, RotateCcw } from "lucide-react";
import { ThinkingOrb, type OrbState } from "thinking-orbs";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { respond, type Memory } from "./brain";
import Cat from "./Cat";

type Role = "user" | "assistant";
interface ChatMessage {
  role: Role;
  content: string;
}

type Status = "idle" | "waiting" | "streaming";

const GREETING: ChatMessage = {
  role: "assistant",
  content: "Hi, I'm Friday, Brian's assistant. Ask me about his projects, skills, certifications, homelab, or how to get in touch.",
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
  idle: "Here to help",
  waiting: "Thinking…",
  streaming: "Typing…",
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
/** A short, length-scaled pause so replies read like she is thinking. */
const thinkingTime = (reply: string) => 500 + Math.min(900, reply.length * 3) + Math.random() * 300;
const typingStep = () => 2 + Math.floor(Math.random() * 4);

/** Turns site paths, URLs and emails in a reply into links. */
const LINKABLE = /(https?:\/\/[^\s]*[^\s.,!?)]|[\w.+-]+@[\w-]+\.[a-z]{2,}|\/(?:about|expertise|engineering|troubleshooting|techstack|projects|hobbies|resume|contact)\b)/g;

function renderContent(text: string) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const className = "underline underline-offset-2 decoration-[var(--color-accent)] hover:text-[var(--color-accent)]";
    if (part.startsWith("/")) return <Link key={i} href={part} className={className}>{part}</Link>;
    const href = part.includes("@") && !part.startsWith("http") ? `mailto:${part}` : part;
    return <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={className}>{part}</a>;
  });
}


/**
 * Orb ink: True Cobalt while idle, periwinkle while she is thinking or typing.
 * The periwinkle is a step deeper than #998fc7 because the orb shades its ink toward white.
 */
const orbColor = (active: boolean) => (active ? "#7a6fb3" : "#14248a");

export default function FridayClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const memoryRef = useRef<Memory>({});
  // Bumped on reset/unmount so an in-flight reply stops typing.
  const runRef = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => () => void runRef.current++, []);

  const busy = status !== "idle";

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;

    setMessages((prev) => [...prev, { role: "user", content }, { role: "assistant", content: "" }]);
    setInput("");
    setStatus("waiting");

    const run = ++runRef.current;
    const { text: reply, memory } = respond(content, memoryRef.current);
    memoryRef.current = memory;

    const writeReply = (value: string) =>
      setMessages((prev) => [...prev.slice(0, -1), { role: "assistant", content: value }]);

    await sleep(thinkingTime(reply));
    if (run !== runRef.current) return;
    setStatus("streaming");
    for (let i = 0; i < reply.length; ) {
      i = Math.min(reply.length, i + typingStep());
      writeReply(reply.slice(0, i));
      await sleep(18);
      if (run !== runRef.current) return;
    }
    setStatus("idle");
    inputRef.current?.focus();
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const reset = () => {
    runRef.current++;
    memoryRef.current = {};
    setMessages([GREETING]);
    setStatus("idle");
  };

  return (
    <section
      id="friday"
      className="min-h-screen w-full pt-24 md:pt-28 pb-20 md:pb-28 px-2.5 sm:px-5 lg:px-8.5"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <ScrollReveal>
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="sr-only">Friday, Brian Kareithi&apos;s portfolio assistant</h1>
          <div
            className="overflow-hidden rounded-3xl border"
            style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)", boxShadow: "var(--shadow-md)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b px-5 py-4" style={{ borderColor: "var(--color-border)" }}>
              <div className="min-w-0 flex-1">
                <p className="font-serif-accent text-2xl leading-none" style={{ color: "var(--color-text-primary)" }}>
                  Friday
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-muted)" }}>
                  <span
                    className="h-1.5 w-1.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: busy ? "var(--color-accent-secondary)" : "var(--color-accent)" }}
                  />
                  <span aria-live="polite">{statusLabel[status]}</span>
                </p>
              </div>
              <button
                onClick={reset}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full transition-colors duration-200 hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
                style={{ color: "var(--color-text-muted)" }}
                aria-label="Start a new conversation"
                title="New conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Orb */}
            <div className="relative flex min-h-[240px] items-center justify-center sm:min-h-[300px]" aria-hidden="true">
              <ThinkingOrb className="friday-big-orb" state={orbFor[status]} size={64} theme="light" color={orbColor(busy)} />
              <Cat active={busy} className="absolute bottom-2 left-4 w-20 sm:left-8 sm:w-24" />
            </div>

            {/* Transcript */}
            <div ref={scrollRef} className="h-[50vh] min-h-[300px] max-h-[520px] space-y-5 overflow-y-auto px-5 pb-5" role="log" aria-label="Conversation with FRIDAY">
              {messages.map((m, i) => {
                const isLast = i === messages.length - 1;
                if (m.role === "assistant" && !m.content && isLast) {
                  return (
                    <div key={i} className="flex items-center gap-2.5">
                      <ThinkingOrb state="searching" size={20} theme="light" color={orbColor(true)} aria-hidden="true" />
                      <span className="text-sm italic" style={{ color: "var(--color-text-muted)" }}>
                        Friday is thinking…
                      </span>
                    </div>
                  );
                }
                return m.role === "assistant" ? (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0">
                      <ThinkingOrb
                        state={isLast && status === "streaming" ? "composing" : "breathing"}
                        size={20}
                        theme="light"
                        color={orbColor(isLast && busy)}
                        paused={!(isLast && busy)}
                        aria-hidden="true"
                      />
                    </span>
                    <p className="max-w-[85%] whitespace-pre-wrap break-words text-[15px] leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
                      {renderContent(m.content)}
                    </p>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <p
                      className="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md px-4 py-2.5 text-[15px] leading-relaxed"
                      style={{ backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }}
                    >
                      {m.content}
                    </p>
                  </div>
                );
              })}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="min-h-[36px] rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-200 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]"
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
                placeholder="Ask Friday about Brian…"
                className="max-h-32 min-h-[44px] flex-1 resize-none rounded-3xl border px-4 py-2.5 text-[15px] outline-none transition-colors duration-200 focus:border-[var(--color-accent)]"
                style={{ backgroundColor: "var(--color-bg-primary)", borderColor: "var(--color-border)", color: "var(--color-text-primary)" }}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full transition-opacity duration-200 disabled:opacity-40"
                style={{ backgroundColor: "var(--color-accent)", color: "var(--color-on-accent)" }}
                aria-label="Send message"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </form>
          </div>

          <p className="mt-4 text-center text-xs" style={{ color: "var(--color-text-muted)" }}>
            Friday answers from what&apos;s on this site.
          </p>
        </div>
      </ScrollReveal>
      <style jsx>{`
        :global(.friday-big-orb) { transform: scale(3); }
      `}</style>
    </section>
  );
}
