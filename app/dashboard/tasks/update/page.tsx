"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Add,
  Delete,
  AssignmentOutlined,
  Instagram,
  Twitter,
  Facebook,
  LinkedIn,
  ArrowBack,
} from "@mui/icons-material";
import Link from "next/link";
import {
  fetchDailyTasks,
  addTask,
  deleteTask,
  Task,
} from "@/utils/taskActions";
import { toast } from "react-hot-toast";

const PLATFORMS = [
  "Instagram",
  "Twitter",
  "Facebook",
  "LinkedIn",
  "General",
] as const;

export default function TasksUpdatePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    points: 10,
    platform: "General",
  });

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchDailyTasks();
      setTasks(data);
    } catch (error) {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const id = await addTask(newTask);
      setTasks([...tasks, { ...newTask, id }]);
      setNewTask({
        title: "",
        description: "",
        points: 10,
        platform: "General",
      });
      toast.success("Task added successfully");
    } catch (error) {
      toast.error("Failed to add task");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
      toast.success("Task deleted");
    } catch (error) {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/tasks"
            className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white"
          >
            <ArrowBack />
          </Link>
          <h1 className="text-3xl font-bold text-white">Manage Daily Tasks</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Creation Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-5 bg-[#212329] p-8 rounded-3xl border border-white/5 shadow-2xl h-fit"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Add className="text-[#8F4AE3]" /> Create New Task
          </h2>
          <form onSubmit={handleAddTask} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">
                Title
              </label>
              <input
                required
                type="text"
                placeholder="e.g., Like recent post"
                className="bg-[#16181B] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">
                Platform
              </label>
              <select
                className="bg-[#16181B] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors appearance-none"
                value={newTask.platform}
                onChange={(e) =>
                  setNewTask({ ...newTask, platform: e.target.value as any })
                }
              >
                {PLATFORMS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">
                Points (XP)
              </label>
              <input
                required
                type="number"
                min="1"
                className="bg-[#16181B] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors"
                value={newTask.points}
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    points: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">
                Description
              </label>
              <textarea
                required
                placeholder="Briefly describe what needs to be done..."
                rows={3}
                className="bg-[#16181B] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8F4AE3] transition-colors resize-none"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </div>

            <button
              disabled={isAdding}
              type="submit"
              className="mt-4 bg-[#8F4AE3] hover:bg-[#7a3bc7] text-white py-4 rounded-xl font-bold transition-all shadow-xl shadow-[#8F4AE3]/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isAdding ? "Saving..." : "Create Task"} <Add fontSize="small" />
            </button>
          </form>
        </motion.div>

        {/* Existing Tasks List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-7 bg-[#212329] p-8 rounded-3xl border border-white/5 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <AssignmentOutlined className="text-[#8F4AE3]" /> Active Daily Tasks
          </h2>

          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#8F4AE3]"></div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-10 text-gray-500 italic">
                No tasks created yet.
              </div>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-[#16181B] p-5 rounded-2xl border border-gray-800 flex items-center justify-between group hover:border-[#8F4AE3]/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-xl">
                      {task.platform === "Instagram" && (
                        <Instagram className="text-pink-500" />
                      )}
                      {task.platform === "Twitter" && (
                        <Twitter className="text-blue-400" />
                      )}
                      {task.platform === "Facebook" && (
                        <Facebook className="text-blue-600" />
                      )}
                      {task.platform === "LinkedIn" && (
                        <LinkedIn className="text-blue-700" />
                      )}
                      {task.platform === "General" && (
                        <AssignmentOutlined className="text-[#8F4AE3]" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{task.title}</h4>
                      <p className="text-xs text-[#8F4AE3]/80 font-semibold">
                        {task.points} Points • {task.platform}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-gray-500 hover:text-red-500 bg-white/0 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
                  >
                    <Delete fontSize="small" />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
