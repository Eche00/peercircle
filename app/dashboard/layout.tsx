import DashHeader from "@/components/DashHeader";
import Sidebar from "./Sidebar";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "PeerCircle Dashboard",
    description: "Organic social growth, engagement groups, and session coordination for creators.",
    icons: {
        icon: "/logo.png",
    },
    keywords: [
        "PeerCircle",
        "dashboard",
        "social media growth",
        "engagement groups",
        "session management",
        "Instagram followers boost",
        "organic growth tool",
        "creator coordination",
        "community-driven growth",
        "social media analytics",
    ],
};
export default function DashboardLayout({
    children,
}: { children: React.ReactNode; }) {
    return (

        <section className="flex flex-col w-full max-w-full overflow-x-hidden ">
            <aside className="md:flex hidden">
                <Sidebar />
            </aside>
            <div className="md:pl-67.5 flex-1 flex flex-col h-fit pb-10 lg:pb-7  bg-[#191A1E] text-white  rounded-t-2xl">
                <DashHeader />
                <div className="sm:mr-5 mr-0 sm:p-8 p-4 mt-15  h-full overflow-y-auto z-0 pt-6 sm:pt-10 md:pt-25 lg:pt-10 sm:mb-0 mb-10 min-h-screen">
                    {children}
                </div>

            </div>
        </section>

    );
}
