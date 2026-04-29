import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import toast from "react-hot-toast";
import { completeUserTask, fetchDailyTasks, fetchUserCompletions, Task } from "../taskActions";


export const useTasks = () => {
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

    //  THIS WAS MISSING
    return {
        tasks,
        loading,
        completedCount,
        totalPoints,
        isCompleted,
        handleComplete,
    };
};