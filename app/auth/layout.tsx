"use client";

import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#191A1E] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="circleBlur absolute top-[-10%] right-[-10%] opacity-40 pointer-events-none"></div>
      <div className="circleBlur absolute bottom-[-10%] left-[-10%] opacity-40 pointer-events-none"></div>

      <div className="z-10 w-full max-w-md flex flex-col items-center gap-8">
        {/* Logo / Header */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex items-center justify-center border-2 border-[#8F4AE3] rounded-full p-2 w-10 h-10">
            <img
              src="/logo.png"
              alt="PeerCircle"
              className="w-full h-full object-cover"
            />
          </span>
          <span className="text-2xl font-bold tracking-wide">
            <span className="text-white">Peer</span>Circle
          </span>
        </Link>

        {/* Content Card */}
        <div className="w-full bg-[#212329] p-8 rounded-2xl border border-gray-800 shadow-xl">
          {children}
        </div>
      </div>

      <footer className="mt-8 text-gray-500 text-sm z-10">
        &copy; {new Date().getFullYear()} PeerCircle. All rights reserved.
      </footer>
    </div>
  );
}
