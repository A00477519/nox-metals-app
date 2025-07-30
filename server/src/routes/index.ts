// src/routes/index.ts
import express from 'express';
import authRoutes from './auth';
import productRoutes from './products';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);

export default router;