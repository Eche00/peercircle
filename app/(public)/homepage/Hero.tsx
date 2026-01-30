'use client'
import { HeroBgImage, HeroImg } from '@/assets/images'
import { ArrowForward } from '@mui/icons-material'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

function Hero() {
    return (
        <div className='relative flex min-h-screen bg-cover bg-center ' style={{ backgroundImage: `url(${HeroBgImage.src})` }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            <section className=' max-w-[90%] mx-auto flex sm:flex-row md:flex-row flex-col items-center  justify-center z-20'>
                <motion.div
                    className=" flex-1 gap-50 sm:pt-0 pt-10"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "linear" }}>
                    <div className=" flex flex-col sm:text-start text-center sm:items-start items-center gap-6">
                        <p className=" text-[14px]  font-normal p px-6 sm:mx-0 mx-auto">
                            COMMUNITY • GROWTH • SUPPORT
                        </p>
                        <h1 className=" text-white font-bold sm:text-[64px] text-[40px]   sm:w-full w-85] sm:leading-[100%] sm:tracker-[1.28px] leading-[120%] tracker-[0.8px]">
                            Your Circle Shapes Your
                            <span className=" text-[#8F4AE3]"> Growth</span>
                        </h1>
                        <p className=" text-white font-light sm:text-6 text-[18px] ">
                            Join a peer-driven space to learn, share experiences, and grow with people on the same journey as you.
                        </p>
                    </div>
                    <div className=" flex items-center sm:justify-start justify-center  gap-6 sm:py-17.5 py-3.75 w-fit">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2.5 rounded-[10px] bg-[#8F4AE3] text-white sm:py-5 sm:px-9 py-3 px-3 text-[16px] sm:text-[18px] font-medium w-fit">
                            Get Started <ArrowForward />
                        </Link>
                        <Link
                            href="/dashboard/sessions"
                            className=" sm:py-2.5 py-3 px-3 text-[16px] sm:text-[18px] font-normal border  rounded-[10px] flex items-center justify-center ">
                            {" "}
                            Join a Session
                        </Link>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "linear" }}
                    viewport={{ once: true }}
                    className='flex flex-1 items-center justify-center'>
                    <Image src={HeroImg} alt='Hero img' />
                </motion.div>
            </section>
        </div>
    )
}

export default Hero