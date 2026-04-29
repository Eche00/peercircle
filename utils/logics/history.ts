import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    doc,
    updateDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export interface HistoryItem {
    id: string;
    type: "points" | "activity" | "milestone";
    title: string;
    description: string;
    date: string;
    time: string;
    value?: string;
    icon: "wallet" | "rocket" | "group" | "task";
    color: string;
    seen: boolean;
}

// ICON MAPPER (NOW STRING BASED)
const getIcon = (type: string): HistoryItem["icon"] => {
    switch (type) {
        case "points":
            return "wallet";
        case "milestone":
            return "rocket";
        case "activity":
        default:
            return "group";
    }
};

const getColor = (type: string) => {
    switch (type) {
        case "points":
            return "text-green-500";
        case "milestone":
            return "text-[#5E13FD]";
        default:
            return "text-blue-500";
    }
};

// format date
const formatDate = (timestamp: any) => {
    if (!timestamp) return { date: "", time: "" };

    const d = timestamp.toDate();
    const today = new Date();

    const isToday = d.toDateString() === today.toDateString();

    const date = isToday
        ? "Today"
        : d.toLocaleDateString(undefined, { day: "numeric", month: "short" });

    const time = d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
    });

    return { date, time };
};

// MAIN HOOK
export const useUserHistory = () => {
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribeSnapshot: (() => void) | undefined;

        const unsubAuth = onAuthStateChanged(auth, (user) => {
            // cleanup previous listener when auth changes
            if (unsubscribeSnapshot) {
                unsubscribeSnapshot();
                unsubscribeSnapshot = undefined;
            }

            if (!user) {
                setHistory([]);
                setLoading(false);
                return;
            }

            const q = query(
                collection(db, "history"),
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );

            unsubscribeSnapshot = onSnapshot(
                q,
                (snapshot) => {
                    const data: HistoryItem[] = snapshot.docs.map((docSnap) => {
                        const d = docSnap.data();
                        const { date, time } = formatDate(d.createdAt);

                        return {
                            id: docSnap.id,
                            type: d.type,
                            title: d.title,
                            description: d.description,
                            value: d.value,
                            date,
                            time,
                            icon: getIcon(d.type),
                            color: getColor(d.type),
                            seen: d.seen ?? false,
                        };
                    });

                    setHistory(data);
                    setLoading(false);
                },
                (error) => {
                    console.error("History snapshot error:", error);
                    setLoading(false);
                }
            );
        });

        return () => {
            unsubAuth();
            if (unsubscribeSnapshot) unsubscribeSnapshot();
        };
    }, []);

    return { history, loading };
};

// mark as seen
export const markHistoryAsSeen = async (id: string) => {
    const ref = doc(db, "history", id);
    await updateDoc(ref, { seen: true });
};