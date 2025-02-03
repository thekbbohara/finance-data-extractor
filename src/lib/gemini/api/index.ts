import { GenerationConfig, GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

import {
  bankingBalanceSheetConfig,
  bankingIncomeStatementConfig,
  bankRatiosConfig,
  htBalanceSheetConfig,
  insuranceBalanceSheetConfig,
  insuranceIncomeStatementConfig,
  nonelifeInsuranceRatiosConfig,
} from "../config";

import {
  BALANCE_SHEET_EXTRACTION_INSTRUCTION,
  BANK_RATIOS_EXTRACTION_INSTRUCTION,
  BANKING_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  HT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  INSURANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  INSURANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  LIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  NONELIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
} from "../config/system";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables.");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

// Factory function
export const createExtractor = (
  systemInstruction: string,
  prompt: string,
  generationConfig: GenerationConfig,
  name: string,
) => {
  return async (imageUrl: string) => {
    //console.log(imageUrl ? "got img url" : "no img url");
    //console.log("Uploading img");
    const uploadResult = await fileManager.uploadFile(imageUrl, {
      mimeType: "image/jpeg",
      displayName: name,
    });
    //console.log("image uploaded successfully");
    let retry = 0;

    //console.log("Cofiguring model");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
      systemInstruction,
      generationConfig,
    });

    while (retry < 3) {
      //console.log("try", retry);
      try {
        const result = await model.generateContent([
          prompt,
          {
            fileData: {
              fileUri: uploadResult.file.uri,
              mimeType: uploadResult.file.mimeType,
            },
          },
        ]);
        //console.log({ result: result.response.text() });
        const data = result.response.text();

        // Parse the result
        const parsedResponse = JSON.parse(data);
        return parsedResponse; // Return parsed data if successful
      } catch (error: any) {
        console.error(`Error processing the data: ${error?.message ?? ""}`);
        retry++;
      }
    }

    // Return null after 3 retries
    console.error("Failed to process data after 3 retries.");
    return null;
  };
};

// Specific extractor functions
export const getBankingIncomeStatement = createExtractor(
  BANKING_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract Condensed Consolidated Statement of Profit or Loss data from given image",
  bankingIncomeStatementConfig,
  "profit_loss",
);

export const getBalanceSheetData = createExtractor(
  BALANCE_SHEET_EXTRACTION_INSTRUCTION,
  "Extract Condensed Consolidated Statement of Financial Position (Unaudited) data from given image",
  bankingBalanceSheetConfig,
  "banking_balance_sheet",
);

export const getBankRatiosData = createExtractor(
  BANK_RATIOS_EXTRACTION_INSTRUCTION,
  "Extract <Bank's current year's Up To This Quarter (YTD)>  in accordance with Ratios as per NRB directives, from the given image.",
  bankRatiosConfig,
  "bank_ratios",
);

export const getInsuranceBalanceSheetData = createExtractor(
  INSURANCE_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract <At The End of This Quarter> from Condensed Statement of Financial Position",
  insuranceBalanceSheetConfig,
  "insurance_balancesheet",
);

export const getInsuranceIncomeStatementData = createExtractor(
  INSURANCE_INCOMESTATEMENT_EXTRACTION_INSTRUCTION,
  "Extract <Current Year Upto This Quarter (YTD)> from Condensed Statement of profit & loss",
  insuranceIncomeStatementConfig,
  "insurance_incomestatement",
);

export const getNonelifeInsuranceRatiosData = createExtractor(
  NONELIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  "Extract End Quarter from given image",
  nonelifeInsuranceRatiosConfig,
  "nonelife_insurance_ratios",
);

export const getLifeInsuranceRatiosData = createExtractor(
  LIFE_INSURANCE_RATIOS_EXTRACTION_INSTRUCTION,
  "Extract <Current Year Upto This Quarter (YTD)> from given image",
  nonelifeInsuranceRatiosConfig,
  "life_insurance_ratios",
);

export const getHTBalanceSheetData = createExtractor(
  HT_BALANCESHEET_EXTRACTION_INSTRUCTION,
  "Extract  This Quarter Ending from given image",
  htBalanceSheetConfig,
  "ht_balancesheet_config",
);
