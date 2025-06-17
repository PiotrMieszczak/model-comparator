import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, CreateUserData } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { JWTService } from './jwt.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResult {
  user: User;
  token: string;
  refreshToken: string;
}

export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JWTService
  ) {}

  async register(data: RegisterData): Promise<AuthResult> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    
    const userData: CreateUserData = {
      email: data.email,
      password: passwordHash,
      name: data.name
    };

    const user = await this.userRepository.create(userData);
    const { token, refreshToken } = this.jwtService.generateTokens(user.id);

    return { user, token, refreshToken };
  }

  async login(credentials: LoginCredentials): Promise<AuthResult> {
    const user = await this.userRepository.findByEmail(credentials.email);
    if (!user || !user.passwordHash) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(credentials.password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const { token, refreshToken } = this.jwtService.generateTokens(user.id);

    return { user, token, refreshToken };
  }

  async googleAuth(profile: any): Promise<AuthResult> {
    let user = await this.userRepository.findByGoogleId(profile.id);
    
    if (!user) {
      user = await this.userRepository.findByEmail(profile.emails[0].value);
      
      if (user) {
        user = await this.userRepository.update(user.id, {
          googleId: profile.id
        });
      } else {
        const userData: CreateUserData = {
          email: profile.emails[0].value,
          googleId: profile.id,
          name: profile.displayName,
          avatar: profile.photos[0]?.value
        };
        user = await this.userRepository.create(userData);
      }
    }

    const { token, refreshToken } = this.jwtService.generateTokens(user.id);

    return { user, token, refreshToken };
  }

  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verifyToken(token);
      return await this.userRepository.findById(payload.userId);
    } catch (error) {
      return null;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string } | null> {
    try {
      const payload = this.jwtService.verifyRefreshToken(refreshToken);
      return this.jwtService.generateTokens(payload.userId);
    } catch (error) {
      return null;
    }
  }
}