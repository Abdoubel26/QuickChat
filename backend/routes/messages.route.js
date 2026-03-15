import express from 'express'
import { getMessages } from '../controllers/MessageControllers.js'
const router = express.Router()
import { AuthMiddleware } from '../middleware/auth.js'

router.get('/', AuthMiddleware, getMessages)


export default router