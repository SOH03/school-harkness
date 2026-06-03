const events = [
  {
    year: "2020",
    title: "Farewell Day",
    date: "March 2020",
    description:
      "The last assembly, the last bell. Tears, hugs, and a promise to never lose touch.",
  },
  {
    year: "2022",
    title: "First Reunion",
    date: "December 2022",
    description:
      "Two years later, a small picnic by the riverside became the beginning of a tradition.",
  },
  {
    year: "2023",
    title: "Cricket Tournament",
    date: "October 2023",
    description:
      "Old rivalries on a new pitch. Section A vs Section B — the rematch we waited for.",
  },
  {
    year: "2024",
    title: "Iftar Gathering",
    date: "April 2024",
    description:
      "Breaking fast together, exchanging stories — the kind of evening you don't want to end.",
  },
];

export function Events() {
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
          {events.map((e, i) => (
            <li key={i} className="mb-12 ml-8 md:ml-12 group">
              <span className="absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                <span className="font-display text-4xl md:text-5xl text-primary tabular-nums shrink-0">
                  {e.year}
                </span>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl mb-1">{e.title}</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    {e.date}
                  </p>
                  <p className="text-base md:text-lg text-foreground/75 max-w-2xl leading-relaxed">
                    {e.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
