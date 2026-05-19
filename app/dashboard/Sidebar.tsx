'use client';

import { handleSignOut, useUserInfo } from '@/utils/logics/userinfo';
import { adminSideBarItems, sideBarItems, sideBarItems2 } from '@/utils/routes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';


function Sidebar() {
    const pathname = usePathname()
    const userInfo = useUserInfo()
    const router = useRouter()


    return (
        <div className="bg-[#16181B] text-white fixed top-0 left-0 w-67.5 h-screen flex flex-col py-2 z-10">
            {/* Sidebar Container */}
            <section className="w-[80%] mx-auto flex flex-col gap-2 flex-1 overflow-y-auto">
                {/* Logo Section  */}
                <div className="flex items-center relative pb-6">
                    <span className="flex items-center w-full rounded-lg px-4 text-2xl font-extrabold text-[#5E13FD] tracking-wide ">
                        <Link href='/' className=' border-2 border-[#5E13FD] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                        <p className="text-white  ">eer.</p>Circle
                    </span>
                </div>

                {/* Link Section  */}
                {sideBarItems.map((item) =>
                    <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#5E13FD] py-3 px-4 rounded-lg flex items-center gap-3 ' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#5E13FD]/10 flex items-center gap-3 '}>{item.icon} {item.name}</Link>)
                }

                <hr className=' w-full h-[0.1px] bg-gray-600 border-none' />
                {sideBarItems2.map((item) =>
                    <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#5E13FD] py-3 px-4 rounded-lg flex items-center gap-3 ' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#5E13FD]/10 flex items-center gap-3'}>{item.icon} {item.name}</Link>)
                }

                {userInfo?.role === 'admin' && adminSideBarItems.map((item) =>
                    <div key={item.name}>
                        <hr className=' w-full h-[0.1px] bg-gray-600 border-none' />
                        <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#5E13FD] py-3 px-4 rounded-lg flex items-center gap-3  mt-2' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#5E13FD]/10 flex items-center gap-3 mt-2'}>{item.icon} {item.name}</Link>

                    </div>

                )
                }

            </section>
            {/* Bottom section */}
            <section className="mt-auto w-full px-3 pb-4">
                <div className="bg-[#1b1d22] border border-[#2a2d35] rounded-xl p-3 shadow-lg">

                    {/* Top: Avatar + XP */}
                    <div className="flex items-center gap-3">
                        {/* Avatar with glow ring */}
                        <div className="relative">
                            <div className="h-10 w-10 rounded-full bg-[#5E13FD] flex items-center justify-center text-sm font-bold text-white shadow-[0_0_12px_rgba(94,19,253,0.6)]">
                                {userInfo?.displayName?.[0] || "C"}
                            </div>

                            {/* tiny online/active dot */}
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-[#1b1d22]" />
                        </div>

                        {/* Name + XP */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {userInfo?.displayName || "User"}
                            </p>

                            <div className="flex items-center justify-between">
                                <p className="text-[11px] text-gray-400">
                                    Level Progress
                                </p>

                                <p className="text-[11px] text-[#5E13FD] font-semibold">
                                    {userInfo?.trustPoints || 0} XP
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* XP bar (more premium feel) */}
                    <div className="mt-3 h-2 w-full bg-[#101216] rounded-full overflow-hidden relative">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#5E13FD] to-[#a855f7] transition-all duration-500"
                            style={{
                                width: `${Math.min(((userInfo?.trustPoints || 0) % 100), 100)}%`,
                            }}
                        />

                        {/* glow overlay */}
                        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_left,#5E13FD,transparent_60%)]" />
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center justify-between">
                        <a
                            href="/dashboard/profile"
                            className="text-[11px] text-[#5E13FD] hover:text-[#7c3aed] transition cursor-pointer"
                        >
                            View profile →
                        </a>

                        <button
                            onClick={() => handleSignOut(router)}
                            className="text-[11px] text-red-400 hover:text-red-300 transition cursor-pointer"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Sidebar