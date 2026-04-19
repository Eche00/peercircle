'use client'

import { useUserInfo } from "@/utils/logics/userinfo"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Users from "./admintabs/Users"
import Sessions from "./admintabs/Sessions"
import TaskManagment from "./admintabs/TaskManagment"
import AllCommunity from "./admintabs/AllCommunity"
import Overview from "./admintabs/Overview"

function Page() {
    const [activeTab, setActiveTab] = useState<'Overview' | 'Users' | 'Communities' | 'Sessions' | 'Tasks'>('Overview')
    const userInfo = useUserInfo()
    const router = useRouter()

    // useEffect(() => {
    //     if (userInfo && userInfo.isAdmin !== 'admin') {
    //         router.push('/dashboard')
    //     }
    // }, [userInfo])

    const scrollTab = (tab: 'Overview' | 'Users' | 'Communities' | 'Sessions' | 'Tasks') => {
        setActiveTab(tab)

        const element = document.getElementById(tab)
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }

    return (
        <div className="min-h-screen text-white sm:p-6 space-y-10 relative">
            <div>
                <div>
                    <h1 className="text-2xl font-bold text-white uppercase flex items-center gap-2 pb-5">
                        {activeTab}
                    </h1>
                    <div className="mb-6">
                        <div className="flex overflow-x-auto no-scrollbar">
                            <div className="flex items-center gap-2 bg-[#212329] rounded-xl px-2 py-2 min-w-max">

                                {[
                                    "Overview",
                                    "Users",
                                    "Sessions",
                                    "Communities",
                                    "Tasks",
                                ].map((tab: any) => (
                                    <button
                                        key={tab}
                                        onClick={() => scrollTab(tab)}
                                        className={`px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm whitespace-nowrap transition-all duration-200
                    ${activeTab === tab
                                                ? 'bg-[#5E13FD] text-white shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_0px_#00000033]'
                                                : 'text-gray-400 hover:text-white'}
                    `}
                                    >
                                        {tab}
                                    </button>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
                {/* SESSIONS  */}


                {activeTab === 'Overview' && <Overview />}

                {activeTab === 'Users' && <Users />}

                {activeTab === 'Sessions' && <Sessions />}

                {activeTab === 'Tasks' && <TaskManagment />}

                {activeTab === 'Communities' && <AllCommunity />}
            </div>
        </div>
    )
}

export default Page
