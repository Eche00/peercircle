'use client'

import { publicItems } from '@/utils/routes'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import DragHandleIcon from '@mui/icons-material/DragHandle';

function Header() {
    const pathname = usePathname()
    return (
        <div className='bg-[#16181B] text-white sm:py-3 py-2  fixed top-0 left-0 w-full z-10  '>

            {/* container  */}
            <section className='flex items-center justify-center gap-2 sm:w-[90%] w-[98%] mx-auto'>

                {/* Logo   */}
                <div className="flex flex-1 items-center relative ">
                    <span className="flex items-center w-full rounded-lg px-4 sm:text-2xl text-xl font-extrabold text-[#8F4AE3] tracking-wide">
                        <Link href='/' className=' border-2 border-[#8F4AE3] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                        <p className="text-white  ">eer.</p>Circle
                    </span>
                </div>

                {/* Navigation */}
                <div className='sm:flex hidden flex-1 items-center justify-center'>
                    <nav className='w-fit bg-[#191A1E] flex items-center gap-4 py-3 px-6 rounded-lg'>
                        {publicItems.map((item) => (<Link href={item.link} className={item.link === pathname ? 'text-[#8F4AE3] text-[16px] font-semibold duration-300' : ' text-white hover:text-gray-300 duration-100'}>{item.name}</Link>))}
                    </nav>
                </div>

                {/* Auth Button  */}
                <div className="sm:flex hidden flex-1 items-center justify-end gap-5  ">
                    <Link href="/login" className=' text-white bg-[#8F4AE3] hover:bg-[#8F4AE3]/90 font-bold  sm:py-2 py-1.5 sm:px-7 px-3 rounded-lg cursor-pointer w-fit'>Get Started</Link>
                </div>
                {/* mobile menu  */}
                <div className="flex sm:hidden  items-center justify-end gap-5 ">
                    <button className=' text-white  cursor-pointer w-fit pr-4'><DragHandleIcon /></button>
                </div>
            </section>
        </div>
    )
}

export default Header