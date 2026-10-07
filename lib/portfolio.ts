/**
 * The private portfolio at /portfolio. Not in the nav, not in the sitemap,
 * noindex. It is the link Motion District sends to brands.
 *
 * Films come from Addison's one-pager (Oct 7 2026). Masters were pulled from
 * the Google Drive links on that page and re-encoded:
 *   full  1920 wide, H.264 + AAC, faststart (sound on, in the theater)
 *   loop  6s, 1280 wide, muted (plays in-frame while scrolling)
 *
 * To add a film: drop full/loop/poster into /public/portfolio and add a row.
 * Order here is the order on the page.
 */
export type PortfolioFilm = {
  slug: string;
  title: string;
  cat: string;
  /** runtime, m:ss */
  dur: string;
  seconds: number;
};

export const PORTFOLIO: PortfolioFilm[] = [
  { slug: "hills", title: "Hills × Churchill Downs", cat: "Brand Film", dur: "0:30", seconds: 30 },
  { slug: "tampa", title: "Tampa", cat: "Automotive", dur: "0:13", seconds: 13 },
  { slug: "oh-child", title: "Oh Child", cat: "Music", dur: "2:07", seconds: 127 },
  { slug: "bpn", title: "BPN", cat: "Fitness", dur: "0:24", seconds: 24 },
  { slug: "night-run-revuelto", title: "Revuelto Night Run", cat: "Automotive", dur: "0:15", seconds: 15 },
  { slug: "creative-director", title: "Life as a Creative Director", cat: "Lifestyle", dur: "0:10", seconds: 10 },
];

export const pf = {
  full: (s: string) => `/portfolio/full/${s}.mp4`,
  loop: (s: string) => `/portfolio/loop/${s}.mp4`,
  poster: (s: string) => `/portfolio/posters/${s}.jpg`,
  sizzle: "/portfolio/sizzle.mp4",
  sizzlePoster: "/portfolio/posters/sizzle.jpg",
};

export const pad2 = (n: number) => String(n).padStart(2, "0");

export function totalRuntime() {
  const s = PORTFOLIO.reduce((a, f) => a + f.seconds, 0);
  return `${pad2(Math.floor(s / 60))}:${pad2(s % 60)}`;
}
