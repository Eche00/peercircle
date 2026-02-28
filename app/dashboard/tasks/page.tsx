"use client";

import React, { useState, useEffect } from "react";
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
import {
  fetchDailyTasks,
  completeUserTask,
  fetchUserCompletions,
  Task,
} from "@/utils/taskActions";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  Instagram: <Instagram className="text-pink-500" />,
  Twitter: <Twitter className="text-blue-400" />,
  Facebook: <Facebook className="text-blue-600" />,
  LinkedIn: <LinkedIn className="text-blue-700" />,
  General: <AssignmentOutlined className="text-[#8F4AE3]" />,
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [completions, setCompletions] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadData(currentUser.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadData = async (userId: string) => {
    try {
      const [allTasks, userCompletions] = await Promise.all([
        fetchDailyTasks(),
        fetchUserCompletions(userId),
      ]);
      setTasks(allTasks);
      setCompletions(userCompletions);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const isCompleted = (taskId: string) => completions.includes(taskId);

  const completedCount = tasks.filter((t) => isCompleted(t.id)).length;
  const totalPoints = tasks
    .filter((t) => isCompleted(t.id))
    .reduce((sum, t) => sum + t.points, 0);

  const handleComplete = async (task: Task) => {
    if (!user) {
      toast.error("Please sign in to complete tasks");
      return;
    }
    if (isCompleted(task.id)) {
      toast.error("Task already completed today");
      return;
    }

    try {
      await completeUserTask(user.uid, task);
      setCompletions((prev) => [...prev, task.id]);
      toast.success(`Task completed! +${task.points} XP`);
    } catch (error: any) {
      toast.error(error.message || "Failed to complete task");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#8F4AE3]"></div>
      </div>
    );
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
                Total Earned Today
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
            {tasks.length > 0
              ? Math.round((completedCount / tasks.length) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%`,
            }}
            className="h-full bg-gradient-to-r from-[#8F4AE3] to-[#a855f7] rounded-full"
          />
        </div>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <TimerOutlined fontSize="small" />
          <span>Earn points to increase your trust score!</span>
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
              isCompleted(task.id)
                ? "border-green-500/30 opacity-80"
                : "border-gray-800 hover:border-[#8F4AE3]/50 hover:shadow-xl hover:shadow-[#8F4AE3]/5"
            }`}
          >
            {/* Task Icon */}
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-inner ${
                isCompleted(task.id) ? "bg-green-500/10" : "bg-gray-800/50"
              }`}
            >
              {PLATFORM_ICONS[task.platform as any] || PLATFORM_ICONS.General}
            </div>

            {/* Task Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8F4AE3] bg-[#8F4AE3]/10 px-2 py-0.5 rounded-md">
                  {task.platform}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md ${
                    isCompleted(task.id)
                      ? "bg-green-500/10 text-green-500"
                      : "bg-yellow-500/10 text-yellow-500"
                  }`}
                >
                  {isCompleted(task.id) ? "Done" : "XP " + task.points}
                </span>
              </div>
              <h3
                className={`text-lg font-bold truncate ${isCompleted(task.id) ? "text-gray-500 line-through" : "text-white"}`}
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
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
                isCompleted(task.id)
                  ? "bg-green-500 text-white"
                  : "bg-[#8F4AE3]/10 text-[#8F4AE3] group-hover:bg-[#8F4AE3] group-hover:text-white"
              }`}
            >
              {isCompleted(task.id) ? (
                <CheckCircleOutline />
              ) : (
                <ArrowForwardIos fontSize="small" />
              )}
            </button>

            {/* Completed Overlay Hint */}
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

      {/* Extra Stuffs */}
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
            Points & Trust Score
          </h2>
          <p className="text-gray-400 mb-4 max-w-lg">
            Earn points every day to increase your trust score. High trust
            scores unlock exclusive privileges and higher engagement priority
            within your circle.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <Link
              href="/dashboard/profile"
              className="px-6 py-2 bg-[#8F4AE3] hover:bg-[#7a3bc7] text-white rounded-xl text-sm font-bold transition-all"
            >
              View My Profile
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
