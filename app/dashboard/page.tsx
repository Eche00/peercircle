"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AssessmentOutlined,
  TaskAltOutlined,
  GroupsOutlined,
  TrendingUpOutlined,
  NotificationImportantOutlined,
  Bolt,
} from "@mui/icons-material";
import Link from "next/link";

export default function DashboardPage() {
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
            <h1 className="text-3xl font-bold mb-2">Welcome back, Creator!</h1>
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

      {/* Stats Grid */}
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
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-[#212329] rounded-3xl border border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-800/20">
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
                  <div className="w-2 h-2 rounded-full bg-[#8F4AE3]"></div>
                  <div>
                    <p className="font-bold text-white group-hover:text-[#8F4AE3] transition-colors">
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-green-500 font-bold">
                        {task.reward}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <trendingUpOutlined style={{ fontSize: "12px" }} />{" "}
                        {task.time}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-500 hover:text-white transition-colors">
                  <ArrowForwardIos style={{ fontSize: "14px" }} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Growth Chart / Info Widget */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#212329] rounded-3xl border border-gray-800 p-6 flex flex-col items-center text-center justify-center relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUpOutlined style={{ fontSize: "100px" }} />
          </div>
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
            <trendingUpOutlined style={{ fontSize: "40px" }} />
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
              transition={{ duration: 1, delay: 0.8 }}
              className="h-full bg-green-500 shadow-lg shadow-green-500/20"
            />
          </div>
          <button className="w-full py-3 rounded-xl border border-gray-700 text-gray-400 font-bold hover:bg-white/5 hover:text-white transition-all">
            View Analytics
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// Minimal helpers
const trendingUpOutlined = () => <TrendingUpOutlined />;
const ArrowForwardIos = ({ style }: { style: any }) => (
  <Link href="/dashboard/tasks" legacyBehavior>
    <a style={style} className="cursor-pointer">
      →
    </a>
  </Link>
);
