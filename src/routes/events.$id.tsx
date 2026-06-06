import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PhotoLightbox } from "@/components/site/PhotoLightbox";
import { useEvent } from "@/lib/use-firebase-data";
import { sampleEvents } from "@/lib/events-data";

export const Route = createFileRoute("/events/$id")({
  loader: ({ params }) => {
    const found = sampleEvents.find((e) => e.slug === params.id);
    return { fallback: found ?? null };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.fallback?.title ?? "Event"} — NGHS Batch 2021` },
      {
        name: "description",
        content: loaderData?.fallback?.description ?? "Event from the NGHS Batch 2021 archive.",
      },
    ],
  }),
  component: EventDetail,
  errorComponent: ({ error }) => (
    <div className="p-10 text-center">Failed to load: {error.message}</div>
  ),
  notFoundComponent: () => <div className="p-10 text-center">Event not found.</div>,
});

function EventDetail() {
  const { id } = Route.useParams();
  const event = useEvent(id);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!event) throw notFound();

  const openAt = (n: number) => {
    setLightboxIndex(n);
    setLightboxOpen(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <article className="mx-auto max-w-5xl px-6 py-16 md:py-24">
        <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
          ← Back to archive
        </Link>
        <header className="mt-6 mb-12 border-b border-border pb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
            {event.date}
          </p>
          <h1 className="font-display text-5xl md:text-7xl text-primary leading-[0.95]">
            {event.title}
          </h1>
          <p className="font-serif italic text-xl md:text-2xl mt-6 text-foreground/80 max-w-3xl">
            {event.description}
          </p>
        </header>

        {event.cover && (
         <img
           src={event.cover}
           alt={event.title}
         className="w-full rounded-lg mb-12 object-contain bg-muted"
         />
         )}

        <section>
          <h2 className="font-display text-3xl md:text-4xl mb-6">Photos</h2>
          {event.photos.length === 0 ? (
            <p className="text-muted-foreground">No photos yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {event.photos.map((p, n) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => openAt(n)}
                  className="group relative overflow-hidden rounded-lg bg-muted text-left"
                  aria-label={`Open photo: ${p.caption || "photo"}`}
                >
                  <img
                    src={p.url}
                    alt={p.caption}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {p.caption && (
                    <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white text-xs md:text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      {p.caption}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </section>
      </article>

      <PhotoLightbox
        photos={event.photos.map((p) => ({ url: p.url, caption: p.caption }))}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        open={lightboxOpen}
        onOpenChange={setLightboxOpen}
      />

      <Footer />
    </main>
  );
}
