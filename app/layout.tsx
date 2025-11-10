import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Note-Taking App",
  description: "A simple AI-powered notes app with clean UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background text-foreground antialiased"
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex flex-col min-h-screen">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-4 border-b bg-background shadow-sm transition-colors">
              <h1 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-2xl">🧠</span> AI Notes
              </h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
              </div>
            </nav>

            <div className="flex-1 container mx-auto px-4 py-6">{children}</div>
          </main>
          <Toaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
