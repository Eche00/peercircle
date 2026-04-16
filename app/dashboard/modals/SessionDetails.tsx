'use client'

import React from 'react'
import {
  CheckCircleOutline,
  Close,
  InfoOutlined,
  OpenInNew,
} from '@mui/icons-material'
import { motion } from 'framer-motion'

import { Session } from '@/utils/logics/sessions'
import { useSessionDetails } from '@/utils/logics/useSessionDetails'
import { awardingState } from '@/utils/logics/sessionActions'

function SessionDetails({
  session,
  onClose,
}: {
  session: Session
  onClose: () => void
}) {
  const {
    session: liveSession,
    participants,
    now,
    currentUser,
    myParticipant,
    visitLink,
    markParticipantCompleted,
    awardParticipantPoints,
    completeSession, allAwarded
  } = useSessionDetails(session)

  /* STATUS COMPUTATION (kept UI-side because it depends on now) */
  let statusDisplay = liveSession.status

  if (liveSession.countdownStartedAt && liveSession.countdownDuration) {
    const startedAt = liveSession.countdownStartedAt.toMillis()
    const endsAt = startedAt + liveSession.countdownDuration
    const remaining = endsAt - now

    if (remaining <= 0 && statusDisplay === 'waiting') {
      statusDisplay = 'In Progress'
    }
  }

  const sessionIncludes = [
    'Mutual engagement system',
    'No bots or fake accounts',
    'Fair participation for all members',
  ]

  return (
    <div
      className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end"
      onClick={onClose}
    >
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
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-sm bg-[#0F1116] rounded-lg border-2 border-[#5E13FD] max-h-20 overflow-scroll p-2 mb-2"><span className=' font-bold'>Title: </span>{liveSession.title}</h1>
              <p className="text-xs text-gray-400">
                Session ID: {liveSession.id}
              </p>
            </div>
            <button onClick={onClose}>
              <Close className="text-gray-400 hover:text-white cursor-pointer" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <span
              className={`text-xs px-3 py-1 rounded-full ${statusDisplay === 'Finished'
                ? 'bg-green-500/20 text-green-400'
                : statusDisplay === 'In Progress'
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-500/20 text-gray-400'
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
            <p>{liveSession.service}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Host</p>
            <p>{liveSession.hostName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Participants</p>
            <p>
              {liveSession.joined}/{liveSession.maxParticipants}
            </p>
          </div>
        </div>

        {/* PARTICIPANTS */}
        {(statusDisplay === 'In Progress' &&
          (liveSession.hostId === currentUser?.uid ||
            !myParticipant?.completed)) && (
            <div>
              <h3 className="text-sm font-medium mb-3">
                Participants to engage with
              </h3>

              <div className="space-y-2">
                {participants.map((p) => {
                  const visitedByUser =
                    currentUser &&
                    p.visitedLinks.includes(currentUser.uid)

                  return (
                    <a
                      key={p.id}
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => visitLink(p.id)}
                      className="flex items-center justify-between bg-[#0F1116] px-4 py-3 rounded-lg border border-gray-800 hover:border-[#5E13FD]"
                    >
                      <span className="text-xs text-gray-300 truncate">
                        {p.link.length > 30
                          ? p.link.slice(0, 30) + '...'
                          : p.link}
                      </span>

                      {visitedByUser ? (
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
                  )
                })}
              </div>
            </div>
          )}

        {/* COMPLETION */}
        {myParticipant?.completed ? (
          <p className="text-green-400 text-xs mt-3 text-center">
            You have completed this session
          </p>
        ) : (
          <button
            onClick={() =>
              markParticipantCompleted(myParticipant.id)
            }
            className="w-full mt-4 bg-[#5E13FD] hover:bg-[#7A3ED1] text-sm py-3 rounded-lg font-medium cursor-pointer"
          >
            Mark Tasks As Completed
          </button>
        )}

        {/* HOST VIEW */}
        {liveSession.hostId === currentUser?.uid && (
          <div>
            <h3 className="text-sm font-medium mb-2">
              Participant Progress
            </h3>

            <div className="space-y-2">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="bg-[#0F1116] px-4 py-3 rounded-lg border border-gray-800 space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-medium text-gray-300">
                      {p.userName}
                    </span>

                    {p.completed ? (
                      <span className="text-green-400">
                        Completed
                      </span>
                    ) : (
                      <span className="text-yellow-400">
                        Pending
                      </span>
                    )}
                  </div>

                  {p.completed && (
                    <div className="pt-1">
                      {!p.approvedByHost ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              awardParticipantPoints(p.id, p.userId, 5)
                            }
                            disabled={awardingState.loadingId === p.id}
                            className="flex-1 text-[11px] bg-green-500/20 text-green-400 py-1.5 rounded-md cursor-pointer"
                          >
                            {awardingState.loadingId === p.id
                              ? 'Processing...'
                              : '+5 Points'}
                          </button>

                          <button
                            onClick={() =>
                              awardParticipantPoints(p.id, p.userId, -5)
                            }
                            disabled={awardingState.loadingId === p.id}
                            className="flex-1 text-[11px] bg-red-500/20 text-red-400 py-1.5 rounded-md cursor-pointer"
                          >
                            {awardingState.loadingId === p.id
                              ? 'Processing...'
                              : '−5 Points'}
                          </button>
                        </div>
                      ) : (
                        <div
                          className={`text-[11px] px-3 py-1.5 rounded-md w-full text-center ${p.awardStatus === 'awarded'
                            ? 'bg-green-500/10 text-green-400 opacity-70'
                            : 'bg-red-500/10 text-red-400 opacity-70'
                            }`}
                        >
                          {p.awardStatus === 'awarded'
                            ? `Awarded +${p.pointsAwarded} Points`
                            : `Deducted ${p.pointsAwarded} Points`}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* COMPLETE SESSION */}
        {liveSession.hostId === currentUser?.uid && (
          <div className="mt-4">
            {statusDisplay === 'Finished' ? (
              <div className="w-full text-center text-xs py-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20">
                Session Completed
              </div>
            ) : statusDisplay === 'In Progress' && allAwarded ? (
              <button
                onClick={() => completeSession(liveSession.id)}
                className="w-full bg-[#5E13FD] hover:bg-[#5E13FD]/90 text-sm py-3 rounded-lg font-medium cursor-pointer"
              >
                Complete Session
              </button>
            ) : (
              <div className="w-full text-center text-xs py-3 rounded-lg bg-gray-800 text-gray-400 border border-gray-700">
                {statusDisplay === 'waiting'
                  ? 'Session has not started yet...'
                  : 'Waiting for all participants to be awarded...'}
              </div>
            )}
          </div>
        )}
        {/* INCLUDED */}
        <div>
          <h3 className="text-sm font-medium mb-2">
            What’s included
          </h3>

          <ul className="space-y-2">
            {sessionIncludes.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-xs text-gray-300"
              >
                <CheckCircleOutline
                  fontSize="small"
                  className="text-[#5E13FD]"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RULES */}
        <div>
          <h3 className="text-sm font-medium mb-2">
            Session rules
          </h3>

          <div className="bg-[#0F1116] rounded-lg p-3 space-y-2">
            {liveSession.rules?.length ? (
              liveSession.rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 text-[11px] text-gray-400"
                >
                  <InfoOutlined fontSize="inherit" />
                  <span>{rule}</span>
                </div>
              ))
            ) : (
              <p className="text-[11px] text-gray-500">
                No specific rules added for this session.
              </p>
            )}
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