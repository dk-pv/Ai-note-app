"use client";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useNotes } from "@/hooks/useNotes";
import SearchBar from "./SearchBar";
import NotesList from "./NotesList";
import NoteEditor from "./NoteEditor";
import { Button } from "@/components/ui/button";

export default function NotesClient() {
  const {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setNotes,
  } = useNotes();
  const [editing, setEditing] = useState<any | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.trim() === "") {
      fetchNotes("");
      return;
    }
    fetchNotes(debouncedQuery);
  }, [debouncedQuery]);

  const handleSave = async (data: any) => {
    try {
      if (editing) await updateNote(editing._id, data);
      else await createNote(data);
      setShowEditor(false);
      setEditing(null);
      fetchNotes(query);
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
      fetchNotes(query);
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <SearchBar onSearch={setQuery} />
        <Button
          onClick={() => {
            setEditing(null);
            setShowEditor(true);
          }}
        >
          New Note
        </Button>
      </div>

      {showEditor && (
        <div className="mb-4">
          <NoteEditor
            initial={editing}
            onSave={handleSave}
            onCancel={() => {
              setShowEditor(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : notes.length > 0 ? (
        <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
      ) : (
        error && <p className="text-gray-500 italic mt-4">{error}</p>
      )}
    </div>
  );
}
