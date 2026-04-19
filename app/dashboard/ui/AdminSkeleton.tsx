import React from "react";

function SkeletonBox({ className }: { className?: string }) {
    return (
        <div className={`animate-pulse bg-gray-800/60 rounded-lg ${className}`} />
    );
}

function AdminSkeleton() {
    return (
        <div className="space-y-6">

            {/* 🔥 TOP STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#212329] border border-gray-800 rounded-2xl p-4"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <SkeletonBox className="w-6 h-6 rounded-md" />
                            <SkeletonBox className="w-12 h-3" />
                        </div>

                        <SkeletonBox className="h-6 w-16 mb-2" />
                        <SkeletonBox className="h-3 w-32" />
                    </div>
                ))}
            </div>

            {/* 📊 SECOND ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* TASKS */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                    <SkeletonBox className="h-4 w-40 mb-4" />

                    <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between bg-[#0F1116] px-3 py-3 rounded-lg"
                            >
                                <div className="space-y-2">
                                    <SkeletonBox className="h-3 w-32" />
                                    <SkeletonBox className="h-3 w-20" />
                                </div>

                                <SkeletonBox className="h-5 w-10 rounded-full" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* COMMUNITIES */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                    <SkeletonBox className="w-16 h-16 rounded-full mb-4" />
                    <SkeletonBox className="h-5 w-32 mb-2" />
                    <SkeletonBox className="h-3 w-48 mb-2" />
                    <SkeletonBox className="h-3 w-40 mb-4" />
                    <SkeletonBox className="h-5 w-24 rounded-full" />
                </div>
            </div>

            {/* 📈 EXTRA INSIGHTS */}
            <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                <SkeletonBox className="h-4 w-40 mb-4" />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-[#0F1116] border border-gray-800 rounded-xl p-4 flex items-center gap-3"
                        >
                            <SkeletonBox className="w-10 h-10 rounded-lg" />

                            <div className="space-y-2">
                                <SkeletonBox className="h-4 w-12" />
                                <SkeletonBox className="h-3 w-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default AdminSkeleton;