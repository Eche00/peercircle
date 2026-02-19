import { db } from "../lib/firebase";
import { collection, doc, setDoc, writeBatch } from "firebase/firestore";

const COLLECTIONS = [
  "sessions",
  "participants",
  "users",
  "userActivity",
  "communities",
  "communityMembers",
  "dailyTasks",
];

const INITIAL_TASKS = [
  {
    title: "Follow @creative_mind on Instagram",
    description: "Support a fellow creator by following their journey.",
    points: 50,
    platform: "Instagram",
    status: "pending",
  },
  {
    title: "Retweet PeerCircle Announcement",
    description: "Help spread the word about our community growth.",
    points: 30,
    platform: "Twitter",
    status: "pending",
  },
  {
    title: "Like 3 posts from #PeerCommunity",
    description: "Engage with the latest updates from the community.",
    points: 40,
    platform: "General",
    status: "pending",
  },
  {
    title: "Share your milestone on LinkedIn",
    description: "Let your professional network know about your growth.",
    points: 60,
    platform: "LinkedIn",
    status: "completed",
  },
];

export const seedDatabase = async () => {
  console.log("Starting database seeding...");
  const batch = writeBatch(db);

  // Initialize other collections with a placeholder if needed,
  // but usually just creating the collection via task is enough.
  // For dailyTasks, we add the actual dummy data.

  for (const task of INITIAL_TASKS) {
    const taskRef = doc(collection(db, "dailyTasks"));
    batch.set(taskRef, task);
  }

  // To ensure collections exist in UI, we can add a placeholder to each
  for (const collectionName of COLLECTIONS) {
    if (collectionName !== "dailyTasks") {
      const placeholderRef = doc(
        collection(db, collectionName),
        "_placeholder",
      );
      batch.set(placeholderRef, { created: new Date().toISOString() });
    }
  }

  await batch.commit();
  console.log("Database seeded successfully!");
};
