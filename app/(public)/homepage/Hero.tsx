"use client";
import { AppleMusicIcon, ArrowForward, CircularBlur, FaceBookIcon, InstagramIcon, SnapchatIcon, TikTokIcon, WhatsappIcon, XIcon, YouTubeIcon } from "@/components/ui/svg";
import { motion } from "framer-motion";
import Link from "next/link";

function Hero() {
  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center overflow-x-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[url('/bgoverlay.png')] bg-cover min-h-[100vh]" />

      <section className=" max-w-[90%] mx-auto flex  md:flex-row flex-col items-center  justify-center md:gap-0 gap-10 z-20">
        {/* Left hero section  */}
        <motion.div
          className=" flex-1 flex flex-col gap-9 sm:pt-0 pt-10"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "linear" }}
        >
          <div className=" flex flex-col sm:text-start text-center sm:items-start items-center gap-4">
            <h1 className=" text-white font-bold sm:text-[72px] text-[40px]   sm:w-full sm:leading-[100%] sm:tracker-[1.28px] leading-[120%] tracker-[0.8px]">
              Your Circle  <span className=" text-[#5E13FD]"> Shapes</span> <br />
              Your<span className=" text-[#5E13FD]"> Growth</span>
            </h1>
            <p className=" text-white font-light text-[18px] ">
              Join a peer-driven space to learn, share experiences, and grow
              with people on the same journey as you.
            </p>
          </div>
          <div className="w-full flex items-center sm:justify-start justify-center  gap-6 w-fit text-[14px]">
            <Link
              href="/auth/sign-up"
              className="sm:w-40.5 w-35.5 sm:h-12 h-10 flex items-center justify-center gap-2.5 text-white bg-[#5E13FD] active:scale-95 transition font-semibold py-3 rounded-xl shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]"
            >
              Get Started <ArrowForward />
            </Link>
            <Link
              href="/dashboard/sessions"
              className=" sm:w-40.5 w-35.5 sm:h-12 h-10 text-[16px] sm:text-[18px] text-[#5E13FD] font-medium border border-[#5E13FD]  rounded-xl flex items-center justify-center "
            >
              {" "}
              Join a Session
            </Link>
          </div>
        </motion.div>
        {/* Right hero section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "linear" }}
          viewport={{ once: true }}
          className="flex flex-1 items-center justify-center md:pb-0 pb-10 z-20"
        >
          {/* Main container (acts as the positioning canvas) */}
          <section className="sm:w-[432px] w-[350px] sm:h-[418px] h-[350px] flex flex-wrap relative">

            {/* Outer circular border (background ring) */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 sm:w-[432px] w-[350px] sm:h-[418px] h-[350px] border border-[#FFFFFF1A] rounded-full" />

            {/* Blurred glow effect at the center */}
            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <CircularBlur />
            </span>

            {/* Top floating icons */}
            <span className="absolute top-5 left-5">
              <FaceBookIcon />
            </span>
            <span className="absolute top-5 right-5">
              <WhatsappIcon />
            </span>

            {/* Inner circular container (main hub) */}
            <div className="absolute inset-0 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#FFFFFF1A] border border-[#FFFFFF1A] rounded-full">

              {/* Relative wrapper for positioning inner icons */}
              <section className="relative h-full w-full">

                {/* Top icon (Instagram) */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <InstagramIcon />
                </span>

                {/* Left icon (Apple Music) */}
                <span className="absolute top-1/2 -left-10 -translate-y-1/2">
                  <AppleMusicIcon />
                </span>

                {/* Center logo (main focus) */}
                <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 border-2 border-[#5E13FD] rounded-full p-2 mr-2 flex items-center justify-center">
                  <img src="/logo.png" alt="" className="w-8 h-8 object-cover" />
                </div>

                {/* Right icon (X / Twitter) */}
                <span className="absolute top-1/2 -right-10 -translate-y-1/2">
                  <XIcon />
                </span>

                {/* Bottom icon (Snapchat) */}
                <span className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                  <SnapchatIcon />
                </span>
              </section>
            </div>

            {/* Bottom floating icons */}
            <span className="absolute bottom-5 left-5">
              <TikTokIcon />
            </span>
            <span className="absolute bottom-5 right-5">
              <YouTubeIcon />
            </span>

          </section>
        </motion.div>
      </section>
    </div>
  );
}

export default Hero;
