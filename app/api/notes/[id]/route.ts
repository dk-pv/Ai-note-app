// app/api/notes/[id]/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { noteUpdateSchema } from "@/lib/validation";
import mongoose from "mongoose";



export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; 
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    if (!mongoose.isValidObjectId(id))
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const note = await Note.findById(id).lean();
    if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (note.userId.toString() !== userId.toString())
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    return NextResponse.json({ note });
  } catch (err) {
    console.error("GET /api/notes/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    if (!mongoose.isValidObjectId(id))
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const body = await req.json();
    const parsed = noteUpdateSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

    const note = await Note.findById(id);
    if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (note.userId.toString() !== userId.toString())
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    Object.assign(note, parsed.data);
    await note.save();

    return NextResponse.json({ note });
  } catch (err) {
    console.error("PUT /api/notes/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; 
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = (session.user as any).id;
    if (!mongoose.isValidObjectId(id))
      return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const note = await Note.findById(id);
    if (!note) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (note.userId.toString() !== userId.toString())
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });

    await note.deleteOne();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/notes/[id] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
