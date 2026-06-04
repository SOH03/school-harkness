import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

const photos = [
  { src: g1, alt: "Graduation day group photo", caption: "Graduation, 2021", span: "row-span-2" },
  { src: g2, alt: "Classroom laughter", caption: "Last day of class", span: "" },
  { src: g3, alt: "Sports day", caption: "Sports Day finals", span: "" },
  { src: g4, alt: "Cultural program", caption: "Annual cultural night", span: "row-span-2" },
  { src: g5, alt: "Friends reunion dinner", caption: "Reunion dinner, 2023", span: "" },
  { src: g6, alt: "Farewell hug", caption: "Farewell, see you soon", span: "" },
];

export function Gallery() {
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
          <a href="#" className="hidden md:inline text-sm underline underline-offset-4 hover:text-primary">
            View all photos →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[180px] md:auto-rows-[240px] gap-3 md:gap-4">
          {photos.map((p, i) => (
            <figure
              key={i}
              className={`relative overflow-hidden rounded-lg group bg-muted ${p.span}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 md:p-4 bg-gradient-to-t from-black/70 to-transparent text-white text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
