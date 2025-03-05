import { createStore } from 'zustand/vanilla'

export type UserState = {
    metamaskId: string | null
    userId: number | null
    username: string | null
    email: string | null
    password: string | null
}

export type UserAction = {
    setId: () => void
    setMetamaskId: (id: string) => void
    setUsername: () => void
    setEmail: () => void
    setPassword: () => void
}

export type UserStore = UserState & UserAction

export const initUserStore = (): UserState => {
    return {
        metamaskId: null,
        userId: null,
        username: null,
        email: null,
        password: null,
    }
}
export const defaultUserState: UserState = {
    metamaskId: 'test',
    userId: 0,
    username: 'test_username',
    email: 'test@gmail.com',
    password: 'azerty',
}

export const createUserStore = (
    initState: UserState = defaultUserState,
) => {
    return createStore<UserState>()((set) => ({
        ...initState,
        setId: () => set((state) => ({ userId: state.userId })),
        setMetamaskId: (id: string) => set((state) => ({ metamaskId: state.metamaskId })),
        setUsername: () => set((state) => ({ username: state.username })),
        setEmail: () => set((state) => ({ email: state.email })),
        setPassword: () => set((state) => ({ password: state.password })),
    }))
}