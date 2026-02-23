'use client'

import { useSessionForm } from '@/utils/logics/sessions'
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import SessionDetails from '../modals/SessionDetails';
import SessionLoader from '../ui/SessionLoader';
import EmptySession from '../ui/EmptySession';

function MySessions() {
  const { joinedSessions, detailsModal, setDetailsModal, selectedSession, setSelectedSession, joinedSessionLoading } = useSessionForm()
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div >
      {/* MY SESSIONS */}

      <div className="flex items-center mb-4">
        <h2 className="text-lg font-medium">Joined Sessions</h2>

      </div>


      {joinedSessionLoading ?
        <SessionLoader /> : joinedSessions.length <= 0 ?
          <EmptySession /> :
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {joinedSessions.map((session) => {
              const COUNTDOWN_DURATION = session.countdownDuration || 2 * 60 * 1000
              let isExpired = false
              let countdownText = ''

              if (session.countdownStartedAt && session.countdownDuration) {
                const startedAt = session.countdownStartedAt.toMillis()
                const endsAt = startedAt + COUNTDOWN_DURATION
                const remaining = endsAt - now
                isExpired = remaining <= 0

                if (remaining <= 0) {
                  countdownText = 'In Progress'
                  session.status = 'In Progress' // reflect immediately
                } else {
                  const minutes = Math.floor(remaining / 60000)
                  const seconds = Math.floor((remaining % 60000) / 1000)
                  countdownText = `Starts in ${minutes}:${seconds.toString().padStart(2, '0')}`
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

                  {/* STATUS */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400">Status</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${session.status === 'Finished' || session.status === 'In Progress'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                    >
                      {countdownText || session.status}
                    </span>
                  </div>

                  {/* PARTICIPANTS */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-xs text-gray-400">Participants</span>
                    <span className="text-sm font-medium text-gray-200">
                      {session.joined}/{session.maxParticipants}
                    </span>
                  </div>

                  {/* FOOTER */}
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs text-gray-500">
                      Host: <span className="text-gray-300">{session.hostName}</span>
                    </p>
                    <button
                      className="px-4 py-2 rounded-lg text-sm bg-[#0F1116] hover:border hover:border-[#8F4AE3] cursor-pointer"
                      onClick={() => {
                        setSelectedSession(session)
                        setDetailsModal(true)
                      }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
      }

      {/* SESSION DETAILS MODAL  */}
      <AnimatePresence>
        {detailsModal && selectedSession && <SessionDetails onClose={() => setDetailsModal(false)} session={selectedSession} />}
      </AnimatePresence>
    </div>
  )
}

export default MySessions