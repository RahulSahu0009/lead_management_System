import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true,
    });

    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection failed', { error: error.message });
    throw error;
  }
};

export default connectDB;