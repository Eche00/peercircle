'use client'
import React, { useState } from 'react'
import {
  CheckCircleOutline,
  Close,
  InfoOutlined,
  OpenInNew,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

type SessionStatus = 'Finished' | 'In Progress'

function SessionDetails({ onClose }: { onClose: () => void }) {
  const session = {
    id: 'IG-2044',
    title: 'Instagram Followers Boost',
    service: 'Followers',
    status: 'In Progress' as SessionStatus,
    joined: 16,
    timer: 2,
    max: 20,
    host: 'Chris',
  }

  // URLs of other participants (excluding you)
  const participants = [
    { id: 1, url: 'https://instagram.com/user_one' },
    { id: 2, url: 'https://instagram.com/user_two' },
    { id: 3, url: 'https://instagram.com/user_three' },
    { id: 4, url: 'https://instagram.com/user_four' },
  ]

  // Track which links you’ve visited
  const [visited, setVisited] = useState<number[]>([])

  const handleVisit = (id: number) => {
    if (!visited.includes(id)) {
      setVisited((prev) => [...prev, id])
    }
  }

  const sessionIncludes = [
    'Real Instagram followers',
    'Mutual engagement system',
    'No bots or fake accounts',
    'Fair participation for all members',
  ]

  const sessionRules = [
    'You must follow all participants',
    'Unfollowing before completion removes you',
    'One account per participant',
    'Session ends when all slots are filled',
    'Do not automate actions',
  ]

  return (
    <div className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end" onClick={onClose}>
      <motion.aside
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 200, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="lg:max-w-xl w-full max-w-100 bg-[#16181B] sm:rounded-tl-2xl border border-gray-800 p-6 space-y-6 overflow-scroll">

        {/* HEADER */}
        <div className="w-full flex flex-col  justify-between">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h1 className="text-lg font-semibold">{session.title}</h1>
              <p className="text-xs text-gray-400">
                Session ID: {session.id}
              </p>
            </div>
            <button onClick={onClose}>
              <Close className="text-gray-400 hover:text-white cursor-pointer" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <p className="text-xs text-gray-400">Timer: {session.timer}.00</p>
            <span
              className={`text-xs px-3 py-1 rounded-full ${session.status === 'Finished'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-yellow-500/20 text-yellow-400'
                }`}
            >
              {session.status}
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
            <p>{session.host}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Participants</p>
            <p>
              {session.joined}/{session.max}
            </p>
          </div>
        </div>

        {/* PARTICIPANT ACTIONS */}
        {session.status === 'In Progress' && (
          <div>
            <h3 className="text-sm font-medium mb-3">
              Participants to engage with
            </h3>

            <div className="space-y-2">
              {participants.map((p) => (
                <a
                  key={p.id}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleVisit(p.id)}
                  className="flex items-center justify-between bg-[#0F1116] px-4 py-3 rounded-lg border border-gray-800 hover:border-[#8F4AE3]"
                >
                  <span className="text-xs text-gray-300 truncate">
                    {p.url}
                  </span>

                  {visited.includes(p.id) ? (
                    <CheckCircleOutline
                      fontSize="small"
                      className="text-green-400"
                    />
                  ) : (
                    <OpenInNew
                      fontSize="small"
                      className="text-gray-400"
                    />
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
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-gray-300"
              >
                <CheckCircleOutline
                  fontSize="small"
                  className="text-[#8F4AE3]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RULES */}
        <div>
          <h3 className="text-sm font-medium mb-2">Session rules</h3>
          <div className="bg-[#0F1116] rounded-lg p-3 space-y-2">
            {sessionRules.map((rule, idx) => (
              <div
                key={idx}
                className="flex gap-2 text-[11px] text-gray-400"
              >
                <InfoOutlined fontSize="inherit" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        {session.status === 'Finished' && (
          <p className="text-xs text-gray-500 text-center">
            This session has been completed. Participation is closed.
          </p>
        )}
      </motion.aside>
    </div>
  )
}

export default SessionDetails
