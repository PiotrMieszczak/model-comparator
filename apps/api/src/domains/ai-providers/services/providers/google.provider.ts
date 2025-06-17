import { BaseProvider, AIResponse } from '../provider.service';
import { AIModel } from '../../entities/provider.entity';

export class GoogleProvider implements BaseProvider {
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1';

  async generateResponse(prompt: string, model: string, apiKey: string): Promise<AIResponse> {
    const startTime = Date.now();
    
    const response = await fetch(`${this.baseUrl}/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          maxOutputTokens: 4000
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Google API error: ${response.statusText}`);
    }

    const data = await response.json();
    const endTime = Date.now();
    
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const inputTokens = data.usageMetadata?.promptTokenCount || this.countTokens(prompt);
    const outputTokens = data.usageMetadata?.candidatesTokenCount || this.countTokens(content);
    const totalTokens = inputTokens + outputTokens;
    
    const cost = this.calculateCost(inputTokens, outputTokens, model);

    return {
      id: `google-${Date.now()}`,
      model,
      provider: 'google',
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
        id: 'gemini-pro',
        providerId: 'google',
        name: 'gemini-pro',
        displayName: 'Gemini Pro',
        maxTokens: 32768,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'completion', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.00025,
          outputTokenPrice: 0.0005,
          currency: 'USD'
        }
      },
      {
        id: 'gemini-pro-vision',
        providerId: 'google',
        name: 'gemini-pro-vision',
        displayName: 'Gemini Pro Vision',
        maxTokens: 16384,
        supportedFeatures: [
          { name: 'chat', supported: true },
          { name: 'vision', supported: true }
        ],
        pricing: {
          inputTokenPrice: 0.00025,
          outputTokenPrice: 0.0005,
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