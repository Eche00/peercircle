'use client'

import { useState } from "react"
import JoinSession from "./JoinSession"
import HostedSessions from "./HostedSessions"
import MySessions from "./MySessions"

function Page() {
    const [activeSection, setActiveSection] = useState<'joinable' | 'joined' | 'hosted'>('joinable')

    const scrollToSection = (section: 'joinable' | 'joined' | 'hosted') => {
        setActiveSection(section)

        const element = document.getElementById(section)
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
                    <h1 className="text-2xl font-bold mb-6">Sessions</h1>
                    <div className="flex items-center mb-8 bg-[#212329] w-fit rounded-xl overflow-hidden">
                        <button
                            onClick={() => scrollToSection('joinable')}
                            className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
            ${activeSection === 'joinable'
                                    ? 'bg-[#8F4AE3] text-white  '
                                    : 'bg-transparent  text-gray-400'}
        `}
                        >
                            Joinable
                        </button>

                        <button
                            onClick={() => scrollToSection('joined')}
                            className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
            ${activeSection === 'joined'
                                    ? 'bg-[#8F4AE3] text-white  '
                                    : 'bg-transparent  text-gray-400'}
        `}
                        >
                            Joined
                        </button>

                        <button
                            onClick={() => scrollToSection('hosted')}
                            className={`px-4 py-2 rounded-md transition-all duration-200 cursor-pointer
            ${activeSection === 'hosted'
                                    ? 'bg-[#8F4AE3] text-white  '
                                    : 'bg-transparent  text-gray-400'}
        `}
                        >
                            Hosted
                        </button>
                    </div>
                </div>
                {/* SESSIONS  */}



                {activeSection === 'joinable' && <JoinSession />}

                {activeSection === 'joined' && <MySessions />}

                {activeSection === 'hosted' && <HostedSessions />}
            </div>
        </div>
    )
}

export default Page
