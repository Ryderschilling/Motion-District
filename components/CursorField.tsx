"use client";

import { useEffect, useRef } from "react";

/**
 * THE BACKGROUND — not an overlay.
 *
 * A fixed canvas layer that sits *behind everything* (-z-10) and paints:
 *   1. the paper base color
 *   2. a large, very soft dark pool that lags behind the cursor
 *   3. a second, wider + fainter pool on a slower lerp for depth
 *
 * Content scrolls over it. Solid dark sections cover it; those get their own
 * inverted light glow via the `.on-dark::before` rule in globals.css, which
 * reads the same --mx/--my vars this component writes.
 *
 * Everything is transform-based (compositor-only), one rAF loop, no layout.
 */
export default function CursorField() {
  const nearRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight * 0.4;
    let nx = mx,
      ny = my, // near pool
      fx = mx,
      fy = my; // far pool
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const root = document.documentElement;
    const near = nearRef.current!;
    const far = farRef.current!;

    const loop = () => {
      // heavy, directed lag — the pool *arrives*, it doesn't snap
      nx += (mx - nx) * 0.075;
      ny += (my - ny) * 0.075;
      fx += (mx - fx) * 0.035;
      fy += (my - fy) * 0.035;

      near.style.transform = `translate3d(${nx}px, ${ny}px, 0) translate(-50%,-50%)`;
      far.style.transform = `translate3d(${fx}px, ${fy}px, 0) translate(-50%,-50%)`;

      // shared with .on-dark glow + anything else that wants the cursor
      root.style.setProperty("--mx", nx + "px");
      root.style.setProperty("--my", ny + "px");

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-paper"
    >
      {/* far pool — huge, faint, slowest */}
      <div
        ref={farRef}
        className="absolute left-0 top-0 h-[130vmax] w-[130vmax] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(10,10,10,0.05), transparent 68%)",
        }}
      />
      {/* near pool — the visible follower */}
      <div
        ref={nearRef}
        className="absolute left-0 top-0 h-[72vmax] w-[72vmax] rounded-full will-change-transform"
        style={{
          background:
            "radial-gradient(closest-side, rgba(10,10,10,0.09), transparent 66%)",
        }}
      />
    </div>
  );
}
