"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HistoryOutlined,
  StarsOutlined,
  RocketLaunchOutlined,
  AccountBalanceWalletOutlined,
  AssignmentTurnedInLine,
  GroupsOutlined,
  ArrowForwardIos,
  FilterList,
  LocalActivity,
  TaskAlt,
} from "@mui/icons-material";

interface HistoryItem {
  id: string;
  type: "points" | "activity" | "milestone";
  title: string;
  description: string;
  date: string;
  time: string;
  value?: string;
  icon: React.ReactNode;
  color: string;
}

const HISTORY_DATA: HistoryItem[] = [
  {
    id: "1",
    type: "points",
    title: "Points Earned",
    description: 'Completed "Follow @creative_mind on Instagram"',
    date: "Today",
    time: "14:20",
    value: "+50 XP",
    icon: <AccountBalanceWalletOutlined />,
    color: "text-green-500",
  },
  {
    id: "2",
    type: "milestone",
    title: "New Milestone Reached",
    description: "7-Day Streak achieved! Bonus multiplier unlocked.",
    date: "Yesterday",
    time: "09:00",
    icon: <RocketLaunchOutlined />,
    color: "text-[#8F4AE3]",
  },
  {
    id: "3",
    type: "activity",
    title: "Session Joined",
    description: 'Joined the "Web3 Builders" peer circle session.',
    date: "Yesterday",
    time: "18:30",
    icon: <GroupsOutlined />,
    color: "text-blue-500",
  },
  {
    id: "4",
    type: "points",
    title: "Points Earned",
    description: "Shared PeerCircle milestone on LinkedIn",
    date: "2 days ago",
    time: "11:15",
    value: "+60 XP",
    icon: <AccountBalanceWalletOutlined />,
    color: "text-green-500",
  },
  {
    id: "5",
    type: "activity",
    title: "Task Completed",
    description: "Liked 3 posts from #PeerCommunity",
    date: "3 days ago",
    time: "16:45",
    icon: <TaskAlt />,
    color: "text-yellow-500",
  },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<
    "all" | "points" | "activity" | "milestone"
  >("all");

  const filteredHistory = HISTORY_DATA.filter(
    (item) => filter === "all" || item.type === filter,
  );

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <HistoryOutlined className="text-[#8F4AE3]" fontSize="large" />{" "}
            Activity History
          </h1>
          <p className="text-gray-400">
            Track your journey, achievements, and rewards.
          </p>
        </div>

        {/* Points Summary Card */}
        <div className="bg-[#212329] p-4 px-6 rounded-2xl border border-gray-800 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-[#8F4AE3]/10 rounded-xl flex items-center justify-center text-[#8F4AE3]">
            <StarsOutlined fontSize="large" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-black tracking-widest">
              Lifetime Earnings
            </p>
            <p className="text-2xl font-black text-white">
              8,450{" "}
              <span className="text-[#8F4AE3] text-sm font-normal">pts</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-[#212329] w-fit rounded-xl border border-gray-800">
        {(["all", "points", "activity", "milestone"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
              filter === tab
                ? "bg-[#8F4AE3] text-white shadow-lg shadow-[#8F4AE3]/20"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#8F4AE3] via-gray-800 to-transparent"></div>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative flex items-start gap-6 md:gap-10 pl-4 md:pl-6 group"
              >
                {/* Timeline Dot/Icon */}
                <div
                  className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 border-4 border-[#191A1E] transition-all duration-300 ${
                    item.type === "points"
                      ? "bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white"
                      : item.type === "milestone"
                        ? "bg-[#8F4AE3]/10 text-[#8F4AE3] group-hover:bg-[#8F4AE3] group-hover:text-white"
                        : "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                  } shadow-xl`}
                >
                  {item.icon}
                </div>

                {/* Content Card */}
                <div className="flex-1 bg-[#212329] p-5 md:p-6 rounded-3xl border border-gray-800 hover:border-[#8F4AE3]/30 transition-all duration-300 shadow-lg relative overflow-hidden">
                  {/* Glass reflection effect */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                            item.type === "points"
                              ? "bg-green-500/10 text-green-500"
                              : item.type === "milestone"
                                ? "bg-[#8F4AE3]/10 text-[#8F4AE3]"
                                : "bg-blue-500/10 text-blue-500"
                          }`}
                        >
                          {item.type}
                        </span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase">
                          {item.date} • {item.time}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {item.value && (
                      <div className="flex items-center shrink-0">
                        <span className="text-xl font-black text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                          {item.value}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Empty State */}
      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-[#212329] rounded-[40px] border border-dashed border-gray-800"
        >
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-600 mb-4">
            <LocalActivity fontSize="large" />
          </div>
          <h3 className="text-xl font-bold text-gray-400">No activity found</h3>
          <p className="text-sm text-gray-500 mt-1">
            Start engaging to see your history grow!
          </p>
        </motion.div>
      )}
    </div>
  );
}
