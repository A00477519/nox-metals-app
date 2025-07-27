// import app from './app';
// import dotenv from 'dotenv';

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// src/index.ts (or server.ts)
// src/index.ts
import app from './app';
import config from './config/env';
import connectDB from './utils/db';

const startServer = async () => {
  try {
    await connectDB();
    app.listen(config.port, () => {
      console.log(`
        🚀 Server running in ${config.nodeEnv} mode
        🔗 http://localhost:${config.port}
        📅 ${new Date().toLocaleString()}
      `);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();