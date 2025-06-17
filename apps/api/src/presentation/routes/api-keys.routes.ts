import { Router } from 'express';
import Joi from 'joi';
import { APIKeyService } from '../../domains/api-keys/services/api-key.service';
import { PostgresAPIKeyRepository } from '../../domains/api-keys/repositories/api-key.repository';
import { DatabaseConnection } from '../../infrastructure/database/connection';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { validate, validateParams } from '../middleware/validation.middleware';
import { asyncHandler, createError } from '../middleware/error.middleware';

const router = Router();
const db = DatabaseConnection.getInstance();
const apiKeyRepository = new PostgresAPIKeyRepository(db);
const apiKeyService = new APIKeyService(apiKeyRepository);
const authMiddleware = new AuthMiddleware();

const createAPIKeySchema = Joi.object({
  provider: Joi.string().valid('openai', 'anthropic', 'google', 'cohere').required(),
  name: Joi.string().min(1).max(255).required(),
  key: Joi.string().min(1).required()
});

const updateAPIKeySchema = Joi.object({
  name: Joi.string().min(1).max(255),
  isActive: Joi.boolean()
}).min(1);

const paramsSchema = Joi.object({
  id: Joi.string().uuid().required()
});

router.use(authMiddleware.authenticate());

router.post('/',
  validate(createAPIKeySchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { provider, name, key } = req.body;
    
    const isValid = await apiKeyService.validateAPIKey(provider, key);
    if (!isValid) {
      throw createError('Invalid API key for the specified provider', 400);
    }
    
    const apiKey = await apiKeyService.createAPIKey({
      userId: req.user!.id,
      provider,
      name,
      key
    });
    
    const { keyHash, ...responseData } = apiKey as any;
    res.status(201).json(responseData);
  })
);

router.get('/',
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const apiKeys = await apiKeyService.getUserAPIKeys(req.user!.id);
    
    const safeApiKeys = apiKeys.map(({ keyHash, ...apiKey }) => ({
      ...apiKey,
      keyPreview: '****' + apiKey.name.slice(-4)
    }));
    
    res.json(safeApiKeys);
  })
);

router.get('/:id',
  validateParams(paramsSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    
    const apiKey = await apiKeyService.getAPIKey(id, req.user!.id);
    if (!apiKey) {
      throw createError('API key not found', 404);
    }
    
    const { keyHash, ...responseData } = apiKey as any;
    res.json({
      ...responseData,
      keyPreview: '****' + apiKey.name.slice(-4)
    });
  })
);

router.put('/:id',
  validateParams(paramsSchema),
  validate(updateAPIKeySchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    const updateData = req.body;
    
    const apiKey = await apiKeyService.updateAPIKey(id, req.user!.id, updateData);
    if (!apiKey) {
      throw createError('API key not found', 404);
    }
    
    const { keyHash, ...responseData } = apiKey as any;
    res.json({
      ...responseData,
      keyPreview: '****' + apiKey.name.slice(-4)
    });
  })
);

router.delete('/:id',
  validateParams(paramsSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    
    const deleted = await apiKeyService.deleteAPIKey(id, req.user!.id);
    if (!deleted) {
      throw createError('API key not found', 404);
    }
    
    res.status(204).send();
  })
);

router.post('/:id/validate',
  validateParams(paramsSchema),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { id } = req.params;
    
    const apiKey = await apiKeyService.getAPIKey(id, req.user!.id);
    if (!apiKey) {
      throw createError('API key not found', 404);
    }
    
    res.json({ isValid: true, message: 'API key is valid' });
  })
);

export default router;