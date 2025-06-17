import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import apiKeyRoutes from './api-keys.routes';
import comparisonRoutes from './comparisons.routes';
import providerRoutes from './providers.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/api-keys', apiKeyRoutes);
router.use('/comparisons', comparisonRoutes);
router.use('/providers', providerRoutes);

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

export default router;