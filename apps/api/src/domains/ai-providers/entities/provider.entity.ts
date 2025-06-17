export interface AIProvider {
  id: string;
  name: string;
  displayName: string;
  baseUrl: string;
  supportedModels: string[];
  pricing: ProviderPricing;
  isActive: boolean;
}

export interface ProviderPricing {
  inputTokenPrice: number;
  outputTokenPrice: number;
  currency: string;
}

export interface AIModel {
  id: string;
  providerId: string;
  name: string;
  displayName: string;
  maxTokens: number;
  supportedFeatures: ModelFeature[];
  pricing: ModelPricing;
}

export interface ModelFeature {
  name: string;
  supported: boolean;
}

export interface ModelPricing {
  inputTokenPrice: number;
  outputTokenPrice: number;
  currency: string;
}

export enum ProviderType {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  GOOGLE = 'google',
  COHERE = 'cohere'
}