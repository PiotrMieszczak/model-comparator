import { BaseProvider, AIResponse } from '../provider.service';
import { AIModel } from '../../entities/provider.entity';

export class OpenAIProvider implements BaseProvider {
  private readonly baseUrl = 'https://api.openai.com/v1';

  async generateResponse(prompt: string, model: string, apiKey: string): Promise<AIResponse> {
    const startTime = Date.now();
    
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const endTime = Date.now();
    
    const inputTokens = data.usage?.prompt_tokens || this.countTokens(prompt);
    const outputTokens = data.usage?.completion_tokens || this.countTokens(data.choices[0].message.content);
    const totalTokens = inputTokens + outputTokens;
    
    const cost = this.calculateCost(inputTokens, outputTokens, model);

    return {
      id: data.id,
      model,
      provider: 'openai',
      content: data.choices[0].message.content,
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
        id: 'gpt-4',
        providerId: 'openai',
        name: 'gpt-4',
        displayName: 'GPT-4',
        maxTokens: 8192,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'completion', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.03,
          outputTokenPrice: 0.06,
          currency: 'USD'
        }
      },
      {
        id: 'gpt-3.5-turbo',
        providerId: 'openai',
        name: 'gpt-3.5-turbo',
        displayName: 'GPT-3.5 Turbo',
        maxTokens: 4096,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'completion', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.001,
          outputTokenPrice: 0.002,
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