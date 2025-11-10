"use client";
import { Button } from "@/components/ui/button";

type Props = {
  note: any;
  onEdit: (note: any) => void;
  onDelete: (id: string) => void;
};

export default function NoteCard({ note, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-medium">{note.title}</h3>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(note)}>Edit</Button>
          <Button size="sm" variant="destructive" onClick={() => onDelete(note._id)}>Delete</Button>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{note.content}</p>
      {note.tags?.length ? (
        <div className="mt-3 flex gap-2 flex-wrap">
          {note.tags.map((t: string) => <span key={t} className="px-2 py-1 bg-gray-100 rounded text-xs dark:bg-gray-700">{t}</span>)}
        </div>
      ) : null}
    </div>
  );
}
