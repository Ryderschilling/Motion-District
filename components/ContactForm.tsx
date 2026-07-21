"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { IG_URL } from "@/lib/videos";

/**
 * v1 submit: opens a prefilled email. TODO(ryder): wire Resend/Formspree
 * and swap CONTACT_EMAIL for Motion District's real inbox.
 */
const CONTACT_EMAIL = "hello@motiondistrict.co";

const TYPES = ["Brand film", "Event", "Automotive", "Fitness", "Social package", "Other"];
const BUDGETS = ["< $1k", "$1k – $3k", "$3k – $10k", "$10k+", "Let's talk"];

export default function ContactForm() {
  const [type, setType] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const toggleType = (t: string) =>
    setType((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const brand = String(fd.get("brand") || "").trim();
    const message = String(fd.get("message") || "").trim();
    const timeline = String(fd.get("timeline") || "").trim();

    if (!name || !message) {
      setError("Name and a sentence about the project — that's the minimum.");
      return;
    }
    setError("");

    const body = [
      `Name: ${name}`,
      brand && `Brand: ${brand}`,
      type.length && `Project type: ${type.join(", ")}`,
      budget && `Budget: ${budget}`,
      timeline && `Timeline: ${timeline}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `Project brief — ${brand || name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="wrap grid gap-16 pb-28 pt-40 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="font-display mt-6 text-[clamp(44px,7.4vw,110px)]">
            Start
            <br />
            something<span className="text-signal">.</span>
          </h1>
          <p className="mt-7 max-w-[440px] text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            Short brief, fast answer. Tell us what it&rsquo;s for and when it
            needs to exist — we&rsquo;ll come back with an approach and a
            number.
          </p>
        </Reveal>

        <Reveal className="mt-12" delay={0.1}>
          {sent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border p-8"
              style={{ borderColor: "var(--line)" }}
            >
              <p className="font-mono-label text-signal">Brief drafted ◆</p>
              <p className="mt-3 text-[15px] leading-relaxed">
                Your email app just opened with everything filled in — hit send
                and it&rsquo;s rolling. Prefer DMs?{" "}
                <a href={IG_URL} target="_blank" rel="noopener" data-h className="underline">
                  @motion.districtco
                </a>
              </p>
            </motion.div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <input name="name" placeholder="Your name *" className="field" required />
                <input name="brand" placeholder="Brand / company" className="field" />
              </div>

              <div>
                <p className="font-mono-label mb-3" style={{ color: "var(--muted)" }}>
                  Project type
                </p>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map((t) => (
                    <button
                      type="button"
                      key={t}
                      data-h
                      onClick={() => toggleType(t)}
                      className={`chip-toggle ${type.includes(t) ? "active" : ""}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-mono-label mb-3" style={{ color: "var(--muted)" }}>
                  Budget range
                </p>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      data-h
                      onClick={() => setBudget(budget === b ? "" : b)}
                      className={`chip-toggle ${budget === b ? "active" : ""}`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <input name="timeline" placeholder="Timeline — when does it need to exist?" className="field" />
              <textarea
                name="message"
                placeholder="The project, in a few sentences *"
                rows={4}
                className="field resize-none"
                required
              />

              {error && (
                <p className="font-mono-label" style={{ color: "#b45309" }}>
                  {error}
                </p>
              )}

              <Magnetic className="self-start">
                <button type="submit" data-h className="btn solid">
                  <span>
                    Send the brief <b className="arw">→</b>
                  </span>
                </button>
              </Magnetic>
            </form>
          )}
        </Reveal>
      </div>

      {/* side rail */}
      <Reveal delay={0.15}>
        <div className="flex h-full flex-col justify-between gap-12 border-l pl-10 max-lg:border-none max-lg:pl-0" style={{ borderColor: "var(--line)" }}>
          <div className="flex flex-col gap-9">
            <div>
              <p className="font-mono-label" style={{ color: "var(--muted)" }}>
                Fastest lane
              </p>
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener"
                data-h
                className="font-head mt-2 block text-2xl transition-colors hover:text-signal"
              >
                DM @motion.districtco <span className="arw-ne">→</span>
              </a>
            </div>
            <div>
              <p className="font-mono-label" style={{ color: "var(--muted)" }}>
                Email
              </p>
              <a href={`mailto:${CONTACT_EMAIL}`} data-h className="font-head mt-2 block text-2xl">
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="font-mono-label" style={{ color: "var(--muted)" }}>
                Base
              </p>
              <p className="font-head mt-2 text-2xl">Tampa, FL</p>
              <p className="mt-1 text-[13px]" style={{ color: "var(--muted)" }}>
                Travel-ready. NYC proven.
              </p>
            </div>
          </div>

          <p className="font-mono-label leading-relaxed" style={{ color: "var(--muted)" }}>
            Response time: fast.
            <br />
            Slow answers don&rsquo;t make films.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
