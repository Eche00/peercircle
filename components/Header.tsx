'use client'

import { publicItems } from '@/utils/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Close } from '@mui/icons-material';

function Header() {
    const pathname = usePathname()
    const [openMenu, setOpenMenu] = useState<boolean>(false)

    return (
        <div className='bg-[#16181B] text-white md:py-3 py-2  fixed top-0 left-0 w-full z-50'>

            {/* container  */}
            <section className='flex items-center justify-center gap-2 md:w-[90%] w-[98%] mx-auto'>

                {/* Logo   */}
                <div className="flex flex-1 items-center relative ">
                    <span className="flex items-center w-full rounded-lg px-4 md:text-2xl text-xl font-extrabold text-[#8F4AE3] tracking-wide">
                        <Link href='/' className=' border-2 border-[#8F4AE3] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                        <p className="text-white  ">eer.</p>Circle
                    </span>
                </div>

                {/* Navigation */}
                <div className='md:flex hidden flex-1 items-center justify-center'>
                    <nav className='w-fit bg-[#191A1E] flex items-center gap-4 py-3 px-6 rounded-lg'>
                        {publicItems.map((item) => (<Link href={item.link} key={item.name} className={item.link === pathname ? 'text-[#8F4AE3] text-[16px] font-semibold duration-300' : ' text-white hover:text-gray-300 duration-100'}>{item.name}</Link>))}
                    </nav>
                </div>

                {/* Auth Button  */}
                <div className="md:flex hidden flex-1 items-center justify-end gap-5  ">
                    <Link href="/login" className=' text-white bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 font-bold  md:py-2 py-1.5 md:px-7 px-3 rounded-lg cursor-pointer w-fit'>Get Started</Link>
                </div>
                {/* mobile menu button  */}
                <div className="flex md:hidden  items-center justify-end gap-5 ">
                    <button className=' text-white  cursor-pointer w-fit pr-4' onClick={() => setOpenMenu(!openMenu)}>{openMenu ? <Close /> : <DragHandleIcon />}</button>
                </div>
            </section>
            {/* Mobile menu */}
            <AnimatePresence>
                {openMenu &&
                    <section onClick={() => setOpenMenu(false)} className="fixed top-17.5 left-0 w-full h-screen bg-black/50 mx-auto flex  justify-end md:hidden">


                        <motion.aside
                            initial={{ x: 170, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 170, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className='bg-[#16181B] flex flex-col gap-2 text-[10px] w-[70%] p-5'
                            onClick={(e) => e.stopPropagation()}>
                            {publicItems.map((item) =>
                                <Link href={item.link} key={item.name} onClick={() => setOpenMenu(false)} className={pathname === item.link ? 'text-white font-bold bg-[#8F4AE3] py-3 px-4  rounded-lg flex items-center gap-2' : 'text-gray-400 py-3 px-4  rounded-lg hover:bg-[#8F4AE3]/10 flex items-center gap-2'}>{item.name}</Link>)
                            }
                            <hr className=' w-full h-[0.1px] bg-gray-600 border-none' />
                            <div className="flex items-center justify-end gap-5  ">
                                <Link href="/login" className=' text-white bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 font-bold  md:py-2 py-1.5 md:px-7 px-3 rounded-lg cursor-pointer w-fit'>Get Started</Link>
                            </div>
                        </motion.aside>
                    </section>
                }
            </AnimatePresence>
        </div>
    )
}

export default Header