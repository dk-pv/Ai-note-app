import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export const noteCreateSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().default(""), // ✅ valid default
  tags: z.array(z.string()).default([]), // ✅ valid default
});

// partial for update
export const noteUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().optional(),
  tags: z.array(z.string()).optional(),
});