import {
    collection,
    doc,
    updateDoc,
    increment,
    writeBatch,
    addDoc,
    serverTimestamp,
    getDoc,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { markLinkVisited } from '@/utils/logics/sessions'
import toast from 'react-hot-toast'

// GLOBAL LOADING STATE
export const awardingState = {
    loadingId: null as string | null,
}

//  VISIT LINK 
export const visitLink = async (participantId: string) => {
    try {
        await markLinkVisited(participantId)

        //  OPTIONAL: you can log this if needed later

    } catch (err) {
        console.error(err)
    }
}

//  MARK COMPLETED 
export const markParticipantCompleted = async (participantId: string) => {
    try {
        const ref = doc(db, 'participants', participantId)

        await updateDoc(ref, { completed: true })

        //  fetch participant to get userId
        const snap = await getDoc(ref)
        if (snap.exists()) {
            const data = snap.data()

            await addDoc(collection(db, 'history'), {
                userId: data.userId,
                type: 'activity',
                title: 'Session Completed',
                description: 'You marked your session as completed',
                value: '+0 XP',
                seen: false,
                createdAt: serverTimestamp(),
            })
        }

        toast.success('Session marked as completed ')
    } catch (err) {
        console.error(err)
        toast.error('Failed to mark session as completed')
    }
}

//  AWARD POINTS 
export const awardParticipantPoints = async (
    participantId: string,
    userId: string,
    points: number
) => {
    try {
        awardingState.loadingId = participantId

        const batch = writeBatch(db)

        const participantRef = doc(db, 'participants', participantId)
        const userRef = doc(db, 'users', userId)

        batch.update(participantRef, {
            approvedByHost: true,
            pointsAwarded: points,
            awardStatus: points > 0 ? 'awarded' : 'deducted',
        })

        batch.update(userRef, {
            trustPoints: increment(points),
        })

        await batch.commit()

        //  history log (standardized)
        await addDoc(collection(db, 'history'), {
            userId,
            type: 'activity',
            title: points > 0 ? 'Points Earned' : 'Points Deducted',
            description:
                points > 0
                    ? 'You were rewarded for successfully completing a session'
                    : 'Points were deducted due to incomplete engagement',
            value: `${points > 0 ? '+' : ''}${points} XP`,
            seen: false,
            createdAt: serverTimestamp(),
        })

        toast.success(
            points > 0
                ? `+${points} points awarded`
                : `${points} points deducted`
        )
    } catch (error) {
        console.error(error)
        toast.error('Failed to update points')
    } finally {
        awardingState.loadingId = null
    }
}

// COMPLETE SESSION
export const completeSession = async (sessionId: string) => {
    try {
        const ref = doc(db, 'sessions', sessionId)

        //  get session first (for userId)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
            throw new Error('Session not found')
        }

        const session = snap.data()

        await updateDoc(ref, {
            status: 'Finished',
            finishedAt: new Date(),
        })

        //  history log
        await addDoc(collection(db, 'history'), {
            userId: session.userId,
            type: 'activity',
            title: 'Session Finished',
            description: 'You successfully completed your session',
            value: '+0 XP',
            seen: false,
            createdAt: serverTimestamp(),
        })

        toast.success('Session marked as finished')
    } catch (err) {
        console.error(err)
        toast.error('Failed to finish session')
    }
}