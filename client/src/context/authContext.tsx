import { useContext, useState, createContext } from "react";
import {  User } from '../lib/types'

interface authContextType {
    user: User | null,
    token: string | null,
    setAuth: (user: User, token: string) => void
    logout: () => void
}

const [auth, setauth] = useState()

const authContext = createContext<authContextType>({
    user: null,
    token: null,
    setAuth: (user) => { user},
    logout: () => {}
})


const AuthContextProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const setAuth: (user: User, token: string ) => void = (user: User, token: string) => {
        setUser(user)
        setToken(token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    const logout: () => {} = {
        
    }

    const log
}