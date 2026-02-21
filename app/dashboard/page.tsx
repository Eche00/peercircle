"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AssessmentOutlined,
  TaskAltOutlined,
  GroupsOutlined,
  TrendingUpOutlined,
  NotificationImportantOutlined,
  Bolt,
  PestControlRodent,
  ArrowForwardIos,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useSessionForm } from "@/utils/logics/sessions";
import SessionDetails from "./SessionDetails";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("Creator");
  const router = useRouter();
  const { sessions, selectedSession, setSelectedSession, detailsModal, setDetailsModal } = useSessionForm()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/auth/sign-in");
      } else {
        if (user.displayName) {
          setUserName(user.displayName.split(" ")[0]); // Use first name
        }
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const stats = [
    {
      label: "Active Sessions",
      value: "12",
      icon: <AssessmentOutlined />,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Tasks Pending",
      value: "3",
      icon: <TaskAltOutlined />,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      label: "Communities",
      value: "8",
      icon: <GroupsOutlined />,
      color: "text-[#8F4AE3]",
      bg: "bg-[#8F4AE3]/10",
    },
    {
      label: "Growth Score",
      value: "+24%",
      icon: <TrendingUpOutlined />,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8F4AE3]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-[#8F4AE3] to-[#a855f7] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
            <p className="text-white/80 max-w-md">
              Your peer circle is growing. You have 3 tasks waiting for your
              attention today.
            </p>
            <Link
              href="/dashboard/tasks"
              className="mt-6 inline-flex items-center gap-2 bg-white text-[#8F4AE3] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
            >
              <Bolt fontSize="small" /> View Daily Tasks
            </Link>
          </div>
          <div className="hidden lg:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <NotificationImportantOutlined
                style={{ fontSize: "120px" }}
                className="opacity-20"
              />
            </motion.div>
          </div>
        </div>
        {/* Abstract background elements */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-20%] left-[-5%] w-48 h-48 bg-black/10 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Top Grid: Trust Points & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* TRUST POINTS CARD (Merged from remote) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#8F4AE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-6 relative z-10">
            Trust Points
          </p>

          {/* PREMIUM CIRCLE BADGE */}
          <div className="relative w-32 h-32 flex items-center justify-center z-10">
            <svg className="absolute w-full h-full -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="transparent"
                stroke="rgba(143, 74, 227, 0.1)"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                fill="transparent"
                stroke="#8F4AE3"
                strokeWidth="8"
                strokeDasharray="377"
                strokeDashoffset="94"
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-3xl font-black text-white">750</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">
                Points
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#8F4AE3]/10 px-4 py-1.5 rounded-full relative z-10 border border-[#8F4AE3]/20">
            <p className="text-xs text-[#8F4AE3] font-bold">
              Tier: <span className="text-white">Platinum</span>
            </p>
          </div>
        </motion.div>

        {/* ACTIVITY FEED (Merged from remote) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-3 bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-3xl px-8 py-6 shadow-xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 uppercase tracking-wide">
              <div className="w-2 h-2 rounded-full bg-[#8F4AE3] animate-pulse"></div>
              Activity Feed
            </h2>
            <span className="text-xs text-gray-500 font-medium">
              Latest updates
            </span>
          </div>

          <div className="space-y-4">
            {[
              { event: "Earned Trust Points", date: "Feb 1, 2025" },
              { event: "Withdrawal Approved", date: "Feb 3, 2025" },
              { event: "Escrow Completed", date: "Jan 30, 2025" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform"
              >
                <span className="text-gray-300 group-hover:text-white transition-colors flex items-center gap-3 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#8F4AE3]"></div>
                  {item.event}
                </span>
                <span className="text-[#8F4AE3] text-xs font-bold bg-[#8F4AE3]/5 px-3 py-1 rounded-lg border border-[#8F4AE3]/10">
                  {item.date}
                </span>
              </div>
            ))}
          </div>

          <button className="mt-8 text-sm text-gray-500 hover:text-white transition-colors font-bold uppercase tracking-wider text-center">
            View Full History
          </button>
        </motion.div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#212329] p-6 rounded-2xl border border-gray-800 hover:border-[#8F4AE3]/50 transition-all duration-300"
          >
            <div
              className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}
            >
              {stat.icon}
            </div>
            <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tasks Widget */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-[#212329] rounded-3xl border border-gray-800 overflow-hidden shadow-xl"
        >
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/10">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TaskAltOutlined className="text-[#8F4AE3]" /> Quick Tasks
            </h2>
            <Link
              href="/dashboard/tasks"
              className="text-sm text-[#8F4AE3] hover:underline font-medium"
            >
              See all
            </Link>
          </div>
          <div className="p-2">
            {[
              {
                title: "Follow @tech_daily on IG",
                reward: "+50 XP",
                time: "2h left",
              },
              {
                title: "Share PeerCircle Discord link",
                reward: "+30 XP",
                time: "5h left",
              },
              {
                title: "Comment on 2 community posts",
                reward: "+40 XP",
                time: "10h left",
              },
            ].map((task, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#8F4AE3] group-hover:scale-150 transition-transform"></div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#8F4AE3] transition-colors">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-green-500 font-bold">
                        {task.reward}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <TrendingUpOutlined style={{ fontSize: "12px" }} />{" "}
                        {task.time}
                      </span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/dashboard/tasks"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <ArrowForwardIos style={{ fontSize: "14px" }} />
                </Link>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Steady Growth Analytics Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#212329] rounded-3xl border border-gray-800 p-8 flex flex-col items-center text-center justify-center relative overflow-hidden group shadow-xl"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUpOutlined style={{ fontSize: "100px" }} />
          </div>
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform shadow-inner">
            <TrendingUpOutlined style={{ fontSize: "40px" }} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Steady Growth</h3>
          <p className="text-gray-400 text-sm mb-6">
            You've reached <span className="text-white font-bold">85%</span> of
            your weekly engagement goal. Keep it up!
          </p>
          <div className="w-full bg-gray-800 h-2 rounded-full mb-8 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "85%" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-green-500 shadow-lg shadow-green-500/20"
            />
          </div>
          <button className="w-full py-4 rounded-xl border border-gray-700 text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-all uppercase tracking-widest text-xs">
            View Analytics
          </button>
        </motion.div>
      </div>

      {/* SESSIONS JOINED SECTION (Merged from remote) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <AssessmentOutlined className="text-[#8F4AE3]" />
            Sessions Joined
          </h2>
        </div>

        {sessions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessions.slice(0, 3).map((session, i) => (
              <div
                key={session.id}
                className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-2xl p-5 shadow-lg flex flex-col justify-between"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">{session.title}</p>

                  <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-400">
                    {session.service}
                  </span>
                </div>

                {/* SESSION META */}
                <p className="text-xs text-gray-400 mb-3">
                  Session ID: {session.id.slice(0, 8)}...
                </p>

                {/* STATUS */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-400">Status</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${session.status === 'Finished'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                  >
                    {session.status}
                  </span>
                </div>

                {/* PARTICIPANTS */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs text-gray-400">Participants</span>
                  <span className="text-sm font-medium text-gray-200">
                    {session.joined}/{session.maxParticipants}
                  </span>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between mt-auto">
                  <p className="text-xs text-gray-500">
                    Host: <span className="text-gray-300">{session.hostName}</span>
                  </p>

                  <button className="px-4 py-2 rounded-lg text-sm bg-[#0F1116] hover:border hover:border-[#8F4AE3] cursor-pointer" onClick={() => { setSelectedSession(session); setDetailsModal(true) }}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="bg-[#212329] border-2 border-dashed border-[#8F4AE3]/30 min-h-75 flex flex-col items-center justify-center rounded-[40px] mt-2 group hover:border-[#8F4AE3] transition-colors"
          >
            <div className="w-20 h-20 bg-[#8F4AE3]/10 rounded-full flex items-center justify-center text-[#8F4AE3] mb-6 group-hover:rotate-12 transition-transform">
              <PestControlRodent fontSize="large" />
            </div>
            <p className="text-lg text-white font-bold mb-2">
              Finding your flow?
            </p>
            <p className="text-sm text-gray-400 text-center max-w-xs mb-8">
              No active sessions found. Join a peer circle to start growing and
              earn Trust Points.
            </p>
            <Link
              href="/dashboard/sessions"
              className="py-4 px-10 rounded-2xl bg-[#8F4AE3] hover:bg-[#7a3bc7] text-white font-bold transition-all shadow-xl shadow-[#8F4AE3]/20"
            >
              Join First Session
            </Link>
          </motion.div>
        )}
      </motion.div>

      {/*  modal  */}
      <AnimatePresence>
        {detailsModal && selectedSession && <SessionDetails onClose={() => setDetailsModal(false)} session={selectedSession} />}
      </AnimatePresence>
    </div>
  );
}
