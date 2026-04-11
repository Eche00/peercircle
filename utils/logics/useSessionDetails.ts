'use client'

import { useEffect, useState, useMemo } from 'react'

import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
} from 'firebase/firestore'
import { db, auth } from '@/lib/firebase'
import {
    visitLink,
    markParticipantCompleted,
    awardParticipantPoints,
} from './sessionActions'
import { Session } from '@/utils/logics/sessions'
import { completeSession } from './sessionActions'

export function useSessionDetails(session: Session) {
    const [participants, setParticipants] = useState<any[]>([])
    const allAwarded = useMemo(() => {
        return (
            participants.length > 0 &&
            participants.every((p) => p.approvedByHost)
        )
    }, [participants])
    const [now, setNow] = useState(Date.now())

    const currentUser = auth.currentUser

    /* clock */
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000)
        return () => clearInterval(interval)
    }, [])

    /* participants */
    useEffect(() => {
        if (!session?.id) return

        const q = query(
            collection(db, 'participants'),
            where('sessionId', '==', session.id)
        )

        const unsub = onSnapshot(q, (snap) => {
            setParticipants(
                snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        })

        return () => unsub()
    }, [session.id])

    /* derived values */
    const myParticipant = useMemo(
        () => participants.find((p) => p.userId === currentUser?.uid),
        [participants, currentUser]
    )

    const myVisitedCount = useMemo(
        () =>
            participants.filter((p) =>
                p.visitedLinks?.includes(currentUser?.uid || '')
            ).length,
        [participants, currentUser]
    )

    const completedAll = useMemo(() => {
        const total = participants.length - 1
        return total > 0 && myVisitedCount >= total
    }, [participants, myVisitedCount])
    const [liveSession, setLiveSession] = useState(session)
    useEffect(() => {
        if (!session?.id) return

        const ref = doc(db, 'sessions', session.id)

        const unsub = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                setLiveSession({
                    id: snap.id,
                    ...snap.data(),
                } as Session)
            }
        })

        return () => unsub()
    }, [session.id])
    return {
        session: liveSession,
        participants,
        now,
        currentUser,
        myParticipant,
        completedAll,
        allAwarded,

        visitLink,
        markParticipantCompleted,
        awardParticipantPoints,
        completeSession,
    }
}