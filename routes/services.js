import express from 'express';
const router = express.Router();

import * as authController from '../controllers/service.js';
import authMiddleware from '../middleware/auth.js';

router.post('/create', authMiddleware, authController.createService) // Cria um novo servico

router.get('/list', authMiddleware, authController.listServices) // Lista todos os servicos do usuario

router.patch('/:id/edit', authMiddleware, authController.editService) // Edita um servico

router.get('/:id', authMiddleware, authController.getService) // Lista todos os servicos do usuario


export default router