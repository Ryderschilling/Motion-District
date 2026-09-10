import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import CrewScene from "@/components/CrewScene";
import { CREW } from "@/lib/crew";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet the crew behind Motion District: Smith Rice, founder and director; Addison Moore, co-founder and operations; Gavin Frantz, lead videographer and on-set director.",
};

export default function AboutPage() {
  return (
    <div className="pt-40">
      <div className="wrap pb-24 pin:pb-32">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="font-display mt-6 max-w-6xl text-[clamp(44px,8.4vw,128px)]">
            Meet the
            <br />
            <span className="outline-type">crew</span>
            <span className="text-signal">.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-10">
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
      </div>

      <div className="scenes">
        {CREW.map((p, i) => (
          <CrewScene
            key={p.slug}
            person={p}
            index={i}
            total={CREW.length}
            dark={i % 2 === 0}
            last={i === CREW.length - 1}
          />
        ))}
      </div>

      {/* that's a wrap */}
      <section>
        <div className="wrap flex flex-wrap items-end justify-between gap-10 py-28">
          <Reveal>
            <p className="eyebrow">That&rsquo;s a wrap</p>
            <h2 className="font-display mt-6 max-w-4xl text-[clamp(34px,5.4vw,76px)]">
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
