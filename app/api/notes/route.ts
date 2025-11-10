// app/api/notes/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { noteCreateSchema } from "@/lib/validation";

export async function GET(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const query: any = { userId };

    if (search.trim()) {
      query.$text = { $search: search };
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 }).lean();
    return NextResponse.json({ notes });
  } catch (err) {
    console.error("GET /api/notes error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = (session.user as any).id;

    const body = await req.json();
    const parse = noteCreateSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: parse.error.flatten() }, { status: 400 });
    }

    const { title, content, tags } = parse.data;
    const note = await Note.create({
      userId,
      title,
      content,
      tags,
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (err) {
    console.error("POST /api/notes error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
