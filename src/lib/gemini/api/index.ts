import { GenerationConfig, GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';

import {
  balanceStatementConfig,
  financingCashFlowConfig,
  investingCashFlowConfig,
  operatingCashFlowConfig,
  profitLossConfig
} from '../config/generation';

import {
  BALANCE_STATEMENT_EXTRACTION_SYSTEM_INSTRUCTION,
  CASH_FLOWS_FROM_FINANCING_ACTIVITIES_EXTRACTION_INSTRUCTION,
  CASH_FLOWS_FROM_INVESTING_ACTIVITIES_EXTRACTION_INSTRUCTION,
  CASH_FLOWS_FROM_OPERATING_ACTIVITIES_EXTRACTION_INSTRUCTION,
  PROFIT_LOSS_EXTRACTION_SYSTEM_INSTRUCTION
} from '../config/system';

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables.');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

// Factory function
export const createExtractor = (
  systemInstruction: string,
  prompt: string,
  generationConfig: GenerationConfig,
  name: string
) => {
  return async (imageUrl: string) => {
    const uploadResult = await fileManager.uploadFile(imageUrl, {
      mimeType: 'image/jpeg',
      displayName: name
    });
    let retry = 0;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      systemInstruction,
      generationConfig
    });

    while (retry < 3) {
      try {
        const result = await model.generateContent([
          prompt,
          {
            fileData: {
              fileUri: uploadResult.file.uri,
              mimeType: uploadResult.file.mimeType
            }
          }
        ]);
        const data = result.response.text();

        // Parse the result
        const parsedResponse = JSON.parse(data);
        return parsedResponse; // Return parsed data if successful
      } catch (error: any) {
        console.error(
          `Error processing the data with instruction "${systemInstruction}": ${
            error?.message ?? ''
          }`
        );
        retry++;
      }
    }

    // Return null after 3 retries
    console.error('Failed to process data after 3 retries.');
    return null;
  };
};

// Specific extractor functions
export const getProfitLossData = createExtractor(
  PROFIT_LOSS_EXTRACTION_SYSTEM_INSTRUCTION,
  'Extract Condensed Consolidated Statement of Profit or Loss data from given image',
  profitLossConfig,
  'profit_loss'
);

export const getBalanceStatementData = createExtractor(
  BALANCE_STATEMENT_EXTRACTION_SYSTEM_INSTRUCTION,
  'Extract Condensed Consolidated Statement of Financial Position (Unaudited) data from given image',
  balanceStatementConfig,
  'balance_statement'
);

export const getCashFlowOperatingData = createExtractor(
  CASH_FLOWS_FROM_OPERATING_ACTIVITIES_EXTRACTION_INSTRUCTION,
  'Extract Cash flow data from operating activities from given image',
  operatingCashFlowConfig,
  'cash_flow_operating_activities'
);

export const getCashFlowInvestingData = createExtractor(
  CASH_FLOWS_FROM_INVESTING_ACTIVITIES_EXTRACTION_INSTRUCTION,
  'Extract Cash flow data from investing activities from given image',
  investingCashFlowConfig,
  'cash_flow_investing_activities'
);

export const getCashFlowFinancingData = createExtractor(
  CASH_FLOWS_FROM_FINANCING_ACTIVITIES_EXTRACTION_INSTRUCTION,
  'Extract Cash flow data from financing activities from given image',
  financingCashFlowConfig,
  'cash_flow_financing_activities'
);
