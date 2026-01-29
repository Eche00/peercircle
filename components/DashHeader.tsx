'use client'
import { Search } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

function DashHeader() {
    return (
        <div className='bg-[#16181B] text-white sm:py-3 py-2  fixed top-0 left-0 md:left-67.5 right-0 z-10  '>

            {/* container  */}
            <section className='flex items-center justify-center gap-2 w-[95%] mx-auto'>

                {/* Logo Section for desktop -  mobile */}
                <div className="md:hidden flex  items-center  md:w-1/4">
                    <Link href='/' className=' border-2 border-[#8F4AE3] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                </div>

                {/* Search Bar - centered and responsive */}
                <div className='flex md:flex-1 justify-center '>
                    <div className='flex w-full max-w-2xl border-2 border-gray-300 rounded-lg py-2 px-4 bg-white'>
                        <input
                            type="text"
                            placeholder='Search...'
                            className='md:flex hidden flex-1 outline-none bg-transparent '


                        />
                        <button className='hover:text-[#8F4AE3]  cursor-pointer'> <Search /></button>

                    </div>
                </div>

                {/* auth button  */}

                <div className="flex flex-1 items-center justify-end gap-5 md:pl-2 ">
                    <Link href="/login" className=' text-white bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 font-bold  sm:py-2 py-1.5 sm:px-7 px-3 rounded-lg cursor-pointer w-fit'>Register</Link>
                </div>
            </section>
        </div>
    )
}

export default DashHeader