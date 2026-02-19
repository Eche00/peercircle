import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
} from "firebase/firestore";

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  platform: "Instagram" | "Twitter" | "Facebook" | "LinkedIn" | "General";
  status: "pending" | "completed";
}

const TASKS_COLLECTION = "dailyTasks";


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
 * Toggles a task's status in Firestore.
 */
export const toggleTaskStatus = async (
  taskId: string,
  currentStatus: "pending" | "completed",
): Promise<void> => {
  try {
    const taskDocRef = doc(db, TASKS_COLLECTION, taskId);
    const newStatus = currentStatus === "completed" ? "pending" : "completed";
    await updateDoc(taskDocRef, { status: newStatus });
  } catch (error) {
    console.error("Error toggling task status:", error);
    throw error;
  }
};
