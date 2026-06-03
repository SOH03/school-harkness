import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db, firebaseEnabled } from "./firebase";
import { sampleEvents, type EventItem } from "./events-data";
import building from "@/assets/school-building.png";

export function useEvents() {
  const [events, setEvents] = useState<EventItem[]>(sampleEvents);
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!firebaseEnabled || !db) return;
    (async () => {
      try {
        const snap = await getDocs(query(collection(db, "events"), orderBy("year", "asc")));
        if (!snap.empty) {
          setEvents(
            snap.docs.map((d) => ({ id: d.id, slug: d.id, ...(d.data() as any) })) as EventItem[],
          );
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { events, loading };
}

export function useEvent(id: string) {
  const [event, setEvent] = useState<EventItem | null>(
    sampleEvents.find((e) => e.slug === id) ?? null,
  );

  useEffect(() => {
    if (!firebaseEnabled || !db) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "events", id));
        if (snap.exists()) setEvent({ id: snap.id, slug: snap.id, ...(snap.data() as any) });
      } catch (e) {
        console.error(e);
      }
    })();
  }, [id]);

  return event;
}

export function useLandingPhoto() {
  const [url, setUrl] = useState<string>(building);

  useEffect(() => {
    if (!firebaseEnabled || !db) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "site"));
        const data = snap.data() as { landingPhoto?: string } | undefined;
        if (data?.landingPhoto) setUrl(data.landingPhoto);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return url;
}

export function useAuthUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const a = auth;
    const database = db;
    if (!firebaseEnabled || !a || !database) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(a, async (u) => {
      setUser(u);
      if (u) {
        try {
          const snap = await getDoc(doc(database, "admins", u.uid));
          setIsAdmin(snap.exists() && snap.data()?.admin === true);
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, isAdmin, loading };
}
