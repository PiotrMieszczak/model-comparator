import { BaseProvider, AIResponse } from '../provider.service';
import { AIModel } from '../../entities/provider.entity';

export class AnthropicProvider implements BaseProvider {
  private readonly baseUrl = 'https://api.anthropic.com/v1';

  async generateResponse(prompt: string, model: string, apiKey: string): Promise<AIResponse> {
    const startTime = Date.now();
    
    const response = await fetch(`${this.baseUrl}/messages`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.statusText}`);
    }

    const data = await response.json();
    const endTime = Date.now();
    
    const inputTokens = data.usage?.input_tokens || this.countTokens(prompt);
    const outputTokens = data.usage?.output_tokens || this.countTokens(data.content[0].text);
    const totalTokens = inputTokens + outputTokens;
    
    const cost = this.calculateCost(inputTokens, outputTokens, model);

    return {
      id: data.id,
      model,
      provider: 'anthropic',
      content: data.content[0].text,
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
        id: 'claude-3-opus-20240229',
        providerId: 'anthropic',
        name: 'claude-3-opus-20240229',
        displayName: 'Claude 3 Opus',
        maxTokens: 200000,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'completion', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.015,
          outputTokenPrice: 0.075,
          currency: 'USD'
        }
      },
      {
        id: 'claude-3-sonnet-20240229',
        providerId: 'anthropic',
        name: 'claude-3-sonnet-20240229',
        displayName: 'Claude 3 Sonnet',
        maxTokens: 200000,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'completion', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.003,
          outputTokenPrice: 0.015,
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