"use client";

import React from "react";
import { motion } from "framer-motion";

function PulseBox({ className = "" }: { className?: string }) {
    return (
        <div className={`bg-[#2A2D34] rounded-md animate-pulse ${className}`} />
    );
}

function ProfileSkeleton() {
    return (
        <div className="min-h-screen text-white sm:p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-6">

                {/* SIDEBAR */}
                <aside className="col-span-12 lg:col-span-5 bg-[#212329] rounded-2xl p-5 border border-[#5E13FD]/40">

                    {/* HEADER */}
                    <div className="flex items-center gap-3 mb-8">
                        <PulseBox className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                            <PulseBox className="h-4 w-32" />
                            <PulseBox className="h-3 w-24" />
                        </div>
                    </div>

                    {/* TRUST POINTS CARD */}
                    <div className="bg-[#16181B] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center mb-6">
                        <PulseBox className="h-4 w-24 mb-6" />
                        <PulseBox className="h-28 w-28 rounded-full" />
                    </div>

                    {/* BUTTONS */}
                    <div className="flex items-center justify-between">
                        <PulseBox className="h-9 w-28 rounded-lg" />
                        <PulseBox className="h-9 w-24 rounded-lg" />
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="col-span-12 lg:col-span-7 space-y-6">

                    {/* HEADER */}
                    <div className="bg-[#212329] rounded-2xl p-6 border border-gray-800 flex flex-wrap items-center justify-between gap-4">
                        <div className="space-y-3">
                            <PulseBox className="h-5 w-48" />
                            <PulseBox className="h-3 w-40" />
                        </div>

                        <PulseBox className="h-6 w-40 rounded-full" />
                    </div>

                    {/* ACCOUNT DETAILS */}
                    <div className="bg-[#212329] rounded-2xl p-6 border border-gray-800">
                        <PulseBox className="h-4 w-40 mb-6" />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* FIELD 1 */}
                            <div>
                                <PulseBox className="h-3 w-24 mb-2" />
                                <PulseBox className="h-12 w-full rounded-lg" />
                            </div>

                            {/* FIELD 2 */}
                            <div>
                                <PulseBox className="h-3 w-28 mb-2" />
                                <PulseBox className="h-12 w-full rounded-lg" />
                            </div>
                        </div>
                    </div>

                    {/* SOCIAL SECTION */}
                    <div className="bg-[#212329] rounded-2xl p-6 border border-gray-800">
                        <PulseBox className="h-4 w-44 mb-6" />

                        <div className="space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <PulseBox className="h-5 w-5 rounded-full" />
                                        <PulseBox className="h-4 w-28" />
                                    </div>

                                    <PulseBox className="h-8 w-20 rounded-lg" />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default ProfileSkeleton;