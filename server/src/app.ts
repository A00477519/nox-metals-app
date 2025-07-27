// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/env';
import routes from './routes';

const app = express();
// CORS configuration
app.use(cors({
    origin: config.corsOrigin,
    credentials: true
  }));

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json());

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: config.nodeEnv,
    timestamp: new Date().toISOString()
  });
});



export default app;