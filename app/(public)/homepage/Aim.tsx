'use client'

import { ArrowForward, Discover, Earn, GetStarted, Join, ShareLink } from '@/components/ui/svg'
import { motion } from 'framer-motion'
import Link from 'next/link'


export const benefits = [
    {
        icon: <Discover />,
        title: ' Discover',
        img: '/aim1.jpg',
        col: 'col-span-1', row: 'row-span-2 sm:h-[614px] h-[300px]'
    },
    {
        icon: <Join />,
        title: 'Join Circle ',
        img: '/aim2.jpg',
        col: 'col-span-1', row: 'row-span-1 sm:h-full h-[300px]'
    },

    {
        icon: <ShareLink />,
        title: 'Share Link',
        img: '/aim4.jpg',
        col: 'col-span-1', row: 'row-span-1 sm:h-full h-[300px]'
    },
    {
        icon: <GetStarted />,
        title: 'Get Started ',
        img: '/aim3.jpg',
        col: 'col-span-1', row: 'row-span-1 sm:h-full h-[300px]'
    },
    {
        icon: <Earn />,
        title: 'Earn',
        img: '/aim5.jpg',
        col: 'col-span-1', row: 'row-span-1 sm:h-full h-[300px]'
    }

]

function Aim() {
    return (
        <div className=' min-h-screen relative'>
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[url('/bgoverlay.png')] bg-cover min-h-screen" />

            <div className='circleBlur absolute top-5 -right-30 z-0'></div>
            <div className='circleBlur absolute top-1/2 -translate-y-1/2 -left-30 z-0'></div>
            {/* container  */}
            <main className=' sm:max-w-[80%] max-w-[90%] mx-auto text-center  flex flex-col sm:gap-16 gap-8 sm:py-16.5 py-5 z-10'>

                <section className="w-full  sm:px-10 ">
                    {/* header  */}
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className='soraFont sm:text-[48px] text-[18px] font-semibold text-[#F0F0F0] p-2.5  leading-[100%] pb-'>Let’s See How PeerCircle <span className='text-[#5E13FD]'> Works</span></motion.h2>
                    <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className=' text-[16px]  text-[#FFFFFFB2] p-2.5  leading-[100%] pb-10'>Discover how simple steps and strong peer connections help you stay consistent and <br /> grow together.</motion.p>

                    {/* benefits  */}
                    <div className="grid grid-cols-1  lg:grid-cols-3 gap-4 auto-rows-auto sm:h-[614px]">
                        {benefits.map(b => (<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} key={b.title}
                            className={`relative rounded-xl overflow-hidden ${b.col} ${b.row}`}>
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(359.7deg,rgba(34,34,34,0.9)_1.16%,rgba(0,0,0,0)_99.74%)]" />

                            <img src={b.img} alt={b.title} className='bg-[#5E13FD] w-full h-full object-cover' />
                            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1.5'>
                                <span className='w-10 h-10 bg-[#5E13FD] flex items-center justify-center rounded-xl'>{b.icon}</span>
                                <span className='sm:text-[20px] text-[17.03px] font-semibold text-[#FFFFFF]'>{b.title}</span>
                            </div>
                        </motion.div>))}
                    </div>
                </section>
                <Link
                    href="/auth/sign-up"
                    className="sm:w-40.5 w-35.5 mx-auto sm:h-12 h-10 flex items-center justify-center gap-2.5 text-white bg-[#5E13FD] active:scale-95 transition font-semibold py-3 rounded-xl shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]"
                >
                    Get Started <ArrowForward />
                </Link>
            </main>
        </div>
    )
}

export default Aim