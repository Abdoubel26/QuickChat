import { useContext, useState, createContext } from "react";
import {  type User } from '../lib/types'

interface authContextType {
    user: User | null,
    token: string | null,
    setAuth: (user: User, token: string) => void
    logout: () => void
}

export const authContext = createContext<authContextType>({
    user: null,
    token: null,
    setAuth: (user) => { user},
    logout: () => {}
})


export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const setAuth: (user: User, token: string ) => void = (user: User, token: string) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const logout: () => void = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem("user")
        localStorage.removeItem('token')
    }

    return (
        <authContext.Provider value={{ user, token, setAuth, logout}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context: authContextType = useContext(authContext)
    return context
}