import {io, Socket } from 'socket.io-client'

let socket: Socket | null = null;


export const connectSocket = (userId: string) => {
    if(!socket) {
        socket = io('http://localhost:5000')
        socket.emit("register-user", userId)
    }
    return userId
}

export const getSocket = () => {
    if(!socket) return console.error('Socket Not Found!')
    return socket;
}