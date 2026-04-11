'use client'

import { motion } from 'framer-motion'
import React from 'react'

function PulseBox({ className = '' }: { className?: string }) {
    return (
        <div
            className={`bg-[#2A2D34] rounded-md animate-pulse ${className}`}
        />
    )
}

function SessionsSkeleton() {
    const rows = Array.from({ length: 5 })

    return (
        <div>
            {/* HEADER */}
            <div className="flex items-center mb-4">
                <PulseBox className="h-5 w-40" />
            </div>

            {/* SEARCH + FILTERS */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <PulseBox className="h-10 w-full sm:max-w-sm rounded-lg" />

                <div className="flex gap-3 w-full sm:w-auto">
                    <PulseBox className="h-10 w-full sm:w-32 rounded-lg" />
                    <PulseBox className="h-10 w-full sm:w-32 rounded-lg" />
                </div>
            </div>

            {/* TABLE CONTAINER */}
            <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4 md:p-6 overflow-x-auto">
                <PulseBox className="h-5 w-40 mb-6" />

                {/* DESKTOP HEADER */}
                <div className="hidden md:grid grid-cols-5 pb-3 border-b border-gray-700 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <PulseBox key={i} className="h-3 w-20" />
                    ))}
                </div>

                {/* ROWS */}
                <div className="space-y-4">
                    {rows.map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="py-4 md:grid md:grid-cols-5 gap-4 items-center"
                        >
                            {/* MOBILE */}
                            <div className="md:hidden space-y-3">
                                <div className="flex justify-between">
                                    <div className="space-y-2">
                                        <PulseBox className="h-4 w-32" />
                                        <PulseBox className="h-3 w-20" />
                                    </div>
                                    <PulseBox className="h-6 w-20 rounded-full" />
                                </div>

                                <div className="flex justify-between">
                                    <PulseBox className="h-3 w-20" />
                                    <PulseBox className="h-3 w-16" />
                                </div>

                                <PulseBox className="h-9 w-full rounded-md" />
                            </div>

                            {/* DESKTOP */}
                            <div className="hidden md:contents">
                                <div className="space-y-2">
                                    <PulseBox className="h-4 w-32" />
                                    <PulseBox className="h-3 w-20" />
                                </div>

                                <PulseBox className="h-4 w-20" />

                                <PulseBox className="h-6 w-24 rounded-full" />

                                <PulseBox className="h-4 w-16" />

                                <div className="flex justify-end">
                                    <PulseBox className="h-8 w-20 rounded-md" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SessionsSkeleton