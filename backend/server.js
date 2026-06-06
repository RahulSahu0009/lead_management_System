import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import leadRoutes from './routes/leadRoutes.js';
import { logger } from './utils/logger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'CRM API is running' });
});

app.use('/api/leads', leadRoutes);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`);
    });
  } catch (error) {
    logger.error('Server startup failed', { error: error.message });
    process.exit(1);
  }
};

startServer();