import { Router } from 'express';
import { ProviderService } from '../../domains/ai-providers/services/provider.service';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { asyncHandler } from '../middleware/error.middleware';

const router = Router();
const providerService = new ProviderService();
const authMiddleware = new AuthMiddleware();

router.get('/',
  authMiddleware.optional(),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const providers = providerService.getAllProviders();
    res.json(providers);
  })
);

router.get('/:providerId/models',
  authMiddleware.optional(),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { providerId } = req.params;
    
    const provider = providerService.getProvider(providerId as any);
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    
    const models = provider.getModels();
    res.json(models);
  })
);

export default router;