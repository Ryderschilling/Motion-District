"use client";

import { useRef } from "react";
import type { Film } from "@/lib/videos";

/**
 * Hover-to-play film tile. Grayscale melts to color, letterbox bars breathe in.
 * No title overlay — the frame carries it. Click hands the film to the
 * lightbox (sound on), where the title and category live.
 */
export default function WorkTile({
  film,
  onOpen,
  className,
  aspect = "aspect-video",
}: {
  film: Film;
  onOpen?: (f: Film) => void;
  className?: string;
  aspect?: string;
}) {
  const vidRef = useRef<HTMLVideoElement>(null);

  const play = () => {
    const v = vidRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };
  const stop = () => {
    const v = vidRef.current;
    if (!v) return;
    v.pause();
  };

  return (
    <button
      type="button"
      data-h
      onPointerEnter={play}
      onPointerLeave={stop}
      onFocus={play}
      onBlur={stop}
      onClick={() => onOpen?.(film)}
      className={`tile ${aspect} ${className ?? ""}`}
      aria-label={`Play ${film.title}`}
    >
      <video
        ref={vidRef}
        src={film.src}
        poster={film.poster}
        muted
        loop
        playsInline
        preload="none"
      />
      <span className="dur">{film.dur}</span>
      <span className="chip">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" aria-hidden>
          <path d="M0 0l10 6-10 6z" />
        </svg>
      </span>
    </button>
  );
}
