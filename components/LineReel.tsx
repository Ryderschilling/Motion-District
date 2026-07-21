"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { REEL_FILMS, IG_URL, type Film } from "@/lib/videos";
import WorkTile from "@/components/WorkTile";
import Lightbox from "@/components/Lightbox";
import Magnetic from "@/components/Magnetic";
import Reveal from "@/components/Reveal";

/* ------------------------------------------------------------------
 * Geometry — cards and the SVG line share one 1440 × 3300 space.
 * Cards are placed with % of that space; the SVG stretches to fill it
 * (preserveAspectRatio="none" + non-scaling stroke), so the line hits
 * the same spots at every viewport width ≥ md.
 * ------------------------------------------------------------------ */
const SPACE = { w: 1440, h: 3300 };

const CARDS = [
  { x: 90, y: 260, w: 620, h: 349 }, // 01 left
  { x: 730, y: 1000, w: 620, h: 349 }, // 02 right
  { x: 90, y: 1740, w: 620, h: 349 }, // 03 left
  { x: 730, y: 2480, w: 620, h: 349 }, // 04 right
];

/** progress point at which each card "wakes up" (≈ its depth in the path) */
const STOPS = [0.16, 0.4, 0.63, 0.85];

/* --- path helpers: journey points + loops → smooth bezier ---------- */
function loopPts(cx: number, cy: number, r: number, dir = 1): [number, number][] {
  const out: [number, number][] = [];
  for (let a = 0; a <= 8; a++) {
    const t = (a / 8) * Math.PI * 2 * dir + Math.PI / 2;
    out.push([cx + Math.cos(t) * r, cy + Math.sin(t) * r]);
  }
  return out;
}

const JOURNEY: [number, number][] = [
  [880, -60],
  [620, 130],
  [330, 230],
  [160, 420],
  ...loopPts(250, 560, 68),
  [430, 650],
  [770, 700],
  [1060, 830],
  ...loopPts(1180, 930, 72, -1),
  [1330, 1130],
  [1230, 1390],
  [900, 1520],
  [520, 1620],
  ...loopPts(330, 1705, 76),
  [160, 1905],
  [310, 2130],
  [710, 2210],
  [1050, 2330],
  ...loopPts(1195, 2425, 68, -1),
  [1330, 2630],
  [1170, 2870],
  [950, 2960],
  ...loopPts(800, 2990, 50, -1),
  [724, 3056],
];

/** Catmull-Rom → cubic bezier path string */
function toPath(pts: [number, number][]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const PATH_D = toPath(JOURNEY);

/* --- a card that wakes up as the line reaches it ------------------- */
function CardStop({
  film,
  geom,
  stop,
  progress,
  onOpen,
}: {
  film: Film;
  geom: (typeof CARDS)[number];
  stop: number;
  progress: MotionValue<number>;
  onOpen: (f: Film) => void;
}) {
  const opacity = useTransform(progress, [stop - 0.1, stop], [0.22, 1]);
  const y = useTransform(progress, [stop - 0.1, stop], [56, 0]);
  const scale = useTransform(progress, [stop - 0.1, stop], [0.96, 1]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        position: "absolute",
        left: `${(geom.x / SPACE.w) * 100}%`,
        top: `${(geom.y / SPACE.h) * 100}%`,
        width: `${(geom.w / SPACE.w) * 100}%`,
      }}
      className="z-10"
    >
      <WorkTile film={film} onOpen={onOpen} />
    </motion.div>
  );
}

/* --- the glowing tip that rides the line --------------------------- */
function LineTip({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);

  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const len = path.getTotalLength();
    const pt = path.getPointAtLength(Math.max(0, Math.min(1, v)) * len);
    dot.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
  });

  return (
    <>
      {/* invisible measuring copy of the path */}
      <path ref={pathRef} d={PATH_D} fill="none" stroke="none" />
      <g ref={dotRef}>
        <circle r="26" fill="#E5FF00" opacity="0.12" />
        <circle r="7" fill="#E5FF00" />
      </g>
    </>
  );
}

