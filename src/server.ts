import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { env } from '@config/env';
import { initializeDatabase } from '@config/database';
import { errorHandlerMiddleware } from '@middleware/errorHandler';
import logger from '@utils/logger';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN.split(',') }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later',
});
app.use('/api/', limiter);

// Body Parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Routes (to be implemented)
// app.use('/api/auth', authRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/tickets', ticketRoutes);
// app.use('/api/wallet', walletRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/qr', qrRoutes);
// app.use('/api/products', productRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// Error Handler (must be last)
app.use(errorHandlerMiddleware);

// Start Server
async function startServer() {
  try {
    await initializeDatabase();

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server started on port ${env.PORT}`);
      logger.info(`📝 Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
