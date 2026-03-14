import { io, Socket } from 'socket.io-client'
import { createContext, useContext, FC, type ReactNode } from 'react'


interface socketContextType {
    socket: Socket
}

const initState = {} as Socket

const socketContext = createContext<socketContextType>({ socket: initState})


export const SocketProvider: FC<{children: ReactNode}> = ({children}) => {

    const socket: Socket = io('http://localhost:5000')

    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )

}

export const useSocket = () => {
    const context = useContext(socketContext)
    return context;
}