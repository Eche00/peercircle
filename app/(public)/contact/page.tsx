"use client";

import { ContactEmail, ContactLocation, ContactMessageIcon } from "@/components/ui/svg";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

function ContactPage() {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      // Reset after 3 seconds
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <div
      className="relative flex min-h-screen bg-cover bg-center overflow-x-hidden pb-10"
    >
      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[url('/bgoverlay.png')] bg-cover min-h-[100vh]" />

      <div className="w-full max-w-[90%] mx-auto z-20 relative">
        {/* header  */}
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className='soraFont sm:text-[48px] text-[18px] font-semibold text-[#F0F0F0] p-2.5  leading-[100%] text-center pt-10'>Get in  <span className='text-[#5E13FD]'> Touch</span></motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true }} className=' text-[16px]  text-[#FFFFFFB2]  leading-[100%] pb-10 text-center'>Have a question about PeerCircle? Need help with your account? We are here to help you grow.</motion.p>

        <div className="flex flex-col lg:flex-row justify-between gap-12 ">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col gap-8"
          >
            <div className=" rounded-2xl ">
              <h3 className="text-[24px] font-semibold mb-6">
                Contact Information
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#5E13FD] rounded-lg flex items-center justify-center text-white shrink-0">
                    <ContactEmail />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Us</p>
                    <p className="text-[#FFFFFF99] text-[16px] font-medium">support@peercircle.com</p>
                    <p className="text-[#FFFFFF99] text-[16px] font-medium">partnerships@peercircle.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-[#5E13FD] rounded-lg flex items-center justify-center text-white shrink-0">
                    <ContactLocation />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-400">Global Remote Team</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex -1bg-[#5E13FD]  w-full h-fit text-white relative overflow-hidden">
              <img src="/contactus.jpg" alt="" className="flex max-w-[546px] w-full h-[201px] rounded-xl object-cover" />
              <div className="absolute  top-1/2 -translate-y-1/2 left-5 z-10">
                <h3 className="text-[24px] font-semibold mb-2">
                  Join the Community
                </h3>
                <p className="text-[#FFFFFFB2] text-[16px] mb-6">
                  Connect with other creators in our public discord server.
                </p>
                <button className="sm:w-40.5 w-35.5 sm:h-12 h-10 flex items-center justify-center gap-2.5 text-white bg-[#5E13FD] active:scale-95 transition font-semibold py-3 rounded-xl shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033] cursor-pointer">
                  Join Discord
                </button>
              </div>
              <div className=" absolute top-0 left-0 w-full h-full bg-black/50" />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 "
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 bg-[#000000] p-8 rounded-xl max-w-[546px]"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="bg-[#FFFFFF1A] rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#5E13FD] transition-colors"
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="bg-[#FFFFFF1A] rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#5E13FD] transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-gray-300"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  className="bg-[#FFFFFF1A] rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#5E13FD] transition-colors appearance-none"
                >
                  <option>General Inquiry</option>
                  <option>Support Issue</option>
                  <option>Report a Bug</option>
                  <option>Partnership</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-gray-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="bg-[#FFFFFF1A] rounded-sm px-4 py-3 text-white focus:outline-none focus:border-[#5E13FD] transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus !== "idle"}
                className={`
                                     py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033] cursor-pointer
                                    ${formStatus === "success" ? "bg-[#5E13FD]/70" : " bg-[#5E13FD] hover:bg-[#5E13FD]/80 active:scale-95 transition"}
                                    disabled:opacity-70 disabled:cursor-not-allowed
                                `}
              >
                {formStatus === "idle" && (
                  <>
                    Send Message <ContactMessageIcon />
                  </>
                )}
                {formStatus === "submitting" && "Sending..."}
                {formStatus === "success" && "Message Sent!"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
