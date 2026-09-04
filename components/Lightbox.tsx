"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Film } from "@/lib/videos";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen theater. Sound on, letterboxed, mono credits.
 * No title anywhere — category tag and the film, nothing else.
 */
export default function Lightbox({
  film,
  onClose,
}: {
  film: Film | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {film && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink/95 px-4 py-6 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, y: 24 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: 12 }}
            transition={{ duration: 0.6, ease: EASE }}
            className={`w-full ${
              film.vertical
                ? "max-w-[min(420px,40vh)]"
                : "max-w-[min(64rem,128vh)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between text-paper">
              <div className="font-mono-label text-signal">{film.cat}</div>
              <button
                data-h
                onClick={onClose}
                aria-label="Close"
                className="font-mono-label border border-paper/40 rounded-full px-4 py-2 transition-colors hover:border-signal hover:text-signal"
              >
                Close ✕
              </button>
            </div>
            <video
              src={film.src}
              poster={film.poster}
              controls
              autoPlay
              playsInline
              className={`w-full rounded-sm bg-black ${film.vertical ? "aspect-[9/16]" : "aspect-video"}`}
            />
            <p className="font-mono-label mt-3 text-paper/50">
              {film.blurb} — @motion.districtco
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
