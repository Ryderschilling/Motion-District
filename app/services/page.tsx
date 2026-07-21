import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import Ticker from "@/components/Ticker";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Production, direction, and edit — one crew, one voice. How Motion District works and what you get.",
};

const CAPS = [
  {
    n: "M/01",
    title: "Production",
    copy: "Full shoot days built around a shot list. Cinema cameras, movement, lighting — run-and-gun when speed wins, fully produced when the frame demands it.",
    items: ["Shoot days & half days", "On-location anywhere", "Multi-cam events", "B-roll systems"],
  },
  {
    n: "M/02",
    title: "Direction",
    copy: "The taste layer. We decide the references, the pacing, and the story beats before anyone rolls — so the edit cuts itself and the brand stays one voice.",
    items: ["Concept & references", "Shot design", "Talent direction", "Brand voice on film"],
  },
  {
    n: "M/03",
    title: "Edit",
    copy: "Cut, grade, sound design, captions. Mastered wide for the site, cut down vertical for the feed — every aspect ratio the algorithm eats.",
    items: ["Edit & color grade", "Sound design", "Captions & hooks", "Cutdown packages"],
  },
];

const STEPS = [
  ["01", "Brief", "One call or one DM. What it's for, where it lives, when it's due."],
  ["02", "Shoot", "We show up with the plan already cut in our heads. You get raw selects same week."],
  ["03", "Deliver", "Master + cutdowns, graded and captioned. Revisions handled fast, then it ships."],
];

export default function ServicesPage() {
  return (
    <div className="pt-40">
      <div className="wrap pb-20">
        <Reveal>
          <p className="eyebrow">Services</p>
          <h1 className="font-display mt-6 max-w-6xl text-[clamp(40px,7.4vw,110px)]">
            One crew,
            <br />
            <span className="outline-type">one voice</span>
            <span className="text-signal">.</span>
          </h1>
          <p className="mt-8 max-w-[520px] text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            Not a marketplace of freelancers. The people who shoot your film
            direct it and cut it — that&rsquo;s why it feels engineered instead
            of assembled.
          </p>
        </Reveal>
      </div>

      <Ticker />

      {/* capabilities */}
      <div className="wrap py-24">
        <div className="flex flex-col gap-px border" style={{ background: "var(--line)", borderColor: "var(--line)" }}>
          {CAPS.map((c, i) => (
            <div key={c.n} className="bg-paper transition-colors duration-500 hover:bg-paper2">
              <Reveal delay={0.05 * i}>
                <div className="grid gap-6 p-8 md:grid-cols-[120px_1fr_1fr] md:gap-12 md:p-12">
                  <div className="font-mono-label" style={{ color: "var(--muted)" }}>
                    {c.n}
                  </div>
                  <div>
                    <h2 className="font-head text-[clamp(24px,3vw,40px)]">{c.title}</h2>
                    <p className="mt-4 max-w-md text-[14px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      {c.copy}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2 md:pt-2">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-center gap-3 border-b pb-2 text-[13px]" style={{ borderColor: "var(--line)" }}>
                        <span className="text-[9px] text-signal">◆</span>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>

      {/* how it works */}
      <section className="on-dark">
        <div className="wrap py-24">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="font-display mt-6 text-[clamp(32px,5vw,68px)]">
              Brief → shoot → shipped
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px sm:grid-cols-3" style={{ background: "var(--line)" }}>
            {STEPS.map(([n, t, d], i) => (
              <Reveal key={n} delay={0.07 * i}>
                <div className="flex h-full min-h-[210px] flex-col justify-between bg-ink p-7">
                  <span className="font-mono-label text-signal">{n}</span>
                  <div>
                    <h3 className="font-head text-xl">{t}</h3>
                    <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                      {d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-8">
            <p className="font-mono-label" style={{ color: "var(--muted)" }}>
              Typical turnaround: days, not months. Ask about retainers for
              always-on content.
            </p>
            <Magnetic>
              <Link href="/contact" data-h className="btn sig">
                <span>
                  Get a quote <b className="arw">→</b>
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
