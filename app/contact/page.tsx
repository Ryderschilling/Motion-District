import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell Motion District what you're making. Short brief, fast answer.",
};

export default function ContactPage() {
  return <ContactForm />;
}
