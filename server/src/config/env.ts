import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

interface Config {
  port: string | number;
  mongoUri: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  corsOrigin: string;
  nodeEnv: string;
}

const config: Config = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'default-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
};

// Validation
if (!config.mongoUri) {
  throw new Error('MONGO_URI is required in environment variables');
}

export default config;