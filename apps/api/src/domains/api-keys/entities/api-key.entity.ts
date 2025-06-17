export interface APIKey {
  id: string;
  userId: string;
  provider: string;
  name: string;
  keyHash: string;
  isActive: boolean;
  lastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAPIKeyData {
  userId: string;
  provider: string;
  name: string;
  key: string;
}

export interface UpdateAPIKeyData {
  name?: string;
  isActive?: boolean;
}