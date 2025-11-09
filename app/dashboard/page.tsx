// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import NotesClient from "./components/NotesClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-lg">
          Please{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            login
          </Link>{" "}
          to access the dashboard.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Welcome, {(session.user as any).name || (session.user as any).email}
        </h1>
        <Link
          href="/api/auth/signout"
          className="text-sm text-red-500 hover:underline"
        >
          Logout
        </Link>
      </div>

      {/* Notes List UI */}
      <NotesClient />
    </div>
  );
}
