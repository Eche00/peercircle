import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  setDoc,
  increment,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  platform: "Instagram" | "Twitter" | "Facebook" | "LinkedIn" | "General";
  link: string;
  status?: "pending" | "completed";
}

const TASKS_COLLECTION = "dailyTasks";

/**
 * Fetches all global daily tasks.
 */
export const fetchDailyTasks = async (): Promise<Task[]> => {
  try {
    const tasksQuery = query(collection(db, TASKS_COLLECTION));

    const querySnapshot = await getDocs(tasksQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<Task, "id">),
    }));
  } catch (error) {
    console.error("Error fetching daily tasks:", error);
    toast.error("Failed to load tasks");
    throw error;
  }
};

/**
 * Adds a new global daily task.
 */
export const addTask = async (
  task: Omit<Task, "id">,
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, TASKS_COLLECTION),
      task,
    );

    toast.success("Task added successfully");

    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    toast.error("Failed to add task");
    throw error;
  }
};

/**
 * Deletes a global daily task.
 */
export const deleteTask = async (
  taskId: string,
): Promise<void> => {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));

    toast.success("Task deleted");
  } catch (error) {
    console.error("Error deleting task:", error);
    toast.error("Failed to delete task");
    throw error;
  }
};

/**
 * Records a task as completed for a specific user
 * and increments their trust points.
 */
export const completeUserTask = async (
  userId: string,
  task: Task,
): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];

  const completionId = `${task.id}_${today}`;

  const completionRef = doc(
    db,
    "users",
    userId,
    "completions",
    completionId,
  );

  try {
    // Check if already completed today
    const completionSnap = await getDoc(completionRef);

    if (completionSnap.exists()) {
      toast.error("Task already completed today");
      throw new Error("Task already completed today");
    }

    // Record completion
    await setDoc(completionRef, {
      taskId: task.id,
      completedAt: new Date().toISOString(),
      points: task.points,
      platform: task.platform,
      title: task.title,
      link: task.link,
    });

    // Increment user trust points
    const userRef = doc(db, "users", userId);

    await updateDoc(userRef, {
      trustPoints: increment(task.points),
    });

    toast.success(`+${task.points} XP earned`);
  } catch (error) {
    console.error("Error completing user task:", error);
    toast.error("Failed to complete task");
    throw error;
  }
};

/**
 * Fetches task completions for a user for today.
 */
export const fetchUserCompletions = async (
  userId: string,
): Promise<string[]> => {
  const today = new Date().toISOString().split("T")[0];

  const completionsRef = collection(
    db,
    "users",
    userId,
    "completions",
  );

  try {
    const snap = await getDocs(completionsRef);

    return snap.docs
      .map((d) => d.id)
      .filter((id) => id.endsWith(today))
      .map((id) => id.split("_")[0]);
  } catch (error) {
    console.error("Error fetching user completions:", error);
    toast.error("Failed to load completions");
    return [];
  }
};