/**
 * The crew. Bios are Smith's own copy (supplied 2026-09-10), punctuation only.
 * Photos live in /public/crew at 640w and 1240w.
 *
 * `strip` is the object-position for the 2.35:1 mobile crop on the homepage,
 * `frame` is the object-position for the 4:5 portrait frame on /about.
 */
export type CrewMember = {
  slug: string;
  first: string;
  last: string;
  role: string;
  teaser: string;
  bio: string[];
  photo: string;
  alt: string;
  strip: string;
  frame: string;
};

export const CREW: CrewMember[] = [
  {
    slug: "smith-rice",
    first: "Smith",
    last: "Rice",
    role: "Founder, Director",
    teaser: "Directs every production, from first scout to final grade.",
    bio: [
      "Smith started Motion District after seven years behind the camera, shooting and cutting for brands that wanted their work to feel less like content and more like cinema. Seven years in, that’s still the whole point.",
      "Smith directs the studio’s productions from first scout to final grade, and his job is simple: make sure the finished piece looks the way your brand wants to be remembered.",
    ],
    photo: "/crew/smith-rice",
    alt: "Smith Rice, in sunglasses and a black tee, smiling on a cobblestone street",
    strip: "50% 22%",
    frame: "50% 30%",
  },
  {
    slug: "addison-moore",
    first: "Addison",
    last: "Moore",
    role: "Co-Founder, Operations",
    teaser: "Builds the machinery that keeps MD running like a studio, not a side project.",
    bio: [
      "Addison is the reason Motion District runs like a studio and not a side project. He co-founded Elias Collective, a private equity real estate firm, and still manages its fund, so he came to MD already fluent in systems, capital, and keeping a lot of moving pieces moving.",
      "Here, he builds the machinery behind the work: the pipelines, the client management, the schedules that make sure every project flows from first call to final delivery without anything slipping through.",
    ],
    photo: "/crew/addison-moore",
    alt: "Addison Moore mid-conversation at a meeting table, wearing an Elias Collective quarter-zip",
    strip: "45% 36%",
    frame: "40% 50%",
  },
  {
    slug: "gavin-frantz",
    first: "Gavin",
    last: "Frantz",
    role: "Lead Videographer, On-Set Director",
    teaser: "Holds the camera when it counts and runs the set from the inside.",
    bio: [
      "Gavin is the one holding the camera when it counts. As Motion District’s lead videographer and on-set director, he runs production days from the inside: framing the shot, steering the creative when it needs a push, and keeping the set calm enough that the client never sees the work behind the work.",
      "He arrived with a portfolio of past client work that speaks for itself, and he’s the connective tissue between one project and the next, making sure what we learn on Tuesday’s shoot shows up in Thursday’s.",
    ],
    photo: "/crew/gavin-frantz",
    alt: "Gavin Frantz in a Yankees cap, seated at an outdoor table at night under string lights",
    strip: "55% 40%",
    frame: "55% 45%",
  },
];

export const srcSet = (base: string) => `${base}-640.webp 640w, ${base}-1240.webp 1240w`;
