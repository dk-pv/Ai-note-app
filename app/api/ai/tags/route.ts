import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    if (!content) return NextResponse.json({ error: "No content" }, { status: 400 });

    const prompt = `Generate 3 relevant short tags (one or two words each) for the following note:\n\n${content}`;
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    const tags = text.split(/[,#\n]+/).map(t => t.trim()).filter(Boolean);
    return NextResponse.json({ tags });
  } catch (err: any) {
    console.error("AI tags error:", err);
    return NextResponse.json({ error: "AI tags failed" }, { status: 500 });
  }
}
