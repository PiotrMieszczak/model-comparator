import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../../domains/auth/services/jwt.service';
import { PostgresUserRepository } from '../../domains/auth/repositories/user.repository';
import { DatabaseConnection } from '../../infrastructure/database/connection';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export class AuthMiddleware {
  private jwtService: JWTService;
  private userRepository: PostgresUserRepository;

  constructor() {
    this.jwtService = new JWTService();
    const db = DatabaseConnection.getInstance();
    this.userRepository = new PostgresUserRepository(db);
  }

  authenticate() {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.substring(7);
        const payload = this.jwtService.verifyToken(token);
        
        const user = await this.userRepository.findById(payload.userId);
        if (!user) {
          return res.status(401).json({ error: 'User not found' });
        }

        req.user = {
          id: user.id,
          email: user.email,
          name: user.name
        };

        next();
      } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
      }
    };
  }

  optional() {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
      try {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.substring(7);
          const payload = this.jwtService.verifyToken(token);
          
          const user = await this.userRepository.findById(payload.userId);
          if (user) {
            req.user = {
              id: user.id,
              email: user.email,
              name: user.name
            };
          }
        }
        next();
      } catch (error) {
        next();
      }
    };
  }
}

export { AuthenticatedRequest };