"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useLenis } from "lenis/react";
import { PORTFOLIO, pf, pad2, totalRuntime, type PortfolioFilm } from "@/lib/portfolio";
import { CREW } from "@/lib/crew";
import { IG_URL } from "@/lib/videos";
import { useReducedSafe, useMedia } from "@/lib/useReducedSafe";
import Magnetic from "@/components/Magnetic";

const EASE = [0.22, 1, 0.36, 1] as const;
const N = PORTFOLIO.length;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Portfolio({ preparedFor }: { preparedFor: string | null }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div className="pf on-dark">
      <Hero preparedFor={preparedFor} onPlayAll={() => setOpen(0)} />
      <Program onOpen={setOpen} />
      <div className="pf-chapters">
        {PORTFOLIO.map((f, i) => (
          <Chapter key={f.slug} film={f} i={i} onOpen={() => setOpen(i)} />
        ))}
      </div>
      <Credits preparedFor={preparedFor} />
      <Theater index={open} onClose={close} onGo={setOpen} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Timecode: writes straight to the DOM at 24fps, no re-renders        */
/* ------------------------------------------------------------------ */
function useTimecode(offset = 0) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const start = performance.now() - offset;
    let raf = 0;
    let last = -1;
    const tick = (now: number) => {
      const f = Math.floor((now - start) / (1000 / 24));
      if (f !== last && ref.current) {
        last = f;
        ref.current.textContent = [
          Math.floor(f / 86400) % 24,
          Math.floor(f / 1440) % 60,
          Math.floor(f / 24) % 60,
          f % 24,
        ]
          .map(pad2)
          .join(":");
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [offset]);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Hero: the shutter opens on a sizzle cut of all six films            */
/* ------------------------------------------------------------------ */
function Hero({ preparedFor, onPlayAll }: { preparedFor: string | null; onPlayAll: () => void }) {
  const reduced = useReducedSafe();
  const tc = useTimecode();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const vidScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const fitRef = useRef<HTMLSpanElement>(null);

  // Size "SELECTED" to the exact width of the screen, every screen, every font.
  useEffect(() => {
    const h1 = titleRef.current;
    const word = fitRef.current;
    if (!h1 || !word) return;
    const fit = () => {
      const avail = h1.clientWidth;
      const fs = parseFloat(getComputedStyle(h1).fontSize);
      const w = word.getBoundingClientRect().width;
      if (!avail || !w) return;
      const byWidth = (fs * avail) / w;
      const byHeight = (window.innerHeight * 0.56) / (2 * 0.84);
      h1.style.fontSize = `${Math.floor(Math.min(byWidth, byHeight) * 0.995)}px`;
    };
    fit();
    document.fonts?.ready.then(fit);
    const ro = new ResizeObserver(fit);
    ro.observe(h1);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  const line = (delay: number) => ({
    initial: { y: reduced ? "0%" : "108%" },
    animate: { y: "0%" },
    transition: { duration: reduced ? 0 : 1.2, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <section ref={ref} className="pf-hero" aria-label="Motion District, selected work">
      <motion.video
        className="pf-hero-vid"
        style={reduced ? undefined : { scale: vidScale }}
        src={pf.sizzle}
        poster={pf.sizzlePoster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="pf-hero-shade" aria-hidden />

      {/* letterbox shutter */}
      <motion.div
        className="pf-bar pf-bar-top"
        initial={{ scaleY: reduced ? 0 : 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: reduced ? 0 : 1.5, delay: 0.2, ease: EASE }}
        aria-hidden
      />
      <motion.div
        className="pf-bar pf-bar-bot"
        initial={{ scaleY: reduced ? 0 : 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: reduced ? 0 : 1.5, delay: 0.2, ease: EASE }}
        aria-hidden
      />

      <motion.div className="pf-hero-hud wrap" style={{ opacity: fade }}>
        <span className="font-mono-label">Portfolio / Vol. 01</span>
        <span className="font-mono-label pf-rec">
          <i aria-hidden /> Rec <span ref={tc} className="tabular-nums">00:00:00:00</span>
        </span>
      </motion.div>

      <motion.div className="pf-hero-copy wrap" style={reduced ? undefined : { y: titleY }}>
        {preparedFor && (
          <motion.p
            className="font-mono-label pf-for"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: reduced ? 0 : 1.5, ease: EASE }}
          >
            <span>Prepared for</span> {preparedFor}
          </motion.p>
        )}
        <h1 ref={titleRef} className="font-display pf-hero-title">
          <span className="pf-mask">
            <motion.span {...line(0.85)}>
              <span ref={fitRef} className="pf-fit">Selected</span>
            </motion.span>
          </span>
          <span className="pf-mask">
            <motion.span {...line(1.0)}>
              <span className="outline-type">Work</span>
              <span className="text-signal">.</span>
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="pf-hero-foot"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: reduced ? 0 : 1.45 }}
        >
          <p className="font-mono-label pf-specs">
            <span>{pad2(N)} films</span>
            <span>{totalRuntime()} runtime</span>
            <span>Shot in 4K</span>
            <span>Tampa, FL</span>
          </p>
          <Magnetic>
            <button type="button" data-h className="btn sig pf-playall" onClick={onPlayAll}>
              <span>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden>
                  <path d="M0 0l10 6-10 6z" />
                </svg>
                Play all, sound on
              </span>
            </button>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Program: the index. Desktop hover floats the film under the cursor  */
/* ------------------------------------------------------------------ */
function Program({ onOpen }: { onOpen: (i: number) => void }) {
  const fine = useMedia("(hover: hover) and (pointer: fine)");
  const reduced = useReducedSafe();
  const [hover, setHover] = useState<number | null>(null);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 26, mass: 0.6 });

  useEffect(() => {
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === hover) v.play().catch(() => {});
      else v.pause();
    });
  }, [hover]);

  return (
    <section
      className="pf-program wrap"
      aria-labelledby="pf-program-h"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <div className="pf-sec-head">
        <p id="pf-program-h" className="eyebrow">The program</p>
        <p className="font-mono-label pf-muted">Select a film to screen it</p>
      </div>

      <ol className="pf-rows">
        {PORTFOLIO.map((f, i) => (
          <motion.li
            key={f.slug}
            initial={{ opacity: 0, y: reduced ? 0 : 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : i * 0.06, ease: EASE }}
          >
            <button
              type="button"
              data-h
              className={`pf-row ${hover !== null && hover !== i ? "is-dim" : ""}`}
              onPointerEnter={() => fine && setHover(i)}
              onFocus={() => fine && setHover(i)}
              onBlur={() => setHover(null)}
              onClick={() => onOpen(i)}
              aria-label={`Screen ${f.title}, ${f.dur}`}
            >
              <span className="pf-row-num font-mono-label">{pad2(i + 1)}</span>
              <span className="pf-row-title font-head">{f.title}</span>
              <span className="pf-row-cat font-mono-label">{f.cat}</span>
              <span className="pf-row-dur font-mono-label tabular-nums">{f.dur}</span>
              <span className="pf-row-arw" aria-hidden>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 12L12 4M5.5 4H12v6.5" />
                </svg>
              </span>
            </button>
          </motion.li>
        ))}
      </ol>

      {fine && (
        <motion.div
          className="pf-float"
          style={{ x: sx, y: sy }}
          animate={{ opacity: hover === null ? 0 : 1, scale: hover === null ? 0.85 : 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          aria-hidden
        >
          {PORTFOLIO.map((f, i) => (
            <video
              key={f.slug}
              ref={(el) => {
                vids.current[i] = el;
              }}
              src={pf.loop(f.slug)}
              poster={pf.poster(f.slug)}
              muted
              loop
              playsInline
              preload="metadata"
              style={{ opacity: hover === i ? 1 : 0 }}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Chapter: one film per screen. The frame opens like an aperture.     */
/* ------------------------------------------------------------------ */
function Chapter({ film, i, onOpen }: { film: PortfolioFilm; i: number; onOpen: () => void }) {
  const reduced = useReducedSafe();
  const ref = useRef<HTMLElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [live, setLive] = useState(false);
  const tc = useTimecode(i * 5131);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.2"] });
  const insY = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const insX = useTransform(scrollYProgress, [0, 1], [9, 0]);
  const round = useTransform(scrollYProgress, [0, 1], [18, 4]);
  const clip = useMotionTemplate`inset(${insY}% ${insX}% round ${round}px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  // Only the film on screen plays. Source attaches on first approach.
  useEffect(() => {
    const el = ref.current;
    const v = vid.current;
    if (!el || !v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true);
          v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const flip = i % 2 === 1;

  return (
    <section ref={ref} className={`pf-ch wrap ${flip ? "is-flip" : ""}`} aria-label={film.title}>
      <motion.header
        className="pf-ch-head"
        initial={{ opacity: 0, y: reduced ? 0 : 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduced ? 0 : 1, ease: EASE }}
      >
        <span className="pf-ch-num font-display outline-type" aria-hidden>
          {pad2(i + 1)}
        </span>
        <div className="pf-ch-title">
          <p className="font-mono-label pf-muted">
            {film.cat} <span className="pf-sep">/</span> {film.dur}
          </p>
          <h2 className="font-head">{film.title}</h2>
        </div>
      </motion.header>

      <motion.button
        type="button"
        data-h
        className="pf-frame"
        style={reduced ? undefined : { clipPath: clip }}
        onClick={onOpen}
        aria-label={`Play ${film.title} with sound`}
      >
        <motion.video
          ref={vid}
          style={reduced ? undefined : { scale }}
          src={live ? pf.loop(film.slug) : undefined}
          poster={pf.poster(film.slug)}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
        />
        <span className="pf-frame-vig" aria-hidden />
        <span className="pf-corner tl" aria-hidden />
        <span className="pf-corner tr" aria-hidden />
        <span className="pf-corner bl" aria-hidden />
        <span className="pf-corner br" aria-hidden />
        <span className="pf-hud pf-hud-tl font-mono-label" aria-hidden>
          <b className="text-signal">{pad2(i + 1)}</b> / {pad2(N)}
        </span>
        <span className="pf-hud pf-hud-tr font-mono-label tabular-nums" aria-hidden>
          <i className="pf-dot" /> <span ref={tc}>00:00:00:00</span>
        </span>
        <span className="pf-play" aria-hidden>
          <span className="pf-play-disc">
            <svg width="12" height="14" viewBox="0 0 10 12" fill="currentColor">
              <path d="M0 0l10 6-10 6z" />
            </svg>
          </span>
          <span className="font-mono-label">Screen it</span>
        </span>
      </motion.button>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Credits: end-of-reel roll before the site footer                    */
/* ------------------------------------------------------------------ */
function Credits({ preparedFor }: { preparedFor: string | null }) {
  const reduced = useReducedSafe();
  const rows: [string, React.ReactNode][] = [
    ...CREW.map((c) => [c.role, `${c.first} ${c.last}`] as [string, React.ReactNode]),
    ["Shot, directed & cut", "In-house, start to finish"],
    ["Based in", "Tampa, FL. Anywhere-ready."],
    [
      "Bookings",
      <a key="m" href="mailto:addison@motiondistrict.co?subject=Project%20inquiry" data-h className="pf-link">
        addison@motiondistrict.co
      </a>,
    ],
    [
      "Follow",
      <a key="ig" href={IG_URL} target="_blank" rel="noopener" data-h className="pf-link">
        @motion.districtco
      </a>,
    ],
  ];
  if (preparedFor) rows.unshift(["Prepared for", preparedFor]);

  return (
    <section className="pf-credits wrap" aria-labelledby="pf-credits-h">
      <p id="pf-credits-h" className="eyebrow">End credits</p>
      <dl className="pf-credit-list">
        {rows.map(([k, v], i) => (
          <motion.div
            key={k}
            className="pf-credit"
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : i * 0.05, ease: EASE }}
          >
            <dt className="font-mono-label">{k}</dt>
            <dd>{v}</dd>
          </motion.div>
        ))}
      </dl>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Theater: full screen, sound on, plays straight through the reel     */
/* ------------------------------------------------------------------ */
function Theater({
  index,
  onClose,
  onGo,
}: {
  index: number | null;
  onClose: () => void;
  onGo: (i: number) => void;
}) {
  const lenis = useLenis();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;
  // Portal to <body>: .on-dark isolates its stacking context, which would trap
  // the theater under the fixed nav and the sound toggle.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus();
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      prevFocus?.focus?.();
    };
  }, [isOpen, lenis]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index < N - 1) onGo(index + 1);
      if (e.key === "ArrowLeft" && index > 0) onGo(index - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, onGo]);

  const f = index !== null ? PORTFOLIO[index] : null;
  const prev = index !== null && index > 0 ? PORTFOLIO[index - 1] : null;
  const next = index !== null && index < N - 1 ? PORTFOLIO[index + 1] : null;

  if (!mounted) return null;
  return createPortal(
    <AnimatePresence>
      {f && index !== null && (
        <motion.div
          key="theater"
          role="dialog"
          aria-modal="true"
          aria-label={`Now screening: ${f.title}`}
          className="pf-theater"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
          onClick={onClose}
        >
          <div className="pf-th-top" onClick={(e) => e.stopPropagation()}>
            <div className="pf-th-now">
              <span className="font-mono-label text-signal">
                Now screening {pad2(index + 1)} / {pad2(N)}
              </span>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={f.slug}
                  className="font-head"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  {f.title}
                </motion.h3>
              </AnimatePresence>
            </div>
            <button ref={closeBtn} type="button" data-h onClick={onClose} className="pf-th-close font-mono-label">
              Close <span aria-hidden>✕</span>
            </button>
          </div>

          <motion.div
            className="pf-th-stage"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: 10 }}
            transition={{ duration: 0.6, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={f.slug}
              src={pf.full(f.slug)}
              poster={pf.poster(f.slug)}
              controls
              autoPlay
              playsInline
              onEnded={() => (next ? onGo(index + 1) : undefined)}
            />
          </motion.div>

          <div className="pf-th-foot" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              data-h
              className="pf-th-nav"
              disabled={!prev}
              onClick={() => prev && onGo(index - 1)}
            >
              <span className="font-mono-label">← Prev</span>
              <span className="pf-th-nav-t">{prev?.title ?? ""}</span>
            </button>

            <div className="pf-pips" aria-hidden>
              {PORTFOLIO.map((p, j) => (
                <i key={p.slug} className={j === index ? "on" : j < index ? "done" : ""} />
              ))}
            </div>

            <button
              type="button"
              data-h
              className="pf-th-nav is-next"
              disabled={!next}
              onClick={() => next && onGo(index + 1)}
            >
              <span className="font-mono-label">Next →</span>
              <span className="pf-th-nav-t">{next?.title ?? "End of reel"}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
