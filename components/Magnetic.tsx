"use client";

/**
 * Magnetic wrapper — kept as a pass-through so buttons stay put.
 * (Cursor-follow lift was removed by request: felt glitchy on lift.)
 * API preserved so existing call sites (className, strength) don't break.
 */
export default function Magnetic({
  children,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  return <div className={`inline-block ${className ?? ""}`}>{children}</div>;
}
