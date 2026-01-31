'use client'

import { Assignment, Attribution, AutoMode, ConnectWithoutContact, Diversity1, JoinFull, Savings, ScreenShare, SelfImprovement, SensorOccupied, TravelExplore } from '@mui/icons-material'
import { motion } from 'framer-motion'
import Link from 'next/link'

export const roadMapHeader = [
    {
        name: 'Discover',
        icon: <TravelExplore />,
    },
    {
        name: 'Join Circle',
        icon: <JoinFull />,
    },
    {
        name: 'Share Link',
        icon: <ScreenShare />,
    },
    {
        name: 'Get Started',
        icon: <Assignment />,
    },
    {
        name: 'Earn',
        icon: <Savings />,
    },
]
export const benefits = [
    {
        icon: <Attribution />,
        title: 'Peer Accountability',
        desc: 'Stay consistent by growing alongside people who share your goals.',
    },
    {
        icon: <SensorOccupied />,
        title: 'Supportive Circles',
        desc: 'Join focused peer groups that encourage progress and real conversations.',
    },
    {
        icon: <AutoMode />,
        title: 'Shared Progress',
        desc: 'Track sessions, milestones, and wins together as a community.',
    },
    {
        icon: <Diversity1 />,
        title: 'Motivation',
        desc: 'Seeing others show up keeps you inspired to do the same.',
    },
    {
        icon: <ConnectWithoutContact />,
        title: 'Meaningful Connections',
        desc: 'Build relationships that go beyond likes and comments.',
    },
    {
        icon: <SelfImprovement />,
        title: 'Reward Yourself',
        desc: 'Earn points as you engage and contribute to your peer circle.',
    }

]

function Aim() {
    return (
        <div className=' min-h-screen relative bg-[#16181B]'>
            <div className='circleBlur absolute top-5 -right-30 z-0'></div>
            <div className='circleBlur absolute top-1/2 -translate-y-1/2 -left-30 z-0'></div>
            {/* container  */}
            <main className='lg:max-w-full max-w-[90%] mx-auto text-center  flex flex-col sm:gap-16 gap-8 sm:py-16.5 py-5 z-10'>

                <section className="w-full  sm:px-10 ">
                    {/* header  */}
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className='soraFont sm:text-[54px] text-[28px] font-semibold text-[#F0F0F0] p-2.5  leading-[100%] pb-'>Let’s See How PeerCircle <span className='text-[#8F4AE3]'> Works</span></motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className=' sm:text-[24px] text-[20px] font-medium text-[#F0F0F0] p-2.5  leading-[100%] '>Discover how simple steps and strong peer connections help you stay consistent and grow together.</motion.p>
                    {/* routes  */}
                    <div className=" flex flex-wrap items-center  justify-center sm:gap-8 gap-[33.93px] w-full mx-auto pt-16">
                        {roadMapHeader.map(header => (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} key={header.name} className='flex items-center flex-col justify-center sm:gap-4 gap-[12.03px] sm:w-47.5 w-33.25 sm:h-47.25 h-33 rounded-2xl bg-[#8F4AE3]/10'>
                            <span className='w-10 h-10 bg-[#8F4AE3] flex items-center justify-center rounded-lg'>{header.icon}</span>
                            <span className='sm:text-[24px] text-[16px] font-semibold text-[#8F4AE3]'>{header.name}</span></motion.div>))}
                    </div>
                    {/* benefits  */}
                    <div className=" flex flex-wrap items-center  justify-center sm:gap-8 gap-[33.93px] w-full mx-auto pt-16">
                        {benefits.map(b => (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} key={b.title} className='flex items-center flex-col justify-center gap-2 sm:w-98.75 w-[336.9px] sm:h-76.5 h-[245.45px] rounded-[30px] bg-[#212329] border border-gray-800 hover:border-[#8F4AE3]'>
                            <span className='w-16 h-16 bg-[#8F4AE3] flex items-center justify-center rounded-lg'>{b.icon}</span>
                            <span className='sm:text-[24px] text-[17.03px] font-semibold text-white'>{b.title}</span>
                            <span className='sm:text-[20px] text-[14.19px] font-medium text-white sm:max-w-89.75 max-w-[254.67px]'>{b.desc}</span>
                        </motion.div>))}
                    </div>
                </section>

            </main>
        </div>
    )
}

export default Aim