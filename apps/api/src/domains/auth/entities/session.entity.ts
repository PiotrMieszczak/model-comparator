export interface Session {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  createdAt: Date;
  isActive: boolean;
}

export interface CreateSessionData {
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
}