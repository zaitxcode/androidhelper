"use client";

import { useEffect, useRef } from "react";

function setTiltTransform(el: HTMLElement, rx: number, ry: number, scale: number) {
  el.style.transform =
    `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)` +
    (scale ? ` scale(${scale.toFixed(3)})` : "");
}

function clearTilt(el: HTMLElement) {
  el.style.transform = "";
}

/**
 * 3D pointer/touch tilt for a single card. Ported from the tilt engine of
 * zaitxcode.github.io. Reads the tilt strength from the `data-tilt` attribute.
 * No-op when the user prefers reduced motion.
 */
export function useTilt<T extends HTMLElement>(maxTiltFallback = 6) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const maxTilt = parseFloat(el.getAttribute("data-tilt") ?? "") || maxTiltFallback;

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return; /* touch handled separately */
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      /* rotateY follows the cursor horizontally, rotateX inverts vertically */
      setTiltTransform(el, (0.5 - py) * maxTilt * 2, (px - 0.5) * maxTilt * 2, 1.015);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const rect = el.getBoundingClientRect();
      const px = Math.min(Math.max((touch.clientX - rect.left) / rect.width, 0), 1);
      const py = Math.min(Math.max((touch.clientY - rect.top) / rect.height, 0), 1);
      setTiltTransform(el, (0.5 - py) * maxTilt * 2, (px - 0.5) * maxTilt * 2, 1.015);
    };

    const clear = () => clearTilt(el);

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", clear);
    el.addEventListener("pointercancel", clear);
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", clear);
    el.addEventListener("touchcancel", clear);
    el.addEventListener("blur", clear);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", clear);
      el.removeEventListener("pointercancel", clear);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", clear);
      el.removeEventListener("touchcancel", clear);
      el.removeEventListener("blur", clear);
    };
  }, [maxTiltFallback]);

  return ref;
}
