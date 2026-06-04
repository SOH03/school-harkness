import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Events } from "@/components/site/Events";
import { Upcoming } from "@/components/site/Upcoming";
import { Gallery } from "@/components/site/Gallery";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nilphamari Govt High School — Batch 2021" },
      { name: "description", content: "More than a batch, a bond forever. The community archive of events, reunions, and memories of Nilphamari Govt High School Class of 2021." },
      { property: "og:title", content: "Nilphamari Govt High School — Batch 2021" },
      { property: "og:description", content: "Events, reunions and memories from the NGHS Class of 2021." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Events />
      <Upcoming />
      <Gallery />
      <Footer />
    </main>
  );
}
