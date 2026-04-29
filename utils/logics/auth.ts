import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import {
    addDoc,
    collection,
    serverTimestamp,
    setDoc,
    doc,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const router = useRouter();

    //  reusable history logger
    const logHistory = async ({
        userId,
        title,
        description,
        value = "+0 XP",
    }: {
        userId: string;
        title: string;
        description: string;
        value?: string;
    }) => {
        await addDoc(collection(db, "history"), {
            userId,
            type: "activity",
            title,
            description,
            seen: false,
            createdAt: serverTimestamp(),
        });
    };

    //  LOGIN
    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await logHistory({
                userId: user.uid,
                title: "Login Successful",
                description: "You logged into your account",
            });

            router.push("/dashboard");
        } catch (err: any) {
            console.error("Sign In Error:", err);

            if (err.code === "auth/invalid-credential") {
                setError("Invalid email or password.");
            } else {
                setError("Failed to sign in. Please try again.");
            }

            setIsLoading(false);
        }
    };

    //  SIGNUP
    const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const user = userCredential.user;

            await updateProfile(user, { displayName: fullName });

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                fullName,
                createdAt: new Date().toISOString(),
                trustPoints: 0,
                role: "user",
            });

            await logHistory({
                userId: user.uid,
                title: "Welcome 🎉",
                description: `Welcome to the platform, ${fullName}!`,
            });

            router.push("/dashboard");
        } catch (err: any) {
            console.error("Sign Up Error:", err);

            if (err.code === "auth/email-already-in-use") {
                setError("Email is already in use.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else {
                setError("Failed to create account. Please try again.");
            }

            setIsLoading(false);
        }
    };

    //  IMPORTANT: RETURN EVERYTHING
    return {
        isLoading,
        error,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleLogin,
        handleSignup,
    };
};