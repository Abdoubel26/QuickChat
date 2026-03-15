import express from 'express'
import { register , login, updateProfile, getUsers, getOneUser} from '../controllers/userControllers.js'


const router = express.Router()

router.get('/getUsers', getUsers)

router.get('/getOneUser', getOneUser)

router.post("/signup", register)

router.post('/login', login)

router.put('/update', updateProfile)

export default router

