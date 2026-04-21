'use client'
import { useState, useEffect, useCallback } from 'react'
import { db, auth } from '@/lib/firebase'
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    getDoc,
    increment,
    writeBatch,
    where,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useUserInfo } from './userinfo'
import { createHistoryEntry } from './history'

// TYPES
export type Visibility = 'public' | 'private'

export interface Session {
    id: string
    title: string
    service: string
    timer: number
    maxParticipants: number
    visibility: Visibility
    password: string | null
    rules: string[]
    hostId: string
    hostName: string
    joined: number
    status: string
    createdAt: any
    countdownStartedAt?: any
    countdownDuration?: number
}

export interface SessionFormState {
    title: string
    service: string
    timer: number
    maxParticipants: number
    visibility: Visibility
    password: string
    ruleInput: string
    rules: string[]
}

interface CreateSessionParams {
    title: string
    service: string
    timer: number
    maxParticipants: number
    visibility: Visibility
    password?: string
    rules: string[]
    link: string
}


//  CREATE SESSION 

const createSessionDB = async ({
    title,
    service,
    timer,
    maxParticipants,
    visibility,
    password,
    rules,
    link,
    setLoading,
}: CreateSessionParams & { setLoading: (val: boolean) => void }) => {
    setLoading(true)
    if (!title || !service || !timer || !maxParticipants || !visibility || !link) {
        if (!title) toast.error("Title is required.")
        if (!service) toast.error("Service is required.")
        if (!timer) toast.error("Timer is required.")
        if (!maxParticipants) toast.error("Max participants is required.")
        if (!visibility) toast.error("Visibility is required.")
        if (!link) toast.error("Link is required.")

        return
    }

    const loadingToast = toast.loading('Creating session...')

    try {
        const currentUser = auth.currentUser
        if (!currentUser) throw new Error('User must be authenticated')

        const hostId = currentUser.uid
        const hostName =
            currentUser.displayName?.split(' ')[0] || 'Creator'

        const batch = writeBatch(db)
        const createSessionRef = doc(collection(db, 'sessions'))

        const durationMs = timer * 60 * 1000

        batch.set(createSessionRef, {
            title,
            service,
            timer,
            maxParticipants,
            visibility,
            password: visibility === 'private' ? password : null,
            rules,
            hostId,
            hostName,
            joined: 1,
            status: 'waiting',
            createdAt: serverTimestamp(),
            countdownDuration: durationMs,
            countdownStartedAt: serverTimestamp(),
        })

        const participantRef = doc(
            collection(db, 'participants'),
            `${createSessionRef.id}_${hostId}`
        )

        batch.set(participantRef, {
            sessionId: createSessionRef.id,
            userId: hostId,
            userName: hostName,
            isHost: true,
            link,
            joinedAt: serverTimestamp(),

            /*  VISIT TRACKING */
            visitedLinks: [],
            completed: false,
            approvedByHost: false,
        })

        await batch.commit()

        toast.success('Session created successfully', {
            id: loadingToast,
        })
        await createHistoryEntry({
            userId: hostId,
            title: 'Session Created',
            description: `You created "${title}" session`,
        })
        return createSessionRef.id
    } catch (error: any) {
        toast.error(
            error.message || 'Failed to create session.',
            { id: loadingToast }
        )
        throw error
    } finally {
        setLoading(false)
    }
}

// JOIN SESSION

export const joinSession = async ({
    session,
    link,
    enteredPassword,
    setLoading
}: {
    session: Session
    link: string
    enteredPassword?: string
    setLoading: (val: boolean) => void
}) => {
    setLoading(true)
    if (!link.trim()) {
        toast.error('Please provide your link.')
        throw new Error()
    }

    const currentUser = auth.currentUser
    if (!currentUser)
        return toast.error('You must be logged in.')

    const loadingToast = toast.loading('Joining session...')

    try {
        const sessionRef = doc(db, 'sessions', session.id)
        const sessionSnap = await getDoc(sessionRef)

        if (!sessionSnap.exists())
            throw new Error('Session does not exist.')

        const sessionData =
            sessionSnap.data() as Session

        if (
            sessionData.joined >=
            sessionData.maxParticipants
        ) {
            throw new Error('Session is full.')
        }

        if (
            sessionData.visibility === 'private' &&
            sessionData.password !== enteredPassword
        ) {
            throw new Error('Invalid session password.')
        }

        const participantId =
            `${session.id}_${currentUser.uid}`

        const participantRef =
            doc(db, 'participants', participantId)

        const participantSnap =
            await getDoc(participantRef)

        if (participantSnap.exists())
            throw new Error(
                'You already joined this session.'
            )

        const batch = writeBatch(db)

        batch.set(participantRef, {
            sessionId: session.id,
            userId: currentUser.uid,
            userName:
                currentUser.displayName?.split(' ')[0] ||
                'User',
            isHost: false,
            link,
            joinedAt: serverTimestamp(),

            visitedLinks: [],
            completed: false,
            approvedByHost: false,
        })

        batch.update(sessionRef, {
            joined: increment(1),
            status:
                sessionData.joined + 1 >=
                    sessionData.maxParticipants
                    ? 'In Progress'
                    : sessionData.status,
        })

        await batch.commit()
        await createHistoryEntry({
            userId: currentUser.uid,
            title: 'Joined Session',
            description: `You joined "${sessionData.title}"`,
        })
        toast.success('Successfully joined session!', {
            id: loadingToast,
        })
    } catch (error: any) {
        toast.error(
            error.message ||
            'Failed to join session.',
            { id: loadingToast }
        )
        throw error
    } finally {
        setLoading(false)
    }
}


