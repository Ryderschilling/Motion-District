import Reveal from "@/components/Reveal";

const FACTS = [
  ["Base", "Tampa, FL — travels anywhere"],
  ["Crew", "Shooters, directors, editors — one roof"],
  ["Format", "Films, recaps, cutdowns, docs"],
  ["Motto", "Let's get it done"],
];

export default function StudioStrip() {
  return (
    <section className="on-dark">
      <div className="wrap py-24">
        <Reveal>
          <p className="eyebrow">The district</p>
          <h2 className="font-display mt-6 max-w-5xl text-[clamp(30px,4.6vw,64px)]">
            We shoot it. We direct it.{" "}
            <span className="outline-type">We cut it.</span>
          </h2>
          <p className="mt-6 max-w-[560px] text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            No handoffs, no telephone game. The crew that rolls camera is the
            crew that delivers the final cut — which is why every frame sounds
            like the same sentence.
          </p>
        </Reveal>

        <Reveal className="mt-16">
          <div className="grid gap-px border sm:grid-cols-2 lg:grid-cols-4" style={{ background: "var(--line)", borderColor: "var(--line)" }}>
            {FACTS.map(([k, v]) => (
              <div key={k} className="bg-ink p-6">
                <div className="font-mono-label text-signal">{k}</div>
                <div className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {v}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
