export type Film = {
  slug: string;
  title: string;
  cat: "Automotive" | "Music" | "Fitness" | "Lifestyle" | "Documentary";
  blurb: string;
  src: string;
  poster: string;
  dur: string;
  /** true = vertical 9:16 source (crops beautifully to any frame) */
  vertical?: boolean;
};

/**
 * v1 serves straight from /public.
 * Before real launch: upload to Mux/Cloudflare Stream and swap `src`.
 */
export const FILMS: Film[] = [
  {
    slug: "twofortyfive",
    title: "2:45 AM",
    cat: "Lifestyle",
    blurb: "The city after everyone leaves.",
    src: "/video/twofortyfive.mp4",
    poster: "/video/posters/twofortyfive.jpg",
    dur: "00:28",
  },
  {
    slug: "run-out",
    title: "Run Out",
    cat: "Music",
    blurb: "Daniel Allan, live in NYC.",
    src: "/video/run-out.mp4",
    poster: "/video/posters/run-out.jpg",
    dur: "00:22",
  },
  {
    slug: "night-run",
    title: "Night Run",
    cat: "Automotive",
    blurb: "German steel, empty highways.",
    src: "/video/night-run.mp4",
    poster: "/video/posters/night-run.jpg",
    dur: "00:09",
    vertical: true,
  },
  {
    slug: "the-grind",
    title: "The Grind",
    cat: "Fitness",
    blurb: "Practicing what we preach.",
    src: "/video/the-grind.mp4",
    poster: "/video/posters/the-grind.jpg",
    dur: "00:24",
  },
  {
    slug: "hundred-miles",
    title: "100 Miles",
    cat: "Documentary",
    blurb: "Matt Johnson & the NELK Boys — 100 miles for cancer.",
    src: "/video/hundred-miles.mp4",
    poster: "/video/posters/hundred-miles.jpg",
    dur: "00:23",
  },
  {
    slug: "founders",
    title: "Founders",
    cat: "Lifestyle",
    blurb: "A day in the life, graded like a film.",
    src: "/video/founders.mp4",
    poster: "/video/posters/founders.jpg",
    dur: "00:36",
  },
  {
    slug: "first-light",
    title: "First Light",
    cat: "Lifestyle",
    blurb: "Rods up before the sun.",
    src: "/video/first-light.mp4",
    poster: "/video/posters/first-light.jpg",
    dur: "00:10",
  },
];

/** The four films the scroll-line weaves through on the homepage. */
export const REEL_FILMS = ["twofortyfive", "run-out", "night-run", "the-grind"]
  .map((s) => FILMS.find((f) => f.slug === s)!)
  .filter(Boolean);

export const IG_URL = "https://www.instagram.com/motion.districtco/";
