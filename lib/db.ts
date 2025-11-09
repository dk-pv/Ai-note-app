import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI is not defined in env");

let cached: { conn: typeof mongoose | null } = { conn: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;
  const conn = await mongoose.connect(MONGODB_URI);
  cached.conn = conn;
  return conn;
}
