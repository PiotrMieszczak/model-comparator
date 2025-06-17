import { BaseProvider, AIResponse } from '../provider.service';
import { AIModel } from '../../entities/provider.entity';

export class CohereProvider implements BaseProvider {
  private readonly baseUrl = 'https://api.cohere.ai/v1';

  async generateResponse(prompt: string, model: string, apiKey: string): Promise<AIResponse> {
    const startTime = Date.now();
    
    const response = await fetch(`${this.baseUrl}/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        prompt,
        max_tokens: 4000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Cohere API error: ${response.statusText}`);
    }

    const data = await response.json();
    const endTime = Date.now();
    
    const content = data.generations?.[0]?.text || '';
    const inputTokens = this.countTokens(prompt);
    const outputTokens = this.countTokens(content);
    const totalTokens = inputTokens + outputTokens;
    
    const cost = this.calculateCost(inputTokens, outputTokens, model);

    return {
      id: data.id || `cohere-${Date.now()}`,
      model,
      provider: 'cohere',
      content,
      tokenUsage: {
        inputTokens,
        outputTokens,
        totalTokens
      },
      cost,
      responseTime: endTime - startTime,
      createdAt: new Date()
    };
  }

  getModels(): AIModel[] {
    return [
      {
        id: 'command',
        providerId: 'cohere',
        name: 'command',
        displayName: 'Command',
        maxTokens: 4096,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'completion', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.0015,
          outputTokenPrice: 0.002,
          currency: 'USD'
        }
      },
      {
        id: 'command-light',
        providerId: 'cohere',
        name: 'command-light',
        displayName: 'Command Light',
        maxTokens: 4096,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'completion', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.0003,
          outputTokenPrice: 0.0006,
          currency: 'USD'
        }
      }
    ];
  }

  calculateCost(inputTokens: number, outputTokens: number, model: string): { inputCost: number; outputCost: number; totalCost: number; currency: string } {
    const modelInfo = this.getModels().find(m => m.name === model);
    if (!modelInfo) {
      return { inputCost: 0, outputCost: 0, totalCost: 0, currency: 'USD' };
    }

    const inputCost = (inputTokens / 1000) * modelInfo.pricing.inputTokenPrice;
    const outputCost = (outputTokens / 1000) * modelInfo.pricing.outputTokenPrice;
    const totalCost = inputCost + outputCost;

    return {
      inputCost: parseFloat(inputCost.toFixed(6)),
      outputCost: parseFloat(outputCost.toFixed(6)),
      totalCost: parseFloat(totalCost.toFixed(6)),
      currency: 'USD'
    };
  }

  countTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }
}