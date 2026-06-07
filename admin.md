# Admin Guide — NGHS Batch 2021

How to sign in to the admin panel and manage events, photos and captions.

## 1. Sign in

1. Open `https://nghs-2021.web.app/admin` (or `/admin` on the preview site).
2. Enter your admin email and password and click **Sign in**.
   - If you don't have an account yet, click **Need an account?** to sign up,
     then follow the on-screen instructions to grant yourself admin rights in
     Firebase (Firestore → `admins` collection → document id = your UID →
     field `admin: true`).

The school building photo on the home page is fixed by design and cannot be
changed from the dashboard.

## 2. Events that already exist

The events shown when the site was first built (Iftar 2025, Reunion 2021,
Futsal 2026, Iftar 2026) are **hard-coded** and always appear first in the
**Past Events** section. You do not need to recreate them.

Any new event you create in the admin panel will appear **after** those
hard-coded events automatically.

## 3. Create a new event

In the dashboard, under **Events**, fill in the form:

| Field        | Example                          | Notes                                  |
| ------------ | -------------------------------- | -------------------------------------- |
| slug         | `farewell-2026`                  | URL id, lowercase, dashes only, unique |
| title        | `Farewell Night`                 | Shown as the event title               |
| year         | `2026`                           | Used in the timeline                   |
| date         | `December 2026`                  | Free text                              |
| description  | A short paragraph about the event | Shown on the event page                |

Click **Create event**. The new event appears in the list below the form.

## 4. Upload photos to an event

Each event has a **Photos** section.

1. Paste the **Photo URL** of an image hosted online
   (e.g. an Imgur, Google Drive direct link, Cloudinary, or any public
   `https://...jpg/png` URL).
2. Type a **Caption** (optional but recommended).
3. Click **Add photo**.

The first photo you add automatically becomes the **cover photo** for that
event (used as the thumbnail on the home timeline and on the event page
header).

### Tips for getting a photo URL

- **Imgur**: upload → right-click the image → "Copy image address".
- **Google Drive**: share the file as "Anyone with the link", then use a
  direct-link converter (e.g. `https://drive.google.com/uc?id=FILE_ID`).
- **Facebook**: not recommended — Facebook URLs expire. Re-upload to Imgur.

## 5. Change the cover photo

Under any photo that is **not** the cover, click **Set cover**. The badge
labelled `COVER` will move to the photo you picked.

If you delete the current cover, the next remaining photo automatically
becomes the cover.

## 6. Edit a caption

1. Click into the caption text box under any photo.
2. Type the new caption.
3. Click anywhere outside the box (or press Tab) — the change saves
   automatically.

## 7. Edit event title / date / description

At the top of each event card edit any of: **Title**, **Date**,
**Description**, then click **Save**.

## 8. Delete a photo or event

- **Remove** button under a photo deletes that single photo.
- **Delete event** button removes the whole event (asks for confirmation).
  Hard-coded events cannot be permanently removed from the timeline — they
  are part of the source code.

## 9. Where photos show up

Photos you upload appear in three places:

1. **Event page** (`/events/<slug>`) — full photo grid, click any photo to
   open a fullscreen lightbox.
2. **Home — Past Events timeline** — the cover photo represents the event.
3. **Home — Floating Gallery** — every photo from every event is mixed into
   the auto-rotating gallery on the home page.

## 10. Sign out

Click **Sign out** at the bottom of the dashboard when you're done.
