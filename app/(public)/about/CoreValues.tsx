import { Diversity3, Gavel, Visibility } from '@mui/icons-material';
import { motion } from 'framer-motion'
import React from 'react'

function CoreValues() {
    const values = [
        {
            icon: <Visibility className="text-[40px] text-white" />,
            title: "Transparency",
            desc: "We believe in open processes. No hidden lists, no shadow banning. Everything is visible to the community.",
        },
        {
            icon: <Gavel className="text-[40px] text-white" />,
            title: "Fairness",
            desc: "Our system ensures equal contribution. You give engagement to get engagement. No free rides.",
        },
        {
            icon: <Diversity3 className="text-[40px] text-white" />,
            title: "Community",
            desc: "We are more than a tool; we are a collective of creators helping each other grow authentically.",
        },
    ];
    return (
        <div className='relative'>
            {/* Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[url('/bgoverlay.png')] bg-cover  z-10" />

            <section className="w-full py-20 px-6 sm:px-10 max-w-7xl mx-auto z-20 relative">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center text-[28px] sm:text-[36px] font-bold mb-16"
                >
                    Core <span className="text-[#5E13FD]">Values</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    {values.map((val, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="bg-[#1A1A1A] py-8 px-6 rounded-2xl flex flex-col items-center text-center gap-4"
                        >
                            <div className="w-16 h-16 bg-[#5E13FD] rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-[#5E13FD]/20">
                                {val.icon}
                            </div>
                            <h3 className="text-[20px] font-semibold">{val.title}</h3>
                            <p className="text-gray-400 text-[16px] leading-5">
                                {val.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default CoreValues