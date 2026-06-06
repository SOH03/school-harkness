import { Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row gap-6 items-center justify-between">
        <div>
          <p className="font-display text-2xl text-primary">NGHS · BATCH / 2021</p>
          <p className="text-sm text-muted-foreground mt-1">
            Nilphamari Govt High School — a Batch archive, kept by the class itself.
          </p>
        </div>
        <div className="flex flex-col md:items-end items-center gap-3">
          <a
            href="https://www.facebook.com/profile.php?id=61582187578509"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Facebook"
            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          >
            <Facebook className="h-4 w-4" />
            <span>Follow us on Facebook</span>
          </a>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            © {new Date().getFullYear()} · Made with care by SOH-03
          </p>
        </div>
      </div>
    </footer>
  );
}
