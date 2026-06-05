import { Calendar, MapPin, Users } from "lucide-react";

export function Upcoming() {
  return (
    <section id="upcoming" className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-background/60 mb-4">
              Coming Up Next
            </p>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.9] text-primary">
              EID<br />Reunion
            </h2>
            <p className="font-serif italic text-2xl mt-6 text-background/80">
              Reuniting our batch, reliving memories.
            </p>
          </div>

          <div className="md:col-span-7 space-y-5">
            <div className="border-t border-background/20 pt-6 flex items-start gap-5">
              <Calendar className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-background/60 mb-1">When</p>
                <p className="text-xl">Eid Al-Fitr 2027</p>
              </div>
            </div>
            <div className="border-t border-background/20 pt-6 flex items-start gap-5">
              <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-background/60 mb-1">Where</p>
                <p className="text-xl">High school Ground, Nilphamari</p>
              </div>
            </div>
            <div className="border-t border-background/20 pt-6 flex items-start gap-5">
              <Users className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <p className="text-xs uppercase tracking-widest text-background/60 mb-1">Who</p>
                <p className="text-xl">All Batchmates</p>
          
              </div>
            </div>

            <div className="pt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-7 py-3 text-sm font-semibold uppercase tracking-widest hover:opacity-90 transition"
              >
                RSVP Now
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-background/30 px-7 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-background hover:text-foreground transition"
              >
                Full Schedule
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
