import { AIProvider, AIModel, ProviderType } from '../entities/provider.entity';
import { OpenAIProvider } from './providers/openai.provider';
import { AnthropicProvider } from './providers/anthropic.provider';
import { GoogleProvider } from './providers/google.provider';
import { CohereProvider } from './providers/cohere.provider';

export interface AIResponse {
  id: string;
  model: string;
  provider: string;
  content: string;
  tokenUsage: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  cost: {
    inputCost: number;
    outputCost: number;
    totalCost: number;
    currency: string;
  };
  responseTime: number;
  createdAt: Date;
}

export interface ComparisonRequest {
  prompt: string;
  providers: string[];
  models: string[];
  userId: string;
}

export interface BaseProvider {
  generateResponse(prompt: string, model: string, apiKey: string): Promise<AIResponse>;
  getModels(): AIModel[];
  calculateCost(inputTokens: number, outputTokens: number, model: string): { inputCost: number; outputCost: number; totalCost: number; currency: string };
  countTokens(text: string): number;
}

export class ProviderService {
  private providers: Map<string, BaseProvider> = new Map();

  constructor() {
    this.providers.set(ProviderType.OPENAI, new OpenAIProvider());
    this.providers.set(ProviderType.ANTHROPIC, new AnthropicProvider());
    this.providers.set(ProviderType.GOOGLE, new GoogleProvider());
    this.providers.set(ProviderType.COHERE, new CohereProvider());
  }

  async generateComparison(request: ComparisonRequest, apiKeys: Map<string, string>): Promise<AIResponse[]> {
    const responses: AIResponse[] = [];
    
    for (const provider of request.providers) {
      const providerInstance = this.providers.get(provider);
      const apiKey = apiKeys.get(provider);
      
      if (!providerInstance || !apiKey) {
        continue;
      }

      for (const model of request.models.filter(m => this.isModelSupportedByProvider(m, provider))) {
        try {
          const response = await providerInstance.generateResponse(request.prompt, model, apiKey);
          responses.push(response);
        } catch (error) {
          console.error(`Error generating response for ${provider}:${model}:`, error);
        }
      }
    }

    return responses;
  }

  getProvider(type: ProviderType): BaseProvider | undefined {
    return this.providers.get(type);
  }

  getAllProviders(): AIProvider[] {
    return Array.from(this.providers.entries()).map(([type, provider]) => ({
      id: type,
      name: type,
      displayName: this.getProviderDisplayName(type),
      baseUrl: this.getProviderBaseUrl(type),
      supportedModels: provider.getModels().map(m => m.name),
      pricing: {
        inputTokenPrice: 0,
        outputTokenPrice: 0,
        currency: 'USD'
      },
      isActive: true
    }));
  }

  private isModelSupportedByProvider(model: string, provider: string): boolean {
    const providerInstance = this.providers.get(provider);
    if (!providerInstance) return false;
    
    return providerInstance.getModels().some(m => m.name === model);
  }

  private getProviderDisplayName(type: string): string {
    const displayNames: Record<string, string> = {
      [ProviderType.OPENAI]: 'OpenAI',
      [ProviderType.ANTHROPIC]: 'Anthropic',
      [ProviderType.GOOGLE]: 'Google Gemini',
      [ProviderType.COHERE]: 'Cohere'
    };
    return displayNames[type] || type;
  }

  private getProviderBaseUrl(type: string): string {
    const baseUrls: Record<string, string> = {
      [ProviderType.OPENAI]: 'https://api.openai.com/v1',
      [ProviderType.ANTHROPIC]: 'https://api.anthropic.com/v1',
      [ProviderType.GOOGLE]: 'https://generativelanguage.googleapis.com/v1',
      [ProviderType.COHERE]: 'https://api.cohere.ai/v1'
    };
    return baseUrls[type] || '';
  }
}