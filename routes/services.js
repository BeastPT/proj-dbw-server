import express from 'express';
const router = express.Router();

import * as serviceController from '../controllers/service.js';
import authMiddleware from '../middleware/auth.js';

router.post('/create', authMiddleware, serviceController.createService) // Cria um novo servico

router.get('/list', authMiddleware, serviceController.listServices) // Lista todos os servicos do usuario

router.patch('/:id/edit', authMiddleware, serviceController.editService) // Edita um servico

router.get('/:id', authMiddleware, serviceController.getService) // Lista todos os servicos do usuario


export default router