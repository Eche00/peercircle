'use client'

import React, { useEffect, useMemo, useState } from 'react'
import useAdminData from '@/utils/logics/admin'
import {
    People, Bolt, Insights, Groups, CheckCircle,
    Star,
    AssignmentTurnedIn,
    TrendingUp
} from '@mui/icons-material'
import { fetchDailyTasks } from '@/utils/taskActions'
import AdminSkeleton from '../../ui/AdminSkeleton'

function Overview() {
    const { users, sessions, loading } = useAdminData()
    const [tasks, setTasks] = useState<any[]>([])
    const [taskLoading, setTaskLoading] = useState(true)

    // FETCH TASKS
    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await fetchDailyTasks()
                setTasks(res)
            } catch (err) {
                console.error(err)
            } finally {
                setTaskLoading(false)
            }
        }

        getTasks()
    }, [])

    //  ANALYTICS
    const analytics = useMemo(() => {
        const totalUsers = users.length
        const totalSessions = sessions.length

        const activeSessions = sessions.filter(
            (s) => s.status === 'In Progress'
        ).length

        const finishedSessions = sessions.filter(
            (s) => s.status === 'Finished'
        ).length

        const totalPoints = users.reduce(
            (acc, u) => acc + (u.trustPoints || 0),
            0
        )

        const avgPoints =
            totalUsers > 0 ? Math.floor(totalPoints / totalUsers) : 0

        return {
            totalUsers,
            totalSessions,
            activeSessions,
            finishedSessions,
            totalPoints,
            avgPoints,
        }
    }, [users, sessions])

    if (loading || taskLoading) return <AdminSkeleton />

    return (
        <div className="space-y-6">

            {/*  TOP STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* USERS */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <People className="text-[#5E13FD]" />
                        <span className="text-xs text-gray-400">Users</span>
                    </div>
                    <h2 className="text-2xl font-semibold">
                        {analytics.totalUsers}
                    </h2>
                    <p className="text-xs text-gray-400">
                        Total registered users
                    </p>
                </div>

                {/* SESSIONS */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Insights className="text-[#5E13FD]" />
                        <span className="text-xs text-gray-400">Sessions</span>
                    </div>
                    <h2 className="text-2xl font-semibold">
                        {analytics.totalSessions}
                    </h2>
                    <p className="text-xs text-gray-400">
                        Total sessions created
                    </p>
                </div>

                {/* ACTIVE */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Bolt className="text-yellow-400" />
                        <span className="text-xs text-gray-400">Live</span>
                    </div>
                    <h2 className="text-2xl font-semibold">
                        {analytics.activeSessions}
                    </h2>
                    <p className="text-xs text-gray-400">
                        Sessions in progress
                    </p>
                </div>

                {/* AVG POINTS */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <Bolt className="text-green-400" />
                        <span className="text-xs text-gray-400">Points</span>
                    </div>
                    <h2 className="text-2xl font-semibold">
                        {analytics.avgPoints}
                    </h2>
                    <p className="text-xs text-gray-400">
                        Avg trust points per user
                    </p>
                </div>
            </div>

            {/*  SECOND ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* TASKS */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                    <h2 className="text-sm font-semibold mb-4">
                        Daily Tasks Overview
                    </h2>

                    {tasks.length === 0 ? (
                        <p className="text-gray-400 text-sm">
                            No tasks available
                        </p>
                    ) : (
                        <div className="space-y-3">
                            {tasks.slice(0, 4).map((task) => (
                                <div
                                    key={task.id}
                                    className="flex items-center justify-between bg-[#0F1116] px-3 py-2 rounded-lg"
                                >
                                    <div>
                                        <p className="text-sm font-medium">
                                            {task.title}
                                        </p>
                                        <p className="text-xs text-gray-400">
                                            {task.platform}
                                        </p>
                                    </div>

                                    <span className="text-xs bg-[#5E13FD]/20 border border-[#5E13FD]/30 text-[#C9A9FF] px-2 py-1 rounded-full">
                                        +{task.points}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/*  COMMUNITIES (DUMMY) */}
                <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                    <div className="w-16 h-16 bg-[#5E13FD]/10 rounded-full flex items-center justify-center mb-4">
                        <Groups className="text-[#5E13FD]" />
                    </div>

                    <h2 className="text-lg font-semibold mb-2">
                        Communities
                    </h2>

                    <p className="text-sm text-gray-400 max-w-xs">
                        Community analytics and insights will be available here.
                    </p>

                    <span className="mt-3 text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                        Coming Soon
                    </span>
                </div>
            </div>

            {/*  EXTRA INSIGHTS */}
            <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4">
                <h2 className="text-sm font-semibold mb-4">
                    System Insights
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">

                    {/* FINISHED SESSIONS */}
                    <div className="bg-[#0F1116] border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <CheckCircle className="text-green-400" fontSize="small" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">
                                {analytics.finishedSessions}
                            </p>
                            <p className="text-xs text-gray-400">
                                Finished Sessions
                            </p>
                        </div>
                    </div>

                    {/* TOTAL POINTS */}
                    <div className="bg-[#0F1116] border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Star className="text-yellow-400" fontSize="small" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">
                                {analytics.totalPoints}
                            </p>
                            <p className="text-xs text-gray-400">
                                Total Points
                            </p>
                        </div>
                    </div>

                    {/* TASKS */}
                    <div className="bg-[#0F1116] border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#5E13FD]/10 flex items-center justify-center">
                            <AssignmentTurnedIn className="text-[#C9A9FF]" fontSize="small" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">
                                {tasks.length}
                            </p>
                            <p className="text-xs text-gray-400">
                                Active Tasks
                            </p>
                        </div>
                    </div>

                    {/* ENGAGEMENT */}
                    <div className="bg-[#0F1116] border border-gray-800 rounded-xl p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <TrendingUp className="text-blue-400" fontSize="small" />
                        </div>
                        <div>
                            <p className="text-lg font-semibold">
                                {analytics.totalUsers > 0
                                    ? Math.round(
                                        (analytics.activeSessions / analytics.totalUsers) * 100
                                    )
                                    : 0}
                                %
                            </p>
                            <p className="text-xs text-gray-400">
                                Engagement Rate
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Overview