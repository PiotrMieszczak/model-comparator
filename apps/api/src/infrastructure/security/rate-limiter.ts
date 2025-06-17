import { Request, Response, NextFunction } from 'express';

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

export class RateLimiter {
  private store: RateLimitStore = {};
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = {
      message: 'Too many requests, please try again later.',
      skipSuccessfulRequests: false,
      ...config
    };
    
    this.cleanup();
  }

  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const key = this.getKey(req);
      const now = Date.now();
      
      if (!this.store[key] || now > this.store[key].resetTime) {
        this.store[key] = {
          count: 0,
          resetTime: now + this.config.windowMs
        };
      }
      
      this.store[key].count++;
      
      const remaining = Math.max(0, this.config.maxRequests - this.store[key].count);
      const resetTime = new Date(this.store[key].resetTime);
      
      res.set({
        'X-RateLimit-Limit': this.config.maxRequests.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': resetTime.toISOString()
      });
      
      if (this.store[key].count > this.config.maxRequests) {
        return res.status(429).json({
          error: 'Too Many Requests',
          message: this.config.message,
          retryAfter: Math.ceil((this.store[key].resetTime - now) / 1000)
        });
      }
      
      next();
    };
  }

  private getKey(req: Request): string {
    return req.ip || req.connection.remoteAddress || 'unknown';
  }

  private cleanup() {
    setInterval(() => {
      const now = Date.now();
      Object.keys(this.store).forEach(key => {
        if (now > this.store[key].resetTime) {
          delete this.store[key];
        }
      });
    }, this.config.windowMs);
  }
}

export const createRateLimiter = (config: RateLimitConfig) => {
  return new RateLimiter(config);
};

export const defaultRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 100
});

export const strictRateLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 10
});

export const apiRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 30
});