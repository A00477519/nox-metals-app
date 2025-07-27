// src/controllers/auth.ts
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/env';
import { NotFoundError, UnauthorizedError, ValidationError } from '../utils/error';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedError('Email already in use');
    }

    const user = await User.create({ email, password });
    const token = generateToken(user);

    res.status(201).json({
      success: true,
      data: sanitizeUser(user, token)
    });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = generateToken(user);
    res.json({
      success: true,
      data: sanitizeUser(user, token)
    });
  } catch (error) {
    handleErrorResponse(error, res);
  }
};

// Helper functions
const generateToken = (user: any) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    config.jwtSecret,
    { expiresIn: '1d' }
  );
};

const sanitizeUser = (user: any, token: string) => {
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    token
  };
};

const handleErrorResponse = (error: any, res: Response) => {
  if (error instanceof UnauthorizedError) {
    res.status(401).json({ success: false, error: error.message });
  } else if (error instanceof NotFoundError) {
    res.status(404).json({ success: false, error: error.message });
  } else if (error instanceof ValidationError) {
    res.status(400).json({ success: false, error: error.message });
  } else {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
};