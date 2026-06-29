"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { ScrollReveal } from "@/app/components/ui/ScrollReveal";
import { X } from "lucide-react";

interface Story {
  emoji: string;
  label: string;
  title: string;
  content: string;
}

interface InstagramStoriesProps {
  stories: Story[];
  className?: string;
}

export default function InstagramStories({ stories, className = "" }: InstagramStoriesProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [viewed, setViewed] = useState<Set<number>>(new Set());
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const openStory = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
    setViewed((prev) => new Set(prev).add(index));
  }, []);

  const closeStory = useCallback(() => {
    setActiveIndex(null);
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    if (activeIndex < stories.length - 1) {
      setActiveIndex(activeIndex + 1);
      setProgress(0);
    } else {
      closeStory();
    }
  }, [activeIndex, stories.length, closeStory]);

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      setProgress(0);
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    timerRef.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + 1;
      });
    }, 50);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, goNext]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, closeStory, goNext, goPrev]);

  return (
    <div className={className}>
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none justify-center">
        {stories.map((story, index) => {
          const isViewed = viewed.has(index);
          return (
            <button
              key={index}
              onClick={() => openStory(index)}
              className="flex flex-col items-center gap-1.5 group flex-shrink-0 transition-all duration-300 hover:-translate-y-1"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-xl sm:text-2xl transition-all duration-300 ${
                  isViewed ? "opacity-60" : "opacity-100"
                }`}
                style={{
                  background: isViewed
                    ? "var(--color-bg-tertiary)"
                    : "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))",
                  padding: 3,
                  boxShadow: isViewed ? "none" : "0 0 20px var(--color-accent-glow)",
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--color-bg-primary)" }}
                >
                  <span className="drop-shadow-sm">{story.emoji}</span>
                </div>
              </div>
              <span
                className="text-[9px] xs:text-[10px] font-medium whitespace-nowrap transition-colors duration-300"
                style={{
                  color: isViewed ? "var(--color-text-muted)" : "var(--color-text-secondary)",
                }}
              >
                {story.label}
              </span>
            </button>
          );
        })}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4 sm:p-8"
          onClick={closeStory}
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 95%, transparent)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "var(--color-bg-secondary)",
              border: "1px solid var(--color-glass-border-strong)",
            }}
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
              {stories.map((_, i) => (
                <div
                  key={i}
                  className="h-0.5 flex-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: "color-mix(in srgb, var(--color-text-muted) 30%, transparent)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-75 ease-linear"
                    style={{
                      width: i === activeIndex ? `${progress}%` : i < activeIndex ? "100%" : "0%",
                      backgroundColor: i <= activeIndex ? "var(--color-text-light)" : "transparent",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Close button */}
            <button
              onClick={closeStory}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-bg-primary) 70%, transparent)" }}
            >
              <X className="w-4 h-4" style={{ color: "var(--color-text-primary)" }} />
            </button>

            {/* Nav buttons */}
            <button
              onClick={goPrev}
              className="absolute left-0 top-0 bottom-0 z-20 w-1/3 opacity-0"
              aria-label="Previous"
            />
            <button
              onClick={goNext}
              className="absolute right-0 top-0 bottom-0 z-20 w-2/3 opacity-0"
              aria-label="Next"
            />

            {/* Content */}
            <div className="pt-10 pb-6 px-6 sm:px-8">
              <div className="flex flex-col items-center text-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
                  style={{
                    background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary))",
                    padding: 3,
                  }}
                >
                  <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-bg-primary)" }}
                  >
                    {stories[activeIndex].emoji}
                  </div>
                </div>
                <h3
                  className="text-lg sm:text-xl font-bold"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {stories[activeIndex].title}
                </h3>
                <p
                  className="text-sm sm:text-base leading-relaxed max-w-sm"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {stories[activeIndex].content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
