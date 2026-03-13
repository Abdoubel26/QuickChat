import express from 'express'
import { getMessages, sendMessage } from '../controllers/MessageControllers.js'
const router = express.Router()
import { AuthMiddleware } from '../middleware/auth.js'


router.get('/', AuthMiddleware, getMessages)

router.post('/', AuthMiddleware, sendMessage)


export default router