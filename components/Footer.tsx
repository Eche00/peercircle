'use client'
import Link from 'next/link'
import { GitHub, Instagram, Twitter } from '@mui/icons-material'
import { publicItems } from '@/utils/routes'
import { usePathname } from 'next/navigation'

function Footer() {
    const pathname = usePathname()
    return (
        <div className="bg-[#16181B] w-full   relative overflow-hidden ">

            {/* container  */}
            <footer className="">
                {/* top section  */}
                <div className=" flex md:flex-row flex-col md:gap-16 gap-8 items-center justify-center  w-[90%] mx-auto  md:py-32 py-16 border-b-[0.5px] border-[#FFFFFF]">

                    <p className="text-[20px] font-normal sm:text-start text-center text-transparent bg-clip-text bg-[#F9FBFF] ">
                        Get updates on new features, community launches, and ways to grow consistently with peers.
                    </p>
                    <div className=" bg-[#191A1E] border-[0.1px] border-gray-300 text-white  max-w-200 w-full p-2 flex items-center justify-between rounded-lg gap-5">
                        <input type="text" className="flex flex-1 h-10 outline-none placeholder:text-gray-600 md:pl-10 pl-1 min-w-0" placeholder="Email Address" />
                        <button className=" py-2.5 md:px-8 px-6 md:text-[20px] text-[16px] font-semibold text-[#E0E0E0] rounded-lg bg-[#8F4AE3]">Subscribe</button>
                    </div>
                </div>

                {/* bottom section  */}
                <section className=" md:pt-32 pt-16 flex md:flex-row flex-wrap items-start justify-between gap-y-2.5  md:w-fu w-[90%] mx-auto">
                    <div className="flex flex-col gap-8">
                        {/* Logo   */}
                        <div className="flex flex-1 items-center relative ">
                            <span className="flex items-center w-full rounded-lg sm:text-2xl text-xl font-extrabold text-[#8F4AE3] tracking-wide">
                                <Link href='/' className=' border-2 border-[#8F4AE3] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                                <p className="text-white  ">eer.</p>Circle
                            </span>
                        </div>
                        <p className="text-[20px] font-normal text-[#F9FBFF]  flex flex-col  gap-6 max-w-100 leading-[206%]">
                            PeerCircle is a community-driven platform designed to help people grow, stay accountable, and move forward together.
                        </p>
                        <div className="flex items-center gap-6 text-white">
                            <span><Twitter /></span>
                            <span><GitHub /></span>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className="flex flex-col gap-8">
                        <h2 className="md:text-[32px] text-[18px] font-bold text-[#E0E0E0] ">Routes</h2>
                        <ul className="text-[16px] font-normal text-[#F9FBFF]  flex flex-col  gap-2">
                            {publicItems.map((item) =>
                                <Link href={item.link} key={item.name} className={pathname === item.link ? 'text-white font-bold bg-[#8F4AE3] py-2 px-4 rounded-lg flex items-center gap-3' : 'text-gray-400 py-3 px-4 rounded-lg hover:bg-[#8F4AE3]/10 flex items-center gap-3'}> {item.name}</Link>)
                            }
                        </ul>
                    </div>
                    {/* section 3 */}
                    <div className="flex flex-col gap-8">
                        <h2 className="md:text-[32px] text-[18px] font-bold text-[#E0E0E0] ">Community</h2>
                        <ul className="text-[16px] font-normal text-[#E0E0E0]  flex flex-col  gap-6">
                            <li>Find a Circle</li>
                            <li>Create a Circle</li>
                            <li>Guidelines</li>
                            <li>Ambassadors</li>
                        </ul>
                    </div>
                    {/* section 4 */}
                    <div className="flex flex-col gap-8">
                        <h2 className="md:text-[32px] text-[18px] font-bold text-[#E0E0E0] "> Product</h2>
                        <ul className="text-[16px] font-normal text-[#E0E0E0]  flex flex-col  gap-6">
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Integrations</li>
                            <li>Partnerships</li>
                        </ul>
                    </div>
                </section>
                <p className="  text-[16px] font-normal text-[#FFFFFF] flex items-center justify-center gap-2.5 text-center pt-20 pb-10"><span>©</span> 2026 PEERCIRCLE. all Right Reserved </p>

            </footer>
        </div>
    )
}

export default Footer