//  MARK LINK VISITED 

export const markLinkVisited = async (
    participantId: string
) => {
    const currentUser = auth.currentUser
    if (!currentUser) return

    const participantRef =
        doc(db, 'participants', participantId)

    await updateDoc(participantRef, {
        visitedLinks: arrayUnion(
            currentUser.uid
        ),
    })
}


// HOST APPROVAL

export const approveParticipant = async (
    sessionId: string,
    userId: string
) => {

    const batch = writeBatch(db)

    const participantRef = doc(
        db,
        'participants',
        `${sessionId}_${userId}`
    )

    const userRef = doc(db, 'users', userId)

    batch.update(participantRef, {
        approvedByHost: true,
    })

    batch.update(userRef, {
        trustPoints: increment(1),
    })

    await batch.commit()
}


// HOOK

export function useSessionForm() {
    const currentUser = useUserInfo()

    // FORM STATE (CREATE SESSION)

    const [title, setTitle] = useState('')
    const [service, setService] = useState('Followers')
    const [maxParticipants, setMaxParticipants] = useState(20)
    const [timer, setTimer] = useState(5)
    const [visibility, setVisibility] = useState<Visibility>('public')
    const [password, setPassword] = useState('')
    const [ruleInput, setRuleInput] = useState('')
    const [rules, setRules] = useState<string[]>([])
    const [linkInput, setLinkInput] = useState('')

    // SESSIONS DATA

    const [sessions, setSessions] = useState<Session[]>([])
    const [selectedSession, setSelectedSession] = useState<Session | null>(null)
    const [joinedIds, setJoinedIds] = useState<string[]>([])

    // FILTERS / SEARCH

    const [search, setSearch] = useState('')
    const [status, setStatus] = useState<string>('')

    // UI STATE (MODALS)

    const [createModal, setCreateModal] = useState(false)
    const [joinModal, setJoinModal] = useState(false)
    const [detailsModal, setDetailsModal] = useState(false)
    const [link, setLink] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')

    // LOADING STATES

    const [loading, setLoading] = useState(false)
    const [sessionLoading, setSessionLoading] = useState(false)
    const [joinedSessionLoading, setJoinedSessionLoading] = useState(false)
    const [hostedSessionLoading, setHostedSessionLoading] = useState(false)

    const generatePassword = (length = 20) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < length; i++)
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        return result
    }


    // Fetch all sessions

    useEffect(() => {
        // Start loading states
        setSessionLoading(true)
        setHostedSessionLoading(true)

        // Query sessions ordered by newest first
        const q = query(
            collection(db, 'sessions'),
            orderBy('createdAt', 'desc')
        )

        // Real-time listener
        const unsubscribe = onSnapshot(q, async (snapshot) => {
            const now = Date.now()
            const sessionList: Session[] = []

            // Loop through all session documents
            for (const docSnap of snapshot.docs) {
                const data = docSnap.data() as Omit<Session, 'id'>

                // Construct session object
                const session: Session = {
                    id: docSnap.id,
                    ...data
                }


                // Auto-update session status

                if (
                    session.status === 'waiting' &&
                    session.countdownStartedAt &&
                    session.countdownDuration
                ) {
                    const startedAt = session.countdownStartedAt.toMillis()
                    const endsAt = startedAt + session.countdownDuration

                    if (now >= endsAt) {
                        await updateDoc(
                            doc(db, 'sessions', session.id),
                            { status: 'In Progress' }
                        )

                        session.status = 'In Progress'
                    }
                }

                sessionList.push(session)
            }


            // Filter joinable sessions

            const sessionJoinable = sessionList.filter(
                (s) => s.status === 'waiting'
            )

            // Update states
            setSessions(sessionList)

            // Stop loading states
            setSessionLoading(false)
            setHostedSessionLoading(false)
        })

        // Cleanup listener on unmount
        return () => unsubscribe()
    }, [currentUser])



    // Fetch sessions user joined

    useEffect(() => {
        if (!currentUser) return

        setJoinedSessionLoading(true)

        const q = query(
            collection(db, 'participants'),
            where('userId', '==', currentUser.uid)
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const joinedIds = snapshot.docs.map(
                (d) => d.data().sessionId
            )
            setJoinedIds(joinedIds)
            // store only IDs (no session state duplication)
            setJoinedSessionLoading(false)
        })

        return () => unsubscribe()
    }, [currentUser])


    // Handle private session password

    useEffect(() => {
        if (visibility === 'private') {
            // Generate password for private sessions
            setPassword(generatePassword())
        } else {
            // Clear password for public sessions
            setPassword('')
        }
    }, [visibility])


    const addRule = () => {
        if (!ruleInput.trim()) return
        setRules(prev => [...prev, ruleInput.trim()])
        setRuleInput('')
    }

    const removeRule = (index: number) =>
        setRules(prev => prev.filter((_, i) => i !== index))

    const copyPassword = async () => {
        if (!password) return
        await navigator.clipboard.writeText(password)
        toast.success('Password copied')
    }

    const resetForm = () => {
        setTitle('')
        setService('Followers')
        setTimer(5)
        setMaxParticipants(20)
        setVisibility('public')
        setPassword('')
        setRuleInput('')
        setRules([])
    }

    const handleCreate = useCallback(async () => {
        if (!currentUser) throw new Error()

        const id = await createSessionDB({
            title,
            service,
            timer,
            maxParticipants,
            visibility,
            password,
            rules,
            link: linkInput,
            setLoading
        })

        resetForm()
        return id
    }, [
        title,
        service,
        timer,
        maxParticipants,
        visibility,
        password,
        rules,
        linkInput,
        currentUser
    ])
    const statusOptions = [
        { label: "All Status", value: "" },
        { label: "Waiting", value: "waiting" },
        { label: "In Progress", value: "In Progress" },
        { label: "Finished", value: "Finished" },
    ];

    const serviceOptions = [
        { label: "All Services", value: "" },
        { label: "Followers", value: "Followers" },
        { label: "Likes", value: "Likes" },
        { label: "Comments", value: "Comments" },
    ];

    const applyFilters = (list: Session[]) => {
        return list.filter((s) => {
            const matchesSearch =
                s.title.toLowerCase().includes(search.toLowerCase()) ||
                s.id.toLowerCase().includes(search.toLowerCase()) ||
                s.hostName.toLowerCase().includes(search.toLowerCase())

            const matchesStatus = status ? s.status === status : true
            const matchesService = service ? s.service === service : true

            return matchesSearch && matchesStatus && matchesService
        })
    }
    const joinSessions = applyFilters(
        sessions.filter(s => s.status === "waiting")
    )

    const mySessions = applyFilters(
        sessions.filter(s => s.hostId === currentUser?.uid)
    )

    const joinedSessions = applyFilters(
        sessions.filter(s => joinedIds.includes(s.id))
    )

    const filteredJoinSessions = joinSessions.filter(s =>
        s.title.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase()) ||
        s.hostName.toLowerCase().includes(search.toLowerCase())
    )
    return {
        title, service, maxParticipants, timer, visibility,
        password, ruleInput, rules, currentUser,
        sessions, linkInput, mySessions,
        search, createModal, joinModal,
        detailsModal, selectedSession,
        link, enteredPassword, joinSessions: filteredJoinSessions,
        joinedSessions, loading,
        sessionLoading,
        hostedSessionLoading,
        joinedSessionLoading, status,

        setTitle, setService, setMaxParticipants, setTimer,
        setVisibility, setPassword, setRuleInput,
        setRules, setLinkInput, setSearch,
        setCreateModal, setJoinModal,
        setDetailsModal, setSelectedSession,
        setLink, setEnteredPassword, setLoading, setStatus,

        addRule, removeRule,
        copyPassword, resetForm,
        handleCreate,

        statusOptions,
        serviceOptions

    }
}
