"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * "As seen with" — wordmarks fly in from off-axis and settle as you scroll.
 * Pulled from @motion.districtco's own posts; swap/extend freely.
 */
const NAMES = ["Daniel Allan", "NELK Boys", "Matt Johnson", "Public Hotel"];

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
  const x = useTransform(progress, [0.1, 0.62], [d * 240, 0]);
  const y = useTransform(progress, [0.1, 0.62], [Math.abs(d) * 130, 0]);
  const rotate = useTransform(progress, [0.1, 0.62], [d * 9, 0]);
  const scale = useTransform(progress, [0.1, 0.62], [0.72, 1]);
  const opacity = useTransform(progress, [0.1, 0.5], [0.1, 1]);

  return (
    <motion.span
      style={{ x, y, rotate, scale, opacity }}
      className="font-head whitespace-nowrap text-[clamp(26px,4.6vw,62px)] will-change-transform"
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
  const noteOpacity = useTransform(scrollYProgress, [0.68, 0.85], [0, 1]);
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
              <span key={n} className="font-head text-[clamp(26px,4.6vw,62px)]">
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

        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 px-6">
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

        <motion.p
          style={{ opacity: noteOpacity }}
          className="font-mono-label"
        >
          <span style={{ color: "var(--muted)" }}>+ the next one could be </span>
          <span className="bg-signal px-1.5 py-0.5 text-ink">yours</span>
        </motion.p>
      </div>
    </section>
  );
}
