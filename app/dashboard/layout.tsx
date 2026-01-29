import DashHeader from "@/components/DashHeader";
import Sidebar from "./Sidebar";



export default function DashboardLayout({
    children,
}: { children: React.ReactNode; }) {
    return (

        <section className="flex flex-col w-full max-w-full overflow-x-hidden">
            <aside className="md:flex hidden">
                <Sidebar />
            </aside>
            <div className="md:pl-67.5 flex-1 flex flex-col h-fit pb-10 lg:pb-7  bg-[#191A1E] text-white  rounded-t-2xl">
                <DashHeader />
                <div className="sm:mr-5 mr-0 sm:p-8 p-4 sm:mt-25 mt-22 lg:mt-25 h-full overflow-y-auto z-0 pt-6 sm:pt-10 md:pt-25 lg:pt-10 sm:mb-0 mb-10 min-h-screen">
                    {children}
                </div>

            </div>
        </section>

    );
}
