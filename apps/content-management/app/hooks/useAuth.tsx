import { login, logout } from "@/lib/actions/auth"
import { LoginInput } from "@/lib/schemas/auth"
import { SessionUser } from "@/types"
import React from "react"

export interface AuthContext {
    isAuthenticated: boolean
    login: (data: LoginInput) => Promise<void>
    logout: () => Promise<void>
    user: SessionUser | undefined
}

const AuthContext = React.createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<SessionUser>();
    const isAuthenticated = !!user

    async function handleLogout() {
        await logout();
        setUser(undefined);
    }

    async function handleLogin(data: LoginInput) {
        const user = (await login({ data })).user;
        setUser(user);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            login: handleLogin,
            logout: handleLogout
        }
        }>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}