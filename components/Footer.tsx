import Link from "next/link";
import { IG_URL } from "@/lib/videos";
import Magnetic from "@/components/Magnetic";

export default function Footer() {
  return (
    <footer className="on-dark relative overflow-hidden">
      <div className="wrap pb-10 pt-24">
        <p className="eyebrow">Next move</p>
        <h2 className="font-display mt-6 text-[clamp(52px,11vw,170px)]">
          Let&rsquo;s get
          <br />
          <span className="outline-type">in Motion</span>
          <span className="text-signal">.</span>
        </h2>

        <div className="mt-10 flex flex-wrap items-center gap-5">
          <Magnetic>
            <Link href="/contact" data-h className="btn sig">
              <span>
                Start a project <b className="arw">→</b>
              </span>
            </Link>
          </Magnetic>
          <Magnetic>
            <a href={IG_URL} target="_blank" rel="noopener" data-h className="btn">
              <span>
                @motion.districtco <b className="arw-ne">→</b>
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="mt-24 grid gap-8 border-t pt-8 md:grid-cols-3" style={{ borderColor: "var(--line)" }}>
          <div className="font-mono-label" style={{ color: "var(--muted)" }}>
            Tampa, FL — travels anywhere
          </div>
          <div className="flex gap-7 md:justify-center">
            {[
              ["Work", "/work"],
              ["Services", "/services"],
              ["Contact", "/contact"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                data-h
                className="text-[11px] font-medium uppercase tracking-[0.16em] opacity-80 transition-opacity hover:opacity-100"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="font-mono-label md:text-right" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} Motion District — website built by{" "}
            <a
              href="https://ryderschilling.com"
              target="_blank"
              rel="noopener"
              data-h
              className="underline underline-offset-4 opacity-80 transition-opacity hover:opacity-100"
            >
              Ryder Schilling
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
