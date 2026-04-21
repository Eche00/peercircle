"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { createHistoryEntry } from "@/utils/logics/history";
import { FirebaseError } from "firebase/app";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await createHistoryEntry({
        userId: userCredential.user.uid,
        title: "User logged in",
        description: "You signed in to PeerCircle.",
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      const error = err as FirebaseError;
      console.error("Sign In Error:", error);
      if (error.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2 text-white">Welcome Back</h1>
        <p className="text-gray-400 text-sm">
          Sign in to continue your growth journey
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="bg-[#16181B] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5E13FD] focus:ring-2 focus:ring-[#5E13FD]/20 transition-all"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-[#5E13FD] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              className="w-full bg-[#16181B] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5E13FD] focus:ring-2 focus:ring-[#5E13FD]/20 transition-all pr-12"
              placeholder="********"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#5E13FD] transition-colors cursor-pointer"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-[#5E13FD] hover:bg-[#4f0fd9] text-white py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-[#5E13FD]/20"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/sign-up"
          className="text-[#5E13FD] hover:underline font-medium"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
