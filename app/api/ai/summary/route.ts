import { NextResponse } from "next/server";
import { geminiModel } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();
    if (!content) return NextResponse.json({ error: "No content" }, { status: 400 });

    const prompt = `Summarize the following note clearly and concisely:\n\n${content}`;
    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ summary: text });
  } catch (err: any) {
    console.error("AI summary error:", err);
    return NextResponse.json({ error: "AI summary failed" }, { status: 500 });
  }
}
