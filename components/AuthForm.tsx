"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { registerSchema, loginSchema } from "@/lib/validation";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterForm = z.infer<typeof registerSchema>;
type LoginForm = z.infer<typeof loginSchema>;

interface AuthFormProps {
  mode?: "register" | "login";
}

export default function AuthForm({ mode = "register" }: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const schema = mode === "register" ? registerSchema : loginSchema;
  const form = useForm<RegisterForm | LoginForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterForm | LoginForm) => {
    setLoading(true);
    try {
      if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (res.ok) {
          toast.success("✅ Account created successfully! Redirecting to login...");
          setTimeout(() => router.push("/login"), 1500);
        } else {
          const err = await res.json();
          toast.error(err.error || "❌ Registration failed. Try again.");
        }
      } else {
        const result = await signIn("credentials", {
          redirect: false, // prevent auto redirect so we can control flow
          email: (data as LoginForm).email,
          password: (data as LoginForm).password,
        });

        if (result?.error) {
          toast.error("❌ Invalid email or password. Please try again.");
        } else {
          toast.success("🎉 Login successful! Redirecting...");
          setTimeout(() => router.push("/dashboard"), 1500);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen w-full
                 bg-background text-foreground transition-colors duration-500"
    >
      <Card
        className="w-full max-w-md p-6 shadow-lg border rounded-xl
                   bg-card text-card-foreground transition-colors duration-300"
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center mb-2">
            {mode === "register" ? "Create Account" : "Welcome Back"}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {mode === "register"
              ? "Join AI Notes to save and improve your ideas."
              : "Log in to access your smart notes."}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {mode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  {...form.register("name" as keyof RegisterForm)}
                  placeholder="Enter your name"
                  className="bg-background"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...form.register("email" as "email")}
                placeholder="you@example.com"
                className="bg-background"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...form.register("password" as "password")}
                placeholder="••••••••"
                className="bg-background"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-lg"
              disabled={loading}
            >
              {loading
                ? mode === "register"
                  ? "Creating account..."
                  : "Logging in..."
                : mode === "register"
                ? "Register"
                : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {mode === "register" ? (
              <>
                Already have an account?{" "}
                <a href="/login" className="text-primary hover:underline">
                  Sign in
                </a>
              </>
            ) : (
              <>
                Don’t have an account?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Register
                </a>
              </>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
