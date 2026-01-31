'use client'
import { motion } from 'framer-motion'
import React from 'react'

const faqs = [
    {
        question: 'What is PeerCircle?',
        answer:
            'PeerCircle is a community platform where people join small peer groups to stay accountable, collaborate, and grow together.',
    },
    {
        question: 'How do I join a circle?',
        answer:
            'You can discover circles that match your goals, interests, or skill areas and join them directly from the platform.',
    },
    {
        question: 'Can I create my own circle?',
        answer:
            'Absolutely! Create a circle, invite peers, set goals, and track progress together with your members.',
    },
    {
        question: 'How are points earned?',
        answer:
            'Points are earned by participating in sessions, completing challenges, and supporting other members in your circle.',
    },
    {
        question: 'How do I track my progress?',
        answer:
            'PeerCircle tracks sessions, milestones, and achievements, giving you a clear view of your personal growth and engagement.',
    },
    {
        question: 'Is PeerCircle free to use?',
        answer:
            'Yes! You can join circles and participate in sessions for free. Some premium features or special events may have optional upgrades.',
    },
]

function Faqs() {
    return (
        <div className=' min-h-screen relative py-16'>
            <main className='lg:max-w-300 max-w-[95%] mx-auto  text-center flex flex-col gap-6'>
                {/* Header Badge */}
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className='soraFont sm:text-[54px] text-[28px] font-semibold text-[#F0F0F0] p-2.5  leading-[100%] -'>FAQ<span className='text-[#8F4AE3]'>s</span></motion.h2>


                {/* Title & Subtitle */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }}>
                    <h2 className=' sm:text-[48px] text-[32px] font-bold text-white leading-snug sm:leading-tight '>
                        Frequently Asked Questions
                    </h2>
                    <p className='sm:text-[20px] text-[16px] text-white/70 mt-3 max-w-3xl mx-auto'>
                        Everything you need to know about joining circles, earning points, and growing with your peers.
                    </p>
                </motion.div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 sm:text-start text-center">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-[#8F4AE3]/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                        >
                            <h3 className="text-[20px] sm:text-[22px] font-semibold text-white mb-3">
                                {faq.question}
                            </h3>
                            <p className="text-[15px] sm:text-[17px] text-white/70 leading-relaxed">
                                {faq.answer}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>

    )
}

export default Faqs
