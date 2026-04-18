import React from "react";

function SkeletonBox({ className }: { className?: string }) {
    return (
        <div
            className={`rounded-lg bg-gradient-to-r from-[#2A2D35] via-[#32363F] to-[#2A2D35] animate-pulse ${className}`}
        />
    );
}

function CommunitySkeleton() {
    return (
        <div className="h-[80vh] text-white ">
            {/* OVERLAY */}
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-xs">
                <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-[#5E13FD] to-[#C9A9FF] bg-clip-text text-transparent">
                    Coming Soon !!
                </h2>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

                {/* LEFT CONTENT */}
                <section className="col-span-12 lg:col-span-8">

                    {/* HEADER */}
                    <div className="mb-6">
                        <SkeletonBox className="h-6 w-60 mb-2" />
                        <SkeletonBox className="h-4 w-80 mb-6" />

                        {/* SEARCH */}
                        <div className="flex flex-col sm:flex-row gap-4 mt-6">
                            <SkeletonBox className="h-10 w-full sm:max-w-sm" />
                        </div>

                        {/* FILTERS */}
                        <div className="flex gap-3 mt-4">
                            {[...Array(3)].map((_, i) => (
                                <SkeletonBox key={i} className="h-8 w-24 rounded-full" />
                            ))}
                        </div>
                    </div>

                    {/* COMMUNITY GRID */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[...Array(6)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-[#15171C] rounded-2xl border border-[#2A2D35] overflow-hidden"
                            >
                                {/* Image */}
                                <SkeletonBox className="h-36 w-full" />

                                <div className="p-4">
                                    <SkeletonBox className="h-4 w-40 mb-2" />
                                    <SkeletonBox className="h-3 w-32 mb-4" />
                                    <SkeletonBox className="h-9 w-full rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RIGHT SIDEBAR */}
                <aside className="col-span-12 lg:col-span-4">
                    <div className="bg-[#15171C] rounded-2xl border border-[#2A2D35] p-5 h-full">

                        <SkeletonBox className="h-4 w-48 mb-4" />

                        <div className="space-y-3">
                            {[...Array(4)].map((_, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#1A1C22]"
                                >
                                    <div className="flex items-center gap-3">
                                        <SkeletonBox className="h-8 w-8 rounded-lg" />
                                        <SkeletonBox className="h-4 w-32" />
                                    </div>

                                    <SkeletonBox className="h-3 w-12" />
                                </div>
                            ))}
                        </div>

                        {/* FOOTER BUTTON */}
                        <SkeletonBox className="mt-5 h-10 w-full rounded-lg" />
                    </div>
                </aside>

            </div>
        </div>
    );
}

export default CommunitySkeleton;