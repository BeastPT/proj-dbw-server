import express from 'express';
const router = express.Router();

import * as usersController from '../controllers/user.js';
import authMiddleware from '../middleware/auth.js';

router.post('/:id/edit', authMiddleware, usersController.editProfile) // Cria um novo servico
router.get('/:id', authMiddleware, usersController.getUser) // Toda a informacao dum utilizador

export default router