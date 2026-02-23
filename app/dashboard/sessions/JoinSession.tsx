'use client'

import { useSessionForm } from '@/utils/logics/sessions';
import { AnimatePresence } from 'framer-motion';
import { Search } from '@mui/icons-material';
import CreateModal from '../modals/CreateModal';
import JoinSessionModal from '../modals/JoinSessionModal';
import SessionLoader from '../ui/SessionLoader';
import { useEffect, useState } from 'react';

function JoinSession() {
    const { sessions, search, setSearch, createModal, setCreateModal, setJoinModal, joinModal, selectedSession, setSelectedSession, sessionLoading } = useSessionForm()
    const [now, setNow] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(Date.now())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
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
                <div className=" overflow-y-auto  bg-[#0F1116] sm:p-6 p-4  rounded-2xl">
                    {sessionLoading ? (
                        <SessionLoader />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sessions.map((session) => {
                                const isFull = session.joined >= session.maxParticipants

                                let isExpired = false
                                if (session.countdownStartedAt && session.countdownDuration) {
                                    const startedAt = session.countdownStartedAt.toMillis()
                                    const endsAt = startedAt + session.countdownDuration
                                    isExpired = now >= endsAt
                                }

                                const disableJoin = isFull || isExpired

                                // Countdown text
                                let countdownText = ''
                                if (session.countdownStartedAt && session.countdownDuration) {
                                    const startedAt = session.countdownStartedAt.toMillis()
                                    const endsAt = startedAt + session.countdownDuration
                                    const remaining = endsAt - now

                                    if (remaining <= 0) {
                                        countdownText = 'Started'
                                    } else {
                                        const minutes = Math.floor(remaining / 60000)
                                        const seconds = Math.floor((remaining % 60000) / 1000)
                                        countdownText = `Starts in ${minutes}:${seconds
                                            .toString()
                                            .padStart(2, '0')}`
                                    }
                                }

                                return (
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
                                            Session ID: {session.id.slice(0, 8)}...
                                        </p>

                                        {/* PROGRESS */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-xs mb-1">
                                                <span className="text-gray-400">Joined</span>
                                                <span className="text-gray-300">
                                                    {session.joined}/{session.maxParticipants}
                                                </span>
                                            </div>

                                            <div className="w-full h-2 bg-[#0F1116] rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#8F4AE3]"
                                                    style={{
                                                        width: `${(session.joined / session.maxParticipants) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Countdown */}
                                        {countdownText && (
                                            <p
                                                className={`text-xs font-medium mb-3 ${isExpired ? 'text-green-400' : 'text-yellow-400'
                                                    }`}
                                            >
                                                {countdownText}
                                            </p>
                                        )}

                                        {/* FOOTER */}
                                        <div className="flex items-center justify-between mt-4">
                                            <p className="text-xs text-gray-500">
                                                Host: <span className="text-gray-300">{session.hostName}</span>
                                            </p>

                                            <button
                                                disabled={disableJoin}
                                                className={`px-4 py-2 rounded-lg text-sm ${disableJoin
                                                        ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                                        : 'bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 cursor-pointer'
                                                    }`}
                                                onClick={() => {
                                                    if (disableJoin) return
                                                    setSelectedSession(session)
                                                    setJoinModal(true)
                                                }}
                                            >
                                                {isFull ? 'Full' : isExpired ? 'Started' : 'Join'}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                </div>

            </div>
            {/* CREATE / JOIN MODAL  */}
            <AnimatePresence>
                {createModal && <CreateModal onClose={() => setCreateModal(false)} />}
                {joinModal && selectedSession && <JoinSessionModal onClose={() => setJoinModal(false)} session={selectedSession} />}
            </AnimatePresence>
        </div>
    )
}

export default JoinSession