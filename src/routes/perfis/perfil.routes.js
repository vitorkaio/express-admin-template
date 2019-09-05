import express from 'express'
import * as PerfilController from './perfil.controller'

const router = express.Router()

// GET /feed/posts
router.get('/', PerfilController.getPerfils)
router.get('/:id', PerfilController.getPerfilById)
router.post('/create', PerfilController.createPerfil)
router.delete('/:id', PerfilController.deletePerfil)
router.put('/:id', PerfilController.UpdateAllPerfil)
router.patch('/:id', PerfilController.UpdateHalfPerfil)

// Cria um post 
/* router.post('/post', createPost);

// Pegao o id
router.get('/posts/:id', getDatePost); */

export default router