'use client'

import React, { useState, useEffect } from 'react'
import { CheckCircleOutline, Close, InfoOutlined, OpenInNew } from '@mui/icons-material'
import { motion } from 'framer-motion'
import { Session } from '@/utils/logics/sessions'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'

function SessionDetails({ session, onClose }: { session: Session; onClose: () => void }) {
  const [participants, setParticipants] = useState<{ id: string; link: string; userId: any }[]>([])
  const [visited, setVisited] = useState<number[]>([])
  const [now, setNow] = useState(Date.now())

  // Update live time
  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  // Fetch participants
  useEffect(() => {
    if (!session?.id) return
    const q = query(collection(db, 'participants'), where('sessionId', '==', session.id))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as any
      setParticipants(list)
    })
    return () => unsubscribe()
  }, [session.id])

  const handleVisit = (id: number) => {
    if (!visited.includes(id)) setVisited((prev) => [...prev, id])
  }

  const sessionIncludes = [
    'Mutual engagement system',
    'No bots or fake accounts',
    'Fair participation for all members',
  ]

  // Compute live status
  let statusDisplay = session.status
  if (session.countdownStartedAt && session.countdownDuration) {
    const startedAt = session.countdownStartedAt.toMillis()
    const endsAt = startedAt + session.countdownDuration
    const remaining = endsAt - now

    if (remaining <= 0 && statusDisplay === 'waiting') {
      statusDisplay = 'In Progress'
    }
  }

  return (
    <div className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end" onClick={onClose}>
      <motion.aside
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="lg:max-w-xl w-full max-w-100 bg-[#16181B] sm:rounded-tl-2xl border border-gray-800 p-6 space-y-6 overflow-scroll"
      >
        {/* HEADER */}
        <div className="w-full flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-lg font-semibold">{session.title}</h1>
              <p className="text-xs text-gray-400">Session ID: {session.id}</p>
            </div>
            <button onClick={onClose}>
              <Close className="text-gray-400 hover:text-white cursor-pointer" />
            </button>
          </div>

          {/* STATUS */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <span
              className={`text-xs px-3 py-1 rounded-full ${statusDisplay === 'Finished' || statusDisplay === 'In Progress'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
                }`}
            >
              {statusDisplay}
            </span>
          </div>
        </div>

        {/* META */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-400">Service</p>
            <p>{session.service}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Host</p>
            <p>{session.hostName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Participants</p>
            <p>{session.joined}/{session.maxParticipants}</p>
          </div>
        </div>

        {/* PARTICIPANT ACTIONS */}
        {statusDisplay === 'In Progress' && (
          <div>
            <h3 className="text-sm font-medium mb-3">Participants to engage with</h3>
            <div className="space-y-2">
              {participants.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleVisit(p.userId)}
                  className="flex items-center justify-between bg-[#0F1116] px-4 py-3 rounded-lg border border-gray-800 hover:border-[#8F4AE3]"
                >
                  <span className="text-xs text-gray-300 truncate">
                    {p.link.length > 30 ? p.link.slice(0, 30) + '...' : p.link}
                  </span>
                  {visited.includes(p.userId) ? (
                    <CheckCircleOutline fontSize="small" className="text-green-400" />
                  ) : (
                    <OpenInNew fontSize="small" className="text-gray-400" />
                  )}
                </a>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 mt-3">
              Click each profile to complete your participation
            </p>
          </div>
        )}

        {/* WHAT'S INCLUDED */}
        <div>
          <h3 className="text-sm font-medium mb-2">What’s included</h3>
          <ul className="space-y-2">
            {sessionIncludes.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                <CheckCircleOutline fontSize="small" className="text-[#8F4AE3]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RULES */}
        <div>
          <h3 className="text-sm font-medium mb-2">Session rules</h3>
          <div className="bg-[#0F1116] rounded-lg p-3 space-y-2">
            {session.rules.map((rule, idx) => (
              <div key={idx} className="flex gap-2 text-[11px] text-gray-400">
                <InfoOutlined fontSize="inherit" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        {statusDisplay === 'Finished' && (
          <p className="text-xs text-gray-500 text-center">
            This session has been completed. Participation is closed.
          </p>
        )}
      </motion.aside>
    </div>
  )
}

export default SessionDetails