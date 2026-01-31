"use client";

import { Email, LocationOn, Send } from "@mui/icons-material";
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
    <div className="min-h-screen bg-[#191A1E] text-white py-20 px-4 sm:px-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-[32px] sm:text-[48px] font-bold mb-4">
            Get in <span className="text-[#8F4AE3]">Touch</span>
          </h1>
          <p className="text-gray-400 text-[16px] sm:text-[18px] max-w-2xl mx-auto">
            Have a question about PeerCircle? Need help with your account? We
            are here to help you grow.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col gap-8"
          >
            <div className="bg-[#212329] p-8 rounded-2xl border border-gray-800">
              <h3 className="text-[24px] font-semibold mb-6">
                Contact Information
              </h3>
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8F4AE3]/10 rounded-lg flex items-center justify-center text-[#8F4AE3] shrink-0">
                    <Email />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email Us</p>
                    <p className="text-gray-400">support@peercircle.com</p>
                    <p className="text-gray-400">partnerships@peercircle.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#8F4AE3]/10 rounded-lg flex items-center justify-center text-[#8F4AE3] shrink-0">
                    <LocationOn />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-400">Global Remote Team</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#8F4AE3] p-8 rounded-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-[24px] font-semibold mb-2">
                  Join the Community
                </h3>
                <p className="text-white/80 mb-6">
                  Connect with other creators in our public discord server.
                </p>
                <button className="bg-white text-[#8F4AE3] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Discord
                </button>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1"
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 bg-[#212329] p-8 sm:p-10 rounded-2xl border border-gray-800"
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
                  className="bg-[#191A1E] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors"
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
                  className="bg-[#191A1E] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors"
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
                  className="bg-[#191A1E] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors appearance-none"
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
                  rows={5}
                  className="bg-[#191A1E] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus !== "idle"}
                className={`
                                    mt-4 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300
                                    ${formStatus === "success" ? "bg-green-500 hover:bg-green-600" : "bg-[#8F4AE3] hover:bg-[#7a3bc7]"}
                                    disabled:opacity-70 disabled:cursor-not-allowed
                                `}
              >
                {formStatus === "idle" && (
                  <>
                    Send Message <Send className="text-[18px]" />
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
