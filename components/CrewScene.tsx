"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import { useMedia, useReducedSafe } from "@/lib/useReducedSafe";
import { srcSet, type CrewMember } from "@/lib/crew";

const EASE = [0.22, 1, 0.36, 1] as const;
const FPS = 24;

const pad = (n: number) => String(n).padStart(2, "0");

/** Name lines rise out of a mask. useInView + animate, never whileInView (it stalls on masked spans). */
function MaskName({ id, first, last }: { id: string; first: string; last: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = useReducedSafe();
  const [passed, setPassed] = useState(false);

  // a hash jump can skip straight past the heading; don't leave it invisible
  useEffect(() => {
    const check = () => {
      if (ref.current && ref.current.getBoundingClientRect().bottom < 0) setPassed(true);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const show = inView || passed || reduced;
  const lines = [
    { t: first, cls: "" },
    { t: last, cls: "outline-type" },
  ];

  return (
    <h2 ref={ref} id={id} className="font-display text-[clamp(52px,12vw,104px)] md:text-[clamp(48px,6.4vw,104px)]">
      {lines.map((l, i) => (
        <span key={l.t} className="block overflow-hidden pb-[0.04em]">
          <motion.span
            className={`block ${l.cls}`}
            initial={{ y: "112%" }}
            animate={show ? { y: "0%" } : undefined}
            transition={{ duration: reduced ? 0 : 1.1, delay: reduced ? 0 : 0.08 + i * 0.1, ease: EASE }}
          >
            {l.t}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export default function CrewScene({
  person,
  index,
  total,
  dark,
  last,
}: {
  person: CrewMember;
  index: number;
  total: number;
  dark: boolean;
  last: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedSafe();
  const pinned = useMedia("(min-width: 768px) and (min-height: 640px)");
  const flip = index % 2 === 1; // photo on the right for the middle scene

  // entrance: section top travels from viewport bottom to viewport top
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start start"] });
  // whole life of the section, drives the burnt-in timecode and the exit
  const { scrollYProgress: life } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // every range spans exactly [0,1] (motion v12 compiles these to native scroll timelines)
  const clip = useTransform(
    enter,
    [0, 0.25, 1, 1],
    ["inset(46% 22% 46% 22%)", "inset(46% 22% 46% 22%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"]
  );
  const imgScale = useTransform(enter, [0, 1], [1.28, 1]);

  // exit (pinned, not last): next scene slides over during the second half
  const shade = useTransform(life, [0, 0.5, 1], [0, 0, 0.75]);
  const sink = useTransform(life, [0, 0.5, 1], [1, 1, 0.92]);

  const staticMotion = reduced;
  const useExit = pinned && !last && !reduced;

  const base = index + 1;
  useMotionValueEvent(life, "change", (v) => {
    if (!tcRef.current || reduced) return;
    const frames = Math.floor(Math.max(0, Math.min(1, v)) * FPS * 12);
    const s = Math.floor(frames / FPS);
    tcRef.current.textContent = `${pad(base)}:00:${pad(s)}:${pad(frames % FPS)}`;
  });

  return (
    <section
      ref={ref}
      id={person.slug}
      aria-labelledby={`${person.slug}-name`}
      className={`scene ${last ? "scene-last" : ""} ${dark ? "on-dark" : "bg-paper"}`}
      style={{ zIndex: index + 1, scrollMarginTop: 0 }}
    >
      <motion.div
        className="scene-stage"
        style={{ scale: useExit ? sink : 1 }}
      >
        <div className="wrap grid h-full items-center gap-10 py-20 pin:gap-[clamp(32px,5vw,96px)] pin:py-0 md:grid-cols-12">
          {/* photo */}
          <div
            className={`relative md:col-span-5 ${
              flip ? "md:order-2 md:col-start-8 pin:justify-self-end" : "pin:justify-self-start"
            }`}
          >
            <motion.div
              className="scene-frame"
              style={{ clipPath: staticMotion ? "none" : clip }}
            >
              <motion.img
                src={`${person.photo}-1240.webp`}
                srcSet={srcSet(person.photo)}
                sizes="(min-width: 768px) 42vw, 100vw"
                alt={person.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                style={{ objectPosition: person.frame, scale: staticMotion ? 1 : imgScale }}
              />
              {useExit && (
                <motion.span
                  aria-hidden
                  className="absolute inset-0 z-[2] bg-ink"
                  style={{ opacity: shade }}
                />
              )}
              <span className="scene-tc left-3 top-3" aria-hidden>
                Scene {pad(base)} / {pad(total)}
              </span>
              <span className="scene-tc bottom-3 right-3" aria-hidden>
                TC <span ref={tcRef}>{pad(base)}:00:00:00</span>
              </span>
            </motion.div>
          </div>

          {/* words */}
          <div className={`scene-body md:col-span-6 ${flip ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
            <Reveal y={20}>
              <p className="eyebrow" style={{ color: "var(--muted-strong)" }}>
                {person.role}
              </p>
            </Reveal>
            <div className="mt-6">
              <MaskName id={`${person.slug}-name`} first={person.first} last={person.last} />
            </div>
            <Reveal delay={0.18} y={24} className="mt-8 max-w-[520px] space-y-4">
              {person.bio.map((para) => (
                <p key={para.slice(0, 24)}>{para}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
