export interface UserProfile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  timezone: string;
  preferences: UserPreferences;
  usage: UsageMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  defaultProviders: string[];
  defaultModels: string[];
  theme: 'light' | 'dark' | 'system';
  emailNotifications: boolean;
  autoSaveComparisons: boolean;
  maxConcurrentRequests: number;
}

export interface UsageMetrics {
  totalComparisons: number;
  totalTokensUsed: number;
  totalCostSpent: number;
  averageResponseTime: number;
  favoriteProvider: string;
  monthlyUsage: MonthlyUsage[];
}

export interface MonthlyUsage {
  month: string;
  comparisons: number;
  tokens: number;
  cost: number;
}

export interface UpdateUserProfileData {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  timezone?: string;
  preferences?: Partial<UserPreferences>;
  usage?: UsageMetrics;
}