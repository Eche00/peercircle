"use client";

import {
  Diversity3,
  Handshake,
  Visibility,
  VerifiedUser,
  Psychology,
  Gavel,
} from "@mui/icons-material";
import { motion } from "framer-motion";

function AboutPage() {
  const values = [
    {
      icon: <Visibility className="text-[40px] text-white" />,
      title: "Transparency",
      desc: "We believe in open processes. No hidden lists, no shadow banning. Everything is visible to the community.",
    },
    {
      icon: <Gavel className="text-[40px] text-white" />,
      title: "Fairness",
      desc: "Our system ensures equal contribution. You give engagement to get engagement. No free rides.",
    },
    {
      icon: <Diversity3 className="text-[40px] text-white" />,
      title: "Community",
      desc: "We are more than a tool; we are a collective of creators helping each other grow authentically.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#191A1E] text-white">
      {/* Hero Section */}
      <section className="relative w-full py-20 px-6 sm:px-10 flex flex-col items-center text-center gap-6">
        <div className="circleBlur absolute top-10 right-10 z-0 opacity-50"></div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-[32px] sm:text-[48px] md:text-[64px] font-bold leading-tight"
        >
          Empowering Growth Through{" "}
          <span className="text-[#8F4AE3]">True Connection</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10 max-w-2xl text-[16px] sm:text-[18px] text-gray-300 font-light"
        >
          PeerCircle is defined by the people who use it. We are building a
          fair, transparent ecosystem where content creators can thrive
          together.
        </motion.p>
      </section>

      <section className="w-full bg-[#16181B] py-16 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col gap-6"
          >
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#8F4AE3]">
              Our Mission
            </h2>
            <p className="text-[16px] sm:text-[18px] text-gray-300 leading-relaxed">
              Our mission is to eliminate the unpredictability of social media
              algorithms by fostering direct, human-to-human support. We
              automate the coordination so you can focus on the connection.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-4">
                <span className="bg-[#8F4AE3]/20 p-2 rounded-lg text-[#8F4AE3]">
                  <Handshake />
                </span>
                <span className="text-gray-200">Reciprocal Engagement</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-[#8F4AE3]/20 p-2 rounded-lg text-[#8F4AE3]">
                  <VerifiedUser />
                </span>
                <span className="text-gray-200">Verified Interactions</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-[#8F4AE3]/20 p-2 rounded-lg text-[#8F4AE3]">
                  <Psychology />
                </span>
                <span className="text-gray-200">Mindful Growth</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full h-[300px] sm:h-[400px] bg-[#8F4AE3]/10 rounded-2xl flex items-center justify-center border border-[#8F4AE3]/20"
          >
            {/* Placeholder for an abstract image or graphic */}
            <Diversity3 className="text-[120px] text-[#8F4AE3]/40" />
          </motion.div>
        </div>
      </section>

      <section className="w-full py-20 px-6 sm:px-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-[28px] sm:text-[36px] font-bold mb-16"
        >
          Core <span className="text-[#8F4AE3]">Values</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-[#212329] p-8 rounded-2xl border border-gray-800 hover:border-[#8F4AE3] transition-colors duration-300 flex flex-col items-center text-center gap-4"
            >
              <div className="w-16 h-16 bg-[#8F4AE3] rounded-xl flex items-center justify-center mb-2 shadow-lg shadow-[#8F4AE3]/20">
                {val.icon}
              </div>
              <h3 className="text-[24px] font-semibold">{val.title}</h3>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AboutPage;
