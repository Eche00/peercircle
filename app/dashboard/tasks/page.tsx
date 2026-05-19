"use client";

import React from "react";
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

import Link from "next/link";

import { useTasks } from "@/utils/logics/tasks";

import TasksSkeleton from "../ui/TasksSkeleton";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="text-pink-500" />,
  Twitter: <Twitter className="text-blue-400" />,
  Facebook: <Facebook className="text-blue-600" />,
  LinkedIn: <LinkedIn className="text-blue-700" />,
  General: <AssignmentOutlined className="text-[#5E13FD]" />,
};

export default function TasksPage() {
  const {
    tasks,
    loading,
    isCompleted,
    handleComplete,
    completedCount,
    totalPoints,
    allTasksCompleted,
    claimPoints,
    claiming,
    claimed
  } = useTasks();

  if (loading) {
    return <TasksSkeleton />;
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Daily Tasks
          </h1>

          <p className="text-gray-400">
            Complete tasks to earn points and grow your circle.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#212329] p-4 rounded-2xl border border-gray-800 shadow-lg">
          <div className="flex items-center gap-3 pr-4 border-r border-gray-700">
            <div className="w-10 h-10 bg-[#5E13FD]/10 rounded-xl flex items-center justify-center text-[#5E13FD]">
              <StarsOutlined />
            </div>

            <div>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">
                Total Earned Today
              </p>

              <p className="text-xl font-bold text-white">
                {totalPoints}{" "}
                <span className="text-[#5E13FD] text-sm font-normal">
                  pts
                </span>
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

      {/* Progress Bar */}
      <div className="w-full bg-[#212329] p-6 rounded-2xl border border-gray-800 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-400">
            Daily Progress
          </span>

          <span className="text-sm font-bold text-[#5E13FD]">
            {tasks.length > 0
              ? Math.round(
                (completedCount / tasks.length) * 100
              )
              : 0}
            %
          </span>
        </div>

        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${tasks.length > 0
                ? (completedCount / tasks.length) * 100
                : 0
                }%`,
            }}
            className="h-full bg-gradient-to-r from-[#5E13FD] to-[#a855f7] rounded-full"
          />
        </div>

        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <TimerOutlined fontSize="small" />

          <span>
            Earn points to increase your trust score!
          </span>
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
            className={`group relative bg-[#212329] p-6 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${isCompleted(task.id)
              ? "border-green-500/30 opacity-80"
              : "border-gray-800 hover:border-[#5E13FD]/50 hover:shadow-xl hover:shadow-[#5E13FD]/5"
              }`}
          >
            {/* Task Icon */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-inner ${isCompleted(task.id)
                ? "bg-green-500/10"
                : "bg-gray-800/50"
                }`}
            >
              {PLATFORM_ICONS[task.platform] ||
                PLATFORM_ICONS.General}
            </div>

            {/* Task Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#5E13FD] bg-[#5E13FD]/10 px-2 py-0.5 rounded-md">
                  {task.platform}
                </span>

                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${isCompleted(task.id)
                    ? "bg-green-500/10 text-green-500"
                    : "bg-yellow-500/10 text-yellow-500"
                    }`}
                >
                  {isCompleted(task.id)
                    ? "Done"
                    : "XP " + task.points}
                </span>
              </div>

              <h3
                className={`text-lg font-bold truncate ${isCompleted(task.id)
                  ? "text-gray-500 line-through"
                  : "text-white"
                  }`}
              >
                {task.title}
              </h3>

              <p className="text-sm text-gray-400 truncate">
                {task.description}
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleComplete(task)}
              disabled={isCompleted(task.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${isCompleted(task.id)
                ? "bg-green-500 text-white cursor-not-allowed"
                : "bg-[#5E13FD]/10 text-[#5E13FD] group-hover:bg-[#5E13FD] group-hover:text-white group-hover:shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]"
                }`}
            >
              {isCompleted(task.id) ? (
                <CheckCircleOutline />
              ) : (
                <ArrowForwardIos fontSize="small" />
              )}
            </button>

            {/* Completed Overlay */}
            {isCompleted(task.id) && (
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

      {/* Claim Button */}
      {/* Claim Button */}
      {allTasksCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <button
            onClick={claimPoints}
            disabled={claiming || claimed}
            className={`px-8 py-4 rounded-2xl font-bold shadow-2xl transition-all duration-300 ${claimed
              ? "bg-green-500 text-white cursor-not-allowed opacity-80"
              : "bg-gradient-to-r from-[#5E13FD] to-[#7c3aed] text-white hover:scale-[1.02]"
              }`}
          >
            {claiming
              ? "Claiming..."
              : claimed
                ? "Claimed"
                : `Claim ${totalPoints} XP`}
          </button>
        </motion.div>
      )}
      {/* Extra Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 bg-gradient-to-br from-[#5E13FD]/10 to-transparent p-8 rounded-3xl border border-[#5E13FD]/20 flex flex-col md:flex-row items-center gap-8 shadow-2xl overflow-hidden relative"
      >
        <div className="absolute top-0 right-0 p-4 opacity-10 blur-sm">
          <Celebration className="text-[120px] text-[#5E13FD]" />
        </div>

        <div className="shrink-0 w-24 h-24 bg-[#5E13FD] rounded-3xl flex items-center justify-center text-white shadow-2xl relative z-10">
          <Celebration className="text-[48px]" />
        </div>

        <div className="flex-1 text-center md:text-start relative z-10">
          <h2 className="text-2xl font-bold text-white mb-2">
            Points & Trust Score
          </h2>

          <p className="text-gray-400 mb-4 max-w-lg">
            Earn points every day to increase your trust
            score. High trust scores unlock exclusive
            privileges and higher engagement priority within
            your circle.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/dashboard/profile"
              className="px-6 py-2 bg-[#5E13FD] hover:bg-[#5E13FD]/80 text-white rounded-xl text-sm font-bold transition-all shadow-[inset_2px_4px_4px_0px_#FFFFFF4D,_inset_-2px_-4px_4px_0px_#00000033]"
            >
              View My Profile
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}