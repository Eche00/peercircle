import { useEffect, useMemo, useState } from "react"
import {
    collection,
    query,
    orderBy,
    onSnapshot,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Session } from "./sessions"

type User = {
    id: string
    createdAt: any
    email: string
    fullName: string
    role: string
    trustPoints: number
    uid: string
}

export default function useAdminData() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState<User[]>([])
    const [sessions, setSessions] = useState<Session[]>([])

    //  USER FILTER STATES
    const [search, setSearch] = useState('')
    const [role, setRole] = useState('all')
    const [pointsFilter, setPointsFilter] = useState('all')


    const statusOptions = [
        { label: "All Status", value: "" },
        { label: "Waiting", value: "waiting" },
        { label: "In Progress", value: "In Progress" },
        { label: "Finished", value: "Finished" },
    ]

    const serviceOptions = [
        { label: "All Services", value: "" },
        { label: "Followers", value: "Followers" },
        { label: "Likes", value: "Likes" },
        { label: "Comments", value: "Comments" },
    ]

    //  SESSION FILTER STATES
    const [sessionSearch, setSessionSearch] = useState('')
    const [status, setStatus] = useState('')
    const [service, setService] = useState('')

    useEffect(() => {
        setLoading(true)

        const sessionsQuery = query(
            collection(db, "sessions"),
            orderBy("createdAt", "desc")
        )

        const usersQuery = query(
            collection(db, "users"),
            orderBy("createdAt", "desc")
        )

        let loaded = 0
        const doneLoading = () => {
            loaded += 1
            if (loaded >= 2) setLoading(false)
        }

        const unsubscribeSessions = onSnapshot(sessionsQuery, (snapshot) => {
            const sessionList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Session[]

            setSessions(sessionList)
            doneLoading()
        })

        const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
            const userList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as User[]

            setUsers(userList)
            doneLoading()
        })

        return () => {
            unsubscribeSessions()
            unsubscribeUsers()
        }
    }, [])

    // ⚡ FILTERED USERS
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const matchesSearch =
                user.fullName.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase())

            const matchesRole =
                role === 'all' || user.role === role

            const matchesPoints =
                pointsFilter === 'all' ||
                (pointsFilter === 'high' && user.trustPoints >= 100) ||
                (pointsFilter === 'low' && user.trustPoints < 100)

            return matchesSearch && matchesRole && matchesPoints
        })
    }, [users, search, role, pointsFilter])

    // ⚡ FILTERED SESSIONS
    const filteredSessions = useMemo(() => {
        return sessions.filter((session) => {
            const matchesSearch =
                session.title?.toLowerCase().includes(sessionSearch.toLowerCase()) ||
                session.hostName?.toLowerCase().includes(sessionSearch.toLowerCase()) ||
                session.id?.toLowerCase().includes(sessionSearch.toLowerCase())

            const matchesStatus =
                status === '' || session.status === status

            const matchesService =
                service === '' || session.service === service

            return matchesSearch && matchesStatus && matchesService
        })
    }, [sessions, sessionSearch, status, service])

    return {
        users,
        filteredUsers,

        sessions,
        filteredSessions,

        loading,

        //  USER CONTROLS
        search,
        setSearch,
        role,
        setRole,
        pointsFilter,
        setPointsFilter,

        //  SESSION CONTROLS
        sessionSearch,
        setSessionSearch,
        status,
        setStatus,
        service,
        setService,

        // OPTIONS
        statusOptions,
        serviceOptions,
    }
}