import { Router } from 'express';
import Joi from 'joi';
import { UserService } from '../../domains/users/services/user.service';
import { PostgresUserRepository } from '../../domains/users/repositories/user.repository';
import { ComparisonService } from '../../domains/comparisons/services/comparison.service';
import { PostgresComparisonRepository } from '../../domains/comparisons/repositories/comparison.repository';
import { ProviderService } from '../../domains/ai-providers/services/provider.service';
import { APIKeyService } from '../../domains/api-keys/services/api-key.service';
import { PostgresAPIKeyRepository } from '../../domains/api-keys/repositories/api-key.repository';
import { DatabaseConnection } from '../../infrastructure/database/connection';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { asyncHandler, createError } from '../middleware/error.middleware';

const router = Router();
const db = DatabaseConnection.getInstance();
const userRepository = new PostgresUserRepository(db);
const comparisonRepository = new PostgresComparisonRepository(db);
const apiKeyRepository = new PostgresAPIKeyRepository(db);
const providerService = new ProviderService();
const apiKeyService = new APIKeyService(apiKeyRepository);
const comparisonService = new ComparisonService(
  comparisonRepository,
  providerService,
  apiKeyService
);
const userService = new UserService(userRepository, comparisonService);
const authMiddleware = new AuthMiddleware();

const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(1).max(100),
  lastName: Joi.string().min(1).max(100),
  avatar: Joi.string().uri(),
  timezone: Joi.string().max(100)
}).min(1);

const updatePreferencesSchema = Joi.object({
  defaultProviders: Joi.array().items(Joi.string().valid('openai', 'anthropic', 'google', 'cohere')),
  defaultModels: Joi.array().items(Joi.string()),
  theme: Joi.string().valid('light', 'dark', 'system'),
  emailNotifications: Joi.boolean(),
  autoSaveComparisons: Joi.boolean(),
  maxConcurrentRequests: Joi.number().integer().min(1).max(10)
}).min(1);

router.use(authMiddleware.authenticate());

router.get('/profile',
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    let profile = await userService.getUserProfile(req.user!.id);
    
    if (!profile) {
      profile = await userService.createUserProfile(req.user!.id, {
        firstName: req.user!.name.split(' ')[0] || 'User',
        lastName: req.user!.name.split(' ').slice(1).join(' ') || ''
      });
    }
    
    res.json(profile);
  })
);

router.put('/profile',
  validate(updateProfileSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const updateData = req.body;
    
    const profile = await userService.updateUserProfile(req.user!.id, updateData);
    if (!profile) {
      throw createError('Profile not found', 404);
    }
    
    res.json(profile);
  })
);

router.put('/preferences',
  validate(updatePreferencesSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const preferences = req.body;
    
    const profile = await userService.updateUserPreferences(req.user!.id, preferences);
    if (!profile) {
      throw createError('Profile not found', 404);
    }
    
    res.json(profile.preferences);
  })
);

router.get('/dashboard',
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    try {
      const dashboardData = await userService.getUserDashboardData(req.user!.id);
      res.json(dashboardData);
    } catch (error) {
      if (error.message === 'User profile not found') {
        const profile = await userService.createUserProfile(req.user!.id, {
          firstName: req.user!.name.split(' ')[0] || 'User',
          lastName: req.user!.name.split(' ').slice(1).join(' ') || ''
        });
        
        const dashboardData = await userService.getUserDashboardData(req.user!.id);
        res.json(dashboardData);
      } else {
        throw error;
      }
    }
  })
);

router.delete('/profile',
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const deleted = await userService.deleteUserProfile(req.user!.id);
    if (!deleted) {
      throw createError('Profile not found', 404);
    }
    
    res.status(204).send();
  })
);

export default router;