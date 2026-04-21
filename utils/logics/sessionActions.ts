import {
    doc,
    updateDoc,
    increment,
    writeBatch,
} from 'firebase/firestore'

import { db } from '@/lib/firebase'
import { markLinkVisited } from '@/utils/logics/sessions'
import toast from 'react-hot-toast'
import { createHistoryEntry } from './history'

// GLOBAL LOADING STATE
export const awardingState = {
    loadingId: null as string | null,
}
//  VISIT LINK 
export const visitLink = async (participantId: string) => {
    try {
        await markLinkVisited(participantId)
        // toast.success('Link marked as visited')
    } catch (err) {
        console.error(err)
        // toast.error('Failed to mark link as visited')
    }
}

//  MARK COMPLETED 
export const markParticipantCompleted = async (participantId: string) => {
    try {
        const ref = doc(db, 'participants', participantId)

        await updateDoc(ref, { completed: true })

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

        await createHistoryEntry({
            userId,
            type: 'points',
            title: points > 0 ? 'Points Earned' : 'Points Deducted',
            description:
                points > 0
                    ? 'You were rewarded for completing a session'
                    : 'Points deducted due to incomplete engagement',
            value: `${points > 0 ? '+' : ''}${points} XP`,
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

        await updateDoc(ref, {
            status: 'Finished',
            finishedAt: new Date(),
        })

        toast.success('Session marked as finished')
    } catch (err) {
        console.error(err)
        toast.error('Failed to finish session')
    }
}
