import { Groups } from '@mui/icons-material'
import React from 'react'

function AllCommunity() {
    return (
        <div>
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
    )
}

export default AllCommunity