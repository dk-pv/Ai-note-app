"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-center px-4">
      <h1 className="text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
        Welcome to AI Note App ✨
      </h1>
      <p className="text-gray-600 dark:text-gray-300 max-w-md mb-6">
        Create, organize and improve your notes using powerful AI tools.  
        Sign up to get started!
      </p>

      <Button
        onClick={() => router.push("/register")}
        className="px-6 py-3 text-lg rounded-md shadow-md"
      >
        Register Now
      </Button>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <button
          onClick={() => router.push("/login")}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Login
        </button>
      </p>
    </main>
  );
}
