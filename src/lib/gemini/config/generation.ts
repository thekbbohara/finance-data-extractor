import { GenerationConfig } from '@google/generative-ai';
import {
  balanceStatementSchema,
  financingCashFlowSchema,
  investingCashFlowSchema,
  operatingCashFlowSchema,
  profitLossSchema
} from './response';

const responseMimeType = 'application/json';
const temperature = 0;
const topP = 0;
const topK = 1;
const maxOutputTokens = 8189;

const defaultConfig: GenerationConfig = {
  temperature,
  topP,
  topK,
  maxOutputTokens,
  responseMimeType
};

export const profitLossConfig: GenerationConfig = {
  ...defaultConfig,
  responseSchema: profitLossSchema
};
export const balanceStatementConfig: GenerationConfig = {
  ...defaultConfig,
  responseSchema: balanceStatementSchema
};
export const operatingCashFlowConfig: GenerationConfig = {
  ...defaultConfig,
  responseSchema: operatingCashFlowSchema
};

export const investingCashFlowConfig: GenerationConfig = {
  ...defaultConfig,
  responseSchema: investingCashFlowSchema
};
export const financingCashFlowConfig: GenerationConfig = {
  ...defaultConfig,
  responseSchema: financingCashFlowSchema
};
