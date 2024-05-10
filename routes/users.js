import express from 'express';
const router = express.Router();

import * as usersController from '../controllers/user.js';
import authMiddleware from '../middleware/auth.js';

router.post('/edit', authMiddleware, usersController.editProfile) // Cria um novo servico
router.get('/:id', authMiddleware, usersController.getUser)

export default router