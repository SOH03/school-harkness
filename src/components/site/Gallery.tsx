import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import { PhotoLightbox } from "./PhotoLightbox";

const photos = [
  { url: g1, caption: "Day and Morning shift" },
  { url: g2, caption: "Iftar party 2025" },
  { url: g3, caption: "Solitary Wolves,Champion" },
  { url: g4, caption: "Iftar party 2026" },
  { url: g5, caption: "Rag day and other reunions " },
  { url: g6, caption: "Iftar party 2025" },
];

export function Gallery() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [openLightbox, setOpenLightbox] = useState(false);

  useEffect(() => {
    if (paused || openLightbox) return;
    const t = setInterval(() => setI((p) => (p + 1) % photos.length), 4000);
    return () => clearInterval(t);
  }, [paused, openLightbox]);

  const current = photos[i];

  return (
    <section id="gallery" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              Frozen In Time
            </p>
            <h2 className="font-display text-5xl md:text-7xl">Gallery</h2>
          </div>
        </div>

        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            onClick={() => setOpenLightbox(true)}
            className="block w-full group"
            aria-label="View photo"
          >
            <figure
             key={i}
               className="relative overflow-hidden rounded-xl bg-muted shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)] animate-fade-in"
              style={{ animation: "fade-in 0.6s ease-out, float 6s ease-in-out infinite" }}
           >
          <img
            src={current.url}
              alt={current.caption}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.02]"
             />
              </figure>
            
          </button>

          <p className="mt-5 text-center font-serif italic text-lg md:text-xl text-foreground/80">
            {current.caption}
          </p>

          <button
            aria-label="Previous photo"
            onClick={() => setI((p) => (p - 1 + photos.length) % photos.length)}
            className="absolute left-2 md:-left-6 top-1/3 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 hover:bg-background border border-border shadow"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next photo"
            onClick={() => setI((p) => (p + 1) % photos.length)}
            className="absolute right-2 md:-right-6 top-1/3 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/80 hover:bg-background border border-border shadow"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex items-center justify-center gap-2">
            {photos.map((_, n) => (
              <button
                key={n}
                onClick={() => setI(n)}
                aria-label={`Go to photo ${n + 1}`}
                className={`h-2 rounded-full transition-all ${
                  n === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <PhotoLightbox
        photos={photos}
        index={i}
        onIndexChange={(n) => setI(((n % photos.length) + photos.length) % photos.length)}
        open={openLightbox}
        onOpenChange={setOpenLightbox}
      />
    </section>
  );
}
