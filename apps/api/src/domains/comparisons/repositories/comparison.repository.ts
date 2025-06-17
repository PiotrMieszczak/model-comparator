import { Comparison, CreateComparisonData, ComparisonStatus } from '../entities/comparison.entity';
import { AIResponse } from '../../ai-providers/services/provider.service';

export interface ComparisonRepository {
  findById(id: string): Promise<Comparison | null>;
  findByUserId(userId: string, limit: number, offset: number): Promise<Comparison[]>;
  create(data: CreateComparisonData & { status: ComparisonStatus; totalCost: number; currency: string }): Promise<Comparison>;
  updateStatus(id: string, status: ComparisonStatus): Promise<void>;
  updateComparison(id: string, data: { totalCost?: number; status?: ComparisonStatus }): Promise<void>;
  saveResponses(comparisonId: string, responses: AIResponse[]): Promise<void>;
  delete(id: string): Promise<void>;
  getUserStats(userId: string): Promise<{
    totalComparisons: number;
    totalCost: number;
    averageResponseTime: number;
    favoriteProvider: string;
  }>;
}

export class PostgresComparisonRepository implements ComparisonRepository {
  constructor(private db: any) {}

  async findById(id: string): Promise<Comparison | null> {
    const comparisonResult = await this.db.query(
      'SELECT * FROM comparisons WHERE id = $1',
      [id]
    );
    
    if (!comparisonResult.rows[0]) {
      return null;
    }

    const responsesResult = await this.db.query(
      'SELECT * FROM comparison_responses WHERE comparison_id = $1 ORDER BY created_at',
      [id]
    );

    return {
      ...comparisonResult.rows[0],
      responses: responsesResult.rows
    };
  }

  async findByUserId(userId: string, limit: number, offset: number): Promise<Comparison[]> {
    const result = await this.db.query(
      `SELECT c.*, 
              COALESCE(json_agg(
                json_build_object(
                  'id', cr.id,
                  'provider', cr.provider,
                  'model', cr.model,
                  'content', cr.content,
                  'tokenUsage', cr.token_usage,
                  'cost', cr.cost,
                  'responseTime', cr.response_time,
                  'status', cr.status,
                  'error', cr.error,
                  'createdAt', cr.created_at
                )
              ) FILTER (WHERE cr.id IS NOT NULL), '[]') as responses
       FROM comparisons c
       LEFT JOIN comparison_responses cr ON c.id = cr.comparison_id
       WHERE c.user_id = $1
       GROUP BY c.id
       ORDER BY c.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );
    
    return result.rows;
  }

  async create(data: CreateComparisonData & { status: ComparisonStatus; totalCost: number; currency: string }): Promise<Comparison> {
    const result = await this.db.query(
      `INSERT INTO comparisons (user_id, title, prompt, status, total_cost, currency, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING *`,
      [data.userId, data.title, data.prompt, data.status, data.totalCost, data.currency]
    );
    
    return {
      ...result.rows[0],
      responses: []
    };
  }

  async updateStatus(id: string, status: ComparisonStatus): Promise<void> {
    await this.db.query(
      'UPDATE comparisons SET status = $1, updated_at = NOW() WHERE id = $2',
      [status, id]
    );
  }

  async updateComparison(id: string, data: { totalCost?: number; status?: ComparisonStatus }): Promise<void> {
    const fields = Object.keys(data)
      .filter(key => data[key as keyof typeof data] !== undefined)
      .map((key, index) => {
        const dbKey = key === 'totalCost' ? 'total_cost' : key;
        return `${dbKey} = $${index + 2}`;
      })
      .join(', ');
    
    const values = Object.values(data).filter(value => value !== undefined);
    
    await this.db.query(
      `UPDATE comparisons SET ${fields}, updated_at = NOW() WHERE id = $1`,
      [id, ...values]
    );
  }

  async saveResponses(comparisonId: string, responses: AIResponse[]): Promise<void> {
    for (const response of responses) {
      await this.db.query(
        `INSERT INTO comparison_responses 
         (comparison_id, provider, model, content, token_usage, cost, response_time, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [
          comparisonId,
          response.provider,
          response.model,
          response.content,
          JSON.stringify(response.tokenUsage),
          JSON.stringify(response.cost),
          response.responseTime,
          'success'
        ]
      );
    }
  }

  async delete(id: string): Promise<void> {
    await this.db.query('DELETE FROM comparison_responses WHERE comparison_id = $1', [id]);
    await this.db.query('DELETE FROM comparisons WHERE id = $1', [id]);
  }

  async getUserStats(userId: string): Promise<{
    totalComparisons: number;
    totalCost: number;
    averageResponseTime: number;
    favoriteProvider: string;
  }> {
    const statsResult = await this.db.query(
      `SELECT 
         COUNT(DISTINCT c.id) as total_comparisons,
         COALESCE(SUM(c.total_cost), 0) as total_cost,
         COALESCE(AVG(cr.response_time), 0) as average_response_time
       FROM comparisons c
       LEFT JOIN comparison_responses cr ON c.id = cr.comparison_id
       WHERE c.user_id = $1 AND c.status = 'completed'`,
      [userId]
    );

    const providerResult = await this.db.query(
      `SELECT cr.provider, COUNT(*) as usage_count
       FROM comparisons c
       JOIN comparison_responses cr ON c.id = cr.comparison_id
       WHERE c.user_id = $1 AND c.status = 'completed'
       GROUP BY cr.provider
       ORDER BY usage_count DESC
       LIMIT 1`,
      [userId]
    );

    const stats = statsResult.rows[0];
    const favoriteProvider = providerResult.rows[0]?.provider || 'none';

    return {
      totalComparisons: parseInt(stats.total_comparisons) || 0,
      totalCost: parseFloat(stats.total_cost) || 0,
      averageResponseTime: parseFloat(stats.average_response_time) || 0,
      favoriteProvider
    };
  }
}