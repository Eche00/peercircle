'use client'
import { Search } from '@mui/icons-material'
import React, { useState } from 'react'
import CreateModal from '../CreateModal'
import { AnimatePresence } from 'framer-motion'

function Page() {
    const [search, setSearch] = useState<string>('')
    const [createModal, setCreateModal] = useState<boolean>(false)


    const joinableSessions = [
        {
            id: 'IG-1023',
            title: 'Instagram Followers',
            status: 'In Progress',
            joined: 20,
            max: 20,
            service: 'Followers',
            host: 'Bueze',
        },
        {
            id: 'IG-0991',
            title: 'X Likes ',
            status: 'Finished',
            joined: 15,
            max: 20,
            service: 'Likes',
            host: 'Prince',
        },
        {
            id: 'IG-0891',
            title: 'TikTok Followers ',
            status: 'Finished',
            joined: 10,
            max: 20,
            service: 'Likes',
            host: 'Grace',
        },
        {
            id: 'IG-1033',
            title: 'Instagram Likes',
            status: 'In Progress',
            joined: 20,
            max: 20,
            service: 'Likes',
            host: 'Bueze',
        },
        {
            id: 'IG-0981',
            title: 'Tiktok Likes ',
            status: 'Finished',
            joined: 15,
            max: 20,
            service: 'Likes',
            host: 'Prince',
        },
        {
            id: 'IG-0890',
            title: 'TikTok Comments ',
            status: 'Finished',
            joined: 10,
            max: 20,
            service: 'Comments',
            host: 'Grace',
        },
        {
            id: 'IG-1034',
            title: 'Instagram Likes',
            status: 'In Progress',
            joined: 20,
            max: 20,
            service: 'Likes',
            host: 'Bueze',
        },
        {
            id: 'IG-0983',
            title: 'Tiktok Likes ',
            status: 'Finished',
            joined: 15,
            max: 20,
            service: 'Likes',
            host: 'Prince',
        },
        {
            id: 'IG-0892',
            title: 'TikTok Comments ',
            status: 'Finished',
            joined: 10,
            max: 20,
            service: 'Comments',
            host: 'Grace',
        },
    ]


    const mySessions = [
        {
            id: 'IG-2031',
            title: 'Instagram Likes',
            max: 20,
            service: 'Likes',
            status: 'Finished',
            joined: 2,
            host: 'Alex',
        },
        {
            id: 'IG-2044',
            title: 'X Followers',
            max: 20,
            service: 'Followers',
            status: 'In Progress',
            joined: 16,
            host: 'Chris',
        },
        {
            id: 'IG-2144',
            title: 'Tiktok Comments',
            max: 20,
            service: 'Comments',
            status: 'Finished',
            joined: 6,
            host: 'Mary',
        },
    ]

    return (
        <div className="min-h-screen text-white sm:p-6 space-y-10 relative">
            {/* JOIN SESSION SECTION */}
            <div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    {/* LEFT — TITLE + SEARCH */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                        {/* SEARCH INPUT */}
                        <div className="relative w-full sm:max-w-sm">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                fontSize="small"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by Session ID"
                                className="w-full bg-[#0F1116] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border border border-[#8F4AE3]"
                            />
                        </div>
                    </div>

                    {/* RIGHT — ACTION */}
                    <button onClick={() => setCreateModal(true)} className="w-full sm:w-auto px-4 py-2 bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 rounded-lg text-sm whitespace-nowrap cursor-pointer">
                        Create Session
                    </button>
                </div>

                {/* SESSION LIST */}
                <div className="max-h-[65vh] overflow-y-auto  bg-[#0F1116] sm:p-6 p-4  rounded-2xl">
                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {joinableSessions.map((session) => (
                            <div
                                key={session.id}
                                className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl p-5 shadow-lg flex flex-col justify-between"
                            >
                                {/* HEADER */}
                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-sm font-medium">{session.title}</p>

                                    <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">
                                        {session.service}
                                    </span>
                                </div>

                                {/* SESSION META */}
                                <p className="text-xs text-gray-400 mb-3">
                                    Session ID: {session.id}
                                </p>

                                {/* PROGRESS */}
                                <div className="mb-4">
                                    <div className="flex items-center justify-between text-xs mb-1">
                                        <span className="text-gray-400">
                                            Joined
                                        </span>
                                        <span className="text-gray-300">
                                            {session.joined}/{session.max}
                                        </span>
                                    </div>

                                    <div className="w-full h-2 bg-[#0F1116] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#8F4AE3]"
                                            style={{ width: `${(session.joined / session.max) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {/* FOOTER */}
                                <div className="flex items-center justify-between mt-4">
                                    <p className="text-xs text-gray-500">
                                        Host: <span className="text-gray-300">{session.host}</span>
                                    </p>

                                    <button
                                        disabled={session.joined >= session.max}
                                        className={`px-4 py-2 rounded-lg text-sm ${session.joined >= session.max
                                            ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                            : 'bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 cursor-pointer'
                                            }`}
                                    >
                                        {session.joined >= session.max ? 'Full' : 'Join'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* CREATE / MY SESSIONS */}
            <div >
                <div className="flex items-center mb-4">
                    <h2 className="text-lg font-medium">My Sessions</h2>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mySessions.map((session) => (
                        <div
                            key={session.id}
                            className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl p-5 shadow-lg flex flex-col justify-between"
                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-3">
                                <p className="text-sm font-medium">{session.title}</p>

                                <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">
                                    {session.service}
                                </span>
                            </div>

                            {/* SESSION META */}
                            <p className="text-xs text-gray-400 mb-3">
                                Session ID: {session.id}
                            </p>

                            {/* STATUS */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs text-gray-400">Status</span>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full ${session.status === 'Finished'
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                        }`}
                                >
                                    {session.status}
                                </span>
                            </div>

                            {/* PARTICIPANTS */}
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-xs text-gray-400">Participants</span>
                                <span className="text-sm font-medium text-gray-200">
                                    {session.joined}/{session.max}
                                </span>
                            </div>

                            {/* FOOTER */}
                            <div className="flex items-center justify-between mt-auto">
                                <p className="text-xs text-gray-500">
                                    Host: <span className="text-gray-300">{session.host}</span>
                                </p>

                                <button className="px-4 py-2 rounded-lg text-sm bg-[#0F1116] hover:border hover:border-[#8F4AE3] cursor-pointer">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            {/* create modal  */}
            <AnimatePresence>
                {createModal && <CreateModal onClose={() => setCreateModal(false)} />}
            </AnimatePresence>
        </div>
    )
}

export default Page
