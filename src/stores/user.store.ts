import { createStore } from 'zustand/vanilla'

export type UserState = {
    metamaskId: string | null
    userId: number | null
    username: string | null
    email: string | null
    password: string | null
    access_token: string | null
    refresh_token: string | null
}

export type UserAction = {
    resetData: () => void
}

export type UserStore = UserState & UserAction

export const initUserStore = (): UserState => {
    return {
        metamaskId: null,
        userId: null,
        username: null,
        email: null,
        password: null,
        access_token: null,
        refresh_token: null
    }
}

export const defaultUserState: UserState = {
    metamaskId: 'test',
    userId: 0,
    username: 'test_username',
    email: 'test@gmail.com',
    password: 'azerty',
    access_token: null,
    refresh_token: null
}

export const createUserStore = (
    initState: UserState = defaultUserState,
) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        resetData: () => set((state) => ({}))
    }))
}