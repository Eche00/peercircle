"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      // Create Authentication User
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Update Profile Display Name
      await updateProfile(user, { displayName: fullName });

      // Create User Document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        fullName: fullName,
        createdAt: new Date().toISOString(),
        trustPoints: 0,
        role: "user",
      });

      console.log("User created:", user.uid);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Sign Up Error:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already in use.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Failed to create account. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-400 text-sm">
          Join the community and start growing
        </p>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-300"
          >
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            required
            className="bg-[#16181B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">
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

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              className="w-full bg-[#16181B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8F4AE3] transition-colors cursor-pointer"
            >
              {showPassword ? (
                <VisibilityOff fontSize="small" />
              ) : (
                <Visibility fontSize="small" />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              required
              onPaste={(e) => e.preventDefault()}
              className="w-full bg-[#16181B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors pr-12"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8F4AE3] transition-colors cursor-pointer"
            >
              {showConfirmPassword ? (
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
          className="mt-2 bg-[#8F4AE3] hover:bg-[#7a3bc7] text-white py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <Link
          href="/auth/sign-in"
          className="text-[#8F4AE3] hover:underline font-medium"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
