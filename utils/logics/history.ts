'use client'

import { auth, db } from '@/lib/firebase'
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'

export type HistoryType = 'points' | 'activity' | 'milestone'

export interface HistoryItem {
  id: string
  userId: string
  type: HistoryType
  title: string
  description: string
  value?: string
  createdAt: Timestamp | null
  read: boolean
}

export const createHistoryEntry = async ({
  userId,
  title,
  description,
  type = 'activity',
}: {
  userId: string
  title: string
  description: string
  type?: HistoryType
  value?: string
}) => {
  const payload: {
    userId: string
    type: HistoryType
    title: string
    description: string
    value?: string
    read: boolean
    createdAt: ReturnType<typeof serverTimestamp>
  } = {
    userId,
    type,
    title,
    description,
    read: false,
    createdAt: serverTimestamp(),
  }

  if (value) payload.value = value

  await addDoc(collection(db, 'history'), {
    ...payload,
  })
}

export const useUserHistory = () => {
  const [items, setItems] = useState<HistoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unsubscribeHistory: (() => void) | null = null

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (unsubscribeHistory) {
        unsubscribeHistory()
        unsubscribeHistory = null
      }

      if (!user) {
        setItems([])
        setLoading(false)
        return
      }

      const historyQuery = query(
        collection(db, 'history'),
        where('userId', '==', user.uid),
        orderBy('createdAt', 'desc'),
      )

      unsubscribeHistory = onSnapshot(
        historyQuery,
        (snapshot) => {
          const nextItems = snapshot.docs.map((docSnap) => {
            const data = docSnap.data()

            return {
              id: docSnap.id,
              userId: data.userId as string,
              type: (data.type as HistoryType) || 'activity',
              title: (data.title as string) || 'Activity',
              description: (data.description as string) || '',
              value: data.value as string | undefined,
              createdAt: (data.createdAt as Timestamp | null) || null,
              read: Boolean(data.read),
            }
          })

          setItems(nextItems)
          setLoading(false)
        },
        () => {
          setItems([])
          setLoading(false)
        },
      )

    })

    return () => {
      unsubscribeAuth()
      if (unsubscribeHistory) unsubscribeHistory()
    }
  }, [])

  const unreadCount = useMemo(
    () => items.filter((item) => !item.read).length,
    [items],
  )

  return {
    items,
    loading,
    totalCount: items.length,
    unreadCount,
  }
}
