"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HistoryOutlined,
  StarsOutlined,
  RocketLaunchOutlined,
  TaskAlt,
  GroupsOutlined,
  LocalActivity,
  AccountBalanceWalletOutlined,
} from "@mui/icons-material";
import { useUserHistory } from "@/utils/logics/history";

type HistoryFilter = "all" | "points" | "activity" | "milestone";

const formatDateTime = (date: Date) => {
  return {
    date: date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };
};

export default function HistoryPage() {
  const [filter, setFilter] = useState<HistoryFilter>("all");
  const { items, loading, unreadCount } = useUserHistory();

  const filteredHistory = useMemo(
    () => items.filter((item) => filter === "all" || item.type === filter),
    [items, filter],
  );

  return (
    <div className="flex flex-col gap-8 pb-10">
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
            Track your actions and notifications in real time.
          </p>
        </div>

        <div className="bg-[#212329] p-4 px-6 rounded-2xl border border-gray-800 shadow-xl flex items-center gap-4">
          <div className="w-12 h-12 bg-[#5E13FD]/10 rounded-xl flex items-center justify-center text-[#5E13FD]">
            <StarsOutlined fontSize="large" />
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase font-black tracking-widest">
              Notifications
            </p>
            <p className="text-2xl font-black text-white">
              {unreadCount}
              <span className="text-[#5E13FD] text-sm font-normal ml-1">
                unread
              </span>
            </p>
          </div>
        </div>
      </motion.div>

      <div className="flex items-center gap-2 p-1 bg-[#212329] w-fit rounded-xl border border-gray-800">
        {(["all", "points", "activity", "milestone"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
              filter === tab
                ? "bg-[#5E13FD] text-white shadow-lg shadow-[#5E13FD]/20"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#5E13FD] via-gray-800 to-transparent"></div>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {!loading &&
              filteredHistory.map((item, index) => {
                const createdAtDate = item.createdAt?.toDate?.() || new Date();
                const { date, time } = formatDateTime(createdAtDate);
                const isPoints = item.type === "points";
                const isMilestone = item.type === "milestone";

                const icon = isPoints ? (
                  <AccountBalanceWalletOutlined />
                ) : isMilestone ? (
                  <RocketLaunchOutlined />
                ) : (
                  <GroupsOutlined />
                );

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="relative flex items-start gap-6 md:gap-10 pl-4 md:pl-6 group"
                  >
                    <div
                      className={`relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 border-4 border-[#191A1E] transition-all duration-300 shadow-xl ${
                        isPoints
                          ? "bg-green-500/10 text-green-500"
                          : isMilestone
                            ? "bg-[#5E13FD]/10 text-[#5E13FD]"
                            : "bg-blue-500/10 text-blue-500"
                      }`}
                    >
                      {icon}
                    </div>

                    <div
                      className={`flex-1 p-5 md:p-6 rounded-3xl border transition-all duration-300 shadow-lg relative overflow-hidden ${
                        item.read
                          ? "bg-[#212329] border-gray-800"
                          : "bg-[#262932] border-[#5E13FD]/40"
                      }`}
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${
                                isPoints
                                  ? "bg-green-500/10 text-green-500"
                                  : isMilestone
                                    ? "bg-[#5E13FD]/10 text-[#5E13FD]"
                                    : "bg-blue-500/10 text-blue-500"
                              }`}
                            >
                              {item.type}
                            </span>
                            {!item.read && (
                              <span className="text-[10px] font-bold uppercase bg-[#5E13FD]/20 text-[#c8b0ff] px-2 py-0.5 rounded-md">
                                unread
                              </span>
                            )}
                            <span className="text-[10px] text-gray-500 font-bold uppercase">
                              {date} • {time}
                            </span>
                          </div>
                          <h3
                            className={`text-lg mb-1 ${item.read ? "font-semibold text-gray-200" : "font-bold text-white"}`}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`text-sm leading-relaxed ${item.read ? "text-gray-500" : "text-gray-300"}`}
                          >
                            {item.description}
                          </p>
                        </div>

                        <div className="flex items-start shrink-0 gap-3">
                          {item.value && (
                            <span className="text-sm font-bold text-green-500">
                              {item.value}
                            </span>
                          )}
                          {item.read ? (
                            <TaskAlt className="text-gray-600" />
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#5E13FD] mt-2" />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>

      {!loading && filteredHistory.length === 0 && (
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
