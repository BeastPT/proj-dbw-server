import express from 'express';
const router = express.Router();

import * as authController from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';

router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/updatepassword', authMiddleware, authController.updatepassword)

export default router