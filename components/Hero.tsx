"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINES = [
  { text: "Cinematic", cls: "" },
  { text: "content,", cls: "" },
  { text: "engineered", cls: "outline-type", dot: true },
];

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <header className="on-dark relative flex min-h-svh flex-col justify-end overflow-hidden">
      {/* film loop — the background IS the reel */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src="/video/night-run.mp4"
        poster="/video/posters/night-run.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* grade + legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/25 to-ink/85" />

      <div className="wrap relative z-10 pb-16 pt-36">
        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="eyebrow"
        >
          Tampa — cinematic production
        </motion.p>

        <h1 className="font-display mt-6 text-[clamp(44px,9.2vw,150px)]">
          {LINES.map((l, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className={`block ${l.cls}`}
                initial={reduced ? false : { y: "108%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
              >
                {l.text}
                {l.dot && <span className="text-signal" style={{ WebkitTextStroke: 0 }}>.</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: EASE }}
          className="mt-9 flex flex-wrap items-end justify-between gap-8"
        >
          <p className="max-w-[440px] text-[clamp(14px,1.4vw,17px)] leading-relaxed" style={{ color: "var(--muted)" }}>
            One-stop shop for cinematic production.{" "}
            <b className="font-semibold" style={{ color: "var(--fg)" }}>
              Shot, directed, and cut in-house
            </b>{" "}
            — so the film feels like one voice, not a handoff.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link href="/contact" data-h className="btn sig">
                <span>
                  Start a project <b className="arw">→</b>
                </span>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="#reel" data-h className="btn">
                <span>Watch the work</span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="font-mono-label mt-14 flex items-center justify-between"
          style={{ color: "var(--muted)" }}
        >
          <span>[ EST. TAMPA ]</span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-white/20">
              <span className="absolute inset-0 animate-[drop_1.8s_cubic-bezier(0.22,1,0.36,1)_infinite] bg-signal" />
            </span>
          </span>
          <span>@motion.districtco</span>
        </motion.div>
      </div>
    </header>
  );
}
