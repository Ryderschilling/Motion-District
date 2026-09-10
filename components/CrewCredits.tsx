"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { CREW, srcSet } from "@/lib/crew";

/**
 * Homepage crew section, styled as an end-credits roll.
 *
 * Fine pointer: hover a name and his photo trails the cursor in a letterboxed
 * frame (lerped, tilts with horizontal speed). Swapping rows wipes the frame
 * to the next person instead of cutting.
 * Touch / narrow: each row carries its own 2.35:1 anamorphic crop that opens
 * like a shutter when the row scrolls into view.
 */
export default function CrewCredits() {
  const secRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  // trailing frame: lerp toward the pointer, tilt with velocity
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0, r: 0 });
  const raf = useRef(0);
  const primed = useRef(false);

  const loop = () => {
    const el = floatRef.current;
    if (!el) return;
    const p = pos.current;
    const t = target.current;
    const dx = t.x - p.x;
    p.x += dx * 0.14;
    p.y += (t.y - p.y) * 0.14;
    p.r += (Math.max(-9, Math.min(9, dx * 0.06)) - p.r) * 0.12;
    el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${p.r}deg)`;
    if (Math.abs(dx) > 0.2 || Math.abs(t.y - p.y) > 0.2 || Math.abs(p.r) > 0.05) {
      raf.current = requestAnimationFrame(loop);
    } else {
      raf.current = 0;
    }
  };

  const aim = (clientX: number, clientY: number) => {
    const sec = secRef.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    target.current = { x: clientX - r.left, y: clientY - r.top };
    if (!primed.current) {
      // first entry: appear at the pointer, don't fly in from the corner
      pos.current = { ...target.current, r: 0 };
      primed.current = true;
    }
    if (!raf.current) raf.current = requestAnimationFrame(loop);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // touch strips: shutter opens once per row as it enters
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.classList.add("js-crew");
    const rows = Array.from(list.querySelectorAll<HTMLElement>(".crew-row"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting || e.boundingClientRect.bottom < 0) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -15% 0px" }
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={secRef} className="crew on-dark overflow-hidden" aria-labelledby="crew-heading">
      <div className="wrap py-28">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">The crew</p>
              <h2 id="crew-heading" className="font-display mt-6 text-[clamp(34px,5.4vw,76px)]">
                Behind
                <br />
                <span className="outline-type">the camera</span>
                <span className="text-signal">.</span>
              </h2>
            </div>
            <Link
              href="/about"
              data-h
              className="font-mono-label pb-2 underline-offset-4 hover:underline"
              style={{ color: "var(--muted-strong)" }}
            >
              Meet the crew →
            </Link>
          </div>
        </Reveal>

        <ul
          ref={listRef}
          className="crew-list mt-16"
          onPointerMove={(e) => e.pointerType === "mouse" && aim(e.clientX, e.clientY)}
          onPointerLeave={() => {
            setActive(null);
            primed.current = false;
          }}
        >
          {CREW.map((p, i) => (
            <li key={p.slug}>
              <Link
                href={`/about#${p.slug}`}
                data-h
                className={`crew-row ${active === i ? "is-active" : ""}`}
                onPointerEnter={(e) => {
                  if (e.pointerType !== "mouse") return;
                  aim(e.clientX, e.clientY);
                  setActive(i);
                }}
                onFocus={(e) => {
                  // keyboard: park the frame at the right edge of the row
                  const r = e.currentTarget.getBoundingClientRect();
                  aim(r.right - Math.min(260, r.width * 0.22), r.top + r.height / 2);
                  setActive(i);
                }}
                onBlur={() => setActive(null)}
              >
                <span className="crew-idx font-mono-label" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="crew-name font-display">
                  <span className="crew-name-in">
                    <span className="block lg:inline">{p.first}</span>{" "}
                    <span className="block lg:inline">{p.last}</span>
                  </span>
                </span>

                <span className="crew-meta">
                  <span className="font-mono-label block text-[10px]" style={{ color: "var(--fg)" }}>
                    {p.role}
                  </span>
                  <span className="mt-2 block text-[14px] leading-relaxed" style={{ color: "var(--muted-strong)" }}>
                    {p.teaser}
                  </span>
                </span>

                <span className="crew-chip" aria-hidden>
                  →
                </span>

                <span className="crew-strip" aria-hidden>
                  <img
                    src={`${p.photo}-640.webp`}
                    srcSet={srcSet(p.photo)}
                    sizes="100vw"
                    alt=""
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: p.strip }}
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* trailing frame (fine pointer only, decorative: names are the content) */}
      <div ref={floatRef} className={`crew-float ${active !== null ? "is-on" : ""}`} aria-hidden>
        {CREW.map((p, i) => (
          <img
            key={p.slug}
            src={`${p.photo}-640.webp`}
            alt=""
            loading="lazy"
            decoding="async"
            className={active === i ? "is-cur" : active !== null && i < active ? "is-past" : ""}
            style={{ objectPosition: p.frame }}
          />
        ))}
        <span className="crew-float-bar top" />
        <span className="crew-float-bar bot">
          <span>{active !== null ? String(active + 1).padStart(2, "0") : "01"} / 03</span>
          <span>{active !== null ? `${CREW[active].first} ${CREW[active].last}` : ""}</span>
        </span>
      </div>
    </section>
  );
}
