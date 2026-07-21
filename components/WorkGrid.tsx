"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FILMS, IG_URL, type Film } from "@/lib/videos";
import WorkTile from "@/components/WorkTile";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const CATS = ["All", "Automotive", "Music", "Fitness", "Lifestyle", "Documentary"] as const;

export default function WorkGrid() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [open, setOpen] = useState<Film | null>(null);

  const films = useMemo(
    () => (cat === "All" ? FILMS : FILMS.filter((f) => f.cat === cat)),
    [cat],
  );

  return (
    <div className="wrap pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">The archive</p>
        <h1 className="font-display mt-6 text-[clamp(44px,8vw,120px)]">
          Work<span className="text-signal">.</span>
        </h1>
      </Reveal>

      <Reveal className="mt-10">
        <div className="flex flex-wrap gap-2.5">
          {CATS.map((c) => (
            <button
              key={c}
              data-h
              onClick={() => setCat(c)}
              className={`chip-toggle ${cat === c ? "active" : ""}`}
            >
              {c}
              {c === "All" && ` / ${FILMS.length}`}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {films.map((f) => (
            <motion.div
              key={f.slug}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="font-mono-label mb-2 flex justify-between" style={{ color: "var(--muted)" }}>
                <span>{f.cat}</span>
                <span>{f.dur}</span>
              </div>
              <WorkTile
                film={f}
                onOpen={setOpen}
                aspect={f.vertical ? "aspect-[3/4]" : "aspect-video"}
              />
              <p className="mt-2.5 text-[13px]" style={{ color: "var(--muted)" }}>
                {f.blurb}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Reveal className="mt-20 text-center">
        <p className="font-mono-label" style={{ color: "var(--muted)" }}>
          New films drop on Instagram first
        </p>
        <a
          href={IG_URL}
          target="_blank"
          rel="noopener"
          data-h
          className="btn mt-5"
        >
          <span>
            @motion.districtco <b className="arw-ne">→</b>
          </span>
        </a>
      </Reveal>

      <Lightbox film={open} onClose={() => setOpen(null)} />
    </div>
  );
}
