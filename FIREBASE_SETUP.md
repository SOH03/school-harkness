# NGHS Batch 2021 — Firebase Setup & Hosting Guide

This site uses **Firebase** for the database (events, captions, landing photo) and
**Firebase Hosting** to serve the app at `https://nghs2021.web.app`.

---

## 1. Create / open the Firebase project

1. Go to <https://console.firebase.google.com>.
2. Create a project named **`nghs2021`** (the default web URL becomes
   `nghs2021.web.app`). If the name is taken, pick any project ID — you can
   alias it later via Hosting sites.

---

## 2. Enable the services we use

In the Firebase console for project `nghs2021`:

- **Build → Authentication → Get started → Sign-in method**
  → enable **Email/Password**.
- **Build → Firestore Database → Create database** → start in production mode,
  pick the nearest region.
- *(Storage is NOT required — we use external image URLs.)*

---

## 3. Add your web app config

1. Project Settings (gear icon) → **General** → scroll to **Your apps** →
   click the **`</>`** Web icon → register app name `nghs2021-web`.
2. Copy the `firebaseConfig` values into the project's `.env` file:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=nghs2021.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=nghs2021
VITE_FIREBASE_STORAGE_BUCKET=nghs2021.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Restart the dev server after editing `.env`.

---

## 4. Create the first admin

1. Open `/admin` on the live site (or preview) and **Sign up** with your email
   + a password (≥ 6 chars).
2. In Firebase console → **Authentication → Users**, copy your **UID**.
3. Go to **Firestore Database** → **Start collection** → ID = `admins`.
4. **Document ID** = paste your UID.
5. Add a field: `admin` (type **boolean**) = `true`. Save.
6. Refresh `/admin` — the dashboard appears.

> Firebase doesn't have a built-in "admin" toggle — admin status lives in the
> `admins` collection you just created.

---

## 5. Security rules

**Firestore** → Rules tab → paste and **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {
    match /admins/{uid} {
      allow read: if request.auth != null && request.auth.uid == uid;
    }
    match /events/{id} {
      allow read;
      allow write: if request.auth != null
        && get(/databases/$(db)/documents/admins/$(request.auth.uid)).data.admin == true;
    }
    match /settings/{id} {
      allow read;
      allow write: if request.auth != null
        && get(/databases/$(db)/documents/admins/$(request.auth.uid)).data.admin == true;
    }
  }
}
```

---

## 6. Using the admin panel

Visit `/admin` while signed in as an admin. You can:

- **Landing photo** — paste any image URL (Imgur, Cloudinary, Google Drive
  direct link, etc.) → Save. The home hero updates.
- **Events** — create new events with slug/title/date/description.
- **Event detail** — open each event card to:
  - add photos by URL,
  - add/edit captions (click in the caption box, edit, click away to save),
  - delete a photo, or delete the whole event.

The first photo added becomes the event's cover. Captions and photos render on
the event detail page at `/events/<slug>`.

---

## 7. Build the site

```bash
bun install
bun run build
```

The production output lands in `dist/` (or `.output/public/` for TanStack
Start — verify which folder is produced; that's your "public" folder below).

---

## 8. Host on `nghs2021.web.app`

Install the Firebase CLI once:

```bash
npm i -g firebase-tools
firebase login
```

Initialize hosting **inside the project folder**:

```bash
firebase init hosting
```

Answers:

- Use existing project → **`nghs2021`**
- Public directory → **`dist`** (or whatever folder `bun run build` produced)
- Single-page app? → **Yes**
- Set up automatic builds with GitHub? → optional
- Overwrite `index.html`? → **No**

Deploy:

```bash
bun run build
firebase deploy --only hosting
```

Your site is live at **<https://nghs2021.web.app>** and
<https://nghs2021.firebaseapp.com>.

### Custom domain (optional)

Firebase console → **Hosting → Add custom domain** → follow the DNS steps.

---

## 9. Day-to-day workflow

| Task | Where |
|---|---|
| Change hero/landing photo | `/admin` → Landing photo → paste URL |
| Add an event | `/admin` → Create event |
| Add photos + captions to an event | `/admin` → open event card |
| Promote another admin | Firestore → `admins/{their-uid}` = `{ admin: true }` |
| Re-deploy after content code changes | `bun run build && firebase deploy --only hosting` |

Content changes made via `/admin` are **live instantly** — no rebuild needed.
Only code/UI changes require a redeploy.
