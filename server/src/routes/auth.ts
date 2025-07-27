// src/routes/auth.ts
import express from 'express';
import { login, register } from '../controllers/auth';
import { registerValidation, loginValidation } from '../validations/authValidation';
import { validateRequest } from '../middlewares/validateRequest';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);

export default router;