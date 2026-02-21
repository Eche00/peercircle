"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowBack, CheckCircle } from "@mui/icons-material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    try {
      await sendPasswordResetEmail(auth, email);
      setStatus("success");
    } catch (err: any) {
      console.error("Reset Password Error:", err);
      setStatus("error");
      if (err.code === "auth/user-not-found") {
        setErrorMessage("No account found with this email.");
      } else {
        setErrorMessage("Failed to send reset link. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
        <p className="text-gray-400 text-sm">
          Enter your email to receive reset instructions
        </p>
      </div>

      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm text-center">
          {errorMessage}
        </div>
      )}

      {status === "success" ? (
        <div className="flex flex-col gap-6 items-center text-center animate-in fade-in zoom-in duration-300">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 border border-green-500/20">
            <CheckCircle fontSize="large" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Check your email
            </h3>
            <p className="text-gray-400 text-sm mt-2">
              We have sent a password reset link to your email address.
            </p>
          </div>
          <Link
            href="/auth/sign-in"
            className="text-[#8F4AE3] hover:underline font-medium mt-2"
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="bg-[#16181B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-[#8F4AE3] hover:bg-[#7a3bc7] text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {status === "submitting" ? "Sending..." : "Send Reset Link"}
          </button>

          <div className="text-center">
            <Link
              href="/auth/sign-in"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowBack fontSize="small" /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
