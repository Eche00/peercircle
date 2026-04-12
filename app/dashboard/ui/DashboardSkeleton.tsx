import React from "react";

function SkeletonBox({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gray-800/60 rounded-lg ${className}`}
        />
    );
}

function DashboardSkeleton() {
    return (
        <div className="flex flex-col gap-8 pb-10">

            {/* HERO */}
            <div className="bg-[#8F4AE3]/20 p-8 rounded-3xl">
                <SkeletonBox className="h-8 w-64 mb-4" />
                <SkeletonBox className="h-4 w-96 mb-6" />
                <SkeletonBox className="h-10 w-40 rounded-xl" />
            </div>

            {/* TRUST + ACTIVITY */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* TRUST CARD */}
                <div className="bg-[#212329] p-8 rounded-3xl border border-gray-800 flex flex-col items-center">
                    <SkeletonBox className="h-4 w-24 mb-6" />
                    <div className="w-36 h-36 bg-gray-800/60 rounded-full mb-6" />
                    <SkeletonBox className="h-4 w-32" />
                </div>

                {/* ACTIVITY */}
                <div className="lg:col-span-3 bg-[#212329] p-6 rounded-3xl border border-gray-800">
                    <SkeletonBox className="h-5 w-40 mb-6" />

                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <SkeletonBox className="h-4 w-56" />
                                <SkeletonBox className="h-4 w-20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#212329] p-6 rounded-2xl border border-gray-800"
                    >
                        <SkeletonBox className="w-12 h-12 rounded-xl mb-4" />
                        <SkeletonBox className="h-4 w-24 mb-2" />
                        <SkeletonBox className="h-6 w-16" />
                    </div>
                ))}
            </div>

            {/* TASKS + ANALYTICS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* TASKS */}
                <div className="lg:col-span-2 bg-[#212329] rounded-3xl border border-gray-800">
                    <div className="p-6 border-b border-gray-800">
                        <SkeletonBox className="h-5 w-40" />
                    </div>

                    <div className="p-4 space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between items-center">
                                <SkeletonBox className="h-4 w-48" />
                                <SkeletonBox className="h-4 w-6" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ANALYTICS */}
                <div className="bg-[#212329] rounded-3xl border border-gray-800 p-8 flex flex-col items-center">
                    <SkeletonBox className="w-20 h-20 rounded-full mb-6" />
                    <SkeletonBox className="h-5 w-32 mb-3" />
                    <SkeletonBox className="h-4 w-48 mb-6" />
                    <SkeletonBox className="h-2 w-full mb-6" />
                    <SkeletonBox className="h-10 w-full rounded-xl" />
                </div>
            </div>

            {/* SESSIONS */}
            <div className="bg-[#212329] border border-gray-800 rounded-2xl p-6">
                <SkeletonBox className="h-5 w-40 mb-6" />

                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="grid grid-cols-5 gap-4 items-center">
                            <SkeletonBox className="h-4 w-full" />
                            <SkeletonBox className="h-4 w-full" />
                            <SkeletonBox className="h-4 w-20" />
                            <SkeletonBox className="h-4 w-16" />
                            <SkeletonBox className="h-4 w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DashboardSkeleton;