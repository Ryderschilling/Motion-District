import type { Metadata, Viewport } from "next";
import { Archivo, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CursorField from "@/components/CursorField";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SiteAudio from "@/components/SiteAudio";

// Self-hosted at build time via next/font — no runtime Google request.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  // TODO(ryder): swap for the real domain when it's bought
  metadataBase: new URL("https://motiondistrict.co"),
  title: {
    default: "Motion District — Cinematic Production, Tampa",
    template: "%s — Motion District",
  },
  description:
    "One-stop shop for cinematic production. Brand films, events, automotive, fitness — shot, directed, and cut in-house. Tampa-based, anywhere-ready.",
  openGraph: {
    title: "Motion District — Cinematic Production",
    description:
      "One-stop shop for cinematic production. Shot, directed, and cut in-house.",
    images: ["/og.jpg"],
    type: "website",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${archivo.variable} ${space.variable} ${jbmono.variable} antialiased`}
      >
        <CursorField />
        <div className="grain" aria-hidden />
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <SiteAudio />
      </body>
    </html>
  );
}
