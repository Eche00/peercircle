'use client'
import { PestControlRodent } from "@mui/icons-material";
import Link from "next/link";
import React, { useState } from "react";

function Dashboard() {
    const [prevSessions, setPrevSessions] = useState<boolean>(false)
    return (
        <div className="min-h-screen text-white sm:p-6 ">
            {/* TOP GRID — BALANCE / TRUST / ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* TRUST POINTS CARD */}
                <div className="bg-linear-to-br from-[#1b1f3b] bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center">
                    <p className="text-sm text-gray-400 mb-4"> Trust Points </p>
                    {/* CIRCLE BADGE */}
                    <div className="h-28 w-28 rounded-full border-4 border-purple-500 flex items-center justify-center">
                        <div className="text-center">
                            <p className="text-2xl font-bold">750</p>
                            <p className="text-xs text-gray-400">Points</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-4"> Trust Tier: <span className="text-purple-400">Platinum</span> </p>
                </div>

                {/* ACTIVITY FEED — EXTENDS TO EDGE */}
                <div className="lg:col-span-3 bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl px-6 py-4 shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Activity Feed
                        </p>
                        <span className="text-[11px] text-gray-500">
                            Latest updates
                        </span>
                    </div>

                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-300">
                                Earned Trust Points
                            </span>
                            <span className="text-purple-400 text-xs">
                                Feb 1, 2025
                            </span>
                        </li>

                        <li className="flex justify-between border-b border-gray-800 pb-2">
                            <span className="text-gray-300">
                                Withdrawal Approved
                            </span>
                            <span className="text-purple-400 text-xs">
                                Feb 3, 2025
                            </span>
                        </li>

                        <li className="flex justify-between">
                            <span className="text-gray-300">
                                Escrow Completed
                            </span>
                            <span className="text-purple-400 text-xs">
                                Jan 30, 2025
                            </span>
                        </li>
                    </ul>
                </div>


            </div>


            {/* SESSIONS JOINED SECTION */}
            <div className="mt-10">
                <h2 className="text-lg font-semibold mb-4">
                    Sessions Joined
                </h2>

                {prevSessions ?
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* SESSION CARD */}
                        <div className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl p-4 shadow-lg">
                            <div className="h-32 bg-gray-800 rounded-lg mb-4" />

                            <p className="text-sm font-medium">
                                Active — Following
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Status: Funds Secured
                            </p>

                            <button className="mt-4 w-full py-2 rounded-lg bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 cursor-pointer text-sm">
                                View Details
                            </button>
                        </div>

                        {/* SESSION CARD */}
                        <div className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl p-4 shadow-lg">
                            <div className="h-32 bg-gray-800 rounded-lg mb-4" />

                            <p className="text-sm font-medium">
                                Active — Inspection Phase
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Status: Inspection Ongoing
                            </p>

                            <button className="mt-4 w-full py-2 rounded-lg bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 cursor-pointer text-sm">
                                View Details
                            </button>
                        </div>

                        {/* SESSION CARD */}
                        <div className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl p-4 shadow-lg">
                            <div className="h-32 bg-gray-800 rounded-lg mb-4" />

                            <p className="text-sm font-medium">
                                Completed — Earned 50 Pts
                            </p>

                            <p className="text-xs text-gray-400 mt-1">
                                Status: Buyer & Seller Review
                            </p>

                            <button className="mt-4 w-full py-2 rounded-lg bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 cursor-pointer text-sm">
                                View Details
                            </button>
                        </div>
                    </div>
                    :
                    <div className="bg-[#212329] border border-[#8F4AE3] sm:h-[250px] h-[200px] flex flex-col items-center justify-center rounded-2xl mt-5">
                        <span><PestControlRodent fontSize="large" /></span>
                        <p className="text-sm text-gray-400 text-center">
                            No active sessions found. Join one to get started.
                        </p>

                        <Link href='/dashboard/sessions' className="mt-4 w-fit py-2 px-4 rounded-lg bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 cursor-pointer text-sm">
                            Join Session
                        </Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default Dashboard;
