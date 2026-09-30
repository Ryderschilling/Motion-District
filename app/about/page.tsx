import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import CrewScene from "@/components/CrewScene";
import { CREW } from "@/lib/crew";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About",
  description:
    "Meet the crew behind Motion District: Smith Rice, founder and director; Addison Moore, co-founder and operations; Gavin Frantz, lead videographer and on-set director.",
};

export default function AboutPage() {
  return (
    <div>
      {/* hero: one full screen on desktop, content sits on the bottom edge */}
      <section className="wrap flex flex-col justify-end pb-24 pt-40 pin:min-h-svh pin:pb-[9vh] pin:pt-32">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="font-display mt-6 text-[clamp(40px,12vw,96px)] pin:text-[min(11vw,21vh,176px)]">
            Meet the
            <br />
            <span className="outline-type">crew</span>
            <span className="text-signal">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-10 pin:mt-[5vh]">
            <p className="max-w-[520px] text-[clamp(15px,1.3vw,17px)] leading-relaxed" style={{ color: "var(--muted-strong)" }}>
              One directs. One builds the machine behind the work. One holds the
              camera when it counts. These are the three people behind Motion
              District.
            </p>
            <ol className="font-mono-label flex flex-col" style={{ color: "var(--muted-strong)" }}>
              {CREW.map((p, i) => (
                <li key={p.slug}>
                  <a href={`#${p.slug}`} data-h className="inline-flex min-h-7 items-center gap-3 transition-colors hover:text-ink">
                    <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      {p.first} {p.last}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </section>

      <div className="scenes">
        {CREW.map((p, i) => (
          <CrewScene
            key={p.slug}
            person={p}
            index={i}
            dark={i % 2 === 0}
            last={i === CREW.length - 1}
          />
        ))}
      </div>

      {/* that's a wrap */}
      <section className="pin:flex pin:min-h-svh pin:items-center">
        <div className="wrap flex w-full flex-col items-start gap-10 py-28 pin:gap-[6vh] pin:py-[10vh]">
          <Reveal>
            <p className="eyebrow">That&rsquo;s a wrap</p>
            <h2 className="font-display mt-6 text-[clamp(34px,8.5vw,76px)] pin:text-[min(6vw,13vh,80px)]">
              Now picture your
              <br />
              <span className="outline-type">brand in the frame</span>
              <span className="text-signal">.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Magnetic>
              <Link href="/work" data-h className="btn">
                <span>
                  See the work <b className="arw">→</b>
                </span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
