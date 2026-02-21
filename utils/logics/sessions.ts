'use client'
import { useState, useEffect, useCallback } from 'react'
import { db, auth } from '@/lib/firebase'
import { collection, doc, onSnapshot, orderBy, query, serverTimestamp, getDoc, increment, writeBatch } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useUserInfo } from './userinfo'

// TYPES
export type Visibility = 'public' | 'private'

export interface Session {
    id: string
    title: string
    service: string
    maxParticipants: number
    visibility: Visibility
    password: string | null
    rules: string[]
    hostId: string
    hostName: string
    joined: number
    status: string
    createdAt: any
}

export interface SessionFormState {
    title: string
    service: string
    maxParticipants: number
    visibility: Visibility
    password: string
    ruleInput: string
    rules: string[]
}

interface CreateSessionParams {
    title: string
    service: string
    maxParticipants: number
    visibility: Visibility
    password?: string
    rules: string[]
    link: string
}

// CREATE SESSION FUNCTION
const createSessionDB = async ({
    title,
    service,
    maxParticipants,
    visibility,
    password,
    rules,
    link,
}: CreateSessionParams) => {
    if (!title || !service || !maxParticipants || !visibility || !link) { return toast.error('Please fill in all required fields.') }
    const loadingToast = toast.loading('Creating session...')
    try {

        const currentUser = auth.currentUser
        if (!currentUser) throw new Error('User must be authenticated to create a session.')

        const hostId = currentUser.uid
        const hostName = currentUser.displayName?.split(' ')[0] || 'Creator'

        const batch = writeBatch(db)
        const createSessionRef = doc(collection(db, 'sessions'))

        batch.set(createSessionRef, {
            title,
            service,
            maxParticipants,
            visibility,
            password: visibility === 'private' ? password : null,
            rules,
            hostId,
            hostName,
            joined: 1,
            status: 'waiting',
            createdAt: serverTimestamp(),
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
            link: link || null,
            joinedAt: serverTimestamp(),
        })

        await batch.commit()
<<<<<<< HEAD
        toast.success('Session created successfully', { id: loadingToast })
=======
        toast.success('Session created successfully ', { id: loadingToast })
>>>>>>> e0c65b26a9031c9952ba27aec8d7f7b20475c684
        return createSessionRef.id
    } catch (error: any) {
        toast.error(error.message || 'Failed to create session.', { id: loadingToast })
        throw error
    }
}


export const joinSession = async ({
    session,
    link,
    enteredPassword,
}: {
    session: Session
    link: string
    enteredPassword?: string
}) => {
    if (!link.trim()) {
        return toast.error('Please provide your link.')
    }

    const currentUser = auth.currentUser
    if (!currentUser) {
        return toast.error('You must be logged in.')
    }

    const loadingToast = toast.loading('Joining session...')

    try {
        const sessionRef = doc(db, 'sessions', session.id)
        const sessionSnap = await getDoc(sessionRef)

        if (!sessionSnap.exists()) {
            throw new Error('Session does not exist.')
        }

        const sessionData = sessionSnap.data() as Session

        //  Check if full
        if (sessionData.joined >= sessionData.maxParticipants) {
            throw new Error('Session is already full.')
        }

        // Check password if private
        if (
            sessionData.visibility === 'private' &&
            sessionData.password !== enteredPassword
        ) {
            throw new Error('Invalid session password.')
        }

        const participantId = `${session.id}_${currentUser.uid}`
        const participantRef = doc(db, 'participants', participantId)

        const participantSnap = await getDoc(participantRef)

        // Prevent duplicate join
        if (participantSnap.exists()) {
            throw new Error('You already joined this session.')
        }

        const batch = writeBatch(db)

        // Add participant
        batch.set(participantRef, {
            sessionId: session.id,
            userId: currentUser.uid,
            userName: currentUser.displayName?.split(' ')[0] || 'User',
            isHost: false,
            link,
            joinedAt: serverTimestamp(),
        })

        // Increment joined count
        batch.update(sessionRef, {
            joined: increment(1),
            status:
                sessionData.joined + 1 >= sessionData.maxParticipants
                    ? 'In Progress'
                    : sessionData.status,
        })

        await batch.commit()

        toast.success('Successfully joined session!', { id: loadingToast })
    } catch (error: any) {
        toast.error(error.message || 'Failed to join session.', {
            id: loadingToast,
        })
    }
}

