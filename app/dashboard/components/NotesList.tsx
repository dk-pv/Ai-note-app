"use client";
import NoteCard from "./NoteCard";

export default function NotesList({ notes, onEdit, onDelete }: { notes: any[]; onEdit: any; onDelete: any }) {
  if (!notes.length) return <p className="text-sm text-muted-foreground">No notes yet.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map(n => <NoteCard key={n._id} note={n} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}
