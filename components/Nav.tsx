"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IG_URL } from "@/lib/videos";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // close the sheet on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-[clamp(22px,4vw,56px)] py-5 text-white">
          <Link href="/" data-h className="flex items-baseline gap-2.5">
            <span className="font-head text-[15px] tracking-[0.02em]">
              Motion
            </span>
            <span className="font-mono-label text-[8.5px] tracking-[0.42em] opacity-70">
              District
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                data-h
                className="group relative text-[11px] font-medium uppercase tracking-[0.16em] opacity-85 transition-opacity hover:opacity-100"
              >
                {l.label}
                <span
                  className={`absolute -right-2.5 top-0 h-1 w-1 rounded-full bg-signal transition-opacity ${
                    pathname === l.href ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          <button
            data-h
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="on-dark fixed inset-0 z-40 flex flex-col justify-center px-8 md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.06 * i, ease: EASE }}
              >
                <Link
                  href={l.href}
                  className="font-display block py-3 text-[13vw] leading-[0.95]"
                >
                  {l.label}
                  {pathname === l.href && (
                    <span className="ml-3 inline-block h-2 w-2 rounded-full bg-signal align-middle" />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.a
              href={IG_URL}
              target="_blank"
              rel="noopener"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="font-mono-label mt-10 text-signal"
            >
              @motion.districtco <span className="arw-ne">→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
