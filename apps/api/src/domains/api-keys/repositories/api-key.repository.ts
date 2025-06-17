import { APIKey, CreateAPIKeyData, UpdateAPIKeyData } from '../entities/api-key.entity';

export interface APIKeyRepository {
  findById(id: string): Promise<APIKey | null>;
  findByUserId(userId: string): Promise<APIKey[]>;
  findByUserIdAndProvider(userId: string, provider: string): Promise<APIKey | null>;
  create(data: CreateAPIKeyData & { keyHash: string }): Promise<APIKey>;
  update(id: string, data: UpdateAPIKeyData): Promise<APIKey>;
  delete(id: string): Promise<void>;
}

export class PostgresAPIKeyRepository implements APIKeyRepository {
  constructor(private db: any) {}

  async findById(id: string): Promise<APIKey | null> {
    const result = await this.db.query(
      'SELECT * FROM api_keys WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async findByUserId(userId: string): Promise<APIKey[]> {
    const result = await this.db.query(
      'SELECT * FROM api_keys WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  async findByUserIdAndProvider(userId: string, provider: string): Promise<APIKey | null> {
    const result = await this.db.query(
      'SELECT * FROM api_keys WHERE user_id = $1 AND provider = $2',
      [userId, provider]
    );
    return result.rows[0] || null;
  }

  async create(data: CreateAPIKeyData & { keyHash: string }): Promise<APIKey> {
    const result = await this.db.query(
      `INSERT INTO api_keys (user_id, provider, name, key_hash, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
       RETURNING *`,
      [data.userId, data.provider, data.name, data.keyHash, true]
    );
    return result.rows[0];
  }

  async update(id: string, data: UpdateAPIKeyData): Promise<APIKey> {
    const fields = Object.keys(data)
      .filter(key => data[key as keyof UpdateAPIKeyData] !== undefined)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = Object.values(data).filter(value => value !== undefined);
    
    const result = await this.db.query(
      `UPDATE api_keys SET ${fields}, updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM api_keys WHERE id = $1', [id]);
  }
}