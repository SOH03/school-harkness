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
    id: "farewell-2020",
    slug: "farewell-2020",
    year: "2020",
    title: "Farewell Day",
    date: "March 2020",
    description:
      "The last assembly, the last bell. Tears, hugs, and a promise to never lose touch.",
    cover: g6,
    photos: [
      { id: "1", url: g6, caption: "Farewell, see you soon" },
      { id: "2", url: g2, caption: "Last day of class" },
    ],
  },
  {
    id: "reunion-2022",
    slug: "reunion-2022",
    year: "2022",
    title: "First Reunion",
    date: "December 2022",
    description:
      "Two years later, a small picnic by the riverside became the beginning of a tradition.",
    cover: g5,
    photos: [{ id: "1", url: g5, caption: "Reunion dinner, 2023" }],
  },
  {
    id: "cricket-2023",
    slug: "cricket-2023",
    year: "2023",
    title: "Cricket Tournament",
    date: "October 2023",
    description:
      "Old rivalries on a new pitch. Section A vs Section B — the rematch we waited for.",
    cover: g3,
    photos: [{ id: "1", url: g3, caption: "Sports Day finals" }],
  },
  {
    id: "iftar-2024",
    slug: "iftar-2024",
    year: "2024",
    title: "Iftar Gathering",
    date: "April 2024",
    description:
      "Breaking fast together, exchanging stories — the kind of evening you don't want to end.",
    cover: g4,
    photos: [
      { id: "1", url: g4, caption: "Annual cultural night" },
      { id: "2", url: g1, caption: "Graduation, 2020" },
    ],
  },
];
