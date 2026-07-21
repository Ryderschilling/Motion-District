# Motion District — website

Cinematic production agency site. Next.js 15 + Tailwind 4 + framer-motion + Lenis.

## Run it

```bash
npm install
npm run dev
```

→ http://localhost:3000

## Deploy

Push to GitHub → import in Vercel. Zero config needed.

**Before real launch:**

1. Buy the domain and update `metadataBase` in `app/layout.tsx` (currently `motiondistrict.co` placeholder).
2. Swap `CONTACT_EMAIL` in `components/ContactForm.tsx` for their real inbox (v1 submit opens a prefilled email — wire Resend or Formspree for a true backend later).
3. Move video loops to Mux or Cloudflare Stream and swap the `src` values in `lib/videos.ts` (raw MP4s off Vercel will eat bandwidth at scale — fine for v1/preview).

## Where things live

- `lib/videos.ts` — the film archive. Add a film = drop an MP4 in `public/video`, a poster in `public/video/posters`, add an entry.
- `components/CursorField.tsx` — the background cursor-follow layer (the real background, behind everything). Dark sections get the inverted glow via `.on-dark::before` in `globals.css`.
- `components/LineReel.tsx` — homepage scroll-drawn line through the reel. Card positions + the path share one coordinate space (`SPACE`), tweak `CARDS`/`JOURNEY` together.
- `components/SeenWith.tsx` — "as seen with" names, pulled from their IG. Swap/extend `NAMES`.
- Palette + type voices: `app/globals.css` (`@theme` block).

## Brand rules (do not drift)

- Paper `#F3F2EE` chrome, true-black cinema sections, Signal `#E5FF00` at ~2% max.
- Teal/amber only ever inside footage, never UI.
- One ease curve everywhere: `cubic-bezier(.22,1,.36,1)`.
