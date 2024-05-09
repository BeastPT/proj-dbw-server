import express from 'express';
const router = express.Router();

import * as productController from '../controllers/product.js';

router.get('/list', productController.listProducts) // Return lista de produtos
router.get('/:id', productController.getProduct) // Retorna a informação de um produto


export default router