import express from 'express'
import { register , login, updateProfile, getUsers} from '../controllers/userControllers.js'


const router = express.Router()

router.get('/', getUsers)

router.post("/signup", register)

router.post('/login', login)

router.put('/update', updateProfile)

export default router

