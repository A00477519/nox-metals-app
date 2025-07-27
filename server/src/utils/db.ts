// src/utils/db.ts
import mongoose from 'mongoose';
import config from '../config/env';

// MongoDB connection with advanced configuration
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      maxPoolSize: 10, // Maintain up to 10 socket connections
      retryWrites: true,
      writeConcern: {
        w: 'majority'
      }
    });

    console.log(`✅ MongoDB Connected in ${config.nodeEnv} mode`);

    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected from DB');
    });

  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

// Graceful shutdown handler
const shutdown = async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
};

// Handle application termination
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

export default connectDB;