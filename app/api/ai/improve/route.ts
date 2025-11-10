import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    if (!content) return NextResponse.json({ error: "No content" }, { status: 400 });

    const prompt = `Improve this note for grammar and clarity:\n\n${content}`;
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ improved: text });
  } catch (err: any) {
    console.error("AI improve error:", err);
    return NextResponse.json({ error: "AI improve failed" }, { status: 500 });
  }
}
