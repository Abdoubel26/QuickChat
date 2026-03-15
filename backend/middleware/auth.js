import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const AuthMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader) return res.status(400).json({ success: false, details:"Authorization Token not Provided!"})

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userCrendentials = decoded
        next()
    } catch(e) {
        console.log(e.message)
        res.status(500).json({ success: false, details:" Server Error!"})
    }
}