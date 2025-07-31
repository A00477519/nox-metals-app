// src/routes/auth.ts
import express from 'express';
import { login, register, getUserCount, getUsers } from '../controllers/auth';
import { registerValidation, loginValidation } from '../validations/authValidation';
import { validateRequest } from '../middlewares/validateRequest';
import { Router } from 'express';
// import { register, login, getUserCount, getUsers } from '../controllers/auth';


const router = express.Router();

router.post('/register', registerValidation, validateRequest, register);
router.post('/login', loginValidation, validateRequest, login);
router.get('/users/count', getUserCount); // New route for user count
router.get('/users', getUsers); // New route for all users (admin only)


export default router;