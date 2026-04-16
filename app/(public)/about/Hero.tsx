import { Diversity3, Handshake, Psychology, VerifiedUser } from '@mui/icons-material'
import { motion } from 'framer-motion'
import React from 'react'

function Hero() {
    return (

        <div className='relative min-h-screen '>
            {/* Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[url('/bgoverlay.png')] bg-cover min-h-[100vh] z-10" />

            <section className="relative w-full py-20 px-6 sm:px-10 flex flex-col items-center text-center gap-6">
                <div className="circleBlur absolute top-10 right-10 z-0 opacity-50"></div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="z-10 text-[32px] sm:text-[72px] font-bold sm:leading-16 leading-8"
                >
                    Empowering Growth Through{" "}
                    <span className="text-[#5E13FD] sm:block inline">True Connection</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="z-10 max-w-2xl text-[16px] sm:text-[18px] text-[#FFFFFFB2] font-light"
                >
                    PeerCircle is defined by the people who use it. We are building a
                    fair, transparent ecosystem where content creators can thrive
                    together.
                </motion.p>
            </section>

            <section className="w-full   px-6 sm:px-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 flex flex-col gap-6"
                    >
                        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#FFFFFF]">
                            Our  <span className='text-[#5E13FD]'>Mission</span>
                        </h2>
                        <p className="text-[16px] sm:text-[18px] text-gray-300 leading-relaxed">
                            Our mission is to eliminate the unpredictability of social media
                            algorithms by fostering direct, human-to-human support. We
                            automate the coordination so you can focus on the connection.
                        </p>
                        <ul className="flex flex-col gap-4 mt-2 list-disc  pl-4">
                            <li className="list-item">
                                {/* <span className="bg-[#5E13FD]/20 p-2 rounded-lg text-[#5E13FD]">
                                    <Handshake />
                                </span> */}
                                <span className="text-gray-200">Reciprocal Engagement</span>
                            </li>
                            <li className="list-item">
                                {/* <span className="bg-[#5E13FD]/20 p-2 rounded-lg text-[#5E13FD]">
                                    <VerifiedUser />
                                </span> */}
                                <span className="text-gray-200">Verified Interactions</span>
                            </li>
                            <li className="list-item">
                                {/* <span className="bg-[#5E13FD]/20 p-2 rounded-lg text-[#5E13FD]">
                                    <Psychology />
                                </span> */}
                                <span className="text-gray-200">Mindful Growth</span>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex-1 w-full max-w-[505px] h-full max-h-[418px]  rounded-xl flex items-center justify-center overflow-hidden"
                    >
                        {/* Placeholder for an abstract image or graphic */}
                        <img src="/abouthero.jpg" alt="" className='w-full h-full' />
                    </motion.div>
                </div>
            </section>
        </div>

    )
}

export default Hero