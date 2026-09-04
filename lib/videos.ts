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
    slug: "tjr-vlog",
    title: "TJR",
    cat: "Lifestyle",
    blurb: "A weekend in Miami, cut like a film.",
    src: "/video/tjr-vlog.mp4",
    poster: "/video/posters/tjr-vlog.jpg",
    dur: "00:09",
  },
  {
    slug: "ironman",
    title: "Ironman Texas",
    cat: "Documentary",
    blurb: "Matt Johnson's return to Ironman.",
    src: "/video/ironman.mp4",
    poster: "/video/posters/ironman.jpg",
    dur: "00:11",
  },
  {
    slug: "race-my-mind",
    title: "Race My Mind",
    cat: "Lifestyle",
    blurb: "Cars, coast, and the work in between.",
    src: "/video/race-my-mind.mp4",
    poster: "/video/posters/race-my-mind.jpg",
    dur: "00:18",
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
  {
    slug: "cali",
    title: "Cali",
    cat: "Lifestyle",
    blurb: "West coast, hood up.",
    src: "/video/cali.mp4",
    poster: "/video/posters/cali.jpg",
    dur: "00:16",
  },
  {
    slug: "leo-bal",
    title: "Leo Bal",
    cat: "Lifestyle",
    blurb: "Glass, light, and space.",
    src: "/video/leo-bal.mp4",
    poster: "/video/posters/leo-bal.jpg",
    dur: "00:29",
  },
  {
    slug: "nish-993",
    title: "Nish's 993",
    cat: "Automotive",
    blurb: "Air-cooled, up close.",
    src: "/video/nish-993.mp4",
    poster: "/video/posters/nish-993.jpg",
    dur: "00:16",
    vertical: true,
  },
  {
    slug: "pj-edit",
    title: "Private Jet",
    cat: "Lifestyle",
    blurb: "Wheels up.",
    src: "/video/pj-edit.mp4",
    poster: "/video/posters/pj-edit.jpg",
    dur: "00:17",
  },
  {
    slug: "track-workout",
    title: "Track Workout",
    cat: "Fitness",
    blurb: "Repeats under the lights.",
    src: "/video/track-workout.mp4",
    poster: "/video/posters/track-workout.jpg",
    dur: "00:09",
  },
  {
    slug: "kga",
    title: "KGA",
    cat: "Fitness",
    blurb: "Cut in black and white.",
    src: "/video/kga.mp4",
    poster: "/video/posters/kga.jpg",
    dur: "00:18",
    vertical: true,
  },
  {
    slug: "onyx",
    title: "Onyx",
    cat: "Music",
    blurb: "Heavy.",
    src: "/video/onyx.mp4",
    poster: "/video/posters/onyx.jpg",
    dur: "00:25",
    vertical: true,
  },
  {
    slug: "fourth-of-july",
    title: "Fourth of July",
    cat: "Documentary",
    blurb: "Flags up before sunrise.",
    src: "/video/fourth-of-july.mp4",
    poster: "/video/posters/fourth-of-july.jpg",
    dur: "00:14",
    vertical: true,
  },
  {
    slug: "no-screenshots",
    title: "No Screenshots",
    cat: "Documentary",
    blurb: "On stage.",
    src: "/video/no-screenshots.mp4",
    poster: "/video/posters/no-screenshots.jpg",
    dur: "00:23",
  },
  {
    slug: "ditl",
    title: "Day In The Life",
    cat: "Lifestyle",
    blurb: "Start to finish.",
    src: "/video/ditl.mp4",
    poster: "/video/posters/ditl.jpg",
    dur: "00:50",
    vertical: true,
  },
  {
    slug: "just-life",
    title: "Just Life",
    cat: "Lifestyle",
    blurb: "Golden hour, no plan.",
    src: "/video/just-life.mp4",
    poster: "/video/posters/just-life.jpg",
    dur: "00:12",
  },
  {
    slug: "camcorder",
    title: "Camcorder",
    cat: "Lifestyle",
    blurb: "Shot on tape.",
    src: "/video/camcorder.mp4",
    poster: "/video/posters/camcorder.jpg",
    dur: "00:13",
  },
  {
    slug: "v3",
    title: "V3",
    cat: "Lifestyle",
    blurb: "Behind the desk.",
    src: "/video/v3.mp4",
    poster: "/video/posters/v3.jpg",
    dur: "00:34",
  },
  {
    slug: "at-desk",
    title: "At Desk",
    cat: "Lifestyle",
    blurb: "A thought, typed out.",
    src: "/video/at-desk.mp4",
    poster: "/video/posters/at-desk.jpg",
    dur: "00:10",
    vertical: true,
  },
];

/** The four films the scroll-line weaves through on the homepage. */
export const REEL_FILMS = ["tjr-vlog", "ironman", "race-my-mind", "the-grind"]
  .map((s) => FILMS.find((f) => f.slug === s)!)
  .filter(Boolean);

export const IG_URL = "https://www.instagram.com/motion.districtco/";
