import Link from "next/link";
import Reveal from "@/components/Reveal";

const SERVICES = [
  {
    n: "M/01",
    title: "Production",
    copy: "Cameras, movement, light. Run-and-gun or fully produced — the day is built around the shot list, not the other way around.",
  },
  {
    n: "M/02",
    title: "Direction",
    copy: "Taste is the product. References, shot design, pacing — decided before anyone rolls, so the edit cuts itself.",
  },
  {
    n: "M/03",
    title: "Edit",
    copy: "Cut, grade, sound, captions. Delivered in every aspect ratio the algorithm eats — and one worth watching full-screen.",
  },
];

export default function ServicesBlocks() {
  return (
    <section className="py-28">
      <div className="wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-[clamp(34px,5.4vw,72px)]">
              What we do
            </h2>
            <Link
              href="/services"
              data-h
              className="font-mono-label pb-2 transition-colors hover:text-ink"
              style={{ color: "var(--muted)" }}
            >
              Full services →
            </Link>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div
            className="grid gap-px border md:grid-cols-3"
            style={{ background: "var(--line)", borderColor: "var(--line)" }}
          >
            {SERVICES.map((s) => (
              <div
                key={s.n}
                data-h
                className="group flex min-h-[240px] flex-col justify-between bg-paper p-8 transition-colors duration-500 hover:bg-paper2"
              >
                <div className="font-mono-label flex items-center justify-between" style={{ color: "var(--muted)" }}>
                  <span>{s.n}</span>
                  <span className="text-signal opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    ◆
                  </span>
                </div>
                <div>
                  <h3 className="font-head text-2xl">{s.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                    {s.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
