'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';




function Sidebar() {
    const pathname = usePathname()

    // Sidebar Nav 
    const sideBarItems = [
        { name: "Home", link: '/', icon: 'home' },
        { name: "About", link: '/about', icon: 'info' },
        { name: "Events", link: '/events', icon: 'calendar' },
        { name: "Excos", link: '/excos', icon: 'people' },
        { name: "Student Voice", link: '/studentvoice', icon: 'speak' },

    ];


    return (
        <div className="bg-[#16181B] text-white fixed top-0 left-0 w-67.5 h-screen flex flex-col  py-2 gap-10">
            {/* lSidebar Container */}
            <section className="w-[80%] mx-auto flex flex-col gap-2">
                {/* Logo Section  */}
                <div className="flex items-center relative pb-6">
                    <span className="flex items-center w-full rounded-lg px-4 text-2xl font-extrabold text-[#8F4AE3] tracking-wide">
                        <Link href='/' className=' border-2 border-[#8F4AE3] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                        <p className="text-white  ">eer.</p>Circle
                    </span>
                </div>

                {/* Link Section  */}
                {sideBarItems.map((item) =>
                    <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#161B22] py-3 px-4 rounded-lg' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#161B22]/10'}>{item.name}</Link>)
                }

            </section>
        </div>
    )
}

export default Sidebar