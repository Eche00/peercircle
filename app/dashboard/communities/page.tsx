'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Search } from '@mui/icons-material'

const communities = [
    { title: 'AI & Tech', members: '120k', tag: 'Official' },
    { title: 'Creative Design', members: '86k', tag: 'Public' },
    { title: 'Social Media Strategy', members: '48k', tag: 'Public' },
    { title: 'Fintech', members: '64k', tag: 'Official' },
    { title: 'Product Builders', members: '32k', tag: 'Public' },
    { title: 'Founders Circle', members: '19k', tag: 'Private' },
]

const joinedCommunities = [
    'AI & Tech',
    'Creative Design',
    'Product Builders',
    'Fintech',
]

function Page() {
    const [search, setSearch] = useState<string>('')
    const [joinModal, setJoinModal] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    return (
        <div className="min-h-screen  text-white ">
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

                {/* LEFT CONTENT */}
                <section className="col-span-12 lg:col-span-8">
                    {/* HEADER */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-semibold">
                            Join New Communities
                        </h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Connect, share ideas & grow with people like you
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">

                            {/*  SEARCH */}
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


                        </div>
                        {/* FILTERS */}
                        <div className="flex gap-3 mt-4">
                            {['All', 'Official Forums', 'Public Forums'].map((item, i) => (
                                <button
                                    key={i}
                                    className={`px-4 py-1.5 rounded-full text-sm transition
                    ${item === 'All'
                                            ? 'bg-[#8F4AE3]'
                                            : 'bg-[#1A1C22] hover:bg-[#23262F]'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* COMMUNITY GRID */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {communities.map((c, i) => (
                            <div
                                key={i}
                                className="bg-[#15171C] rounded-2xl border border-[#2A2D35] overflow-hidden hover:border-[#8F4AE3] transition"
                            >
                                {/* Image placeholder */}
                                <div className="h-36 bg-linear-to-br from-[#2A2D35] to-[#1A1C22]" />

                                <div className="p-4">
                                    <h3 className="font-medium">{c.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {c.members} members · {c.tag}
                                    </p>

                                    <button className="mt-4 w-full text-sm py-2 rounded-lg bg-[#8F4AE3]/20 text-[#C9A9FF] hover:bg-[#8F4AE3]/30 cursor-pointer" onClick={() => setJoinModal(true)}>
                                        Join
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RIGHT SIDEBAR – JOINED COMMUNITIES */}
                <aside className="col-span-12 lg:col-span-4">
                    <div className="bg-[#15171C] rounded-2xl border border-[#2A2D35] p-5 h-full">
                        <h2 className="text-sm font-semibold mb-4">
                            Communities You’ve Joined
                        </h2>

                        <div className="space-y-3">
                            {joinedCommunities.map((name, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1A1C22] hover:bg-[#23262F] transition"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-[#8F4AE3]/30 flex items-center justify-center text-xs font-bold">
                                            {name[0]}
                                        </div>
                                        <span className="text-sm">{name}</span>
                                    </div>

                                    <span className="text-xs text-[#8F4AE3]">
                                        Joined
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* FOOTER */}
                        <button className="mt-5 w-full text-sm py-2 rounded-lg border border-[#8F4AE3] text-[#C9A9FF] hover:bg-[#8F4AE3]/10">
                            Manage Communities
                        </button>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Page
