import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  setDoc,
  increment,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  platform: "Instagram" | "Twitter" | "Facebook" | "LinkedIn" | "General";
  status?: "pending" | "completed"; // Local UI status
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
    throw error;
  }
};

/**
 * Adds a new global daily task.
 */
export const addTask = async (task: Omit<Task, "id">): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), task);
    return docRef.id;
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

/**
 * Deletes a global daily task.
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, TASKS_COLLECTION, taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

/**
 * Records a task as completed for a specific user and increments their points.
 */
export const completeUserTask = async (
  userId: string,
  task: Task,
): Promise<void> => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const completionId = `${task.id}_${today}`;
  const completionRef = doc(db, "users", userId, "completions", completionId);

  try {
    // 1. Check if already completed today
    const completionSnap = await getDoc(completionRef);
    if (completionSnap.exists()) {
      throw new Error("Task already completed today");
    }

    // 2. Record completion
    await setDoc(completionRef, {
      taskId: task.id,
      completedAt: new Date().toISOString(),
      points: task.points,
    });

    // 3. Increment User Trust Points
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      trustPoints: increment(task.points),
    });
  } catch (error) {
    console.error("Error completing user task:", error);
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
  const completionsRef = collection(db, "users", userId, "completions");
  // Simple way: check all docs and filter or use query if we store date specifically.
  // For now, let's just get the IDs that contain today's date in their key.
  try {
    const snap = await getDocs(completionsRef);
    return snap.docs
      .map((d) => d.id)
      .filter((id) => id.endsWith(today))
      .map((id) => id.split("_")[0]); // return taskId
  } catch (error) {
    console.error("Error fetching user completions:", error);
    return [];
  }
};
