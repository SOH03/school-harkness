import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref as storageRef, uploadBytes } from "firebase/storage";
import { auth, db, storage, firebaseEnabled } from "@/lib/firebase";
import { useAuthUser } from "@/lib/use-firebase-data";
import type { EventItem, EventPhoto } from "@/lib/events-data";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Batch 2020" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const { user, isAdmin, loading } = useAuthUser();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="font-display text-4xl md:text-5xl mb-2">Admin Panel</h1>
        <p className="text-muted-foreground mb-10">
          Manage events, photos and the landing image.
        </p>

        {!firebaseEnabled && <SetupNotice />}

        {firebaseEnabled && loading && <p>Loading…</p>}
        {firebaseEnabled && !loading && !user && <AuthForm />}
        {firebaseEnabled && !loading && user && !isAdmin && (
          <div className="rounded-md border border-border p-6">
            <p className="mb-2">
              Signed in as <strong>{user.email}</strong> — but not an admin.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Add a document at <code>admins/{user.uid}</code> with{" "}
              <code>{`{ admin: true }`}</code> in Firestore.
            </p>
            <Button variant="outline" onClick={() => signOut(auth!)}>
              Sign out
            </Button>
          </div>
        )}
        {firebaseEnabled && user && isAdmin && <Dashboard />}
      </div>
      <Footer />
    </main>
  );
}

function SetupNotice() {
  return (
    <div className="rounded-md border border-primary/40 bg-primary/5 p-6 text-sm">
      <p className="font-medium mb-2">Firebase is not configured yet.</p>
      <ol className="list-decimal ml-5 space-y-1 text-muted-foreground">
        <li>Create a Firebase project &amp; enable Firestore, Storage, Auth (Email/Password).</li>
        <li>
          Add a <code>.env</code> at the project root with your{" "}
          <code>VITE_FIREBASE_*</code> keys (see <code>src/lib/firebase.ts</code>).
        </li>
        <li>Restart the dev server, sign up here, then mark yourself admin in Firestore.</li>
      </ol>
    </div>
  );
}

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      if (mode === "signin") await signInWithEmailAndPassword(auth!, email, password);
      else await createUserWithEmailAndPassword(auth!, email, password);
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md rounded-md border border-border p-6 space-y-4">
      <h2 className="font-display text-2xl">{mode === "signin" ? "Sign in" : "Create admin"}</h2>
      <div>
        <Label>Email</Label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? "…" : mode === "signin" ? "Sign in" : "Sign up"}
        </Button>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="text-sm text-muted-foreground hover:text-primary underline"
        >
          {mode === "signin" ? "Need an account?" : "Have one already?"}
        </button>
      </div>
    </form>
  );
}

function Dashboard() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [landingUrl, setLandingUrl] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db!, "events"));
      setEvents(snap.docs.map((d) => ({ id: d.id, slug: d.id, ...(d.data() as any) })));
      try {
        const s = await (await import("firebase/firestore")).getDoc(doc(db!, "settings", "site"));
        setLandingUrl((s.data() as any)?.landingPhoto ?? "");
      } catch {}
    })();
  }, [refreshKey]);

  return (
    <div className="space-y-12">
      <section>
        <h2 className="font-display text-2xl mb-4">Landing photo</h2>
        <LandingPhotoEditor current={landingUrl} onSaved={() => setRefreshKey((k) => k + 1)} />
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl">Events</h2>
          <Button onClick={() => setRefreshKey((k) => k + 1)} variant="outline">
            Refresh
          </Button>
        </div>
        <NewEvent onCreated={() => setRefreshKey((k) => k + 1)} />
        <div className="mt-8 space-y-6">
          {events.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No events yet. Create your first one above.
            </p>
          )}
          {events.map((ev) => (
            <EventEditor key={ev.id} event={ev} onChanged={() => setRefreshKey((k) => k + 1)} />
          ))}
        </div>
      </section>

      <Button variant="outline" onClick={() => signOut(auth!)}>
        Sign out
      </Button>
    </div>
  );
}

function LandingPhotoEditor({ current, onSaved }: { current: string; onSaved: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);

  const save = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const r = storageRef(storage!, `site/landing-${Date.now()}-${file.name}`);
      await uploadBytes(r, file);
      const url = await getDownloadURL(r);
      await setDoc(doc(db!, "settings", "site"), { landingPhoto: url }, { merge: true });
      setFile(null);
      onSaved();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-md border border-border p-4 flex items-center gap-4 flex-wrap">
      {current ? (
        <img src={current} alt="Current landing" className="h-20 w-20 object-cover rounded" />
      ) : (
        <div className="h-20 w-20 grid place-items-center rounded bg-muted text-xs">none</div>
      )}
      <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      <Button onClick={save} disabled={!file || busy}>
        {busy ? "Uploading…" : "Replace"}
      </Button>
    </div>
  );
}

