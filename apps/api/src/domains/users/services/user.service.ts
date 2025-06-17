import { UserProfile, UpdateUserProfileData, UserPreferences, UsageMetrics } from '../entities/user-profile.entity';
import { UserRepository } from '../repositories/user.repository';
import { ComparisonService } from '../../comparisons/services/comparison.service';

export class UserService {
  constructor(
    private userRepository: UserRepository,
    private comparisonService: ComparisonService
  ) {}

  async createUserProfile(userId: string, data: { firstName: string; lastName: string }): Promise<UserProfile> {
    const defaultPreferences: UserPreferences = {
      defaultProviders: ['openai', 'anthropic'],
      defaultModels: ['gpt-3.5-turbo', 'claude-3-sonnet-20240229'],
      theme: 'system',
      emailNotifications: true,
      autoSaveComparisons: true,
      maxConcurrentRequests: 3
    };

    const defaultUsage: UsageMetrics = {
      totalComparisons: 0,
      totalTokensUsed: 0,
      totalCostSpent: 0,
      averageResponseTime: 0,
      favoriteProvider: 'none',
      monthlyUsage: []
    };

    return await this.userRepository.createProfile({
      userId,
      firstName: data.firstName,
      lastName: data.lastName,
      timezone: 'UTC',
      preferences: defaultPreferences,
      usage: defaultUsage
    });
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    return await this.userRepository.findProfileByUserId(userId);
  }

  async updateUserProfile(userId: string, data: UpdateUserProfileData): Promise<UserProfile | null> {
    const existingProfile = await this.getUserProfile(userId);
    if (!existingProfile) {
      return null;
    }

    return await this.userRepository.updateProfile(userId, data);
  }

  async getUserDashboardData(userId: string): Promise<{
    profile: UserProfile;
    recentComparisons: any[];
    stats: any;
  }> {
    const profile = await this.getUserProfile(userId);
    if (!profile) {
      throw new Error('User profile not found');
    }

    const recentComparisons = await this.comparisonService.getUserComparisons(userId, 5, 0);
    const stats = await this.comparisonService.getUserStats(userId);

    await this.updateUsageMetrics(userId, stats);

    return {
      profile,
      recentComparisons,
      stats
    };
  }

  async updateUserPreferences(userId: string, preferences: Partial<UserPreferences>): Promise<UserProfile | null> {
    const profile = await this.getUserProfile(userId);
    if (!profile) {
      return null;
    }

    const updatedPreferences = {
      ...profile.preferences,
      ...preferences
    };

    return await this.userRepository.updateProfile(userId, {
      preferences: updatedPreferences
    });
  }

  async deleteUserProfile(userId: string): Promise<boolean> {
    const profile = await this.getUserProfile(userId);
    if (!profile) {
      return false;
    }

    await this.userRepository.deleteProfile(userId);
    return true;
  }

  private async updateUsageMetrics(userId: string, stats: any): Promise<void> {
    const profile = await this.getUserProfile(userId);
    if (!profile) {
      return;
    }

    const updatedUsage: UsageMetrics = {
      totalComparisons: stats.totalComparisons,
      totalTokensUsed: profile.usage.totalTokensUsed,
      totalCostSpent: stats.totalCost,
      averageResponseTime: stats.averageResponseTime,
      favoriteProvider: stats.favoriteProvider,
      monthlyUsage: profile.usage.monthlyUsage
    };

    await this.userRepository.updateProfile(userId, {
      usage: updatedUsage
    });
  }
}