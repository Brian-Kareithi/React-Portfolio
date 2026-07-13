"use client";
import { useEffect, useState, useRef, useCallback } from "react";

const typingSpeed = 20;

const messages = [
  "Hey there 👋",
  "I'm Kareithi",
  "Debatably the best engineer you've met",
];

function LoadingDots() {
  return (
    <span className="loading">
      <b>•</b>
      <b>•</b>
      <b>•</b>
    </span>
  );
}

function Bubble({
  message,
  onRevealed,
}: {
  message: string;
  onRevealed: () => void;
}) {
  const [bubbleReady, setBubbleReady] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const soundPlayedRef = useRef(false);

  const loadingDuration =
    message.replace(/<(?:.|\n)*?>/gm, "").length * typingSpeed + 500;

  useEffect(() => {
    const t = setTimeout(() => setBubbleReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!bubbleReady) return;
    const t = setTimeout(() => {
      setHasRevealed(true);
      if (!soundPlayedRef.current) {
        soundPlayedRef.current = true;
        new Audio("/sounds/sentmessage.mp3").play();
      }
      setTimeout(onRevealed, 400);
    }, loadingDuration);
    return () => clearTimeout(t);
  }, [bubbleReady, loadingDuration, onRevealed]);

  return (
    <div
      className={`bubble left${!hasRevealed ? " cornered" : ""}`}
      style={{ opacity: bubbleReady ? 1 : 0 }}
    >
      {!hasRevealed && <LoadingDots />}
      <span className="message" style={{ opacity: hasRevealed ? 1 : 0 }}>
        {message}
      </span>
    </div>
  );
}

export default function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [bubbleIds, setBubbleIds] = useState<number[]>([]);
  const [phase, setPhase] = useState<"loading" | "fading">("loading");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nextMsgRef = useRef(0);
  const startedRef = useRef(false);

  const addNextBubble = useCallback(() => {
    const idx = nextMsgRef.current;
    if (idx >= messages.length) {
      setTimeout(() => {
        setPhase("fading");
        setTimeout(onFinish, 700);
      }, 1000);
      return;
    }
    nextMsgRef.current += 1;
    setBubbleIds((prev) => [...prev, idx]);
  }, [onFinish]);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    addNextBubble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRevealed = useCallback(() => {
    addNextBubble();
  }, [addNextBubble]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bubbleIds]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-start justify-start transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="messages max-w-xs sm:max-w-sm md:max-w-md pt-12 pl-3 sm:pl-5 md:pl-8">
        {bubbleIds.map((msgIdx) => (
          <Bubble
            key={msgIdx}
            message={messages[msgIdx]}
            onRevealed={handleRevealed}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
