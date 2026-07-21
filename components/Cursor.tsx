"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor: difference-blend ring (lagged) + signal dot (raw).
 * Grows over anything interactive. Hidden on touch / reduced motion.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    ring.style.opacity = "1";
    dot.style.opacity = "1";

    let mx = -100,
      my = -100,
      cx = -100,
      cy = -100,
      raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };

    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element &&
      !!t.closest("a, button, [data-h], input, textarea, select, label, summary");

    const onOver = (e: PointerEvent) => {
      document.body.classList.toggle("cursor-hot", isInteractive(e.target));
    };

    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      ring.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-[34px] w-[34px] rounded-full border border-white opacity-0 mix-blend-difference transition-[width,height] duration-300 [body.cursor-hot_&]:h-[58px] [body.cursor-hot_&]:w-[58px]"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[96] h-[5px] w-[5px] rounded-full bg-signal opacity-0 [body.cursor-hot_&]:opacity-0"
      />
    </>
  );
}
