import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import LineReel from "@/components/LineReel";
import SeenWith from "@/components/SeenWith";
import ServicesBlocks from "@/components/ServicesBlocks";
import StudioStrip from "@/components/StudioStrip";
import Reveal from "@/components/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />

      {/* manifesto */}
      <section className="py-28">
        <div className="wrap">
          <Reveal>
            <p className="eyebrow">The point</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-6 max-w-6xl text-[clamp(34px,6vw,88px)]">
              The site is quiet.
              <br />
              <span className="outline-type">The work is loud.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[520px] text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
              Everything below autoplays, follows your cursor, and cuts to
              black — because a production company&rsquo;s website should feel
              like its footage. Scroll on.
            </p>
          </Reveal>
        </div>
      </section>

      <LineReel />
      <SeenWith />
      <ServicesBlocks />
      <StudioStrip />
    </>
  );
}
