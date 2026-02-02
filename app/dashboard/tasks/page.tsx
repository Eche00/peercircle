"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  AssignmentOutlined,
  CheckCircleOutline,
  TimerOutlined,
  StarsOutlined,
  Instagram,
  Twitter,
  Facebook,
  LinkedIn,
  ArrowForwardIos,
  Celebration,
} from "@mui/icons-material";

interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  platform: "Instagram" | "Twitter" | "Facebook" | "LinkedIn" | "General";
  status: "pending" | "completed";
  icon: React.ReactNode;
}

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Follow @creative_mind on Instagram",
    description: "Support a fellow creator by following their journey.",
    points: 50,
    platform: "Instagram",
    status: "pending",
    icon: <Instagram className="text-pink-500" />,
  },
  {
    id: "2",
    title: "Retweet PeerCircle Announcement",
    description: "Help spread the word about our community growth.",
    points: 30,
    platform: "Twitter",
    status: "pending",
    icon: <Twitter className="text-blue-400" />,
  },
  {
    id: "3",
    title: "Like 3 posts from #PeerCommunity",
    description: "Engage with the latest updates from the community.",
    points: 40,
    platform: "General",
    status: "pending",
    icon: <AssignmentOutlined className="text-[#8F4AE3]" />,
  },
  {
    id: "4",
    title: "Share your milestone on LinkedIn",
    description: "Let your professional network know about your growth.",
    points: 60,
    platform: "LinkedIn",
    status: "completed",
    icon: <LinkedIn className="text-blue-700" />,
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const totalPoints = tasks
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + t.points, 0);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "completed" ? "pending" : "completed" }
          : t,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Daily Tasks</h1>
          <p className="text-gray-400">
            Complete tasks to earn points and grow your circle.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#212329] p-4 rounded-2xl border border-gray-800 shadow-lg">
          <div className="flex items-center gap-3 pr-4 border-r border-gray-700">
            <div className="w-10 h-10 bg-[#8F4AE3]/10 rounded-xl flex items-center justify-center text-[#8F4AE3]">
              <StarsOutlined />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Total Points
              </p>
              <p className="text-xl font-bold text-white">
                {totalPoints}{" "}
                <span className="text-[#8F4AE3] text-sm font-normal">pts</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
              <CheckCircleOutline />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Completed
              </p>
              <p className="text-xl font-bold text-white">
                {completedCount}/{tasks.length}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar Container */}
      <div className="w-full bg-[#212329] p-6 rounded-2xl border border-gray-800 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-400">
            Daily Progress
          </span>
          <span className="text-sm font-bold text-[#8F4AE3]">
            {Math.round((completedCount / tasks.length) * 100)}%
          </span>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(completedCount / tasks.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-[#8F4AE3] to-[#a855f7] rounded-full"
          />
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <TimerOutlined fontSize="small" />
          <span>Next tasks refresh in 14 hours 22 minutes</span>
        </div>
      </div>

      {/* Task List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative bg-[#212329] p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
              task.status === "completed"
                ? "border-green-500/30 opacity-80"
                : "border-gray-800 hover:border-[#8F4AE3]/50 hover:shadow-xl hover:shadow-[#8F4AE3]/5"
            }`}
          >
            {/* Task Icon */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-inner ${
                task.status === "completed"
                  ? "bg-green-500/10"
                  : "bg-gray-800/50"
              }`}
            >
              {task.icon}
            </div>

            {/* Task Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8F4AE3] bg-[#8F4AE3]/10 px-2 py-0.5 rounded-md">
                  {task.platform}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    task.status === "completed"
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {task.status === "completed" ? "Done" : "XP " + task.points}
                </span>
              </div>
              <h3
                className={`text-lg font-bold truncate ${task.status === "completed" ? "text-gray-500 line-through" : "text-white"}`}
              >
                {task.title}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {task.description}
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => toggleTask(task.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                task.status === "completed"
                  ? "bg-green-500 text-white"
                  : "bg-[#8F4AE3]/10 text-[#8F4AE3] group-hover:bg-[#8F4AE3] group-hover:text-white"
              }`}
            >
              {task.status === "completed" ? (
                <CheckCircleOutline />
              ) : (
                <ArrowForwardIos fontSize="small" />
              )}
            </button>

            {/* Completed Overlay Hint */}
            {task.status === "completed" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
              >
                <CheckCircleOutline className="text-[14px]" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* "Better things" - Extra Stuffs */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-gradient-to-br from-[#8F4AE3]/10 to-transparent p-8 rounded-3xl border border-[#8F4AE3]/20 flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 blur-sm">
          <Celebration className="text-[120px] text-[#8F4AE3]" />
        </div>

        <div className="shrink-0 w-24 h-24 bg-[#8F4AE3] rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10">
          <Celebration className="text-[48px]" />
        </div>

        <div className="flex-1 text-center md:text-start relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Streaks & Milestones
          </h2>
          <p className="text-gray-400 mb-4 max-w-lg">
            You've completed tasks for 3 consecutive days! Reach a 7-day streak
            to unlock a bonus multiplier for all shared XP.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <div
                key={day}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border ${
                  day <= 3
                    ? "bg-[#8F4AE3] border-[#8F4AE3] text-white"
                    : "bg-[#191A1E] border-gray-800 text-gray-600"
                }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