// HOOK
export function useSessionForm() {
    const currentUser = useUserInfo()

    const [title, setTitle] = useState('')
    const [service, setService] = useState('Followers')
    const [maxParticipants, setMaxParticipants] = useState(20)
    const [visibility, setVisibility] = useState<Visibility>('public')
    const [password, setPassword] = useState('')
    const [ruleInput, setRuleInput] = useState('')
    const [rules, setRules] = useState<string[]>([])
    const [sessions, setSessions] = useState<Session[]>([])
    const [mySessions, setMySessions] = useState<Session[]>([])
    const [selectedSession, setSelectedSession] = useState<Session | null>(null)
    const [linkInput, setLinkInput] = useState("")

    const [search, setSearch] = useState<string>('')
    const [createModal, setCreateModal] = useState<boolean>(false)
    const [joinModal, setJoinModal] = useState<boolean>(false)
    const [detailsModal, setDetailsModal] = useState<boolean>(false)

    const [link, setLink] = useState('')
    const [enteredPassword, setEnteredPassword] = useState('')
    // Password generation
    const generatePassword = (length = 20) => {
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }
    // sessions 
    useEffect(() => {
        const q = query(
            collection(db, "sessions"),
            orderBy("createdAt", "desc")
        )

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const sessionList: Session[] = snapshot.docs.map((docSnap) => {
                const data = docSnap.data() as Omit<Session, "id">
                return {
                    id: docSnap.id,
                    ...data,
                }
            })

            setSessions(sessionList)

            setMySessions(
                sessionList.filter(
                    (session) => session.hostId === currentUser?.uid
                )
            )
        })

        return () => unsubscribe()
    }, [currentUser])

    useEffect(() => {
        if (visibility === 'private') setPassword(generatePassword())
        else setPassword('')
    }, [visibility])




    // Rule actions
    const addRule = () => {
        if (!ruleInput.trim()) return
        setRules((prev) => [...prev, ruleInput.trim()])
        setRuleInput('')
    }

    const removeRule = (index: number) => {
        setRules((prev) => prev.filter((_, i) => i !== index))
    }

    const copyPassword = async () => {
        if (!password) return
        await navigator.clipboard.writeText(password)
        toast.success('Password copied to clipboard')
    }

    const resetForm = () => {
        setTitle('')
        setService('Followers')
        setMaxParticipants(20)
        setVisibility('public')
        setPassword('')
        setRuleInput('')
        setRules([])
    }


    // Submit handler
    const handleCreate = useCallback(async () => {
        if (!currentUser) throw new Error('User must be logged in')

        return await createSessionDB({
            title,
            service,
            maxParticipants,
            visibility,
            password,
            rules,
            link: linkInput,
        }).then((id) => {
            resetForm()
            return id
        })
    }, [title, service, maxParticipants, visibility, password, rules, linkInput, currentUser])
    return {
        // state
        title,
        service,
        maxParticipants,
        visibility,
        password,
        ruleInput,
        rules,
        currentUser,
        sessions,
        linkInput,
        mySessions,
        search,
        createModal,
        joinModal,
        detailsModal,
        selectedSession,
        link,
        enteredPassword,

        // setters
        setTitle,
        setService,
        setMaxParticipants,
        setVisibility,
        setPassword,
        setRuleInput,
        setRules,
        setLinkInput,
        setSearch,
        setCreateModal,
        setJoinModal,
        setDetailsModal,
        setSelectedSession,
        setLink,
        setEnteredPassword,

        // actions
        addRule,
        removeRule,
        copyPassword,
        resetForm,
        handleCreate,
    }
}