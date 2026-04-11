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
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useSessionForm } from "@/utils/logics/sessions";
import { fetchDailyTasks, Task } from "@/utils/taskActions";
import SessionDetails from "./modals/SessionDetails";
import SessionsSkeleton from "./ui/SessionsSkeleton";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("Creator");
  const [trustPoints, setTrustPoints] = useState<number>(0);
  const [dailyTasks, setDailyTasks] = useState<Task[]>([]);
  const router = useRouter();
  const {
    sessions,
    selectedSession,
    setSelectedSession,
    detailsModal,
    setDetailsModal, mySessions,
    hostedSessionLoading
  } = useSessionForm();

  useEffect(() => {
    let unsubscribeUser: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/auth/sign-in");
      } else {
        if (user.displayName) {
          setUserName(user.displayName.split(" ")[0]);
        }

        // Live trust points listener
        unsubscribeUser = onSnapshot(doc(db, "users", user.uid), (doc) => {
          if (doc.exists()) {
            setTrustPoints(doc.data().trustPoints || 0);
          }
        });

        // Fetch real daily tasks
        try {
          const tasks = await fetchDailyTasks();
          setDailyTasks(tasks.slice(0, 3));
        } catch (error) {
          console.error("Error fetching tasks for dashboard:", error);
        }

        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, [router]);
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [])
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
      value: dailyTasks.length.toString(),
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
        className="bg-gradient-to-r from-[#8F4AE3] to-[#a855f7] p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-white/80 max-w-md">
              Your peer circle is growing. You have {dailyTasks.length} tasks
              waiting for your attention today.
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
        {/* TRUST POINTS CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#212329] border border-gray-800 hover:border-[#8F4AE3] rounded-3xl p-8 shadow-xl flex flex-col items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#8F4AE3]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                strokeDashoffset={
                  377 - (377 * Math.min(trustPoints, 1000)) / 1000
                }
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-3xl font-black text-white">{trustPoints}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">
                Points
              </p>
            </div>
          </div>

          <div className="mt-6 bg-[#8F4AE3]/10 px-4 py-1.5 rounded-full relative z-10 border border-[#8F4AE3]/20">
            <p className="text-xs text-[#8F4AE3] font-bold">
              Tier:{" "}
              <span className="text-white">
                {trustPoints > 500 ? "Platinum" : "Newcomer"}
              </span>
            </p>
          </div>
        </motion.div>

        {/* ACTIVITY FEED */}
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
              { event: "Trust Points Updated", date: "Just now" },
              { event: "Daily Tasks Refreshed", date: "Today" },
              { event: "Session Attendance Verified", date: "Yesterday" },
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
            {dailyTasks.length === 0 ? (
              <div className="p-10 text-center text-gray-500 italic">
                No tasks available
              </div>
            ) : (
              dailyTasks.map((task, i) => (
                <div
                  key={task.id}
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
                          +{task.points} XP
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1 uppercase tracking-tighter">
                          {task.platform}
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
              ))
            )}
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

      {/* SESSIONS JOINED SECTION */}
      <>
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-medium">My Sessions</h2>
          </div>
          {hostedSessionLoading ? (
            <SessionsSkeleton />
          ) : (
            <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-lg overflow-x-auto">
              <h2 className="text-lg font-semibold mb-6">My Sessions</h2>

              <div className="hidden md:grid grid-cols-5 text-sm text-gray-400 pb-3 border-b border-gray-700">
                <span>Session</span>
                <span>Service</span>
                <span>Status</span>
                <span>Participants</span>
                <span className="text-right">Host</span>
              </div>

              <div className="divide-y divide-gray-800">
                {mySessions.length <= 0 ? <section className='flex flex-col items-center justify-center my-6'>
                  <div className="w-20 h-20 bg-[#8F4AE3]/10 rounded-full flex items-center justify-center text-[#8F4AE3] group-hover:rotate-12 transition-transform">
                    <PestControlRodent fontSize="large" />
                  </div>
                  <p className="text-sm text-gray-400 text-center max-w-xs mb-8">
                    You have no created session. Create a peer circle to start growing and
                    earn Trust Points.
                  </p></section> : mySessions.slice(0, 5).map((session) => {
                    const COUNTDOWN_DURATION =
                      session.countdownDuration || 2 * 60 * 1000

                    let countdownText = ''
                    let displayStatus = session.status

                    if (session.countdownStartedAt) {
                      const startedAt =
                        session.countdownStartedAt.toMillis()
                      const endsAt = startedAt + COUNTDOWN_DURATION
                      const remaining = endsAt - now

                      if (remaining <= 0) {
                        if (session.status !== 'Finished') {
                          displayStatus = 'In Progress'
                          countdownText = 'In Progress'
                        } else {
                          countdownText = 'Finished'
                        }
                      } else {
                        const minutes = Math.floor(remaining / 60000)
                        const seconds = Math.floor((remaining % 60000) / 1000)

                        countdownText = `Starts in ${minutes}:${seconds
                          .toString()
                          .padStart(2, '0')}`

                        displayStatus = 'waiting'
                      }
                    }

                    const statusColor =
                      displayStatus === 'Finished'
                        ? 'bg-green-500/20 text-green-400'
                        : displayStatus === 'In Progress'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-gray-500/20 text-gray-400'

                    return (
                      <div
                        key={session.id}
                        className="py-4 text-sm md:grid md:grid-cols-5 md:items-center"
                      >
                        {/* MOBILE */}
                        <div className="md:hidden flex flex-col gap-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium line-clamp-1">
                                {session.title}
                              </p>
                              <p className="text-xs text-gray-400">
                                ID: {session.id.slice(0, 8)}...
                              </p>
                            </div>

                            <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
                              {countdownText || displayStatus}
                            </span>
                          </div>

                          <div className="flex justify-between text-xs text-gray-400">
                            <span>{session.service}</span>
                            <span>
                              {session.joined}/{session.maxParticipants}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500">
                            Host: <span className="text-gray-300">{session.hostName}</span>
                          </p>


                        </div>

                        {/* DESKTOP */}
                        <div className="hidden md:contents">
                          <div>
                            <p className="font-medium line-clamp-1">
                              {session.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              ID: {session.id.slice(0, 8)}...
                            </p>
                          </div>

                          <span className="text-gray-300">
                            {session.service}
                          </span>

                          <span className={`w-fit px-3 py-1 rounded-full text-xs ${statusColor}`}>
                            {countdownText || displayStatus}
                          </span>

                          <span className="text-gray-300">
                            {session.joined}/{session.maxParticipants}
                          </span>
                          <span className="text-gray-300 text-right">
                            {session.hostName}
                          </span>


                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          )}
        </div>

      </>

      {/*  modal  */}
      <AnimatePresence>
        {detailsModal && selectedSession && (
          <SessionDetails
            onClose={() => setDetailsModal(false)}
            session={selectedSession}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
