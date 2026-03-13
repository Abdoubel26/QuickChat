import express from "express";
import { connectDB } from "./config/db.js";
import userRoute from './routes/user.route.js'



const app = express()

app.use(express.json())

app.use('/api/user', userRoute)


connectDB()



app.get((res, req) => {
    console.log('API in here')
})

app.listen(5000, () => console.log("App is listening in port 5000"))


