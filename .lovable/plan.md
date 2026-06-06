# Gallery polish + Facebook link

Three focused changes, then push to GitHub via the existing workflow.

## 1. Floating, auto-rotating gallery (home page)

Rebuild `src/components/site/Gallery.tsx` so photos are shown **one at a time** in a large centered "floating" card that:

- Auto-advances every ~4 seconds (pauses on hover).
- Fades + gently floats (subtle translateY loop) between photos.
- Shows the caption under the photo.
- Has small dot indicators + prev/next arrows for manual control.
- Clicking the photo opens it in the lightbox (see step 2).

Implementation: a small `useEffect` interval + `useState` index, Tailwind `animate-fade-in` and a custom `float` keyframe added inline via `className` (no config edits needed — use existing `animate-fade-in` from `src/styles.css` plus an inline `style` transform for the float, or add a `@keyframes float` block to `src/styles.css`).

## 2. Click-to-view photo lightbox

Add `src/components/site/PhotoLightbox.tsx` — a reusable modal built on the existing shadcn `Dialog` component that shows a single full-size image + caption, with prev/next arrows and ESC/click-outside to close.

Wire it into:
- `src/components/site/Gallery.tsx` — clicking the floating photo (or any thumbnail if we keep a strip) opens that photo.
- `src/routes/events.$id.tsx` — clicking any photo in the event's photo grid opens the lightbox scoped to that event's photo list, so users can navigate between them.

## 3. Facebook link with icon

Add the official page link `https://www.facebook.com/profile.php?id=61582187578509` in two places using the `Facebook` icon from `lucide-react`:

- `src/components/site/Nav.tsx` — small circular icon button next to the "Join Reunion" CTA (opens in a new tab, `rel="noopener noreferrer"`, `aria-label="Facebook"`).
- `src/components/site/Footer.tsx` — "Follow us" line with the same icon + link.

## 4. Ship to GitHub

After the edits, I'll give you the one-line commit/push command:

```bash
git add -A && git commit -m "feat: floating auto-rotating gallery, photo lightbox, facebook link" && git push origin main
```

GitHub Actions will rebuild and redeploy to `nghs-2021.web.app` automatically.

## Files touched

- edit `src/components/site/Gallery.tsx`
- edit `src/components/site/Nav.tsx`
- edit `src/components/site/Footer.tsx`
- edit `src/routes/events.$id.tsx`
- new  `src/components/site/PhotoLightbox.tsx`
- maybe edit `src/styles.css` (add `@keyframes float` if needed)

Nothing in the Firebase/admin code paths changes.
