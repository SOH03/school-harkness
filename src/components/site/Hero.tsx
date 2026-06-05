import { useLandingPhoto } from "@/lib/use-firebase-data";

export function Hero() {
  const building = useLandingPhoto();
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 md:pt-20 md:pb-32 grid md:grid-cols-2 gap-12 items-center">
        <div className="relative order-2 md:order-1">
          <img
            src={building}
            alt="Our school building"
            className="w-full max-w-md mx-auto drop-shadow-[0_20px_40px_rgba(200,30,30,0.25)] rounded-lg object-cover"
          />
        </div>
        <div className="order-1 md:order-2 text-center md:text-right">
          <p className="text-xl md:text-3xl lg:text-4xl uppercase tracking-[0.15em] text-foreground font-extrabold mb-3">
            Nilphamari Govt High School
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            Class of 2021 · Batch Archive
          </p>
          <h1 className="font-display text-[20vw] md:text-[12rem] leading-[0.85] text-primary">
            BATCH<br />2021
          </h1>
          <p className="font-serif italic text-2xl md:text-3xl mt-6 text-foreground/80">
            Twenty-One: Together, Tied & Triumphant.
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-10 text-center">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            We began as classmates — sharing benches, tiffins, and exam-day panic. Years on,
            we've become something more: a family that keeps showing up for each other.
            This is our archive of moments, milestones, and memories.
          </p>
        </div>
      </div>
    </section>
  );
}
