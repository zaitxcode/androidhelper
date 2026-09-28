"use client";

import { useEffect } from "react";

/**
 * Scroll reveal driven by IntersectionObserver.
 * Elements carrying `data-reveal` fade/translate in once they enter the
 * viewport; `data-delay` (ms) staggers them via the `--reveal-delay` var.
 */
export function useReveal() {
  useEffect(() => {
    const revealables = document.querySelectorAll("[data-reveal]");

    revealables.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const raw = htmlEl.getAttribute("data-delay");
      const delay = parseInt(raw ?? "", 10);
      if (!Number.isNaN(delay)) htmlEl.style.setProperty("--reveal-delay", `${delay}ms`);
    });

    if (!("IntersectionObserver" in window) || !revealables.length) {
      revealables.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealables.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
