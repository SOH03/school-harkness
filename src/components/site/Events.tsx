import { Link } from "@tanstack/react-router";
import { useEvents } from "@/lib/use-firebase-data";

export function Events() {
  const { events } = useEvents();

  return (
    <section id="events" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">
              The Archive
            </p>
            <h2 className="font-display text-5xl md:text-7xl">Past Events</h2>
          </div>
          <span className="hidden md:block text-sm text-muted-foreground">
            {events.length} entries
          </span>
        </div>

        <ol className="relative border-l-2 border-primary/30 ml-3 md:ml-6">
          {events.map((e) => (
            <li key={e.id} className="mb-12 ml-8 md:ml-12 group">
              <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
              <Link
                to="/events/$id"
                params={{ id: e.slug }}
                className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8 hover:opacity-80 transition"
              >
                <span className="font-display text-4xl md:text-5xl text-primary tabular-nums shrink-0">
                  {e.year}
                </span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl mb-1 group-hover:underline underline-offset-4">
                    {e.title} →
                  </h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    {e.date}
                  </p>
                  <p className="text-base md:text-lg text-foreground/75 max-w-2xl leading-relaxed">
                    {e.description}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
