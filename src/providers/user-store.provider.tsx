'use client'
import { type ReactNode, createContext, useRef, useState, useEffect, useContext } from 'react'
import { useStore } from 'zustand'

import { type UserStore, createUserStore, initUserStore } from 'stores/user.store'

export type UserStoreApi = ReturnType<typeof createUserStore>

export const UserStoreContext = createContext<UserStoreApi | undefined>(undefined)

export interface UserStoreProviderProps{
    children: ReactNode
}

export const UserStoreProvider = ({
    children,
}: UserStoreProviderProps) => {
    const storeRef = useRef<UserStoreApi>(null)
    const [isHydrated, setIsHydrated] = useState(false)
    if (!storeRef.current) {
        storeRef.current = createUserStore(initUserStore())
    }

    useEffect(() => {
        setIsHydrated(true)
    }, [])
    return (
        <UserStoreContext.Provider value={storeRef.current}>
            {isHydrated ? children : null}
        </UserStoreContext.Provider>
    )
}

export const useUserStore = <T,> (
    selector: (store: UserStore) => T,
): T => {
    const userStoreContext = useContext(UserStoreContext)

    if (!userStoreContext) {
        throw new Error('useUserStore must be used with userStoreProvider');
    }

    return useStore(userStoreContext, selector)
}