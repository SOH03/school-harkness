export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div>
          <p className="font-display text-2xl text-primary">NGHS · BATCH / 2021</p>
          <p className="text-sm text-muted-foreground mt-1">
            Nilphamari Govt High School — a community archive, kept by the class itself.
          </p>
        </div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} · Made with care by batchmates
        </p>
      </div>
    </footer>
  );
}
