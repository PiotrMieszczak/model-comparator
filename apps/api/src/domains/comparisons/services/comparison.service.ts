import { Comparison, CreateComparisonData, ComparisonStatus } from '../entities/comparison.entity';
import { ComparisonRepository } from '../repositories/comparison.repository';
import { ProviderService, ComparisonRequest } from '../../ai-providers/services/provider.service';
import { APIKeyService } from '../../api-keys/services/api-key.service';

export class ComparisonService {
  constructor(
    private comparisonRepository: ComparisonRepository,
    private providerService: ProviderService,
    private apiKeyService: APIKeyService
  ) {}

  async createComparison(data: CreateComparisonData): Promise<Comparison> {
    const comparison = await this.comparisonRepository.create({
      ...data,
      status: ComparisonStatus.PENDING,
      totalCost: 0,
      currency: 'USD'
    });

    this.executeComparison(comparison.id).catch(error => {
      console.error(`Failed to execute comparison ${comparison.id}:`, error);
      this.comparisonRepository.updateStatus(comparison.id, ComparisonStatus.FAILED);
    });

    return comparison;
  }

  async getUserComparisons(userId: string, limit = 20, offset = 0): Promise<Comparison[]> {
    return await this.comparisonRepository.findByUserId(userId, limit, offset);
  }

  async getComparison(id: string, userId: string): Promise<Comparison | null> {
    const comparison = await this.comparisonRepository.findById(id);
    if (!comparison || comparison.userId !== userId) {
      return null;
    }
    return comparison;
  }

  async deleteComparison(id: string, userId: string): Promise<boolean> {
    const comparison = await this.getComparison(id, userId);
    if (!comparison) {
      return false;
    }
    
    await this.comparisonRepository.delete(id);
    return true;
  }

  async getUserStats(userId: string): Promise<{
    totalComparisons: number;
    totalCost: number;
    averageResponseTime: number;
    favoriteProvider: string;
  }> {
    return await this.comparisonRepository.getUserStats(userId);
  }

  private async executeComparison(comparisonId: string): Promise<void> {
    const comparison = await this.comparisonRepository.findById(comparisonId);
    if (!comparison) {
      throw new Error('Comparison not found');
    }

    await this.comparisonRepository.updateStatus(comparisonId, ComparisonStatus.IN_PROGRESS);

    try {
      const apiKeys = await this.apiKeyService.getUserAPIKeysMap(comparison.userId);
      
      const request: ComparisonRequest = {
        prompt: comparison.prompt,
        providers: comparison.responses.map(r => r.provider),
        models: comparison.responses.map(r => r.model),
        userId: comparison.userId
      };

      const responses = await this.providerService.generateComparison(request, apiKeys);
      
      await this.comparisonRepository.saveResponses(comparisonId, responses);
      
      const totalCost = responses.reduce((sum, r) => sum + r.cost.totalCost, 0);
      
      await this.comparisonRepository.updateComparison(comparisonId, {
        totalCost,
        status: ComparisonStatus.COMPLETED
      });
    } catch (error) {
      console.error(`Error executing comparison ${comparisonId}:`, error);
      await this.comparisonRepository.updateStatus(comparisonId, ComparisonStatus.FAILED);
      throw error;
    }
  }
}