"use client";
import { useState } from "react";

type Note = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

function shallowEqual(a: any[], b: any[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchNotes(search = "") {
    setLoading(true);
    try {
      const url = "/api/notes" + (search ? `?search=${encodeURIComponent(search)}` : "");
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();

      // ✅ update only if new data differs
      if (!shallowEqual(data.notes || [], notes)) {
        setNotes(data.notes || []);
      }
    } catch (err: any) {
      setError(err.message || "Error");
    } finally {
      // ✅ smooth transition
      setTimeout(() => setLoading(false), 150);
    }
  }

  async function createNote(payload: { title: string; content?: string; tags?: string[] }) {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Create failed");
    const data = await res.json();
    setNotes((prev) => [data.note, ...prev]);
    return data.note;
  }

  async function updateNote(
    id: string,
    payload: Partial<{ title: string; content: string; tags: string[] }>
  ) {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Update failed");
    const data = await res.json();
    setNotes((prev) => prev.map((n) => (n._id === id ? data.note : n)));
    return data.note;
  }

  async function deleteNote(id: string) {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Delete failed");
    setNotes((prev) => prev.filter((n) => n._id !== id));
    return true;
  }

  return { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote, setNotes };
}
