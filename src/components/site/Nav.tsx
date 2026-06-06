import { Facebook, Instagram } from "lucide-react";

export function Nav() {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#events", label: "Events" },
    { href: "#upcoming", label: "Upcoming" },
    { href: "#gallery", label: "Gallery" },
  ];
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-primary" />
          <span className="font-display text-lg tracking-tight">NGHS · BATCH/21</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=61582187578509"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="h-9 w-9 grid place-items-center rounded-full border border-foreground hover:bg-foreground hover:text-background transition"
          >
            <Facebook className="h-4 w-4" />
          </a>
          <a
            href="https://www.instagram.com/nghs.batch21?igsh=MXVhMWJzcjE0MHFsag=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="h-9 w-9 grid place-items-center rounded-full border border-foreground hover:bg-foreground hover:text-background transition"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <a
            href="#upcoming"
            className="text-xs uppercase tracking-widest border border-foreground rounded-full px-4 py-2 hover:bg-foreground hover:text-background transition"
          >
            Join Reunion
          </a>
        </div>
      </div>
    </header>
  );
}
