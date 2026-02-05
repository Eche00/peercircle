"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Twitter, LinkedIn, GitHub, Lock, Security } from "@mui/icons-material";

function ProfilePage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen text-white sm:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        {/* SIDEBAR */}
        <aside className="col-span-12 lg:col-span-5 bg-[#212329] rounded-2xl p-5 border border-[#8F4AE3]">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-[#8F4AE3] flex items-center justify-center text-xl font-bold">
              C
            </div>
            <div>
              <p className="font-semibold">Profile Settings</p>
              <p className="text-xs text-gray-400">Account Details</p>
            </div>
          </div>

          <div className="bg-[#16181B] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center mb-4">
            <p className="text-sm text-gray-400 mb-4"> Trust Points </p>
            {/* CIRCLE BADGE */}
            <div className="h-28 w-28 rounded-full border-4 border-purple-500 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">750</p>
                <p className="text-xs text-gray-400">Points</p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <Link
              href="/dashboard/tasks"
              className="w-fit px-5 py-2 bg-[#8F4AE3] hover:bg-[#7A3ED1] rounded-lg text-sm cursor-pointer"
            >
              Earn Points
            </Link>
            <button
              onClick={handleSignOut}
              className="w-fit px-5 py-2 bg-red-600 hover:bg-red-600/90 rounded-lg text-sm cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-12 lg:col-span-7 space-y-6">
          {/* HEADER */}
          <div className="bg-[#212329] rounded-2xl p-6 hover:border hover:border-[#8F4AE3] flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold">Welcome, John Doe</h1>
              <p className="text-sm text-gray-400">
                Member since Feb 2 · Platinum
              </p>
            </div>

            <span className="px-4 py-1 rounded-full text-xs bg-[#8F4AE3]/20 hover:border hover:border-[#8F4AE3] text-[#C9A9FF]">
              Trusted Tier: Platinum
            </span>
          </div>

          {/* ACCOUNT DETAILS */}
          <div className="bg-[#212329] rounded-2xl p-6 hover:border hover:border-[#8F4AE3]">
            <h2 className="text-sm font-semibold mb-4">Account Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Full Name", "Email Address", "Phone Number"].map(
                (label, i) => (
                  <input
                    key={i}
                    placeholder={label}
                    readOnly={label === "Email Address"} // make email read-only
                    className={`bg-[#16181B] rounded-lg px-4 py-2 text-sm focus:outline-none ${
                      label === "Email Address"
                        ? "text-gray-500 cursor-not-allowed" // style read-only differently
                        : "hover:border hover:border-[#8F4AE3] focus:border-[#8F4AE3]"
                    }`}
                  />
                ),
              )}
            </div>

            <button className="mt-4 px-5 py-2 bg-[#8F4AE3] hover:bg-[#7A3ED1] rounded-lg text-sm">
              Save Changes
            </button>
          </div>

          {/* CONNECT SOCIAL MEDIA (replaced SMS section) */}
          <div className="bg-[#212329] rounded-2xl p-6 hover:border hover:border-[#8F4AE3]">
            <h2 className="text-sm font-semibold mb-4">Connect Social Media</h2>

            <div className="space-y-4">
              <SocialRow icon={<Twitter />} name="Twitter" />
              <SocialRow icon={<LinkedIn />} name="LinkedIn" />
              <SocialRow icon={<GitHub />} name="GitHub" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function SocialRow({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 text-sm text-gray-300">
        <span className="text-[#8F4AE3]">{icon}</span>
        {name}
      </div>
      <button className="px-4 py-1 text-xs rounded-lg hover:border hover:border-[#8F4AE3] text-[#C9A9FF] bg-[#8F4AE3]/20 cursor-pointer">
        Connect
      </button>
    </div>
  );
}

export default ProfilePage;
