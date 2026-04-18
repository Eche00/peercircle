'use client'
import { joinSession, Session, useSessionForm } from '@/utils/logics/sessions'
import { Close, CheckCircleOutline, InfoOutlined } from '@mui/icons-material'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

function JoinSessionModal({ session, onClose }: { session: Session, onClose: () => void }) {
    const { link, setLink, enteredPassword, setEnteredPassword, loading, setLoading } = useSessionForm()



    //  What this session contains
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
                className="bg-[#16181B] sm:w-85 w-[85%] h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-6 overflow-y-auto"
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Join Session</h2>
                    <button onClick={onClose}>
                        <Close className="text-gray-400 hover:text-white cursor-pointer" />
                    </button>
                </div>

                {/* SESSION INFO */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400">Service Type / Title</label>
                        <p className="mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm">
                            {session.service} - {session.title}
                        </p>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400">Target URL</label>
                        <input
                            type="text"
                            value={link}
                            onChange={(e) => setLink(e.target.value)}
                            placeholder="Paste your profile URL"
                            className="w-full mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#5E13FD]"
                        />
                    </div>

                    {/* PARTICIPANTS */}
                    <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Joined</span>
                            <span className="text-gray-300">{session.joined} / {session.maxParticipants}</span>
                        </div>
                        <div className="w-full h-2 bg-[#0F1116] rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#5E13FD]"
                                style={{ width: `${(session.joined / session.maxParticipants) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* WHAT'S INCLUDED */}
                    <div>
                        <h3 className="text-sm font-medium mb-2">What’s included</h3>
                        <ul className="space-y-2">
                            {sessionIncludes.map((item, idx) => (
                                <li
                                    key={idx}
                                    className="flex items-start gap-2 text-xs text-gray-300"
                                >
                                    <CheckCircleOutline className="text-[#5E13FD]" fontSize="small" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RULES */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium mb-2">Session rules</h3>
                        <div className="bg-[#0F1116] rounded-lg p-3 space-y-2">
                            {session.rules.map((rule, idx) => (
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

                    {/* PASSWORD NOTICE */}
                    {session.visibility === 'private' && (
                        <>
                            <p className="text-[11px] text-gray-500">
                                This is a private session. A password is required to join.
                            </p>
                            <div>
                                <label className="text-xs text-gray-400">Password</label>
                                <input
                                    type="text"
                                    value={enteredPassword}
                                    onChange={(e) => setEnteredPassword(e.target.value)}
                                    placeholder="Paste your profile URL"
                                    className="w-full mt-1  bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#5E13FD]"
                                />
                            </div></>
                    )}
                </div>

                {/* ACTION */}
                <button onClick={async () => {
                    try {
                        await joinSession({
                            session,
                            link,
                            enteredPassword, setLoading
                        })
                        // Close the modal on success
                        onClose()
                    } catch (error) {
                        // Optionally log error or handle failure
                        console.error(error)
                    }
                }} disabled={loading} className="mt-8 w-full py-3 rounded-lg bg-[#5E13FD] hover:bg-[#5E13FD]/90 text-sm font-medium cursor-pointer disabled:bg-[#5E13FD]/80 disabled:cursor-not-allowed shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]">
                    {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div> : 'Join Session'}

                </button>
            </motion.aside>
        </div>
    )
}

export default JoinSessionModal
