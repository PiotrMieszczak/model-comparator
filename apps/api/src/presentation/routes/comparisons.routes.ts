import { Router } from 'express';
import Joi from 'joi';
import { ComparisonService } from '../../domains/comparisons/services/comparison.service';
import { PostgresComparisonRepository } from '../../domains/comparisons/repositories/comparison.repository';
import { ProviderService } from '../../domains/ai-providers/services/provider.service';
import { APIKeyService } from '../../domains/api-keys/services/api-key.service';
import { PostgresAPIKeyRepository } from '../../domains/api-keys/repositories/api-key.repository';
import { DatabaseConnection } from '../../infrastructure/database/connection';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { validate, validateQuery, validateParams } from '../middleware/validation.middleware';
import { asyncHandler, createError } from '../middleware/error.middleware';

const router = Router();
const db = DatabaseConnection.getInstance();
const comparisonRepository = new PostgresComparisonRepository(db);
const apiKeyRepository = new PostgresAPIKeyRepository(db);
const providerService = new ProviderService();
const apiKeyService = new APIKeyService(apiKeyRepository);
const comparisonService = new ComparisonService(
  comparisonRepository,
  providerService,
  apiKeyService
);
const authMiddleware = new AuthMiddleware();

const createComparisonSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  prompt: Joi.string().min(1).max(10000).required(),
  providers: Joi.array().items(Joi.string().valid('openai', 'anthropic', 'google', 'cohere')).min(1).required(),
  models: Joi.array().items(Joi.string()).min(1).required()
});

const querySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(20),
  offset: Joi.number().integer().min(0).default(0)
});

const paramsSchema = Joi.object({
  id: Joi.string().uuid().required()
});

router.use(authMiddleware.authenticate());

router.post('/',
  validate(createComparisonSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { title, prompt, providers, models } = req.body;
    
    const comparison = await comparisonService.createComparison({
      userId: req.user!.id,
      title,
      prompt,
      providers,
      models
    });
    
    res.status(201).json(comparison);
  })
);

router.get('/',
  validateQuery(querySchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { limit, offset } = req.query as any;
    
    const comparisons = await comparisonService.getUserComparisons(
      req.user!.id,
      limit,
      offset
    );
    
    res.json({
      comparisons,
      pagination: {
        limit,
        offset,
        hasMore: comparisons.length === limit
      }
    });
  })
);

router.get('/:id',
  validateParams(paramsSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    
    const comparison = await comparisonService.getComparison(id, req.user!.id);
    if (!comparison) {
      throw createError('Comparison not found', 404);
    }
    
    res.json(comparison);
  })
);

router.delete('/:id',
  validateParams(paramsSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    
    const deleted = await comparisonService.deleteComparison(id, req.user!.id);
    if (!deleted) {
      throw createError('Comparison not found', 404);
    }
    
    res.status(204).send();
  })
);

router.get('/stats/user',
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const stats = await comparisonService.getUserStats(req.user!.id);
    res.json(stats);
  })
);

export default router;