export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
  isAuthenticated: boolean;
}

export interface GoogleOAuthResponse {
  accessToken: string;
  idToken: string;
  profile: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
}

export interface AuthServiceConfig {
  apiBaseUrl: string;
  googleClientId: string;
}

export type AuthState = 'idle' | 'loading' | 'authenticated' | 'error';

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}