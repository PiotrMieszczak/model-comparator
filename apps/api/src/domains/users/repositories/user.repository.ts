import { UserProfile, UpdateUserProfileData, UserPreferences, UsageMetrics } from '../entities/user-profile.entity';

export interface UserRepository {
  findProfileByUserId(userId: string): Promise<UserProfile | null>;
  createProfile(data: {
    userId: string;
    firstName: string;
    lastName: string;
    timezone: string;
    preferences: UserPreferences;
    usage: UsageMetrics;
  }): Promise<UserProfile>;
  updateProfile(userId: string, data: UpdateUserProfileData): Promise<UserProfile>;
  deleteProfile(userId: string): Promise<void>;
}

export class PostgresUserRepository implements UserRepository {
  constructor(private db: any) {}

  async findProfileByUserId(userId: string): Promise<UserProfile | null> {
    const result = await this.db.query(
      'SELECT * FROM user_profiles WHERE user_id = $1',
      [userId]
    );
    
    if (!result.rows[0]) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id,
      userId: row.user_id,
      firstName: row.first_name,
      lastName: row.last_name,
      avatar: row.avatar,
      timezone: row.timezone,
      preferences: row.preferences,
      usage: row.usage,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async createProfile(data: {
    userId: string;
    firstName: string;
    lastName: string;
    timezone: string;
    preferences: UserPreferences;
    usage: UsageMetrics;
  }): Promise<UserProfile> {
    const result = await this.db.query(
      `INSERT INTO user_profiles (user_id, first_name, last_name, timezone, preferences, usage, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
       RETURNING *`,
      [
        data.userId,
        data.firstName,
        data.lastName,
        data.timezone,
        JSON.stringify(data.preferences),
        JSON.stringify(data.usage)
      ]
    );
    
    const row = result.rows[0];
    return {
      id: row.id,
      userId: row.user_id,
      firstName: row.first_name,
      lastName: row.last_name,
      avatar: row.avatar,
      timezone: row.timezone,
      preferences: row.preferences,
      usage: row.usage,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async updateProfile(userId: string, data: UpdateUserProfileData): Promise<UserProfile> {
    const setParts: string[] = [];
    const values: any[] = [userId];
    let valueIndex = 2;

    if (data.firstName !== undefined) {
      setParts.push(`first_name = $${valueIndex++}`);
      values.push(data.firstName);
    }
    if (data.lastName !== undefined) {
      setParts.push(`last_name = $${valueIndex++}`);
      values.push(data.lastName);
    }
    if (data.avatar !== undefined) {
      setParts.push(`avatar = $${valueIndex++}`);
      values.push(data.avatar);
    }
    if (data.timezone !== undefined) {
      setParts.push(`timezone = $${valueIndex++}`);
      values.push(data.timezone);
    }
    if (data.preferences !== undefined) {
      setParts.push(`preferences = $${valueIndex++}`);
      values.push(JSON.stringify(data.preferences));
    }
    if (data.usage !== undefined) {
      setParts.push(`usage = $${valueIndex++}`);
      values.push(JSON.stringify(data.usage));
    }

    setParts.push('updated_at = NOW()');

    const result = await this.db.query(
      `UPDATE user_profiles SET ${setParts.join(', ')} WHERE user_id = $1 RETURNING *`,
      values
    );
    
    const row = result.rows[0];
    return {
      id: row.id,
      userId: row.user_id,
      firstName: row.first_name,
      lastName: row.last_name,
      avatar: row.avatar,
      timezone: row.timezone,
      preferences: row.preferences,
      usage: row.usage,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  async deleteProfile(userId: string): Promise<void> {
    await this.db.query('DELETE FROM user_profiles WHERE user_id = $1', [userId]);
  }
}