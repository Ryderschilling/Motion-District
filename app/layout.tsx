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
  metadataBase: new URL("https://www.motiondistrict.co"),
  alternates: { canonical: "/" },
  title: {
    default: "Motion District | Cinematic Production, Tampa",
    template: "%s | Motion District",
  },
  description:
    "One-stop shop for cinematic production. Brand films, events, automotive and fitness, shot, directed, and cut in-house. Tampa-based, anywhere-ready.",
  openGraph: {
    title: "Motion District | Cinematic Production",
    url: "/",
    siteName: "Motion District",
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
  verification: { google: "E6HsbdIJDZTxTlDAmSeNX9M-MVxM241KoG75xVqHyR8" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
};

const ORG_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.motiondistrict.co/#business",
  name: "Motion District",
  url: "https://www.motiondistrict.co/",
  logo: "https://www.motiondistrict.co/icons/icon-512.png",
  image: "https://www.motiondistrict.co/og.jpg",
  email: "addison@motiondistrict.co",
  description:
    "Cinematic production company. Brand films, events, automotive and fitness, shot, directed and cut in-house.",
  areaServed: { "@type": "City", name: "Tampa" },
  sameAs: ["https://www.instagram.com/motion.districtco/"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_LD) }}
        />
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
