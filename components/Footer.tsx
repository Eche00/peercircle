'use client'
import Link from 'next/link'
import { GitHub, Instagram, Twitter } from '@mui/icons-material'
import { publicItems } from '@/utils/routes'
import { usePathname } from 'next/navigation'

function Footer() {
    const pathname = usePathname()
    return (
        <div className="bg-[#000000] w-full   relative overflow-hidden ">

            {/* container  */}
            <footer className="">
                <h1 className='sm:text-[240px] text-[70px] font-bold text-[#FFFFFF] text-center animate-pulse transition-all duration-1000 relative'>
                    <div className='bg-black w-full h-[50%] absolute top-0 left-0'></div>
                    eer.<span className=' text-[#5E13FD]'>Circle</span></h1>
                {/* top section  */}
                <div className=" flex flex-col gap-8 items-center justify-center  w-[90%] mx-auto py-16 ">

                    <p className=' text-[16px]  text-[#FFFFFFB2] p-2.5  leading-[100%]'>
                        Get updates on new features, community launches, and ways to grow consistently with peers.
                    </p>
                    <div className=" border-[0.1px] border-[#FFFFFF66] text-white  max-w-200 w-full p-2 flex items-center justify-between rounded-lg gap-5">
                        <input type="text" className="flex flex-1 h-10 outline-none placeholder:text-gray-600 md:pl-10 pl-1 min-w-0" placeholder="Enter your email " />
                        <button className=" py-2.5 md:px-8 px-6 md:text-[20px] text-[16px] font-semibold text-[#E0E0E0] bg-[#5E13FD] rounded-xl shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]">Subscribe</button>
                    </div>
                </div>

                {/* bottom section  */}
                <section className=" md:pt-32 pt-16 flex md:flex-row flex-wrap items-start justify-between gap-y-2.5  md:w-fu w-[90%] mx-auto pb-10">
                    <div className="flex flex-col gap-8">
                        {/* Logo   */}
                        <div className="flex flex-1 items-center relative ">
                            <span className="flex items-center w-full rounded-lg sm:text-2xl text-xl font-extrabold text-[#5E13FD] tracking-wide">
                                <Link href='/' className=' border-2 border-[#5E13FD] rounded-full p-2 mr-2 flex items-center justify-center'><img src="/logo.png" alt="" className=' w-8 h-8 object-cover' /></Link>
                                <p className="text-white  ">eer.</p>Circle
                            </span>
                        </div>
                        <p className="text-[16px] font-normal text-[#FFFFFFCC]  max-w-100">
                            PeerCircle is a community-driven platform designed to help people grow, stay accountable, and move forward together.
                        </p>
                        <div className="flex items-center gap-3 text-white">
                            <span><Twitter /></span>
                            <span><GitHub /></span>
                        </div>
                    </div>

                    {/* section 2 */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-[20px] font-semibold text-[#E0E0E0] ">Routes</h2>
                        <ul className="text-[16px] font-normal text-[#FFFFFFB2]  flex flex-col  gap-3">
                            {publicItems.map((item) =>
                                <Link href={item.link} key={item.name} className={pathname === item.link ? ' font-bold text-[#5E13FD]  rounded-lg flex items-center gap-3' : 'text-gray-400  rounded-lg hover:underline flex items-center gap-3'}> {item.name}</Link>)
                            }
                        </ul>
                    </div>
                    {/* section 3 */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-[20px] font-semibold text-[#E0E0E0] ">Community</h2>
                        <ul className="text-[16px] font-normal text-[#FFFFFFB2]  flex flex-col  gap-3">
                            <li>Find a Circle</li>
                            <li>Create a Circle</li>
                            <li>Guidelines</li>
                            <li>Ambassadors</li>
                        </ul>
                    </div>
                    {/* section 4 */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-[20px] font-semibold text-[#E0E0E0] "> Product</h2>
                        <ul className="text-[16px] font-normal text-[#FFFFFFB2]  flex flex-col  gap-3">
                            <li>Features</li>
                            <li>Pricing</li>
                            <li>Integrations</li>
                            <li>Partnerships</li>
                        </ul>
                    </div>
                </section>
                {/* <p className="  text-[16px] font-normal text-[#FFFFFF] flex items-center justify-center gap-2.5 text-center pt-20 pb-10"><span>©</span> 2026 PEERCIRCLE. all Right Reserved </p> */}

            </footer>
        </div>
    )
}

export default Footer