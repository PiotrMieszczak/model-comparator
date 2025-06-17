import { Router } from 'express';
import Joi from 'joi';
import { AuthService } from '../../domains/auth/services/auth.service';
import { PostgresUserRepository } from '../../domains/auth/repositories/user.repository';
import { JWTService } from '../../domains/auth/services/jwt.service';
import { DatabaseConnection } from '../../infrastructure/database/connection';
import { validate } from '../middleware/validation.middleware';
import { AuthMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { asyncHandler, createError } from '../middleware/error.middleware';

const router = Router();
const db = DatabaseConnection.getInstance();
const userRepository = new PostgresUserRepository(db);
const jwtService = new JWTService();
const authService = new AuthService(userRepository, jwtService);
const authMiddleware = new AuthMiddleware();

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(100).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required()
});

router.post('/register', 
  validate(registerSchema),
  asyncHandler(async (req, res) => {
    const { email, password, name } = req.body;
    
    try {
      const result = await authService.register({ email, password, name });
      
      res.status(201).json({
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          isEmailVerified: result.user.isEmailVerified
        },
        token: result.token,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      if (error.message === 'User already exists') {
        throw createError('User with this email already exists', 409);
      }
      throw error;
    }
  })
);

router.post('/login',
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const result = await authService.login({ email, password });
      
      res.json({
        user: {
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
          isEmailVerified: result.user.isEmailVerified
        },
        token: result.token,
        refreshToken: result.refreshToken
      });
    } catch (error) {
      if (error.message === 'Invalid credentials') {
        throw createError('Invalid email or password', 401);
      }
      throw error;
    }
  })
);

router.post('/refresh',
  validate(refreshTokenSchema),
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    
    const result = await authService.refreshToken(refreshToken);
    if (!result) {
      throw createError('Invalid refresh token', 401);
    }
    
    res.json(result);
  })
);

router.get('/me',
  authMiddleware.authenticate(),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const user = await userRepository.findById(req.user!.id);
    if (!user) {
      throw createError('User not found', 404);
    }
    
    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt
    });
  })
);

router.post('/logout',
  authMiddleware.authenticate(),
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    res.json({ message: 'Logged out successfully' });
  })
);

export default router;