import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export type EventPhoto = { id: string; url: string; caption: string };
export type EventItem = {
  id: string;
  slug: string;
  year: string;
  title: string;
  date: string;
  description: string;
  cover: string;
  photos: EventPhoto[];
};

// Fallback data used when Firestore isn't configured.
export const sampleEvents: EventItem[] = [
  {
    id: "iftar-2025",
    slug: "iftar-2025",
    year: "2025",
    title: "Iftar party",
    date: "March 2025",
    description:
      "An evening of faith, friendship, and togetherness.🌙",
    cover: g6,
    photos: [
      { id: "1", url: g6, caption: "Iftar 2025" },
      { id: "2", url: g2, caption: "Iftar 2025" },
    ],
  },
  {
    id: "reunion-2021",
    slug: "reunion-2021",
    year: "2021",
    title: "Batch Reunion",
    date: "one-day in 2021",
    description:
      "Different years, same faces, same friendship. Batch 21, together through time.",
    cover: g5,
    photos: [{ id: "1", url: g5, caption: "Rag day and reunions" }],
  },
  {
    id: "cricket-2026",
    slug: "cricket-2026",
    year: "2026",
    title: "Futsal Tournament",
    date: "May 2026",
    description:
      "Solitary Wolves,Champion - NGHS Batch'21 Futsal Tournament, Season 1",
    cover: g3,
    photos: [{ id: "1", url: g3, caption: "Tournament Champions " }],
  },
  {
    id: "iftar-2026",
    slug: "iftar-2026",
    year: "2026",
    title: "Iftar Gathering",
    date: "March 2026",
    description:
      "Breaking fast together, exchanging stories — the kind of event you don't want to end.",
    cover: g4,
    photos: [
      { id: "1", url: g4, caption: "Iftar 2026" },
      { id: "2", url: g1, caption: "Day and morning shift" },
    ],
  },
];
