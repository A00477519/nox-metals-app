// src/app.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config/env';
import routes from './routes';

const app = express();
// CORS configuration
// app.use(cors({
//     origin: '*',
//     credentials: true
//   }));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://nox-metals-frontend-40gue47jc.vercel.app',
    'https://nox-metals-frontend.vercel.app',
    'https://nox-metals-frontend-*.vercel.app' // Allow any Vercel preview deployments
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
// app.use(cors());
// app.use(helmet());
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  crossOriginOpenerPolicy: { policy: "unsafe-none" }
}));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json());

// Add the root route HERE (after middleware, before other routes)
app.get('/', (req, res) => {
  res.json({
    message: 'Nox Metals API is running! 🚀',
    status: 'success',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv || 'development'
  });
});

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