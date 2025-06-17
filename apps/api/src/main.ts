import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import routes from './presentation/routes';
import { errorHandler, notFoundHandler } from './presentation/middleware/error.middleware';
import { defaultRateLimiter } from './infrastructure/security/rate-limiter';
import { DatabaseConnection } from './infrastructure/database/connection';

dotenv.config();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(morgan('combined'));
app.use(defaultRateLimiter.middleware());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'AI Model Comparator API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

const gracefulShutdown = async () => {
  console.log('Starting graceful shutdown...');
  const db = DatabaseConnection.getInstance();
  await db.close();
  console.log('Database connections closed.');
  process.exit(0);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

app.listen(port, host, () => {
  console.log(`🚀 AI Model Comparator API running at http://${host}:${port}`);
  console.log(`📚 API Documentation: http://${host}:${port}/api/v1/health`);
});
