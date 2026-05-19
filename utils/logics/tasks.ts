import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import toast from "react-hot-toast";

import {
    completeUserTask,
    fetchDailyTasks,
    fetchUserCompletions,
    Task,
} from "../taskActions";

import {
    addDoc,
    collection,
    doc,
    getDoc,
    increment,
    serverTimestamp,
    setDoc,
    updateDoc,
} from "firebase/firestore";

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<User | null>(null);
    const [completions, setCompletions] = useState<string[]>([]);

    const [claiming, setClaiming] = useState(false);
    const [claimed, setClaimed] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                loadData(currentUser.uid);
                checkIfClaimedToday(currentUser.uid);
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const today = new Date().toISOString().split("T")[0];

    const checkIfClaimedToday = async (userId: string) => {
        try {
            const claimRef = doc(db, "users", userId, "taskClaims", today);
            const snap = await getDoc(claimRef);

            setClaimed(snap.exists());
        } catch (error) {
            console.error("Failed to check claim:", error);
        }
    };

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

    const isCompleted = (taskId: string) =>
        completions.includes(taskId);

    const completedCount = tasks.filter((t) =>
        isCompleted(t.id)
    ).length;

    const totalPoints = tasks
        .filter((t) => isCompleted(t.id))
        .reduce((sum, t) => sum + t.points, 0);

    const allTasksCompleted =
        tasks.length > 0 && completedCount === tasks.length;

    const handleComplete = async (task: Task) => {
        if (!user) {
            toast.error("Please sign in to complete tasks");
            return;
        }

        if (isCompleted(task.id)) {
            toast.error("Task already completed today");
            return;
        }

        window.open(task.link, "_blank");

        toast.loading("Verifying task...", {
            id: task.id,
        });

        setTimeout(async () => {
            try {
                await completeUserTask(user.uid, task);

                setCompletions((prev) => [...prev, task.id]);

                toast.success(`Task completed! +${task.points} XP`, {
                    id: task.id,
                });
            } catch (error: any) {
                toast.error(error.message || "Failed to complete task", {
                    id: task.id,
                });
            }
        }, 3000);
    };

    const claimPoints = async () => {
        if (!user) {
            toast.error("Please sign in");
            return;
        }

        if (claiming || claimed) return;

        if (!allTasksCompleted) {
            toast.error("Complete all tasks before claiming");
            return;
        }

        try {
            setClaiming(true);

            const claimRef = doc(
                db,
                "users",
                user.uid,
                "taskClaims",
                today
            );

            const existing = await getDoc(claimRef);

            if (existing.exists()) {
                setClaimed(true);
                toast.error("You already claimed today's reward");
                return;
            }

            const userRef = doc(db, "users", user.uid);

            await updateDoc(userRef, {
                trustPoints: increment(totalPoints),
            });

            await setDoc(claimRef, {
                points: totalPoints,
                claimedAt: serverTimestamp(),
            });

            await addDoc(collection(db, "history"), {
                userId: user.uid,
                type: "activity",
                title: "Daily Task Reward",
                description:
                    "You claimed your daily task completion reward",
                value: `+${totalPoints} XP`,
                seen: false,
                createdAt: serverTimestamp(),
            });

            setClaimed(true);

            toast.success(`You claimed ${totalPoints} XP 🎉`);
        } catch (error) {
            console.error(error);
            toast.error("Failed to claim points");
        } finally {
            setClaiming(false);
        }
    };

    return {
        tasks,
        loading,
        completedCount,
        totalPoints,
        isCompleted,
        handleComplete,
        allTasksCompleted,
        claimPoints,
        claiming,
        claimed,
    };
};