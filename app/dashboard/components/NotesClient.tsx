"use client";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNotes } from "@/hooks/useNotes";
import SearchBar from "./SearchBar";
import NotesList from "./NotesList";
import NoteEditor from "./NoteEditor";
import { Button } from "@/components/ui/button";

export default function NotesClient() {
  const { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote } = useNotes();
  const [editing, setEditing] = useState<any | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    fetchNotes(debouncedQuery);
  }, [debouncedQuery]);

  const handleSave = async (data: any) => {
    try {
      if (editing) {
        await updateNote(editing._id, { title: data.title, content: data.content });
      } else {
        await createNote({ title: data.title, content: data.content });
      }
      setShowEditor(false);
      setEditing(null);
    } catch (err: any) {
      alert(err.message || "Save failed");
    }
  };

  const handleEdit = (note: any) => {
    setEditing(note);
    setShowEditor(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SearchBar onSearch={setQuery} />
        <Button onClick={() => { setEditing(null); setShowEditor(true); }}>
          New Note
        </Button>
      </div>

      {showEditor && (
        <div className="mb-4">
          <NoteEditor
            initial={editing}
            onSave={handleSave}
            onCancel={() => { setShowEditor(false); setEditing(null); }}
          />
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
