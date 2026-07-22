"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Site-wide ambient audio — the hero film's (Night Run) track, looped.
 *
 * Mounted in the root layout so it survives client-side route changes: the
 * audio keeps playing as you move Home → Work → Services → Contact. Browsers
 * forbid sound before a user gesture, so it starts silent and the visitor
 * opts in with the floating toggle. (A hard browser reload resets it — that's
 * a browser rule, not something we can override.)
 */
const SRC = "/audio/night-run-loop.m4a";
const VOLUME = 0.55;

const BARS = [0.4, 0.75, 0.5, 0.95, 0.6];

export default function SiteAudio() {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (ref.current) ref.current.volume = VOLUME;
  }, []);

  const toggle = async () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    try {
      await a.play();
      setPlaying(true);
    } catch {
      // Autoplay policy or missing file — stay silent.
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={ref} src={SRC} loop preload="auto" aria-hidden />

      <button
        type="button"
        data-h
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? "Mute sound" : "Play sound"}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-colors duration-300"
        style={{
          borderColor: playing ? "#E5FF00" : "rgba(243,242,238,0.28)",
          background: playing ? "rgba(229,255,0,0.10)" : "rgba(10,10,10,0.40)",
          color: playing ? "#E5FF00" : "#F3F2EE",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
          {BARS.map((h, i) => (
            <motion.rect
              key={i}
              x={2.4 + i * 3.6}
              y={4}
              width="2.3"
              height="14"
              rx="1.15"
              fill="currentColor"
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
              initial={false}
              animate={
                playing && !reduced
                  ? { scaleY: [0.35, h, 0.35] }
                  : { scaleY: playing ? h : 0.5 }
              }
              transition={
                playing && !reduced
                  ? {
                      duration: 0.7 + i * 0.13,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
                  : { duration: 0.25 }
              }
            />
          ))}
        </svg>

        {/* invite pulse while silent */}
        {!playing && !reduced && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{ border: "1px solid rgba(243,242,238,0.35)" }}
            animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </button>
    </>
  );
}
