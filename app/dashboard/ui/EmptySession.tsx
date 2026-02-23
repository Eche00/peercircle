import { PestControlRodent } from '@mui/icons-material'
import { motion } from 'framer-motion'
import React from 'react'

function EmptySession() {
    return (
        <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-[#212329] border-2 border-dashed border-[#8F4AE3]/30 min-h-75 flex flex-col items-center justify-center rounded-[40px] mt-2 group hover:border-[#8F4AE3] transition-colors"
        >
            <div className="w-20 h-20 bg-[#8F4AE3]/10 rounded-full flex items-center justify-center text-[#8F4AE3] mb-6 group-hover:rotate-12 transition-transform">
                <PestControlRodent fontSize="large" />
            </div>
            <p className="text-lg text-white font-bold mb-2">
                Finding your flow?
            </p>
            <p className="text-sm text-gray-400 text-center max-w-xs mb-8">
                No active sessions found. Join / Create a peer circle to start growing and
                earn Trust Points.
            </p>

        </motion.div>
    )
}

export default EmptySession