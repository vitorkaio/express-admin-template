import express from 'express'
import * as AuthController from './auth.controller'

const router = express.Router()

router.post('/', AuthController.login)
router.post('/register', AuthController.register)

export default router