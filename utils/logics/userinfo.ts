'use client'
import { useState, useEffect } from 'react'
import { auth, db } from '@/lib/firebase'
import { doc, getDoc, onSnapshot } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export interface UserInfo {
    uid: string
    displayName: string
    email: string | null
    firstName: string
    trustPoints: number
    createdAt?: any
}

// Hook to get the current authenticated user's info
export function useUserInfo(): UserInfo | null {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid)
                const snap = onSnapshot(userRef, (docSnap) => {
                    const data = docSnap.data()
                    setUserInfo({
                        uid: user.uid,
                        displayName: user.displayName || 'Creator',
                        firstName: user.displayName?.split(' ')[0] || 'Creator',
                        email: user.email,
                        trustPoints: data?.trustPoints || 0,
                        createdAt: data?.createdAt ? new Date(data.createdAt) : undefined,
                    })
                })
                return () => snap()
            } else {
                setUserInfo(null)
            }
        })
        return () => unsubscribe()
    }, [])

    return userInfo
}

// Separate function for sign-out
export const handleSignOut = async (router: ReturnType<typeof useRouter>) => {
    try {
        await signOut(auth)
        router.push("/auth/sign-in")
    } catch (error) {
        console.error("Error signing out:", error)
    }
}