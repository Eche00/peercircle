'use client';

import { useUserInfo } from '@/utils/logics/userinfo';
import { adminSideBarItems, sideBarItems, sideBarItems2 } from '@/utils/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


function Sidebar() {
    const pathname = usePathname()
    const userInfo = useUserInfo()


    return (
        <div className="bg-[#16181B] text-white fixed top-0 left-0 w-67.5 h-screen flex flex-col  py-2 gap-10 z-10">
            {/* Sidebar Container */}
            <section className="w-[80%] mx-auto flex flex-col gap-2">
                {/* Logo Section  */}
                <div className="flex items-center relative pb-6">
                    <span className="flex items-center w-full rounded-lg px-4 text-2xl font-extrabold text-[#5E13FD] tracking-wide ">
                        <Link href='/' className=' border-2 border-[#5E13FD] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                        <p className="text-white  ">eer.</p>Circle
                    </span>
                </div>

                {/* Link Section  */}
                {sideBarItems.map((item) =>
                    <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#5E13FD] py-3 px-4 rounded-lg flex items-center gap-3 shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#5E13FD]/10 flex items-center gap-3 '}>{item.icon} {item.name}</Link>)
                }

                <hr className=' w-full h-[0.1px] bg-gray-600 border-none' />
                {sideBarItems2.map((item) =>
                    <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#5E13FD] py-3 px-4 rounded-lg flex items-center gap-3 shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#5E13FD]/10 flex items-center gap-3'}>{item.icon} {item.name}</Link>)
                }

                {userInfo?.role === 'admin' && adminSideBarItems.map((item) =>
                    <>
                        <hr className=' w-full h-[0.1px] bg-gray-600 border-none' />
                        <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#5E13FD] py-3 px-4 rounded-lg flex items-center gap-3 shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#5E13FD]/10 flex items-center gap-3'}>{item.icon} {item.name}</Link>

                    </>

                )
                }

            </section>
        </div>
    )
}

export default Sidebar