// app/api/ai/models/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://generativelanguage.googleapis.com/v1/models";
  const res = await fetch(`${url}?key=${process.env.GEMINI_API_KEY}`);
  const data = await res.json();
  return NextResponse.json(data);
}
