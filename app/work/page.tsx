import type { Metadata } from "next";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "The Motion District archive — automotive, music, fitness, lifestyle, documentary. Hover to play.",
};

export default function WorkPage() {
  return <WorkGrid />;
}
