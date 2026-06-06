import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type LightboxPhoto = { url: string; caption?: string };

export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  open,
  onOpenChange,
}: {
  photos: LightboxPhoto[];
  index: number;
  onIndexChange: (i: number) => void;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const safe = photos.length > 0 ? ((index % photos.length) + photos.length) % photos.length : 0;
  const photo = photos[safe];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onIndexChange(safe + 1);
      if (e.key === "ArrowLeft") onIndexChange(safe - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, safe, onIndexChange]);

  if (!photo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl bg-background/95 border-border p-0 overflow-hidden">
        <div className="relative">
          <img
            src={photo.url}
            alt={photo.caption ?? ""}
            className="w-full max-h-[80vh] object-contain bg-black"
          />
          {photos.length > 1 && (
            <>
              <button
                aria-label="Previous photo"
                onClick={() => onIndexChange(safe - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/70 hover:bg-background border border-border"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Next photo"
                onClick={() => onIndexChange(safe + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 grid place-items-center rounded-full bg-background/70 hover:bg-background border border-border"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
        {photo.caption && (
          <p className="px-5 py-4 text-center text-sm md:text-base text-foreground/80">
            {photo.caption}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
