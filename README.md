# 🧠 AI Note-Taking App

A modern full-stack **AI-powered Note-Taking Application** built with **Next.js 14, TypeScript, Hono.js,MongoDB, and shadcn/ui**.  
This project demonstrates end-to-end MERN/PERN stack skills with clean architecture, authentication, CRUD operations, and AI text enhancement using the **Gemini API**.

---

## 🚀 Features

### 🧩 Core
- User Authentication (Register / Login / Protected Routes)
- Create, Edit, Delete Notes
- View all your Notes in Dashboard
- Search Notes by title
- Simple User Profile Page

### 🤖 AI-Powered Features
- **AI Summary** — Generates concise summaries for long notes  
- **AI Improve** — Enhances grammar and clarity  
- **AI Tags** — Suggests relevant tags automatically  

### 🎨 UI / UX
- Built with **shadcn/ui** and **Tailwind CSS**
- Responsive, minimal, elegant design
- Dark / Light Theme Toggle
- Clean TypeScript code with validation using **Zod**

---

## 🧠 Tech Stack

| Layer | Tech |
|--------|------|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui |
| **Backend** | Hono.js API routes, NextAuth.js for auth |
| **Database** | MongoDB via Mongoose  |
| **Validation** | Zod |
| **AI Integration** | Google Gemini API |
| **Deployment** | Vercel (Frontend + API) |

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following variables:

```env
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GEMINI_API_KEY=
GEMINI_MODEL=
FRONTEND_URL=
