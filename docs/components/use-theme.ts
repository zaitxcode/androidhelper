"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "dark" | "light";

const THEME_KEY = "zaitxcode-theme";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage unavailable (private mode, file://) */
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function writeThemeAttribute(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", theme === "light" ? "#f8fafc" : "#090d16");
}

/**
 * Binary light/dark theme with localStorage persistence.
 * Mirrors the toggle behaviour of zaitxcode.github.io.
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => readStoredTheme());

  useEffect(() => {
    writeThemeAttribute(theme);
  }, [theme]);

  // Keep in sync if the user changes their OS preference, but only while
  // no explicit choice is stored.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const listener = (event: MediaQueryListEvent) => {
      let stored: string | null = null;
      try {
        stored = window.localStorage.getItem(THEME_KEY);
      } catch {
        /* ignore */
      }
      if (stored !== "light" && stored !== "dark") {
        const next: Theme = event.matches ? "light" : "dark";
        setThemeState(next);
        writeThemeAttribute(next);
      }
    };

    if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", listener);
    return () => {
      if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(() => {
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme, setTheme };
}