function NewEvent({ onCreated }: { onCreated: () => void }) {
  const [form, setForm] = useState({ slug: "", title: "", year: "", date: "", description: "" });
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug) return;
    setBusy(true);
    try {
      await setDoc(doc(db!, "events", form.slug), {
        title: form.title,
        year: form.year,
        date: form.date,
        description: form.description,
        cover: "",
        photos: [] as EventPhoto[],
      });
      setForm({ slug: "", title: "", year: "", date: "", description: "" });
      onCreated();
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-md border border-border p-4 grid md:grid-cols-2 gap-3">
      <Input
        placeholder="slug (url id, e.g. farewell-2020)"
        value={form.slug}
        onChange={(e) => setForm({ ...form, slug: e.target.value })}
        required
      />
      <Input
        placeholder="title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <Input
        placeholder="year (e.g. 2024)"
        value={form.year}
        onChange={(e) => setForm({ ...form, year: e.target.value })}
      />
      <Input
        placeholder="date (e.g. March 2024)"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <Textarea
        className="md:col-span-2"
        placeholder="description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Button type="submit" disabled={busy} className="md:col-span-2 w-fit">
        {busy ? "Creating…" : "Create event"}
      </Button>
    </form>
  );
}

function EventEditor({ event, onChanged }: { event: EventItem; onChanged: () => void }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [date, setDate] = useState(event.date);
  const [busy, setBusy] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const photos: EventPhoto[] = event.photos ?? [];

  const saveMeta = async () => {
    setBusy(true);
    try {
      await updateDoc(doc(db!, "events", event.id), { title, description, date });
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  const removeEvent = async () => {
    if (!confirm(`Delete event "${event.title}"?`)) return;
    await deleteDoc(doc(db!, "events", event.id));
    onChanged();
  };

  const addPhoto = async () => {
    if (!file) return;
    setBusy(true);
    try {
      const r = storageRef(storage!, `events/${event.id}/${Date.now()}-${file.name}`);
      await uploadBytes(r, file);
      const url = await getDownloadURL(r);
      const newPhoto: EventPhoto = { id: crypto.randomUUID(), url, caption };
      const next = [...photos, newPhoto];
      await updateDoc(doc(db!, "events", event.id), {
        photos: next,
        cover: event.cover || url,
      });
      setFile(null);
      setCaption("");
      onChanged();
    } finally {
      setBusy(false);
    }
  };

  const updateCaption = async (photoId: string, newCaption: string) => {
    const next = photos.map((p) => (p.id === photoId ? { ...p, caption: newCaption } : p));
    await updateDoc(doc(db!, "events", event.id), { photos: next });
    onChanged();
  };

  const deletePhoto = async (photoId: string) => {
    const next = photos.filter((p) => p.id !== photoId);
    await updateDoc(doc(db!, "events", event.id), { photos: next });
    onChanged();
  };

  return (
    <div className="rounded-md border border-border p-5 space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <Input value={date} onChange={(e) => setDate(e.target.value)} placeholder="Date" />
        <div className="text-xs text-muted-foreground self-center">
          slug: <code>{event.slug}</code>
        </div>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <div className="flex gap-2">
        <Button onClick={saveMeta} disabled={busy}>
          Save
        </Button>
        <Button variant="outline" onClick={removeEvent}>
          Delete event
        </Button>
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="font-medium mb-3">Photos ({photos.length})</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {photos.map((p) => (
            <div key={p.id} className="space-y-2">
              <img src={p.url} alt={p.caption} className="aspect-square w-full object-cover rounded" />
              <Input
                defaultValue={p.caption}
                onBlur={(e) => {
                  if (e.target.value !== p.caption) updateCaption(p.id, e.target.value);
                }}
                placeholder="Caption"
              />
              <Button size="sm" variant="outline" onClick={() => deletePhoto(p.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap items-center">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
          <Input
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Caption"
            className="max-w-xs"
          />
          <Button onClick={addPhoto} disabled={!file || busy}>
            {busy ? "Uploading…" : "Add photo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
