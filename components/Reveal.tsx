"use client";

import { motion } from "framer-motion";
import { useReducedSafe } from "@/lib/useReducedSafe";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Shared entrance: everything eases in on the same cinematic curve.
 * Reduced motion is read after mount so server and client HTML match.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedSafe();
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={reduced ? { duration: 0 } : { duration: 1, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
