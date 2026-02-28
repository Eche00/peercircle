"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { Twitter, LinkedIn, GitHub, Lock, Security } from "@mui/icons-material";
import { handleSignOut } from "@/utils/logics/userinfo";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [trustPoints, setTrustPoints] = useState<number>(0);

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Listen for live trust points updates
        unsubscribeUser = onSnapshot(
          doc(db, "users", currentUser.uid),
          (doc) => {
            if (doc.exists()) {
              setTrustPoints(doc.data().trustPoints || 0);
            }
          },
        );
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, []);

  const tier = trustPoints > 500 ? "Platinum" : "Newcomer";

  return (
    <div className="min-h-screen text-white sm:p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">
        {/* SIDEBAR */}
        <aside className="col-span-12 lg:col-span-5 bg-[#212329] rounded-2xl p-5 border border-[#8F4AE3]">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-[#8F4AE3] flex items-center justify-center text-xl font-bold">
              {user?.displayName?.[0] || "C"}
            </div>
            <div>
              <p className="font-semibold">Profile Settings</p>
              <p className="text-xs text-gray-400">Account Details</p>
            </div>
          </div>

          <div className="bg-[#16181B] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center mb-4">
            <p className="text-sm text-gray-400 mb-4"> Trust Points </p>
            {/* CIRCLE BADGE */}
            <div className="h-28 w-28 rounded-full border-4 border-[#8F4AE3] flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold">{trustPoints}</p>
                <p className="text-xs text-gray-400">Points</p>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <Link
              href="/dashboard/tasks"
              className="w-fit px-5 py-2 bg-[#8F4AE3] hover:bg-[#7A3ED1] rounded-lg text-sm cursor-pointer transition-colors"
            >
              Earn Points
            </Link>
            <button
              onClick={handleSignOut}
              className="w-fit px-5 py-2 bg-red-600 hover:bg-red-600/90 rounded-lg text-sm cursor-pointer transition-colors"
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="col-span-12 lg:col-span-7 space-y-6">
          {/* HEADER */}
          <div className="bg-[#212329] rounded-2xl p-6 border border-gray-800 hover:border-[#8F4AE3] transition-all flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold">
                Welcome, {user?.displayName || "Creator"}
              </h1>
              <p className="text-sm text-gray-400">
                Member since Feb 2026 · {tier}
              </p>
            </div>

            <span className="px-4 py-1 rounded-full text-xs bg-[#8F4AE3]/20 border border-[#8F4AE3]/30 text-[#C9A9FF]">
              Trusted Tier: {tier}
            </span>
          </div>

          {/* ACCOUNT DETAILS */}
          <div className="bg-[#212329] rounded-2xl p-6 border border-gray-800 hover:border-[#8F4AE3] transition-all">
            <h2 className="text-sm font-semibold mb-4">Account Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    value={user?.displayName || "Loading..."}
                    readOnly
                    className="w-full bg-[#16181B] rounded-lg px-4 py-3 text-sm text-gray-400 focus:outline-none cursor-not-allowed border border-transparent"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs text-gray-500 mb-1 block ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    value={user?.email || "Loading..."}
                    readOnly
                    className="w-full bg-[#16181B] rounded-lg px-4 py-3 text-sm text-gray-400 focus:outline-none cursor-not-allowed border border-transparent"
                  />
                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* CONNECT SOCIAL MEDIA */}
          <div className="bg-[#212329] rounded-2xl p-6 border border-gray-800 hover:border-[#8F4AE3] transition-all">
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
      <button className="px-4 py-1 text-xs rounded-lg hover:border hover:border-[#8F4AE3] text-[#C9A9FF] bg-[#8F4AE3]/20 cursor-pointer transition-all">
        Connect
      </button>
    </div>
  );
}

export default ProfilePage;
