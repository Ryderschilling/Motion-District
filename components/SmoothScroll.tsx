"use client";

import { ReactLenis } from "lenis/react";

/**
 * Buttery smooth scroll, site-wide. Lenis respects native behavior on touch.
 */
export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis root options={{ lerp: 0.1, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
