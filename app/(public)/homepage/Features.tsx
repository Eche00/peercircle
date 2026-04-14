'use client'

import { Features1, Discover, Features2, Features3, Features4, Features5, Features6 } from '@/components/ui/svg'
import { motion } from 'framer-motion'
import Link from 'next/link'


export const benefits = [
    {
        icon: <Discover />,
        title: 'Peer Accountability',
        img: <Features1 />,
        desc: 'Stay consistent by growing alongside people who share your goals.'
    },
    {
        icon: <Discover />,
        title: 'Supportive Circles ',
        img: <Features2 />,
        desc: 'Join focused peer groups that encourage progress and real conversations.'
    },

    {
        icon: <Discover />,
        title: 'Shared Progress',
        img: <Features3 />,
        desc: 'Track sessions, milestones, and wins together as a community.'
    },
    {
        icon: <Discover />,
        title: 'Motivation ',
        img: <Features4 />,
        desc: 'Seeing others show up keeps you inspired to do same.'
    },
    {
        icon: <Discover />,
        title: 'Meaningful Connections',
        img: <Features5 />,
        desc: 'Build meaningful relationship that go beyond likes and comments.'
    },
    {
        icon: <Discover />,
        title: 'Reward Yourself',
        img: <Features6 />,
        desc: 'Earn points as you engage and contribute to your peer circle.'
    }

]

function Features() {
    return (
        <div className=' min-h-screen relative'>
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[url('/bgoverlay.png')] bg-cover min-h-screen" />

            <div className='circleBlur absolute top-5 -right-30 z-0'></div>
            <div className='circleBlur absolute top-1/2 -translate-y-1/2 -left-30 z-0'></div>
            {/* container  */}
            <main className=' sm:max-w-[80%] md:max-w-[90%] max-w-[95%] mx-auto text-center  flex flex-col sm:gap-16 gap-8 sm:py-16.5 py-5 z-10'>

                <section className="w-full  sm:px-10 z-20">
                    {/* header  */}
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className='soraFont sm:text-[48px] text-[18px] font-semibold text-[#F0F0F0] p-2.5  leading-[100%] pb-'>Unique <span className='text-[#5E13FD]'> Features</span></motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className=' text-[16px]  text-[#FFFFFFB2] p-2.5  leading-[100%] pb-10'>Discover what makes us unique and how we bring people together to grow, <br /> share, and succeed.</motion.p>

                    {/* benefits  */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
                        {benefits.map(b => (
                            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} key={b.title}
                                className={`bg-[#1A1A1A] py-[32px] px-[24px] rounded-xl flex flex-col gap-[28px]`}>
                                <div className='flex flex-col items-start gap-2'>
                                    <span className='w-10 h-10 bg-[#5E13FD] flex items-center justify-center rounded-xl'>{b.icon}</span>
                                    <span className='sm:text-[20px] text-[17.03px] font-semibold text-[#FFFFFF]pb-2'>{b.title}</span>
                                    <span className='sm:text-[16px] text-[12px] text-start font-normal text-[#FFFFFFB2]'>{b.desc}</span>

                                </div>
                                <div className='w-[348px] sm:mx-auto h-[316px] relative overflow-hidden'>
                                    <span className=' absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>{b.img}</span>
                                </div>

                            </motion.div>))}
                    </div>
                </section>

            </main>
        </div>
    )
}

export default Features