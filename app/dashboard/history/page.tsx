"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HistoryOutlined,
  StarsOutlined,
  RocketLaunchOutlined,
  AccountBalanceWalletOutlined,
  GroupsOutlined,
  LocalActivity,
  TaskAlt,
  VisibilityOutlined,
  Article,
  QueryStats,
} from "@mui/icons-material";

import { useUserHistory, markHistoryAsSeen } from "@/utils/logics/history";

export default function HistoryPage() {
  const [filter, setFilter] = useState<
    "all" | "points" | "activity" | "milestone"
  >("all");

  const { history } = useUserHistory();

  const filteredHistory = history.filter(
    (item) => filter === "all" || item.type === filter
  );

  const iconMap = {
    wallet: <AccountBalanceWalletOutlined />,
    rocket: <RocketLaunchOutlined />,
    group: <GroupsOutlined />,
    task: <TaskAlt />,
  };

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
            <HistoryOutlined className="text-[#5E13FD]" fontSize="large" />
            Activity History
          </h1>
          <p className="text-gray-400">
            Track your journey, achievements, and rewards.
          </p>
        </div>

        <div className="bg-[#212329] p-3 px-4 rounded-xl border border-gray-800 shadow-md flex flex-wrap items-center sm:gap-4 gap-2 text-white">

          {/* Activities */}
          <div className="flex items-center justify-between gap-2 flex-1 min-w-[120px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">
                <Article className="text-blue-400 text-sm" />
              </div>
              <span className="text-xs text-gray-400">Act</span>
            </div>
            <span className="font-bold text-sm"> {history.filter((item) => item.seen).length}</span>
          </div>
          <hr className=' h-5 w-[0.1px] bg-gray-600 border-none ' />

          {/* New */}
          <div className="flex items-center justify-between gap-2 flex-1 min-w-[120px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#5E13FD]/10 flex items-center justify-center">
                <VisibilityOutlined className="text-[#5E13FD] text-sm" />
              </div>
              <span className="text-xs text-gray-400">New</span>
            </div>
            <span className="font-bold text-sm">
              {history.filter((item) => !item.seen).length}
            </span>
          </div>
          <hr className=' h-5 w-[0.1px] bg-gray-600 border-none' />

          {/* Total */}
          <div className="flex items-center justify-between gap-2 flex-1 min-w-[120px]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                <QueryStats className="text-green-400 text-sm" />
              </div>
              <span className="text-xs text-gray-400">Tot</span>
            </div>
            <span className="font-bold text-sm">{history.length}</span>
          </div>

        </div>
      </motion.div>

      {/* Filter */}
      <div className="flex items-center gap-2 p-1 bg-[#212329] w-fit rounded-xl border border-gray-800">
        {(["all", "points", "activity", "milestone"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`sm:px-6 px-2 py-2 rounded-lg text-sm font-bold capitalize transition-all ${filter === tab
              ? "bg-[#5E13FD] text-white shadow-lg shadow-[#5E13FD]/20"
              : "text-gray-500 hover:text-gray-300"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-1 md:left-3 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-[#5E13FD] via-gray-800 to-transparent"></div>

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

                {/* ICON + CLICK MARK AS SEEN */}
                <div

                  className={`cursor-pointer relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 border-4 border-[#191A1E] transition-all duration-300 ${item.seen
                    ? ""
                    : "ring-2 ring-[#5E13FD]/40 shadow-[0_0_20px_rgba(94,19,253,0.25)]"
                    } ${item.type === "points"
                      ? "bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white"
                      : item.type === "milestone"
                        ? "bg-[#5E13FD]/10 text-[#5E13FD] group-hover:bg-[#5E13FD] group-hover:text-white"
                        : "bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                    } shadow-xl`}
                >
                  {iconMap[item.icon]}
                </div>

                {/* CONTENT */}
                <div
                  onClick={() => markHistoryAsSeen(item.id)}
                  className={`cursor-pointer flex-1 p-5 md:p-6 rounded-3xl border transition-all duration-300 shadow-lg relative overflow-hidden ${item.seen
                    ? "bg-[#212329] border-gray-800"
                    : "bg-[#1b1c20] border-[#5E13FD]/40 shadow-[#5E13FD]/10"
                    }`}>
                  {!item.seen && (
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#5E13FD]" />
                  )}
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.type === "points"
                            ? "bg-green-500/10 text-green-500"
                            : item.type === "milestone"
                              ? "bg-[#5E13FD]/10 text-[#5E13FD]"
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
                        <span className="text-xl font-black text-green-500">
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

      {/* EMPTY STATE */}
      {filteredHistory.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 bg-[#212329] rounded-[40px] border border-dashed border-gray-800"
        >
          <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center text-gray-600 mb-4">
            <LocalActivity fontSize="large" />
          </div>
          <h3 className="text-xl font-bold text-gray-400">
            No activity found
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Start engaging to see your history grow!
          </p>
        </motion.div>
      )}
    </div>
  );
}