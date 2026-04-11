'use client'

import React from 'react'
import { motion } from 'framer-motion'

function Pulse({ className = '' }: { className?: string }) {
    return (
        <div
            className={`bg-[#2A2D34] animate-pulse rounded-md ${className}`}
        />
    )
}

function JoinSessionSkeleton() {
    const cards = Array.from({ length: 6 })

    return (
        <div>
            {/* HEADER ROW */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                {/* SEARCH */}
                <Pulse className="h-10 w-full sm:max-w-sm rounded-lg" />

                {/* BUTTON */}
                <Pulse className="h-10 w-full sm:w-36 rounded-lg" />
            </div>

            {/* GRID */}
            <div className="bg-[#0F1116] sm:p-6 p-4 rounded-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-[#212329] border border-gray-800 rounded-2xl p-5 flex flex-col justify-between"
                        >
                            {/* HEADER */}
                            <div className="flex items-center justify-between mb-3">
                                <Pulse className="h-4 w-28" />
                                <Pulse className="h-5 w-16 rounded-full" />
                            </div>

                            {/* SESSION ID */}
                            <Pulse className="h-3 w-40 mb-4" />

                            {/* PROGRESS */}
                            <div className="mb-4 space-y-2">
                                <div className="flex justify-between">
                                    <Pulse className="h-3 w-12" />
                                    <Pulse className="h-3 w-10" />
                                </div>

                                <div className="w-full h-2 bg-[#0F1116] rounded-full overflow-hidden">
                                    <div className="h-full w-1/2 bg-[#2A2D34] animate-pulse" />
                                </div>
                            </div>

                            {/* COUNTDOWN */}
                            <Pulse className="h-3 w-24 mb-3" />

                            {/* FOOTER */}
                            <div className="flex items-center justify-between mt-4">
                                <Pulse className="h-3 w-20" />
                                <Pulse className="h-8 w-20 rounded-lg" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default JoinSessionSkeleton