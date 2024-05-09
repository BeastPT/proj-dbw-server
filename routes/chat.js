import express from 'express';
const router = express.Router();

import * as chatController from '../controllers/chat.js';
import authMiddleware from '../middleware/auth.js';

//router.post('/create', authMiddleware, chatController.create)   // CREATE NEW CHAT? Usar so no backend
router.get('/list', authMiddleware, chatController.listChats) // Lista todos os chats do usuario
//router.patch('/update/:id', authMiddleware, chatController.update) // 
router.get('/support', authMiddleware, chatController.createSupport) // Chat de suporte

router.post('/:id/addMessage', authMiddleware, chatController.addMessage) // Adiciona uma mensagem ao chat - Depois carregar chatgpt
router.get('/:id', authMiddleware, chatController.getMessages) // Ao clicar no chat para carregar as mensagens

export default router