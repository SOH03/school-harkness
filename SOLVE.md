# Fix: `auth/api-key-not-valid` on Admin Login

## What happened

When signing in at `/admin`, Firebase threw:

```
Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)
```

## Root cause

The `apiKey` hardcoded in `src/lib/firebase.ts` had a **typo** — it was missing
one character (`W`) compared to the real key shown in the Firebase console:

| | Value |
|---|---|
| Old (broken) | `AIzaSyCRS-FtHwO-DLhVI_9Wpk`**`v`**`ZCCBk9IEQk0` |
| New (correct) | `AIzaSyCRS-FtHwO-DLhVI_9Wpk`**`Wv`**`ZCCBk9IEQk0` |

Firebase rejects any key it doesn't recognize with the `api-key-not-valid` error
— even one wrong character is enough. Also corrected:

- `storageBucket` → `nghs-2021.firebasestorage.app` (matches the console)
- added `measurementId: "G-S6HGX44Y23"`

## The fix

Edited `src/lib/firebase.ts` so the `config` object exactly matches the snippet
Firebase generates in **Project settings → Your apps → Web app → SDK setup**.

## How to deploy the fix

The repo is wired to GitHub Actions (`.github/workflows/firebase-hosting.yml`),
so any push to `main` redeploys automatically:

```bash
git add src/lib/firebase.ts SOLVE.md
git commit -m "fix(firebase): correct apiKey typo causing auth/api-key-not-valid"
git push origin main
```

Then watch **GitHub → Actions** until the workflow turns green. Hard-refresh
the live site (Ctrl/Cmd + Shift + R) and try signing in at `/admin` again.

## How to avoid this in the future

1. Always copy the Firebase config **directly** from the console — never retype it.
2. Quick sanity test in the browser DevTools console on the live site:
   ```js
   // Should print the same apiKey shown in Firebase console
   console.log(import.meta.env)  // (only works in dev)
   ```
   Or just check the Network tab — failed `identitytoolkit.googleapis.com`
   requests with `400 INVALID_API_KEY` confirm a key typo.
3. If you regenerate or restrict the key in Google Cloud Console, update
   `src/lib/firebase.ts` and redeploy.
