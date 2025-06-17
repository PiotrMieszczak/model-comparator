import * as jwt from 'jsonwebtoken';

export interface JWTPayload {
  userId: string;
  iat: number;
  exp: number;
}

export class JWTService {
  private readonly jwtSecret: string;
  private readonly refreshSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshExpiresIn: string;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key';
    this.refreshSecret = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '1h';
    this.refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  generateTokens(userId: string): { token: string; refreshToken: string } {
    const token = jwt.sign(
      { userId },
      this.jwtSecret,
      { expiresIn: this.jwtExpiresIn } as jwt.SignOptions
    );

    const refreshToken = jwt.sign(
      { userId },
      this.refreshSecret,
      { expiresIn: this.refreshExpiresIn } as jwt.SignOptions
    );

    return { token, refreshToken };
  }

  verifyToken(token: string): JWTPayload {
    return jwt.verify(token, this.jwtSecret) as JWTPayload;
  }

  verifyRefreshToken(refreshToken: string): JWTPayload {
    return jwt.verify(refreshToken, this.refreshSecret) as JWTPayload;
  }

  decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
}