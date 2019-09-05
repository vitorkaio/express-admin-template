import express from 'express'
import * as UserController from './user.controller'
import auth from '../auth/auth'

const router = express.Router()

router.get('/', auth, UserController.getUsers)
router.get('/:id', auth, UserController.getUserById)
router.delete('/:id', auth, UserController.deleteUser)
router.put('/:id', auth, UserController.updateAllUser)
router.patch('/:id', auth, UserController.updateHalfUser)
router.post('/create', auth, UserController.createUser)

export default router