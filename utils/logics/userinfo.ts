'use client'
import { useState, useEffect } from 'react'
import { auth } from '@/lib/firebase'

export interface UserInfo {
    uid: string
    displayName: string
    email: string | null
    firstName: string
}

/**
  Hook to get the current authenticated user's info
 */
export function useUserInfo(): UserInfo | null {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserInfo({
                    uid: user.uid,
                    displayName: user.displayName || 'Creator',
                    firstName: user.displayName?.split(' ')[0] || 'Creator',
                    email: user.email,
                })
            } else {
                setUserInfo(null)
            }
        })

        return () => unsubscribe()
    }, [])

    return userInfo
}