export interface Comparison {
  id: string;
  userId: string;
  title: string;
  prompt: string;
  responses: ComparisonResponse[];
  totalCost: number;
  currency: string;
  status: ComparisonStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComparisonResponse {
  id: string;
  comparisonId: string;
  provider: string;
  model: string;
  content: string;
  tokenUsage: TokenUsage;
  cost: Cost;
  responseTime: number;
  status: ResponseStatus;
  error?: string;
  createdAt: Date;
}

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
}

export interface Cost {
  inputCost: number;
  outputCost: number;
  totalCost: number;
  currency: string;
}

export enum ComparisonStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum ResponseStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface CreateComparisonData {
  userId: string;
  title: string;
  prompt: string;
  providers: string[];
  models: string[];
}