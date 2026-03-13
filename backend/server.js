import express from "express";
import { connectDB } from "./config/db.js";
import http from 'http'
import { Server } from 'socket.io'
import userRouter from './routes/user.route.js'
import messagesRouter from './routes/messages.route.js'
import { AuthMiddleware } from './middleware/auth.js'
import cors from 'cors'

const app = express()

const server = http.createServer(app)



const io = new Server(server, {
    cors: {
        origin: "*",

    }
})

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]

}))


app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/messages', messagesRouter)

connectDB()

server.listen(5000, () => console.log("App is listening in port 5000"))


const onlineUsers = {}

io.on('connection', (socket) => {
    console.log(`user connected:` + socket.id)

    socket.on('register-user', (userId) => {
      onlineUsers[userId] = socket.id 
    }   )

    socket.on('disconnect', () => {
        for(const userId in onlineUsers){
            if( onlineUsers[userId] === socket.id){
                delete onlineUsers[userId]
            }
        }
    })

})

export { io, onlineUsers}


