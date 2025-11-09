// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    
    return (
      <div className="p-8">
        <h2>Please <Link href="/auth/login">login</Link> to access the dashboard.</h2>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl">Welcome, {(session.user as any).email}</h1>
    </div>
  );
}
