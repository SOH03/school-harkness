// Firebase wiring. The app gracefully falls back to local sample data
// when env vars aren't set yet — so you can wire Firebase later without
// breaking the site.
//
// To enable:
// 1. Create a project at https://console.firebase.google.com
// 2. Enable Firestore, Storage, and Authentication (Email/Password)
// 3. Create a `.env` file at the project root with:
//      VITE_FIREBASE_API_KEY=...
//      VITE_FIREBASE_AUTH_DOMAIN=...
//      VITE_FIREBASE_PROJECT_ID=...
//      VITE_FIREBASE_STORAGE_BUCKET=...
//      VITE_FIREBASE_MESSAGING_SENDER_ID=...
//      VITE_FIREBASE_APP_ID=...
// 4. In Firestore, create a doc at `admins/{your-uid}` with { admin: true }
//    after signing up via /admin.

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const firebaseEnabled = Boolean(config.apiKey && config.projectId);

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;
let _storage: FirebaseStorage | null = null;

if (firebaseEnabled && typeof window !== "undefined") {
  app = getApps()[0] ?? initializeApp(config);
  _auth = getAuth(app);
  _db = getFirestore(app);
  _storage = getStorage(app);
}

export const auth = _auth;
export const db = _db;
export const storage = _storage;
