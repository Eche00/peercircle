import React from "react";

function SkeletonBox({ className }: { className?: string }) {
    return (
        <div
            className={`animate-pulse bg-gray-800/60 rounded-lg ${className}`}
        />
    );
}

function TasksSkeleton() {
    return (
        <div className="flex flex-col gap-8 pb-10">

            {/* 🔥 HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                {/* Title */}
                <div className="space-y-3">
                    <SkeletonBox className="h-8 w-48" />
                    <SkeletonBox className="h-4 w-72" />
                </div>

                {/* Stats Card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#212329] p-4 rounded-2xl border border-gray-800 w-full md:w-auto">

                    {/* Points */}
                    <div className="flex items-center gap-3 pr-0 sm:pr-4 sm:border-r border-gray-700 w-full sm:w-auto">
                        <SkeletonBox className="w-10 h-10 rounded-xl" />
                        <div className="space-y-2">
                            <SkeletonBox className="h-3 w-24" />
                            <SkeletonBox className="h-5 w-16" />
                        </div>
                    </div>

                    {/* Completed */}
                    <div className="flex items-center gap-3 pl-0 sm:pl-4 w-full sm:w-auto">
                        <SkeletonBox className="w-10 h-10 rounded-xl" />
                        <div className="space-y-2">
                            <SkeletonBox className="h-3 w-20" />
                            <SkeletonBox className="h-5 w-14" />
                        </div>
                    </div>

                </div>
            </div>

            {/* 📊 PROGRESS */}
            <div className="w-full bg-[#212329] p-6 rounded-2xl border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <SkeletonBox className="h-4 w-32" />
                    <SkeletonBox className="h-4 w-10" />
                </div>

                <SkeletonBox className="h-3 w-full rounded-full mb-4" />

                <div className="flex items-center gap-2">
                    <SkeletonBox className="w-4 h-4 rounded" />
                    <SkeletonBox className="h-3 w-56" />
                </div>
            </div>

            {/* 📋 TASK LIST */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-[#212329] border border-gray-800 p-6 rounded-2xl flex items-center gap-4"
                    >

                        {/* Icon */}
                        <SkeletonBox className="w-14 h-14 rounded-2xl shrink-0" />

                        {/* Text */}
                        <div className="flex-1 space-y-2">
                            <div className="flex gap-2">
                                <SkeletonBox className="h-3 w-16 rounded-md" />
                                <SkeletonBox className="h-3 w-12 rounded-md" />
                            </div>

                            <SkeletonBox className="h-5 w-40" />
                            <SkeletonBox className="h-3 w-52" />
                        </div>

                        {/* Button */}
                        <SkeletonBox className="w-10 h-10 rounded-full" />
                    </div>
                ))}

            </div>

            {/* 🎉 EXTRA SECTION */}
            <div className="mt-12 bg-[#212329] border border-gray-800 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8">

                {/* Icon */}
                <SkeletonBox className="w-24 h-24 rounded-3xl" />

                {/* Text */}
                <div className="flex-1 w-full space-y-3 text-center md:text-left">
                    <SkeletonBox className="h-6 w-48 mx-auto md:mx-0" />
                    <SkeletonBox className="h-4 w-full max-w-md mx-auto md:mx-0" />
                    <SkeletonBox className="h-4 w-4/5 max-w-sm mx-auto md:mx-0" />

                    <SkeletonBox className="h-10 w-40 rounded-xl mx-auto md:mx-0 mt-4" />
                </div>

            </div>
        </div>
    );
}

export default TasksSkeleton;