"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { caseStudies } from "@/data/projects";

interface CaseStudySelection {
  activeIndex: number;
  select: (index: number) => void;
}

const CaseStudySelectionContext = createContext<CaseStudySelection | null>(null);

export function useCaseStudySelection() {
  const ctx = useContext(CaseStudySelectionContext);
  if (!ctx) throw new Error("useCaseStudySelection must be used within CaseStudySelectionProvider");
  return ctx;
}

/**
 * Shares the selected case study between the carousel and the detail panel, which sit apart on the page.
 * A `#case-id` hash in the URL selects that study.
 */
export function CaseStudySelectionProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const selectFromHash = () => {
      const i = caseStudies.findIndex((c) => c.id === window.location.hash.slice(1));
      if (i >= 0) setActiveIndex(i);
    };
    const id = requestAnimationFrame(selectFromHash);
    window.addEventListener("hashchange", selectFromHash);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", selectFromHash);
    };
  }, []);

  const value = useMemo(
    () => ({ activeIndex, select: (i: number) => setActiveIndex(Math.max(0, Math.min(caseStudies.length - 1, i))) }),
    [activeIndex],
  );

  return <CaseStudySelectionContext.Provider value={value}>{children}</CaseStudySelectionContext.Provider>;
}

