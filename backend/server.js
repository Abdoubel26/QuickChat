import express from "express";
import { connectDB } from "./config/db.js";
import userRouter from './routes/user.route.js'
import messagesRouter from './routes/messages.route.js'
import  http from 'http'
import cors from 'cors'
import { Server } from "socket.io";
import  Message  from './models/message.js'


const app = express()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]

}))

const onlineUsers = {}

const server = http.createServer(app)

const io = new Server(server, { cors: {
    origin: '*',
    credentials: true,
    methods: ["POST", "GET"],
    allowedHeaders: ["Content-Type","Authorization"]
}} )

io.on('connection', (socket) => {

    socket.on('send-message', async (message) => {
        await Message.create(message)
        io.emit('receive-message', (message))
    })

})



app.use('/api/user', userRouter)
app.use('/api/messages', messagesRouter)

connectDB()

server.listen(5000, () => console.log("server is listening in port 5000"))