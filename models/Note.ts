// models/Note.ts
import mongoose, { Document, Model } from "mongoose";

export interface INote extends Document {
  userId: mongoose.Types.ObjectId | string;
  title: string;
  content: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const NoteSchema = new mongoose.Schema<INote>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, default: "" },
  tags: { type: [String], default: [] },
}, { timestamps: true });

// optional: text index for searching by title/content
NoteSchema.index({ title: "text", content: "text" });

const Note: Model<INote> = mongoose.models.Note || mongoose.model<INote>("Note", NoteSchema);
export default Note;
