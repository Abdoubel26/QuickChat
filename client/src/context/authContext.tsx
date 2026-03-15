import { useContext, useState, createContext, useEffect } from "react";


interface authContextType {
    id: string | null,
    token: string | null,
    setAuth: (id: string, token: string) => void
    logout: () => void
}

export const authContext = createContext<authContextType>({
    id: null,
    token: null,
    setAuth: () => { },
    logout: () => {}
})

export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {

    const [id, setId] = useState<string | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const setAuth: (id: string, token: string ) => void = (id: string, token: string) => {
        setId(id)
        setToken(token)
        localStorage.setItem('id', id)
        console.log(id)
        localStorage.setItem('token', token)
    }

    useEffect(() => {
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token')
        if(id && token){
            setToken(token)
            setId(id)
        } 
    }, [])

    const logout: () => void = () => {
        setId('')
        setToken(null)
        localStorage.removeItem("id")
        localStorage.removeItem('token')
    }

    return (
        <authContext.Provider value={{ id, token,  setAuth, logout}}>
            {children}
        </authContext.Provider>
    )
}

export const useAuth = () => {
    const context: authContextType = useContext(authContext)
    return context
}