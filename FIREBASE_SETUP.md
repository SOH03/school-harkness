# NGHS Batch 2021 — Firebase Setup & Hosting Guide

This site uses **Firebase** for the database (events, captions, landing photo) and
**Firebase Hosting** to serve the app at `https://nghs2021.web.app`.

---

## 1. Create / open the Firebase project

1. Go to <https://console.firebase.google.com>.
2. Create a project named **`nghs2021`** (the default web URL becomes
   `nghs2021.web.app`). If the name is taken, pick any project ID — you can
   alias it later via Hosting sites.

> **Note:** If you already have a project (e.g. `nghs21-6f414`), you can use
> that too. Just update `firebase.json` and the GitHub Actions workflow with
> your actual project ID.

---

## 2. Enable the services we use

In the Firebase console for your project:

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
bun run build:firebase
```

This command:
1. Builds the app with `vite build`
2. Starts the SSR server locally
3. Fetches the HTML for `/` and saves it to `dist/client/index.html`
4. The result in `dist/client/` is a static site ready for Firebase Hosting

---

## 8. Set up GitHub Actions for automatic deployment

This project includes a ready-to-use GitHub Actions workflow that automatically
builds and deploys to Firebase Hosting on every push to `main` or `master`.

### 8.1 Connect your repo to GitHub

If you haven't already:
1. In Lovable, click the **+** button → **GitHub** → **Connect project**
2. Authorize GitHub and create the repository

### 8.2 Get a Firebase service account

1. In the Firebase console, click the **gear icon** → **Project settings**.
2. Go to the **Service accounts** tab.
3. Click **Generate new private key**.
4. A `.json` file will download. Open it and copy the entire contents.

### 8.3 Add the secret to GitHub

1. Go to your GitHub repo → **Settings** → **Secrets and variables** → **Actions**.
2. Click **New repository secret**.
3. **Name:** `FIREBASE_SERVICE_ACCOUNT_NGHS21_6F414`
   (replace `NGHS21_6F414` with your actual project ID in UPPERCASE, replacing
   hyphens with underscores)
4. **Value:** Paste the entire contents of the downloaded `.json` file.
5. Click **Add secret**.

### 8.4 Update `firebase.json` (if needed)

Open `firebase.json` and make sure the project IDs match yours:

```json
{
  "hosting": {
    "site": "nghs2021",
    "public": "dist/client",
    ...
  }
}
```

- If your Firebase project ID is `nghs21-6f414`, keep `"site": "nghs2021"` as your
  custom hosting site alias (create it in Firebase console → Hosting → Add custom site).
- If your project ID is different, update `.github/workflows/firebase-hosting.yml`
  with your actual `projectId`.

### 8.5 Push and deploy

```bash
git add .
git commit -m "Setup Firebase Hosting with GitHub Actions"
git push origin main
```

Go to **GitHub → Actions** and watch the workflow run. Once it completes,
your site will be live at:
- `https://nghs2021.web.app` (or your custom site URL)
- `https://nghs21-6f414.web.app` (default project URL)

### 8.6 First-time manual deploy (optional)

If GitHub Actions fails the first time, you may need to enable Hosting in the
Firebase console first:

```bash
npm i -g firebase-tools
firebase login
firebase init hosting
# Select your project, use dist/client as public directory, say Yes to SPA
firebase deploy --only hosting
```

After this, GitHub Actions should work on subsequent pushes.

---

## 9. Day-to-day workflow

| Task | Where |
|---|---|
| Change hero/landing photo | `/admin` → Landing photo → paste URL |
| Add an event | `/admin` → Create event |
| Add photos + captions to an event | `/admin` → open event card |
| Promote another admin | Firestore → `admins/{their-uid}` = `{ admin: true }` |
| Deploy code changes | Just push to `main` — GitHub Actions handles it |
| Deploy manually (emergency) | `bun run build:firebase && firebase deploy --only hosting` |

Content changes made via `/admin` are **live instantly** — no rebuild needed.
Only code/UI changes require a redeploy.

---

## Troubleshooting

**Build fails with "Server did not start within 10s"**
→ Make sure you built first with `bun run build` before running `bun run scripts/prerender.js`.

**GitHub Actions fails with "Permission denied"**
→ Check that the `FIREBASE_SERVICE_ACCOUNT_*` secret name matches your project ID
exactly (uppercase, underscores instead of hyphens).

**Firebase Hosting shows 404 for `/events/...` or `/admin`**
→ The `firebase.json` rewrite rules should handle this. Make sure you pushed the
latest `firebase.json` to GitHub.

**Images or CSS not loading**
→ Make sure `firebase.json` points `"public"` to `"dist/client"` and not just `"dist"`.