/* ------------------------------------------------------------------ */
export default function LineReel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<Film | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.72", "end 0.95"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 92,
    damping: 26,
    restDelta: 0.0005,
  });
  const pathLength = reduced ? undefined : progress;
  const ctaOpacity = useTransform(progress, [0.88, 0.98], [0, 1]);
  const ctaY = useTransform(progress, [0.88, 0.98], [40, 0]);

  return (
    <section id="reel" className="on-dark relative">
      <div className="wrap pb-8 pt-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2 className="font-display mt-5 text-[clamp(40px,7vw,104px)]">
                Follow
                <br />
                the line<span className="text-signal">.</span>
              </h2>
            </div>
            <p className="font-mono-label max-w-[260px] pb-3 leading-relaxed" style={{ color: "var(--muted)" }}>
              04 films / scroll to roll —<br />
              the stroke keeps the pace
            </p>
          </div>
        </Reveal>
      </div>

      {/* ============ DESKTOP: line + staggered cards ============ */}
      <div className="wrap hidden md:block">
        <div
          ref={sectionRef}
          className="relative"
          style={{ aspectRatio: `${SPACE.w} / ${SPACE.h}` }}
        >
          <svg
            className="absolute inset-0 z-0 h-full w-full overflow-visible"
            viewBox={`0 0 ${SPACE.w} ${SPACE.h}`}
            preserveAspectRatio="none"
            fill="none"
            aria-hidden
          >
            {/* ghost of the full route */}
            <path
              d={PATH_D}
              stroke="rgba(243,242,238,0.07)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
            {/* the drawn stroke */}
            <motion.path
              d={PATH_D}
              stroke="#E5FF00"
              strokeWidth="3.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={pathLength ? { pathLength } : undefined}
              initial={reduced ? undefined : { pathLength: 0 }}
            />
            {!reduced && <LineTip progress={progress} />}
          </svg>

          {REEL_FILMS.map((film, i) => (
            <CardStop
              key={film.slug}
              film={film}
              geom={CARDS[i]}
              stop={STOPS[i]}
              progress={progress}
              onOpen={setOpen}
            />
          ))}

          {/* the line lands here */}
          <motion.div
            style={{ opacity: reduced ? 1 : ctaOpacity, y: reduced ? 0 : ctaY }}
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center pb-4 text-center"
          >
            <p className="font-mono-label text-signal">
              04 / 07 — that&rsquo;s not even half of it
            </p>
            <h3 className="font-display mt-4 text-[clamp(36px,5.4vw,84px)]">
              Follow the motion
            </h3>
            <Magnetic className="mt-7">
              <a href={IG_URL} target="_blank" rel="noopener" data-h className="btn sig">
                <span>
                  See the rest on Instagram <b className="arw-ne">→</b>
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* ============ MOBILE: stacked reel, no line ============ */}
      <div className="wrap md:hidden">
        <div className="flex flex-col gap-10">
          {REEL_FILMS.map((film, i) => (
            <Reveal key={film.slug} delay={0.05 * i}>
              <div className="font-mono-label mb-2 flex justify-between" style={{ color: "var(--muted)" }}>
                <span>0{i + 1}</span>
                <span>{film.cat}</span>
              </div>
              <WorkTile film={film} onOpen={setOpen} />
            </Reveal>
          ))}
          <Reveal className="pt-4 text-center">
            <p className="font-mono-label text-signal">
              04 / 07 — that&rsquo;s not even half of it
            </p>
            <h3 className="font-display mt-4 text-[13vw]">Follow the motion</h3>
            <a href={IG_URL} target="_blank" rel="noopener" data-h className="btn sig mt-7">
              <span>
                See the rest on Instagram <b className="arw-ne">→</b>
              </span>
            </a>
          </Reveal>
        </div>
      </div>

      <div className="pb-28" />
      <Lightbox film={open} onClose={() => setOpen(null)} />
    </section>
  );
}
