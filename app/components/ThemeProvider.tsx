"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

function getStoredTheme(): Theme {
  try {
    const stored = window.localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Starts at "dark" to match the server-rendered markup exactly (the <html>
  // element always renders with the "dark" class server-side). The inline
  // script in layout.tsx's <head> already applies the real class before
  // paint, so this state only needs to catch React-driven UI (the toggle
  // icon) up to the stored preference after mount — reading storage inside
  // the initializer would run during hydration too and desync from SSR.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    /* eslint-disable-next-line react-hooks/set-state-in-effect */
    setTheme(getStoredTheme());
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
