import type { Metadata } from "next";
import Portfolio from "@/components/portfolio/Portfolio";
import "./portfolio.css";

/* Private link: kept out of search, the sitemap and the nav on purpose. */
export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected films from Motion District. Shot, directed and cut in-house in Tampa.",
  alternates: { canonical: "/portfolio" },
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    title: "Selected Work | Motion District",
    description: "Six films. Shot, directed and cut in-house.",
    url: "/portfolio",
    siteName: "Motion District",
    images: [{ url: "/portfolio/og.jpg", width: 1200, height: 630, alt: "Motion District, Selected Work" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Work | Motion District",
    description: "Six films. Shot, directed and cut in-house.",
    images: ["/portfolio/og.jpg"],
  },
};

/** ?for=Comfrt prints "Prepared for Comfrt" in the hero. Letters, numbers and a few marks only. */
function cleanFor(v: string | string[] | undefined) {
  const raw = Array.isArray(v) ? v[0] : v;
  if (!raw) return null;
  const s = raw.replace(/[^\p{L}\p{N} &.'+-]/gu, "").trim().slice(0, 32);
  return s || null;
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  return <Portfolio preparedFor={cleanFor(sp.for)} />;
}
