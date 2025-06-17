import crypto from 'crypto';
import { APIKey, CreateAPIKeyData, UpdateAPIKeyData } from '../entities/api-key.entity';
import { APIKeyRepository } from '../repositories/api-key.repository';

export class APIKeyService {
  constructor(private apiKeyRepository: APIKeyRepository) {}

  async createAPIKey(data: CreateAPIKeyData): Promise<APIKey> {
    const keyHash = this.hashKey(data.key);
    
    const apiKeyData = {
      ...data,
      keyHash,
      key: undefined
    };
    
    return await this.apiKeyRepository.create(apiKeyData as any);
  }

  async getUserAPIKeys(userId: string): Promise<APIKey[]> {
    return await this.apiKeyRepository.findByUserId(userId);
  }

  async getAPIKey(id: string, userId: string): Promise<APIKey | null> {
    const apiKey = await this.apiKeyRepository.findById(id);
    if (!apiKey || apiKey.userId !== userId) {
      return null;
    }
    return apiKey;
  }

  async updateAPIKey(id: string, userId: string, data: UpdateAPIKeyData): Promise<APIKey | null> {
    const apiKey = await this.getAPIKey(id, userId);
    if (!apiKey) {
      return null;
    }
    
    return await this.apiKeyRepository.update(id, data);
  }

  async deleteAPIKey(id: string, userId: string): Promise<boolean> {
    const apiKey = await this.getAPIKey(id, userId);
    if (!apiKey) {
      return false;
    }
    
    await this.apiKeyRepository.delete(id);
    return true;
  }

  async validateAPIKey(provider: string, key: string): Promise<boolean> {
    switch (provider) {
      case 'openai':
        return await this.validateOpenAIKey(key);
      case 'anthropic':
        return await this.validateAnthropicKey(key);
      case 'google':
        return await this.validateGoogleKey(key);
      case 'cohere':
        return await this.validateCohereKey(key);
      default:
        return false;
    }
  }

  async getUserAPIKeysMap(userId: string): Promise<Map<string, string>> {
    const apiKeys = await this.getUserAPIKeys(userId);
    const keyMap = new Map<string, string>();
    
    for (const apiKey of apiKeys.filter(k => k.isActive)) {
      const decryptedKey = this.decryptKey(apiKey.keyHash);
      keyMap.set(apiKey.provider, decryptedKey);
    }
    
    return keyMap;
  }

  private hashKey(key: string): string {
    const algorithm = 'aes-256-gcm';
    const secretKey = process.env.API_KEY_SECRET || 'your-secret-key-here';
    const iv = crypto.randomBytes(16);
    
    const cipher = crypto.createCipher(algorithm, secretKey);
    let encrypted = cipher.update(key, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    return `${iv.toString('hex')}:${encrypted}`;
  }

  private decryptKey(hashedKey: string): string {
    const algorithm = 'aes-256-gcm';
    const secretKey = process.env.API_KEY_SECRET || 'your-secret-key-here';
    
    const [ivHex, encrypted] = hashedKey.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    
    const decipher = crypto.createDecipher(algorithm, secretKey);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }

  private async validateOpenAIKey(key: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${key}` }
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateAnthropicKey(key: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': key,
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-sonnet-20240229',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'test' }]
        })
      });
      return response.status !== 401;
    } catch {
      return false;
    }
  }

  private async validateGoogleKey(key: string): Promise<boolean> {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${key}`);
      return response.ok;
    } catch {
      return false;
    }
  }

  private async validateCohereKey(key: string): Promise<boolean> {
    try {
      const response = await fetch('https://api.cohere.ai/v1/models', {
        headers: { 'Authorization': `Bearer ${key}` }
      });
      return response.ok;
    } catch {
      return false;
    }
  }
}