'use client'

import { useSessionForm } from '@/utils/logics/sessions'
import { AnimatePresence } from 'framer-motion';
import SessionDetails from '../modals/SessionDetails';
import EmptySession from '../ui/EmptySession';
import SessionLoader from '../ui/SessionLoader';
import { useEffect, useState } from 'react';
import { PestControlRodent, Search } from '@mui/icons-material';
import SessionsSkeleton from '../ui/SessionsSkeleton';

function HostedSessions() {
    const {
        mySessions,
        detailsModal,
        setDetailsModal,
        selectedSession,
        setSelectedSession,
        hostedSessionLoading,
        service,
        setService,
        status,
        setStatus,
        search,
        setSearch,
        statusOptions,
        serviceOptions
    } = useSessionForm()

    const [now, setNow] = useState(Date.now())
    const [skeleton, setSkeleton] = useState(true)

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        let timeout: NodeJS.Timeout

        if (hostedSessionLoading) {
            setSkeleton(true)
        } else {
            timeout = setTimeout(() => {
                setSkeleton(false)
            }, 600)
        }

        return () => clearTimeout(timeout)
    }, [hostedSessionLoading])

    return (
        <>
            {skeleton ? <SessionsSkeleton /> : <div>
                <div>
                    <div className="flex items-center mb-4">
                        <h2 className="text-lg font-medium">My Sessions</h2>
                    </div>

                    {/* SEARCH + FILTERS */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full">
                            <div className="relative w-full sm:max-w-sm">
                                <Search
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    fontSize="small"
                                />
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by Title, Session ID or Host Name"
                                    className="w-full bg-[#0F1116] rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border border border-[#5E13FD]"
                                />
                            </div>
                        </div>

                        <div className="flex-1 flex flex-row gap-3 w-full">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 bg-[#0F1116] rounded-lg px-3 py-2 text-sm border border-[#5E13FD]"
                            >
                                {statusOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                                className="flex-1 bg-[#0F1116] rounded-lg px-3 py-2 text-sm border border-[#5E13FD]"
                            >
                                {serviceOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {hostedSessionLoading ? (
                        <SessionsSkeleton />
                    ) : (
                        <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-lg overflow-x-auto">
                            <h2 className="text-lg font-semibold mb-6">My Sessions</h2>

                            <div className="hidden md:grid grid-cols-5 text-sm text-gray-400 pb-3 border-b border-gray-700">
                                <span>Session</span>
                                <span>Service</span>
                                <span>Status</span>
                                <span>Participants</span>
                                <span className="text-right">Actions</span>
                            </div>

                            <div className="divide-y divide-gray-800">
                                {mySessions.length <= 0 ? <section className='flex flex-col items-center justify-center my-6'>
                                    <div className="w-20 h-20 bg-[#5E13FD]/10 rounded-full flex items-center justify-center text-[#5E13FD] group-hover:rotate-12 transition-transform">
                                        <PestControlRodent fontSize="large" />
                                    </div>
                                    <p className="text-sm text-gray-400 text-center max-w-xs mb-8">
                                        You have no created session. Create a peer circle to start growing and
                                        earn Trust Points.
                                    </p></section> : mySessions.map((session) => {
                                        const COUNTDOWN_DURATION =
                                            session.countdownDuration || 2 * 60 * 1000

                                        let countdownText = ''
                                        let displayStatus = session.status

                                        if (session.countdownStartedAt) {
                                            const startedAt =
                                                session.countdownStartedAt.toMillis()
                                            const endsAt = startedAt + COUNTDOWN_DURATION
                                            const remaining = endsAt - now

                                            if (remaining <= 0) {
                                                if (session.status !== 'Finished') {
                                                    displayStatus = 'In Progress'
                                                    countdownText = 'In Progress'
                                                } else {
                                                    countdownText = 'Finished'
                                                }
                                            } else {
                                                const minutes = Math.floor(remaining / 60000)
                                                const seconds = Math.floor((remaining % 60000) / 1000)

                                                countdownText = `Starts in ${minutes}:${seconds
                                                    .toString()
                                                    .padStart(2, '0')}`

                                                displayStatus = 'waiting'
                                            }
                                        }

                                        const statusColor =
                                            displayStatus === 'Finished'
                                                ? 'bg-green-500/20 text-green-400'
                                                : displayStatus === 'In Progress'
                                                    ? 'bg-yellow-500/20 text-yellow-400'
                                                    : 'bg-gray-500/20 text-gray-400'

                                        return (
                                            <div
                                                key={session.id}
                                                className="py-4 text-sm md:grid md:grid-cols-5 md:items-center"
                                            >
                                                {/* MOBILE */}
                                                <div className="md:hidden flex flex-col gap-3">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-medium line-clamp-1">
                                                                {session.title}
                                                            </p>
                                                            <p className="text-xs text-gray-400">
                                                                ID: {session.id.slice(0, 8)}...
                                                            </p>
                                                        </div>

                                                        <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
                                                            {countdownText || displayStatus}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between text-xs text-gray-400">
                                                        <span>{session.service}</span>
                                                        <span>
                                                            {session.joined}/{session.maxParticipants}
                                                        </span>
                                                    </div>

                                                    <p className="text-xs text-gray-500">
                                                        Host: <span className="text-gray-300">{session.hostName}</span>
                                                    </p>

                                                    <button
                                                        className="w-full px-4 py-2 rounded-lg text-sm bg-[#0F1116] hover:border hover:border-[#5E13FD] shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]"
                                                        onClick={() => {
                                                            setSelectedSession(session)
                                                            setDetailsModal(true)
                                                        }}
                                                    >
                                                        View Details
                                                    </button>
                                                </div>

                                                {/* DESKTOP */}
                                                <div className="hidden md:contents">
                                                    <div>
                                                        <p className="font-medium line-clamp-1">
                                                            {session.title}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            ID: {session.id.slice(0, 8)}...
                                                        </p>
                                                    </div>

                                                    <span className="text-gray-300">
                                                        {session.service}
                                                    </span>

                                                    <span className={`w-fit px-3 py-1 rounded-full text-xs ${statusColor}`}>
                                                        {countdownText || displayStatus}
                                                    </span>

                                                    <span className="text-gray-300">
                                                        {session.joined}/{session.maxParticipants}
                                                    </span>

                                                    <div className="flex justify-end">
                                                        <button
                                                            className="px-4 py-2 rounded-lg text-sm bg-[#0F1116] hover:border hover:border-[#5E13FD]"
                                                            onClick={() => {
                                                                setSelectedSession(session)
                                                                setDetailsModal(true)
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    )}
                </div>

                <AnimatePresence>
                    {detailsModal && selectedSession && (
                        <SessionDetails
                            onClose={() => setDetailsModal(false)}
                            session={selectedSession}
                        />
                    )}
                </AnimatePresence>
            </div>}
        </>
    )
}

export default HostedSessions