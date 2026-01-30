'use client'
import { Accessibility, Close, Search } from '@mui/icons-material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import Mobilenav from './Mobilenav'
import { AnimatePresence, motion } from 'framer-motion'

function DashHeader() {
    const pathname = usePathname()
    const [openMenu, setOpenMenu] = useState<boolean>(false)
    return (
        <div className='bg-[#16181B] text-white sm:py-3 py-2  fixed top-0 left-0 md:left-67.5 right-0 z-10  '>

            {/* Container  */}
            <section className='flex items-center justify-center gap-2 w-[95%] mx-auto'>

                {/* Logo */}
                <div className="md:hidden flex flex-1  items-center  md:w-1/4">
                    <Link href='/' className=' border-2 border-[#8F4AE3] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                </div>


                {/* Desktop Nav + (Route Display) */}
                <div className='md:flex hidden sm:flex-1 flex-none sm:items-center items-end sm:justify-between justify-end   sm:w-full w-fit sm:max-w-[80%]  border-[0.1px] border-gray-700 rounded-lg py-2 px-4 '>
                    <h2 className=' uppercase font-extrabold'>{pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}</h2>

                    <div className='hidden sm:flex items-center justify-center gap-2'>
                        <p>User Dashboard </p>
                        <hr className=' h-5 w-[0.1px] bg-gray-600 border-none' /> <Accessibility />
                    </div>
                </div>
                {/* Mobile Nav Button  */}

                <div className='relative md:hidden flex flex-none items-end justify-end w-fit'>
                    <AnimatePresence initial={false} mode="wait">
                        {openMenu ?
                            <motion.button
                                key="close"
                                initial={{ x: 170, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: 50, opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className='border-[0.1px] border-gray-700 rounded-lg py-2 px-2 flex items-center gap-2 transition-all duration-300 uppercase font-extrabold'
                                onClick={() => setOpenMenu(false)}
                            >
                                <Close />
                            </motion.button>
                            :
                            <motion.button
                                key="title"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ x: 50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className='border-[0.1px] border-gray-700 rounded-lg py-2 px-6 flex items-center gap-2 transition-all duration-300 uppercase font-extrabold'
                                onClick={() => setOpenMenu(true)}
                            >
                                {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
                            </motion.button>
                        }

                        {/* Mobile Menu rendered */}
                        {openMenu && <Mobilenav setOpenMenu={setOpenMenu} />}
                    </AnimatePresence>

                </div>

            </section>
        </div>
    )
}

export default DashHeader