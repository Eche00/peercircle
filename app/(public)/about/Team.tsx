import React from "react";
import { motion } from "framer-motion";

const teamMembers = [
    {
        id: 1,
        name: "Eche_Codes",
        role: "Founder (software engineer)",
        email: 'echeeze956@gmail.com',
        image: "https://pbs.twimg.com/profile_images/2013562089772617728/1AtLgkwC_400x400.jpg",
        link: "https://x.com/Eche_codes",

    },
    {
        id: 2,
        name: "Elizipo",
        role: "Co-Founder (software engineer)",
        email: 'elzipo.dev@gmail.com',
        image: "/elzipo.jpeg",
        link: "https://x.com/elzipodev?s=20",
    },
    {
        id: 3,
        name: "UI_Franklin",
        role: "UI/UX Designer",
        email: 'ezechijiokefrank@gmail.com',
        image: "https://pps.services.adobe.com/api/profile/0AF66ED863320AFB0A495EBC@AdobeID/image/a0565b75-bb31-4a6b-93c9-402fdf60338f/230",
        link: "https://x.com/UI_Franklin?s=20",

    }
];

function Team() {
    return (
        <section className='relative min-h-screen'>
            {/* Overlay */}
            <div className='w-full h-full bg-linear-to-b from-transparent to-[#0B0B0B] absolute top-0 left-0 z-20'></div>
            <div className="absolute inset-0 pointer-events-none opacity-15 bg-[url('/bgoverlay.png')] bg-cover min-h-[100vh] z-10" />
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center text-[28px] sm:text-[36px] font-bold mb-16"
            >
                Meet Our <span className="text-[#5E13FD]">Team</span>
            </motion.h2>

            {/* Grid */}
            <div className="flex flex-wrap items-center justify-center gap-[24px] max-w-6xl mx-auto z-20 relative pb-10">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="group  flex flex-col gap-6  transition "
                    >
                        {/* Image */}
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full max-w-73.75 h-[327px] rounded-3xl object-cover group-hover:scale-105 transition duration-500 "
                        />

                        {/* Info */}
                        <div className="px-4 pb-4 flex flex-col gap-2.5">
                            <h3 className="sm:text-[24px] text-[18px] font-normal">{member.name}</h3>
                            <p className="text-[16px] text-[#FFFFFF99]">{member.role}</p>

                            {/* Contact */}
                            <a href={"mailto:" + member.email} className=" text-[16px] text-[#FFFFFFCC] hover:text-white underline transition cursor-pointer">
                                Contact email ↗
                            </a>
                            <a href={member.link} target="_blank" rel="noopener noreferrer" className=" text-[16px] text-[#FFFFFFCC] hover:text-white underline transition cursor-pointer">
                                <img src="/twitterlogo.jpg" alt="" className="w-6 h-6 rounded-full" />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

export default Team;