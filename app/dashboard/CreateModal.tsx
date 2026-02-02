'use client'
import React, { useEffect, useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

function generatePassword(length = 20) {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function CreateModal({ onClose }: { onClose: () => void }) {
    const [visibility, setVisibility] = useState<'public' | 'private'>('public');
    const [password, setPassword] = useState('');
    const hostName = 'Bueze'; // auto-filled from auth later

    useEffect(() => {
        if (visibility === 'private') {
            setPassword(generatePassword());
        } else {
            setPassword('');
        }
    }, [visibility]);

    const copyPassword = async () => {
        await navigator.clipboard.writeText(password);
    };

    return (
        <div

            className="fixed inset-0 top-16.5 bg-black/60 z-50 flex justify-end" onClick={onClose}>
            <motion.aside
                initial={{ x: 170, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 170, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#16181B] sm:w-[320px] w-[85%] h-full border-l border-gray-800 rounded-tl-2xl rounded-bl-2xl p-6 overflow-y-auto">

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
                            className="w-full mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#8F4AE3]"
                        />
                    </div>

                    {/* SERVICE TYPE */}
                    <div>
                        <label className="text-xs text-gray-400">Service Type</label>
                        <select className="w-full mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#8F4AE3]">
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
                            defaultValue={20}
                            className="w-full mt-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm focus:outline-none focus:border border-[#8F4AE3]"
                        />
                    </div>

                    {/* HOST (READ ONLY) */}
                    <div>
                        <label className="text-xs text-gray-400">Host</label>
                        <input
                            value={hostName}
                            readOnly
                            className="w-full mt-1 bg-[#0F1116] text-gray-400 cursor-not-allowed rounded-lg px-4 py-2 text-sm"
                        />
                    </div>

                    {/* VISIBILITY TOGGLE */}
                    <div className="w-full">
                        <label className="text-xs text-gray-400 mb-2 block">
                            Session Visibility
                        </label>

                        <div className="relative w-full bg-[#0F1116] rounded-lg overflow-hidden">
                            {/* Slider background */}
                            <div
                                className={`absolute top-0 left-0 h-full w-1/2 bg-[#8F4AE3] rounded-lg transition-all duration-300`}
                                style={{ transform: visibility === 'private' ? 'translateX(100%)' : 'translateX(0%)' }}
                            ></div>

                            {/* Options */}
                            <div className="flex w-full relative z-10">
                                {['public', 'private'].map((type, idx) => (
                                    <button
                                        key={type}
                                        onClick={() => setVisibility(type as any)}
                                        className="flex-1 py-2 text-sm font-medium text-center z-10 relative text-gray-300 capitalize cursor-pointer"
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* PASSWORD (PRIVATE ONLY) */}
                    {visibility === 'private' && (
                        <div>
                            <label className="text-xs text-gray-400">Session Password</label>
                            <div className="flex items-center gap-2 mt-1">
                                <input
                                    value={password}
                                    readOnly
                                    className="flex-1 bg-[#0F1116] rounded-lg px-4 py-2 text-sm text-gray-300"
                                />
                                <button
                                    onClick={copyPassword}
                                    className="p-2 bg-[#8F4AE3] rounded-lg hover:bg-[#8F4AE3]/90 cursor-pointer"
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </button>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-1">
                                Share this password to invite users
                            </p>
                        </div>
                    )}

                </div>

                {/* ACTION */}
                <button className="mt-8 w-full py-3 rounded-lg bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 text-sm font-medium cursor-pointer">
                    Create Session
                </button>

            </motion.aside>
        </div>
    );
}

export default CreateModal;
