'use client'
import React, { useEffect, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CloseIcon from '@mui/icons-material/Close'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { motion } from 'framer-motion'
import { useSessionForm } from '@/utils/logics/sessions'



function CreateModal({ onClose }: { onClose: () => void }) {
    const {
        // state
        title,
        service,
        maxParticipants,
        visibility,
        password,
        ruleInput,
        rules,
        currentUser,

        // setters
        setTitle,
        setService,
        setMaxParticipants,
        setVisibility,
        setRuleInput,

        // actions
        addRule,
        removeRule,
        copyPassword,
        handleCreate,
    } = useSessionForm()


    return (
        <div
            className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end"
            onClick={onClose}
        >
            <motion.aside
                initial={{ x: 170, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 170, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#16181B] sm:w-[320px] w-[85%] h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-6 overflow-y-auto"
            >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold">Create Session</h2>
                    <button onClick={onClose}>
                        <CloseIcon className="text-gray-400 hover:text-white cursor-pointer" />
                    </button>
                </div>

                {/* FORM */}
                <div className="space-y-4">

                    {/* SESSION TITLE */}
                    <div>
                        <label className="text-xs text-gray-400">Session Title</label>
                        <input
                            placeholder="e.g. Instagram Followers Boost"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#8F4AE3]"
                        />
                    </div>

                    {/* SERVICE TYPE */}
                    <div>
                        <label className="text-xs text-gray-400">Service Type</label>
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#8F4AE3]"
                        >
                            <option>Followers</option>
                            <option>Likes</option>
                            <option>Comments</option>
                        </select>
                    </div>

                    {/* MAX PARTICIPANTS */}
                    <div>
                        <label className="text-xs text-gray-400">Max Participants</label>
                        <input
                            type="number"
                            value={maxParticipants}
                            readOnly
                            onChange={(e) => setMaxParticipants(Number(e.target.value))}
                            className="w-full mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#8F4AE3]"
                        />
                    </div>

                    {/* HOST */}
                    <div>
                        <label className="text-xs text-gray-400">Host</label>
                        <input
                            value={currentUser?.displayName?.split(" ")[0] ?? "Creator"}
                            readOnly
                            className="w-full mt-1 bg-[#0F1116] text-gray-400 cursor-not-allowed rounded-lg px-4 py-2 text-sm"
                        />
                    </div>

                    {/* VISIBILITY TOGGLE */}
                    <div>
                        <label className="text-xs text-gray-400 mb-2 block">
                            Session Visibility
                        </label>

                        <div className="relative w-full bg-[#0F1116] rounded-lg overflow-hidden ">
                            <div
                                className="absolute top-0 left-0 h-full w-1/2 bg-[#8F4AE3] rounded-lg transition-all duration-300 "
                                style={{
                                    transform:
                                        visibility === 'private'
                                            ? 'translateX(100%)'
                                            : 'translateX(0%)',
                                }}
                            />
                            <div className="flex relative z-10 ">
                                {['public', 'private'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setVisibility(type as any)}
                                        className="flex-1 py-2 text-sm capitalize text-gray-300 cursor-pointer"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* PASSWORD */}
                    {visibility === 'private' && (
                        <div>
                            <label className="text-xs text-gray-400">Session Password</label>
                            <div className="flex gap-2 mt-1">
                                <input
                                    value={password}
                                    readOnly
                                    className="flex-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm"
                                />
                                <button
                                    onClick={copyPassword}
                                    className="p-2 bg-[#8F4AE3] rounded-lg"
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1">
                                Share this password to invite users
                            </p>
                        </div>
                    )}

                    {/* RULES */}
                    <div>
                        <label className="text-xs text-gray-400 mb-2 block">
                            Session Rules
                        </label>

                        <div className="flex gap-2">
                            <input
                                value={ruleInput}
                                onChange={(e) => setRuleInput(e.target.value)}
                                placeholder="Add a rule"
                                className="flex-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm"
                            />
                            <button
                                onClick={addRule}
                                className="px-4 rounded-lg bg-[#8F4AE3] text-sm cursor-pointer"
                            >
                                Add
                            </button>
                        </div>

                        {rules.length > 0 && (
                            <ul className="mt-3 space-y-2">
                                {rules.map((rule, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center justify-between bg-[#0F1116] px-3 py-2 rounded-lg text-xs text-gray-300"
                                    >
                                        <span>{rule}</span>
                                        <button
                                            onClick={() => removeRule(idx)}
                                            className="text-gray-400 hover:text-red-400 cursor-pointer"
                                        >
                                            <DeleteOutlineIcon fontSize="small" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* ACTION */}
                <button onClick={handleCreate} className="mt-8 w-full py-3 rounded-lg bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 text-sm font-medium cursor-pointer">
                    Create Session
                </button>
            </motion.aside>
        </div>
    )
}

export default CreateModal
