"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * "As seen with" — wordmarks fly in from off-axis and settle as you scroll.
 * Pulled from @motion.districtco's own posts; swap/extend freely.
 */
const NAMES = ["Nelk", "TJR", "Insta 360", "Hills", "Matt Johnson", "Tiffen"];

function Bracket({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className} aria-hidden>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
}

function Mark({
  name,
  index,
  center,
  progress,
}: {
  name: string;
  index: number;
  center: number;
  progress: MotionValue<number>;
}) {
  const d = index - center;
  // Start at progress 0 (the moment the section pins) and keep drifting
  // into place until the midpoint — so it's already animating by the time
  // you're halfway through the section, not sitting idle then snapping late.
  const x = useTransform(progress, [0, 0.5], [d * 240, 0]);
  const y = useTransform(progress, [0, 0.5], [Math.abs(d) * 130, 0]);
  const rotate = useTransform(progress, [0, 0.5], [d * 9, 0]);
  const scale = useTransform(progress, [0, 0.5], [0.72, 1]);

  // Opacity RATCHETS. It tracks the same scroll-linked ramp as before, so the
  // fade-in feels identical, but the value is only ever allowed to climb —
  // scrolling back down (or up) can never drag it back toward transparent.
  const ramp = useTransform(progress, [0, 0.3], [0.1, 1]);
  const opacity = useMotionValue(ramp.get());
  useEffect(() => {
    const climbOnly = (v: number) => {
      if (v > opacity.get()) opacity.set(v);
    };
    climbOnly(ramp.get());
    return ramp.on("change", climbOnly);
  }, [ramp, opacity]);

  return (
    <motion.span
      style={{ x, y, rotate, scale, opacity }}
      className="font-head whitespace-nowrap text-[clamp(24px,4vw,54px)] will-change-transform"
    >
      {name}
    </motion.span>
  );
}

export default function SeenWith() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const center = (NAMES.length - 1) / 2;

  if (reduced) {
    return (
      <section className="py-32">
        <div className="wrap flex flex-col items-center gap-10 text-center">
          <p className="font-mono-label" style={{ color: "var(--muted)" }}>
            As seen with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
            {NAMES.map((n) => (
              <span key={n} className="font-head text-[clamp(24px,4vw,54px)]">
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[190vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-12 overflow-hidden">
        <p className="flex items-center gap-4 text-xl font-medium tracking-tight">
          <Bracket className="h-11" />
          <span className="font-mono-label" style={{ letterSpacing: "0.34em" }}>
            As seen with
          </span>
          <Bracket className="h-11 scale-x-[-1]" />
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 px-6">
          {NAMES.map((n, i) => (
            <Mark
              key={n}
              name={n}
              index={i}
              center={center}
              progress={scrollYProgress}
            />
          ))}
        </div>

        <p className="font-mono-label">
          <span style={{ color: "var(--muted)" }}>+ the next one could be </span>
          <span className="bg-signal px-1.5 py-0.5 text-ink">yours</span>
        </p>
      </div>
    </section>
  );
}
