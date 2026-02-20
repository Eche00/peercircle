'use client'
import { useState, useEffect, useCallback } from 'react'
import { db, auth } from '@/lib/firebase'
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { useUserInfo } from './userinfo'

// TYPES
export type Visibility = 'public' | 'private'

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
}

// CREATE SESSION FUNCTION
const createSessionDB = async ({
    title,
    service,
    maxParticipants,
    visibility,
    password,
    rules,
}: CreateSessionParams) => {
    if (!title || !service || !maxParticipants || !visibility) { return toast.error('Please fill in all required fields.') }
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
            joinedAt: serverTimestamp(),
        })

        await batch.commit()
        toast.success('Session created successfully ', { id: loadingToast })
        return createSessionRef.id
    } catch (error: any) {
        toast.error(error.message || 'Failed to create session.', { id: loadingToast })
        throw error
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
        }).then((id) => {
            resetForm()
            return id
        })
    }, [title, service, maxParticipants, visibility, password, rules, currentUser])

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

        // setters
        setTitle,
        setService,
        setMaxParticipants,
        setVisibility,
        setPassword,
        setRuleInput,
        setRules,

        // actions
        addRule,
        removeRule,
        copyPassword,
        resetForm,
        handleCreate,
    }
}